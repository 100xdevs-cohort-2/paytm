import * as Yup from "yup";

export const ValidationSchema = Yup.object({
	username: Yup.string()
		.required("Required")
		.email("provide a valid email address")
		.lowercase()
		.trim(),

	password: Yup.string()
		.min(6, "password should be minimum 6 characters in length")
		.required("Required"),

	firstName: Yup.string()
		.max(20, "Must be 20 characters or less")
		.min(2, "required minimum two characters in length")
		.required("Required"),
	lastName: Yup.string()
		.max(20, "Must be 20 characters or less")
		.min(2, "required minimum two characters in length")
		.required("Required"),
});
