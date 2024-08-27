const { z } = require("zod");

const userSignup = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});

const userLogin = z.object({
    username: z.string(),
    password: z.string()
})

const userUpdate = z.object({
    username: z.string(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    flastName: z.string().optional()
})

module.exports = {
    userSignup, 
    userLogin,
    userUpdate
}