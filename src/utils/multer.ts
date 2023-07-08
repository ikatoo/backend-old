import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (_request, file, callbackFn) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      callbackFn(new Error("File type is not supported"))
      return;
    }
    callbackFn(null, true);
  },
})