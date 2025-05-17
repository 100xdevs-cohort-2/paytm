import { Router } from "express";
import validate from "../middlewares/validations";
import ProfileValidation from "../validations/profileValidation";
import ProfileController from "../controllers/profileController";
import getUserfromAuthToken from "../middlewares/jwtfromUser";


const profileRouter=Router();

profileRouter.put('/',getUserfromAuthToken,validate(ProfileValidation.updateProfile),ProfileController.updateProfile)

export default profileRouter;