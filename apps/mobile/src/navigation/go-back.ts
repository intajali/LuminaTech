import { router } from 'expo-router';

import { routes } from './routes';

export function goBack() {
  if (router.canGoBack()) {
    router.back();
    return;
  }
  router.replace(routes.home);
}
