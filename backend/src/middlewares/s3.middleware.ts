import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';

/* 
 $ s3Middleware
  - deleteFile
  - getFileUrl
  - uploadFile
*/

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

export const deleteFile = (key: string): Promise<DeleteObjectCommandOutput> => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  return s3Client.send(new DeleteObjectCommand(params));
};

export const getFileUrl = (key: string): string =>
  `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;

export const uploadFile = async (
  buffer: Buffer,
  key: string,
  mimetype: string,
): Promise<PutObjectCommandOutput> => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: bucketName,
    ContentType: mimetype,
    Key: key,
  };

  return s3Client.send(new PutObjectCommand(params));
};
