import * as enm from '@/types/enums/db.enum';

export default {
  _id: '41224d776a326fb40f000003',
  email: 'testEmail@test.com',
  equipment: {
    cameras: ['camera1'],
    lenses: ['lens1', 'lens2'],
  },
  name: 'Martin Luther King, Jr.',
  password: '12345678Uu%',
  photos: ['00224d776a326fb40f000002'],
  role: enm.UserRole.ADMIN,
};
