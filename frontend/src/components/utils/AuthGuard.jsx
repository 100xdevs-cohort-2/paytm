import { useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../store/selectors/userSelector.js";
import Loader from "../ui/Loader.jsx";
import {authState} from "../../store/atoms/authAtom.js"

function AuthGuard({ children }) {
  const auth = useRecoilValue(authState);
  console.log(auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!auth.loading && !auth.isAuthenticated) navigate("/signin", {replace : true});
  },[auth.loading, auth.isAuthenticated, navigate])

  if(auth.loading) return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <Loader/>
      </div>
  )

  if(auth.isAuthenticated) return <>{children}</>

  return null;
}

export default AuthGuard;
