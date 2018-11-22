import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import SequelizeCache from '@nec-network/sequelize-cache';
import config from 'config';
import cache from './cache';
import log from '../utils/log';

const getQueries = () => {
    const queryDir = path.join(__dirname, 'sql');
    const queries = {};
    const filenames = fs.readdirSync(queryDir);
    for (const filename of filenames) {
        if (filename.endsWith('.sql')) {
            const query = filename.replace('.sql', '');
            queries[query] =
                fs.readFileSync(path.resolve(queryDir, filename))
                    .toString()
                    .trim();
        }
    }

    return queries;
};

const getConnection = () => {
    const sequelizeConfig = {
        dialect: 'mssql',
        operatorsAliases: false,
        logging: log.debug,
        ...config.database,
    };

    const sequelize = new Sequelize(sequelizeConfig);

    SequelizeCache.init(sequelize, cache, { log: log.debug });
    return SequelizeCache.wrapRaw({ ttl: { minAge: 60, maxAge: 1200 } });
};

export class Database {
    constructor() {
        this.sequelize = getConnection();
        this.queries = getQueries();
    }

    async runQuery(query, params, opts = null) {
        const options = { type: Sequelize.QueryTypes.SELECT, replacements: params, ...opts };
        return await this.sequelize.query(this.queries[query], options);
    }
}

export default new Database();
