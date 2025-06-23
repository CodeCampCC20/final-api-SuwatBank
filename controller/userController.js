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

export const editDoc = async(req,res,next)=>{
  try {
    const { username, password, specialization} = req.body
    const {id} = req.doctor.id

    console.log(id);
    const doctor = await prisma.doctor.update({
      where:{
        id : Number(id)
      },
      data:{
        username: username,
        password: password,
        specialization: specialization
      }
    })
    res.json({message: `Update Role to ${doctor.name}`})
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
        id : req.user.id
      },
      data:{
        username: username,
        password: hashPassword
      }
    })
    res.json({id: user.id, username: user.username})
  } catch (error) {
    next(error)
  }
}


