jest.mock('sharp', () => (): any => ({
  resize: (): any => ({
    jpeg: (): any => ({
      toBuffer: (): any => 'testBuffer',
    }),
  }),
}));
