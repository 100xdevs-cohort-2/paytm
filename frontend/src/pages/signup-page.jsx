import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Footer } from "../components/card-footer";
import { Input } from "../components/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastSuccess from "../components/toast";

export function SignupPage() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function signUp() {
    // setToast(false);
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/user/signup",
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
      },
    });
    console.log(response.data.message);
    setLabel(response.data.message);
    setToast(true);
    if (response.status === 202) {
      const token = response.data.token;
      localStorage.setItem("token-paytm", token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000); // 5 seconds delay
    }
  }

  const [toast, setToast] = useState(false);
  const [label, setLabel] = useState("");

  const navigate = useNavigate();
  return (
    <div className="bg-zinc-400 w-screen h-screen flex justify-center items-center">
      <div className="bg-zinc-50 w-[23vw] h-auto rounded-lg drop-shadow-md">
        <div className="flex flex-col justify-center px-2">
          <div className="py-5 text-center">
            <span className="font-bold text-3xl pt-5 font-[Poppins]">
              Sign Up
            </span>
            <p className="text-zinc-600 my-2">
              Enter Your Information To Create an Account
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <Input
              label={"First Name"}
              placeholder={"John"}
              type={"text"}
              refrence={firstnameRef}
            />
            <Input
              label={"Last Name"}
              placeholder={"John"}
              type={"text"}
              refrence={lastnameRef}
            />
            <Input
              label={"Email"}
              placeholder={"Johndoe@example.com"}
              type={"email"}
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
            <Button label={"Sign Up"} onClickfun={signUp} />
            <Footer
              label1={"Already Have an Account ?"}
              label2={"Login"}
              link={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
