import Router from 'koa-router';
import generalInfo from './general-info';

const router = new Router();

router.prefix('/sentiment')
    .get('/general-info/:electionId', generalInfo);

export default router;
