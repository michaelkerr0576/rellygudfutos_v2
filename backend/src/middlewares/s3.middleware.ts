import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.AWS_BUCKET_NAME || '';
const bucketRegion = process.env.AWS_BUCKET_REGION || '';
const accessKey = process.env.AWS_ACCESS_KEY || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
  region: bucketRegion,
});

const deleteFile = (key: string): Promise<DeleteObjectCommandOutput> => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  return s3Client.send(new DeleteObjectCommand(params));
};

const getFileUrl = async (key: string): Promise<string> => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const getCommand = new GetObjectCommand(params);
  const oneMinute = 60;
  const fileUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: oneMinute });

  return fileUrl;
};

const uploadFile = (buffer: Buffer, key: string, mimetype: string): Promise<PutObjectCommandOutput> => {
  const params = {
    Body: buffer,
    Bucket: bucketName,
    ContentType: mimetype,
    Key: key,
  };

  return s3Client.send(new PutObjectCommand(params));
};

export default {
  deleteFile,
  getFileUrl,
  uploadFile,
};
