import Router from 'koa-router';
import home from './home';
import name from './name';

const router = new Router();

router.prefix('/analyse')
    .get('/', home)
    .get('/:name', name);

export default router;
