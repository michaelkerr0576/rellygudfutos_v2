/* 
 $ windowUtils
  - openUrlInNewTab
  - scrollToTop
*/

export const openUrlInNewTab = (url: string): void => {
  window.open(url, '_blank');
};

export const scrollToTop = (): void => {
  window.scrollTo(0, 0);
};
