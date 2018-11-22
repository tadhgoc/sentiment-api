import Router from 'koa-router';
import home from './home';

const router = new Router();

router.prefix('/analyse')
    .get('/', home);

export default router;
