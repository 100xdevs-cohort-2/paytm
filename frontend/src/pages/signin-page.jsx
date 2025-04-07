import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Footer } from "../components/card-footer";
import { Input } from "../components/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastSuccess from "../components/toast";

export function SigninPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function signIn() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/user/signin",
      data: {
        username: username,
        password: password,
      },
    });
    console.log(response.data.message);
    setToast(true);
      setLabel(response.data.message)
    if (response.status === 202) {
      if(localStorage.getItem("token-paytm"))
      {
        localStorage.removeItem("token-paytm");
      }
      const token = response.data.token;
      
      localStorage.setItem("token-paytm", token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000); // 5 seconds delay
    }
  }

  const navigate = useNavigate();

    const [toast, setToast] = useState(false);
    const [label, setLabel] = useState("");
  return (
    <div className="bg-zinc-400 w-screen h-screen flex justify-center items-center">
      <div className="bg-zinc-50 w-[23vw] h-auto rounded-lg drop-shadow-md">
        <div className="flex flex-col justify-center px-2">
          <div className="py-5 text-center">
            <span className="font-bold text-3xl pt-5 font-[Poppins]">
              Sign In
            </span>
            <p className="text-zinc-600 my-2">
              Enter Your Credentials to Access Your Account
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <Input
              label={"username"}
              placeholder={"johndoe@example.com"}
              type={"text"}
              refrence={usernameRef}
            />

            <Input
              label={"Password"}
              placeholder={"********"}
              type={"password"}
              refrence={passwordRef}
            />
            {toast && <ToastSuccess label={label} />}
          </div>
          <div className="my-6">
            <Button label={"Login"}
            onClickfun={signIn}
            />
            <Footer
              label1={"Don't Have an Account?"}
              label2={"Sign Up"}
              link={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
