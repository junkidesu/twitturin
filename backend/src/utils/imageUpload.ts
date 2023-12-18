import env from "./config";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_ACCESS_SECRET,
  },
});

export const upload = multer({
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage: multerS3({
    s3,
    bucket: "twitturin-aws-bucket",
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    // eslint-disable-next-line @typescript-eslint/unbound-method
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (_req, _file, cb) {
      cb(null, `profile-pictures/${Date.now().toString()}`);
    },
  }),
});
