import config from 'config';

export default function home(ctx) {
    ctx.body = {
        sitename: config.name,
        version: config.version,
    };
}
