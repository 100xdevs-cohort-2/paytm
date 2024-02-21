import zod from "zod";

const userZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
  firstname: zod.string().min(4),
  lastname: zod.string().min(4),
});

const signinZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
});

const updateZodSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

export { userZodSchema, signinZodSchema, updateZodSchema };
