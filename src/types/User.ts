export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
  BANNED = 'BANNED'
}

export type User = {
  email: string;
  id: string;
  pictureUrl: string;
  roles: ROLES[];
  userName: string;
};
