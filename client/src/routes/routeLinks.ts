export const SYSTEM_ROUTES: Readonly<{ AUTH: string; BASE_URL: string }> = Object.freeze({
  AUTH: '/auth',
  BASE_URL: '/'
});

// Dashboard base route
export const BASE_LINK: Readonly<{
  HOME: string;
  DASHBOARD: string;
}> = Object.freeze({
  HOME: `${SYSTEM_ROUTES.BASE_URL}`,
  DASHBOARD: '/'
});

export const APP_LINKS = {
  DASHBOARD: {
    NAME: 'Home',
    PATH: '/'
  },
  FOLDER: {
    NAME: 'Folder',
    PATH: '/folder/:id'
  }
};
