import * as Yup from "yup";

export const ValidationSchema = Yup.object({
	username: Yup.string()
		.required("username is required")
		.email("Input a valid email address")
		.lowercase(),

	password: Yup.string().required(),
});
