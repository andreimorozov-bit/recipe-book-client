import Resizer from 'react-image-file-resizer';

export const imageResize = (file: File): Promise<string | File | Blob> =>
  new Promise<string | File | Blob>((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      'JPEG',
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      'base64'
    );
  });
