import { Router } from 'express';
import { checkAuth } from '../utills/checkAuth.js';
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
} from '../controllers/PostController.js';

const router = new Router();

// Create posts
router.post('/', checkAuth, createPost);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/user/me', checkAuth, getMyPosts);
router.delete('/:id', removePost);
router.put('/:id', updatePost);
router.get('/comments/:id', getPostComments);

export default router;
