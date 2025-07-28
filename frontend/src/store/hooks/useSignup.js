import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";

export function useSignup() {
  const setAuth = useSetRecoilState(authState);

  async function signup(formData) {
    try {
      const response = await fetch("api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        setAuth({
          isAuthenticated: true,
          user: data.data.user,
          loading: false,
          error: null,
        });
        return { success: true };
      } else {
        throw new Error(data.message || "Signup failed");
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

  return signup;
}
