export default (ctx, next) => {
    const newrelic = ctx.newrelic;
    if (!newrelic) {
        return next();
    }

    const path = ctx._matchedRoute;
    if (path && path !== '(.*)') {
        const transaction = `Koajs/${path[0] === '/' ? path.slice(1) : path}`;
        newrelic.setTransactionName(transaction);
    }

    return next();
};
