import { config } from "dotenv";

config();

interface iEnv {
  [key: string]: String;
}

const env = process.env as iEnv;

export default env
