import { selector } from "recoil";

export const initializeAuth = selector({
  key: "initializeAuth",
  get: async ({ get }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    }

    try {
        const res = await fetch("/api/v1/user/me", {
            headers : {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!res.ok) throw new Error("Invalid token");
        const data = await res.json();
        if(data.status === "success"){
          return {
            isAuthenticated : true,
            user : data.data.user,
            loading: false
          }
        }

    } catch (error) {
        // localStorage.removeItem("token");
        return {
            isAuthenticated : false,
            user : null,
            loading : false
        }
    }
  },
});
