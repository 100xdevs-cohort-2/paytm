import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import { useEffect } from "react";
import { initializeAuth } from "../selectors/initializeAuth";

export function useAuthInitializer() {
  const authLoadable = useRecoilValueLoadable(initializeAuth);
  const setAuth = useSetRecoilState(authState);

  console.log("Initializing Auth");

  useEffect(() => {
    if (authLoadable.state === "hasValue") {
      console.log("Auth initialized:", authLoadable.contents);
      setAuth(authLoadable.contents);
    } else if (authLoadable.state === "hasError") {
      console.error("Auth init failed:", authLoadable.contents);
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  }, [authLoadable.state, authLoadable.contents, setAuth]);
}
