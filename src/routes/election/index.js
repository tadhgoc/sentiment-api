import Router from 'koa-router';
import generalInfo from './general-info';

const router = new Router();

router.prefix('/election')
    .get('/general-info/:electionId', generalInfo);

export default router;
