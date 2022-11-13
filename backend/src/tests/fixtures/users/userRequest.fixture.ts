import * as enm from '@/ts/enums/db.enum';

export default {
  _id: '41224d776a326fb40f000113',
  email: 'testEmail1@test.com',
  equipment: {
    cameras: ['camera1'],
    lenses: ['lens1', 'lens2'],
  },
  name: 'Dr. Brad Pitt',
  password: '12345678Uu%',
  photos: ['00224d776a326fb40f000002'],
  role: enm.UserRole.USER,
};
