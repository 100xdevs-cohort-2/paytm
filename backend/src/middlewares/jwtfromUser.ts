import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../Ienv";
import IRequest from "./IRequest";

const getUserfromAuthToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization")
    const authToken=authHeader?.replace("Bearer ", "");
    if (!authToken) {
      res.status(400).json({
        message: "Authorization token is required"
      });
      return;
    }
    const JWT_Password = env.JWT_Password as string;
    const decode = jwt.verify(authToken, JWT_Password);
    if (decode) {
      if (typeof decode === "string") {
        res.status(411).json({
          message: "Invalide token"
        });
      }
      req.userId = (decode as JwtPayload).userID as string;
      console.log(req.userId)
      next();
    } else {
      res.status(400).json({
        message: "You are authorized "
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        message: e.message
      });
      console.error(e.message);
    } else {
      res.status(500).json({
        message: "Unexpected error has occurred"
      });
    }
  }
};

export default getUserfromAuthToken;
