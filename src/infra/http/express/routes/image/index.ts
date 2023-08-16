import { expressAdapter } from '@/infra/http/adapters/expressAdapter';
import { expressMulterAdapter } from '@/infra/http/adapters/expressMulterAdapter';
import { deleteImageHandler, getImageHandler, uploadImageHandler } from '@/infra/http/controllers/image/imageController';
import multer from '@/utils/multer';
import { Router } from "express";
import verifyTokenMiddleware from '../../middlewares/verifyTokenMiddleware';

const imageRoutes = Router()

imageRoutes.put(
  '/image',
  (_req, res) => res.status(405).send()
)

imageRoutes.post(
  '/image',
  verifyTokenMiddleware,
  multer.single('file'),
  expressMulterAdapter(uploadImageHandler)
)

imageRoutes.delete(
  '/image',
  verifyTokenMiddleware,
  expressAdapter(deleteImageHandler)
)

imageRoutes.get(
  '/image',
  expressAdapter(getImageHandler)
)

export { imageRoutes };
