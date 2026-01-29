export function createPageUrl(pageName) {
  const pageMap = {
    'Home': '/',
    'Projects': '/projects',
    'Team': '/team',
    'Events': '/events',
  };
  
  return pageMap[pageName] || `/${pageName.toLowerCase()}`;
}
