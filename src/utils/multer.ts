import multer from "multer";
import path from "path";
import { BadRequestError } from "./httpErrors";

export default multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 4 * 1024 * 1024
  },
  fileFilter: (_request, file, callbackFn) => {
    if (!file.mimetype.startsWith('image/')) {
      callbackFn(new BadRequestError("File type is not supported"))
      return;
    }
    callbackFn(null, true);
  },
})