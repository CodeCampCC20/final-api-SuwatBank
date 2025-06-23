import prisma from "../config/prisma.js"
import { createError } from "../util/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// Doc Regist
export const registerDoc = async(req, res, next) => {
  try {
    const {username, password, specialization} = req.body
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username
      }
    });
    if(doctor){
      createError(400, "This user name already exist")
    }
    
    const hashPassword = bcrypt.hashSync(password, 10);
    
    // const checkPassword = bcrypt.compareSync(confirmpassword, hashPassword)
    // if(!checkPassword){
    //   createError(400, "Password is not match")
    // }
    // console.log(username)
    // console.log(password)
    // console.log(specialization)
    
    const result = await prisma.doctor.create({
      data:{
        username: username,
        password: hashPassword,
        specialization: specialization
      }
    })
    res.json({message: `Register ${result.username} complete`})
  } catch (error) {
    next(error)
  }
}

// Doctor Login
export const loginDoc = async(req, res, next) => {
  try {
    const {username, password} = req.body
    const doctor = await prisma.doctor.findFirst({
      where:{
        username: username
      }
    })
    console.log(doctor)
    if(!doctor){
      createError(400, "Username or password is invalid")
    }
    const checkPassword = bcrypt.compareSync(password, doctor.password)
    if(!checkPassword){
      createError(400, "Username or password is invalid")
    }

    const payload = {
      username: doctor.username,
      specialization: doctor.specialization
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})
    res.json({
      message: `Welcome back ${doctor.username}`,
      specialization: doctor.specialization,
      accessToken: token
    })

  } catch (error) {
    next(error)
  }
}

// USER Regist
export const registerUser = async(req, res, next) => {
  try {
    const {username, password} = req.body
    const patient = await prisma.user.findFirst({
      where: {
        username: username
      }
    });
    if(patient){
      createError(400, "This user name already exist")
    }
    
    const hashPassword = bcrypt.hashSync(password, 10);
    
    const result = await prisma.user.create({
      data:{
        username: username,
        password: hashPassword,
      }
    })
    res.json({
      message: `Register ${result.username} complete`
    })
  } catch (error) {
    next(error)
  }
}


// User Login
export const loginUser = async(req, res, next) => {
  try {
    const {username, password} = req.body
    const patient = await prisma.user.findFirst({
      where:{
        username: username
      }
    })
    // console.log(patient)
    if(!patient){
      createError(400, "Username or password is invalid")
    }
    const checkPassword = bcrypt.compareSync(password, patient.password)
    if(!checkPassword){
      createError(400, "Username or password is invalid")
    }

    const payload = {
      username: patient.username
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})
    res.json({
      message: `Welcome back ${patient.username}`,
      accessToken: token
    })

  } catch (error) {
    next(error)
  }
}