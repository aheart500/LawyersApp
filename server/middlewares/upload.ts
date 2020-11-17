import multer from 'multer'
import path from 'path'
import fs from 'fs'

export const uploadFolder= path.join(__dirname, '..','images')
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, Date.now() + "-" + fileName);
    },
});
export const handleDelete = (filename: string) => {
    const imagePath = path.join(uploadFolder, filename);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  };
export default multer({storage: storage});