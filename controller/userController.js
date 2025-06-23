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