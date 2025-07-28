import { useEffect, useState } from "react";

export function useIsOnline() {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  useEffect(() => {
    const online = () => setOnlineStatus(true);
    const offline = () => setOnlineStatus(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);
  return onlineStatus;
}
