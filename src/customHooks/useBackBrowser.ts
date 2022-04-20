import { useEffect, useRef } from "react";

const useBackBrowser = (
  callback: (e: any) => void,
  openDrawer: boolean,
  id: number
) => {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) {
      if (openDrawer) {
        window.history.pushState({ id }, "", window.location.href);
        window.history.pushState({ id }, "", window.location.href);
        window.addEventListener("popstate", callback);
      } else {
        window.removeEventListener("popstate", callback);
        window.history.back();
      }
    }
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, [openDrawer]);
};

export default useBackBrowser;
