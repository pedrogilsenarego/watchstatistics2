import * as React from "react";

export const useNavigateBack = (callback: Function): void => {
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      window.addEventListener(
        "popstate",
        function (event) {
          window.history.pushState(null, "", document.URL);
          event.stopImmediatePropagation();
          callback();
        },
        false
      );
    } else {
      // In my special case this fix was needeed:
      // window.history.pushState(null, '', document.URL);
    }
  }, [callback]);
};

export const useBackNeutralized = (callback: Function) => {
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = () => {
    window.history.pushState(null, "", window.location.href);
    callback();
  };
};
