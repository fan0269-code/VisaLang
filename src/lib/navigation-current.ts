export type NavigationCurrent = 'page' | 'location' | undefined;
export type NavigationKey = 'home' | 'routes' | 'exams' | 'tools' | 'guides' | 'about' | 'route-item' | 'about-item';

const sectionActive = (currentPath: string, key: NavigationKey, href: string) => {
  if (key === 'routes') {
    return currentPath.startsWith('/routes/')
      || currentPath.startsWith('/germany-')
      || currentPath.startsWith('/zh/germany-');
  }
  if (key === 'about') {
    return ['/about/', '/pricing/', '/partners/'].some((path) => currentPath.startsWith(path));
  }
  if (href === '/' || href === '/zh/') return currentPath === href;
  return currentPath.startsWith(href);
};

export const navigationCurrent = (currentPath: string, key: NavigationKey, href: string): NavigationCurrent => {
  if (currentPath === href) return 'page';
  return sectionActive(currentPath, key, href) ? 'location' : undefined;
};
