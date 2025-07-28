// store/hooks/useLogin.js
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";

export function useLogin() {
  const setAuth = useSetRecoilState(authState);

  async function login(userData) {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        localStorage.setItem("token", data.data.token);
        setAuth({
          isAuthenticated: true,
          user: data.data.user,
          loading: false,
          error: null,
        });
        return { success: true };
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      localStorage.removeItem("token");
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error.message,
      });
      return { success: false, error: error.message };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    return { success: true };
  }

  async function getUsers() {
    try {
      const res = await fetch("/api/v1/user/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        return { success: true, users: data.data.users };
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  return { login, logout, getUsers };
}
