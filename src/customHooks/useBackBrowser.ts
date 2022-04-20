import { useEffect, useRef } from "react";

const useBackBrowser = (
  callback: (e: any) => void,
  openDrawer: boolean,
  id: number,
  modId: number
) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      if (openDrawer) {
        window.history.pushState({ id }, "");
        window.history.pushState({ id }, "");
        window.addEventListener("popstate", callback);
      } else {
        window.removeEventListener("popstate", callback);
        window.history.back();
      }
    }
    ref.current = true;
  }, [openDrawer]);
};

export default useBackBrowser;
