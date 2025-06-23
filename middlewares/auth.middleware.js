import jwt from "jsonwebtoken";
import { createError } from "../util/createError.js";

export const authCheckDoc = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if(!header) {
      createError(401, "Token is missing")
    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (error,decode)=>{
      if(error){
        createError(401, "Token is invalid")
      }
      req.doctor = decode
      console.log(decode)
      next();
    })
  } catch (error) {
    next(error)
  }
}

export const authCheckUser = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if(!header) {
      createError(401, "Token is missing")
    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (error,decode)=>{
      if(error){
        createError(401, "Token is invalid")
      }
      req.user = decode
      next();
    })
  } catch (error) {
    next(error)
  }
}