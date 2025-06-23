import {object, ref, string} from "yup";

export const registerSchema = object({
  username: string().min(3, "Name is not correct").required(),
  password: string().min(6, "Password should have at least 6 characters"),
  confirmPassword: string().oneOf([ref("password"), null], "Confirm password should match with password")
})


export const loginSchema = object({
  username: string().min(3, "Name is not correct").required(),
  password: string().min(6, "Password should have at least 6 characters")
})

export const validate = (schema) => async(req,res,next) => {
  try {
    await schema.validate(req.body, {abortEarly: false})
    next();
  } catch (error) {
    const errMsg = error.errors.map((item)=> item);
    const errTxt = errMsg.join(",")
    console.log(errTxt)
    const mergeErr = new Error(errTxt)
    next(mergeErr)
  }
}