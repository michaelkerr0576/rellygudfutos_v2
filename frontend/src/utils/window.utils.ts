/* 
 $ windowUtils
  - openUrlInNewTab
  - scrollToTop
*/

export const openUrlInNewTab = (url: string): void => {
  window.open(url, '_blank');
};

export const scrollToTop = (): void => {
  // First try to find the page element that has overflow
  const pageElement = document.querySelector('.rgf-page') as HTMLElement;
  if (pageElement) {
    pageElement.scrollTo(0, 0);
  } else {
    // Fallback to window scroll if no page element is found
    window.scrollTo(0, 0);
  }
};
