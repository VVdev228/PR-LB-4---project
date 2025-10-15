import { Router } from 'express';

import { list, create, destroy, show, update } from 'controllers/posts';

import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
const router = Router();
router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], create);

router.delete('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);
router.get('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show);
router.put('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], update);

export default router;
