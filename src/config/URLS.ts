export const URLS = {
  LOGIN: () => '/login',
  GOOGLE_LOGIN: () => '/oauth2/authorization/google',

  ME: () => '/users/me',
  ALL_USERS: () => '/users/all',
  BANNED_USERS: () => '/users/bannedUsers',
  BAN_USER: (email: string) => `/users/${email}/ban`,
  UNBAN_USER: (email: string) => `/users/${email}/unban`,

  LEADERBOARD: () => '/statistics/leaderboard',
};
