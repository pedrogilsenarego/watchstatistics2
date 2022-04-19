const useBackBrowser = (callback: Function, openDrawer: boolean) => {
  if (openDrawer) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
      callback();
    };
  } else {
    window.onpopstate = (e) => {
      window.onpopstate = () => {};
      window.history.back();
    };
  }
};

export default useBackBrowser;
