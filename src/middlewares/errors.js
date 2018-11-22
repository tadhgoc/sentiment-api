export default async function (ctx, next) {
    try {
        await next();
    } catch (error) {
        error.route = ctx.path;
        ctx.status = parseInt(error.status, 10) || 500;
        ctx.app.emit('error', error, ctx);

        ctx.body = {
            error: error.message,
            status: ctx.status,
        };
    }
}
