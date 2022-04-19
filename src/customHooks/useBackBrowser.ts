const useBackBrowser = (callback: Function, openDrawer: boolean) => {
  if (openDrawer) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
      callback();
      // then turn on back again
      window.onpopstate = () => {
        window.onpopstate = () => {};
        window.history.back();
      };
    };
  } else {
  }
};

export default useBackBrowser;
