import Router from "koa-router";
import fetch from "./fetch";

const router = new Router();

router.prefix("/location").get("/search", fetch);

export default router;
