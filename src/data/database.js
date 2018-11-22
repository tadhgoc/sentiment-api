import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from 'config';
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

    return sequelize;
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
