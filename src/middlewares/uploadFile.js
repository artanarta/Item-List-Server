const multer = require("multer");

exports.uploadFile = (imageFile) => {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }

    cb(null, true);
  };

  // const sizeInMB = 100;
  // const maxSize = sizeInMB * 1000 * 1000; //Maximum file size i MB

  const sizeInKB = 100;
  const maxSize = sizeInKB * 1000; // Maximum file size in KB

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageFile,
      maxCount: 1,
    }
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {

      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.files && !err)
        return res.status(400).send({
          message: "Please select files to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 100kb",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};