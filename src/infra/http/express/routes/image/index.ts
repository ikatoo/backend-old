import Cloudinary from '@/infra/storage/cloudinary';
import { env } from '@/utils/env';
import { v2 as cloudinary } from 'cloudinary';
import { Router } from "express";
import multer from "multer";
import path from 'path';

const imageRoutes = Router()
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (_request, file, callbackFn) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      callbackFn(new Error("File type is not supported"))
      return;
    }
    callbackFn(null, true);
  },
})

cloudinary.config({
  cloud_name: env.CLOUDNARY_CLOUDNAME,
  api_key: env.CLOUDNARY_APIKEY,
  api_secret: env.CLOUDNARY_APISECRET,
});

imageRoutes.post(
  '/image',
  upload.single('file'),
  async (req, res) => {
    const imageRepository = new Cloudinary()
    const result = await imageRepository.uploadImage(`${req.file?.path}`)

    res.json({
      url: result.url,
      cloudinary_id: result.public_id,
    });
  }
)

imageRoutes.delete(
  '/image',
  async (req, res) => {
    const imageRepository = new Cloudinary()
    const result = await imageRepository.deleteImage(req.body.publicId)

    res.json(result);
  }
)

imageRoutes.get(
  '/image',
  async (req, res) => {
    const imageRepository = new Cloudinary()
    const url = await imageRepository.getImage(req.body.publicId)

    res.json({ url });
  }
)

export { imageRoutes };
