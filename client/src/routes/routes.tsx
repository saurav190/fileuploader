import HomePage from '@pages/home/HomePage';
import { ReactElement, ReactNode } from 'react';
import { APP_LINKS } from './routeLinks';
import FolderFiles from '@/components/file/FolderFiles';

export interface RouteT {
  path: string;
  component?: ReactNode | ReactElement;
}
// User routes
const APP_ROUTES: RouteT[] = [
  {
    path: APP_LINKS.DASHBOARD.PATH,
    component: <HomePage />
  },
  {
    path: APP_LINKS.FOLDER.PATH,
    component: <FolderFiles />
  }

];

export { APP_ROUTES };
