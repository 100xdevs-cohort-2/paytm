import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useSignup } from "../../../store/hooks/useSignup";
import Alert from "../../ui/Alert";

function Signup() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const signup = useSignup();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    termAndConditions: false,
  });

  const signupObj = z.object({
    firstName: z.string().min(3).max(15),
    lastName: z.string().min(3).max(15),
    username: z.string().min(3).max(15),
    password: z.string().min(6).max(20),
    termAndConditions: z.literal(true),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("FormData : ", formData);
    if (!formData.termAndConditions) {
      setAlert({
        type: "warning",
        title: "Accept Terms and Conditions",
        message: "Please Accept Terms and Conditions to Create Account",
      });
      setTimeout(() => {
        setAlert(null);
        setFormData(
          {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            termAndConditions: false,
          },
          5000
        );
      }, 5000);
    }
    const parsedData = signupObj.safeParse(formData);
    if (!parsedData.success) {
      setAlert({
        type: "error",
        title: "Invalid Details",
        message: "Please Check the Details Again",
      });

      setTimeout(() => {
        setAlert(null);
        setFormData(
          {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            termAndConditions: false,
          },
          5000
        );
      }, 5000);
    } else if (parsedData.success) {
      const signupData = await signup({
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      if (signupData.success) {
        setAlert({
          type: "success",
          title: "Signed Up",
          message: "Your Account Created SuccessFully",
        });
        setTimeout(() => {
          setAlert(null);
          setFormData(
            {
              username: "",
              password: "",
              firstName: "",
              lastName: "",
              termAndConditions: false,
            },
            5000
          );
          console.log("Signup Successful");
          navigate("/dashboard", { replace: true });
        }, 5000);
      } else {
        setAlert({
          type: "error",
          title: "Signup Failed",
          message: "Incorrect Credentials. Please Fill Data Again",
        });
        setTimeout(() => {
          setAlert(null);
          setFormData(
            {
              username: "",
              password: "",
              firstName: "",
              lastName: "",
              termAndConditions: false,
            },
            5000
          );
          console.error("Signup Failed:", signupData.error);
        }, 5000);
      }
    }
  }

  return (
    <>
      {alert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Alert {...alert} />
        </div>
      )}
      <div className="flex w-screen flex-wrap text-slate-800">
        <div className="relative hidden h-screen select-none flex flex-col bg-blue-300 text-center md:flex md:w-1/2">
          <img
            className="mt-4 mx-auto w-[30%] rounded-lg object-cover"
            src="https://assetscdn1.paytm.com/images/catalog/view/308774/1617696247991.png"
          />
          <img
            className="mx-auto mt-0 w-11/12 max-w-lg rounded-lg object-cover"
            src="https://assetscdn1.paytm.com/images/catalog/view/1752737003196.png"
          />
        </div>

        <div className="flex w-full flex-col md:w-1/2">
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <div className="flex flex-col">
              <img
                src="images/paytm-logo.svg"
                alt="Paytm Logo"
                className="mb-4 w-auto "
              />
            </div>
            <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
              Create your free account
            </p>
            <p className="mt-6 text-center font-medium md:text-left">
              Already using Paytm?{" "}
              <Link
                to="/signin"
                className="whitespace-nowrap font-semibold text-blue-700"
              >
                Login here
              </Link>
            </p>

            <button className="mt-4 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
              <img
                className="mr-2 h-5"
                src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                alt="Google icon"
              />
              Get started with Google
            </button>

            <div className="relative mt-4 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
                Or fill the below details
              </div>
            </div>

            <form
              className="flex flex-col items-stretch mt-2"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="flex flex-col pt-2">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your Username Name"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Password (minimum 6 characters)"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="block">
                <input
                  className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-blue-600 focus:border-blue-600 focus:shadow"
                  type="checkbox"
                  id="remember-me"
                  name="termAndConditions"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\")",
                  }}
                  checked={formData.termAndConditions}
                  value={formData.termAndConditions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.checked,
                    })
                  }
                />
                <label className="inline-block" htmlFor="remember-me">
                  I agree to the{" "}
                  <a className="underline" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
