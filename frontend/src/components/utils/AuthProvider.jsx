
import React from 'react';
import {useAuthInitializer} from "../../store/hooks/useAuthInitializer.js"

function AuthProvider({children}) {
    useAuthInitializer();
  return (
    <>{children}</>
  )
}

export default AuthProvider