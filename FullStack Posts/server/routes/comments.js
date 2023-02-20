import { Router } from 'express';
import { checkAuth } from '../utills/checkAuth.js';
import { createComment } from '../controllers/CommentController.js';

const router = new Router();

router.post('/:id', checkAuth, createComment);

export default router;
