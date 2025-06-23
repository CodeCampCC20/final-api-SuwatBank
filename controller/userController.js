import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

export const docProfile = async(req, res, next) => {
  try {
    const docInfo = await prisma.doctor.findFirst({
      omit:{
        password: true
      }    
    })
    console.log(docInfo)
    res.json({
      id: docInfo.id,
      username: docInfo.username,
      specialization: docInfo.specialization
    })
  } catch (error) {
    next(error)
  }
}

export const updateDoc = async(req,res,next)=>{
  try {
    const { username, password, specialization} = req.body
    const {id} = req.params
    const hashPassword = bcrypt.hashSync(password,10)
    console.log(id);
    const doctor = await prisma.doctor.update({
      where:{
        id : Number(id)
      },
      data:{
        username: username,
        password: hashPassword,
        specialization: specialization
      }
    })
    res.json({message: `Update Doc profile`})
  } catch (error) {
    next(error)
  }
}


export const userProfile = async(req, res, next) => {
  try {
    const userInfo = await prisma.user.findFirst({
      omit:{
        password: true
      }    
    })
    console.log(docInfo)
    res.json({
      id: userInfo.id,
      username: userInfo.username,
      specialization: userInfo.specialization
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async(req,res,next)=>{
  try {
    const {id} = req.params;
    const {username, password} = req.body;
    const hashPassword = bcrypt.hashSync(password,10)
    const user = await prisma.user.update({
      where:{
        id : Number(id)
      },
      data:{
        username: username,
        password: hashPassword
      }
    })
    res.json({id: user.id, username: user.username})
    console.log(username, password)
  } catch (error) {
    next(error)
  }
}


