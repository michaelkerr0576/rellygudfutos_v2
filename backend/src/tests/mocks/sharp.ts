jest.mock('sharp', () => (): any => ({
  resize: (): any => ({
    jpeg: (): any => ({
      toBuffer: (): any => ({
        data: 'testBuffer',
        info: {
          channels: 3,
          format: 'jpeg',
          height: 720,
          premultiplied: false,
          size: 33450,
          width: 1080,
        },
      }),
    }),
  }),
}));
