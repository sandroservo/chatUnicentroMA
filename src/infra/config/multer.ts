import multer from 'multer'
import path from 'path'

const upload = multer({
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    limits: {fileSize: 2* 1024 + 100},
    storage: multer.disStorage({
        filename:
    });
});

export { upload }