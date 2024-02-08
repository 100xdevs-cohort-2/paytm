const zod = require("zod");
const userschema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  password: zod.string(),
});
// module.exports = {
//   userschema,
// };
