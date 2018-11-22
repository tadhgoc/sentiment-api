import config from "config";
import Router from "koa-router";
import compress from "koa-compress";
import convert from "koa-convert";
import cacheControl from "koa-cache-control";
import logger from "koa-logger";
import newrelicTracer from "./utils/newrelic-tracer";
import healthCheckRoute from "./routes/health-check";
import indexRoute from "./routes/index";
import sentimentRouter from "./routes/sentiment/";
import locationRouter from "./routes/location/";
import analyseRouter from "./routes/analyse/";
import errors from "./middlewares/errors";
import ResourceNotFoundError from "./errors/resource-not-found";

const router = new Router();

if (config.logging.requests) {
    router.use(logger());
}

// Middleware
router.use(errors);
router.use(compress());
router.use(
    convert(
        cacheControl({
            maxAge: 2 * 60
        })
    )
);
router.use(newrelicTracer);

// General routes
router.get("/", indexRoute);
router.get("/health-check", healthCheckRoute);

// Main app routes
router.use(analyseRouter.routes());
router.use(sentimentRouter.routes());
router.use(locationRouter.routes());

// Return 404 if not previously matched
router.get("*", ctx => ctx.throw(new ResourceNotFoundError()));

export default router;
