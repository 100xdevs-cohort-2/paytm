import React from "react";
import { useFormik } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
	const [error, showError] = React.useState(false);
	const navigate = useNavigate();

	const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
		useFormik({
			initialValues: {
				username: "",
				password: "",
				firstName: "",
				lastName: "",
			},
			validationSchema: ValidationSchema,
			onSubmit: (values) => {
				axios({
					method: "post",
					url: "/signup",
					baseURL: "http://localhost:3000/api/v1/user",
					data: {
						...values,
					},
				})
					.then((response) => {
						if (response.statusText) {
							const { message, token } = response.data;
							const userId = message.split(" ")[0];
							localStorage.setItem("token", JSON.stringify({ token, userId}));
							navigate("/dashboard");
						}
					})
					.catch((error) => {
						if (error.response) {
							showError((currentValue) => !currentValue);
						} else if (error.request) {
							console.log(error.request);
						} else {
							console.log("Error", error.message);
						}
						console.log(error.config);
					});
			},
		});

	function navigateToLoginPage() {
		navigate("/signin");
	}

	//early return !
	if (error) {
		return (
			<div className="p-5 bg-red-500 text-white w-1/2 mx-auto mt-40 text-center rounded-md text-2xl">
				Error occured while executing the Sign up request
				<p>Please go back and redo </p>
			</div>
		);
	}
	return (
		<div className=" container mx-auto border-3 px-4 w-1/3 h-screen mt-15 mb-20 md:w-2/6">
			<div className="flex flex-col items-center py-2">
				<h1 className="text-3xl mb-2 font-bold text-green-850">Sign Up</h1>
				<p className="text-blue-900 mb-5 ">
					Enter your information to create an account
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex border-2 justify-center rounded-xl flex-col gap-2  p-5 bg-yellow-500 "
			>
				<label htmlFor="username" className="text-base">
					Email Address
				</label>
				<input
					id="username"
					name="username"
					type="email"
					onChange={handleChange}
					value={values.username}
					className="border-2  rounded-xl text-lg p-1"
					onBlur={handleBlur}
				/>
				{touched.username && errors.username && (
					<div className="text-white text-sm">{errors.username}</div>
				)}

				<label htmlFor="password" className="text-base">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={handleChange}
					value={values.password}
					className="border-2 rounded-xl text-lg p-1"
					onBlur={handleBlur}
				/>
				{touched.password && errors.password && (
					<div className="text-white text-sm">{errors.password}</div>
				)}

				<label htmlFor="firstName" className="text-base">
					First Name
				</label>
				<input
					id="firstName"
					name="firstName"
					onChange={handleChange}
					value={values.name}
					className="border-2 rounded-xl text-lg p-1"
					onBlur={handleBlur}
				/>

				{touched.firstName && errors.firstName && (
					<div className="text-white text-sm">{errors.firstName}</div>
				)}
				<label htmlFor="lastName" className="text-base">
					Last Name
				</label>
				<input
					id="lastName"
					name="lastName"
					onChange={handleChange}
					value={values.name}
					className="border-2 rounded-xl text-lg p-1"
					onBlur={handleBlur}
				/>

				{touched.lastName && errors.lastName && (
					<div className="text-white text-sm">{errors.lastName}</div>
				)}

				<button
					className="bg-red-700 hover:bg-red-900 mt-5 text-base text-white font-bold py-2 px-4 rounded-md md:py-3 md:px-6 lg:py-4 lg:px-8"
					type="submit"
				>
					Submit
				</button>

				<p className="text-mustard-100 text-center p-1 text-lg mt-2">
					Already have an account?{" "}
					<a
						onClick={navigateToLoginPage}
						className="underline hover:cursor-pointer text-white  hover:text-blue-500 "
					>
						Login
					</a>
				</p>
			</form>
		</div>
	);
}

export default SignUp;
