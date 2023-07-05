import { expressAdapter } from '@/infra/http/adapters/expressAdapter';
import { deleteImageHandler, getImageHandler, uploadImageHandler } from '@/infra/http/controllers/image/imageController';
import multer from '@/utils/multer';
import { Router } from "express";

const imageRoutes = Router()

imageRoutes.post(
  '/image',
  multer.single('file'),
  expressAdapter(uploadImageHandler)
)

imageRoutes.delete(
  '/image',
  expressAdapter(deleteImageHandler)
)

imageRoutes.get(
  '/image',
  expressAdapter(getImageHandler)
)

export { imageRoutes };
