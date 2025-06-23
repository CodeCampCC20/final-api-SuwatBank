import prisma from "../config/prisma.js";

export const addHealthRecord = async(req, res, next) => {
  try {
    const {type, value} = req.body
    
    const result = await prisma.healthRecord.create({
      data:{
        type: type,
        value: value,
        userId: await prisma.user.id
      }
    })
    res.json({
      message: `Create Health record complete`
    })
  } catch (error) {
    next(error)
  }
}

export const deleteHealthRecordId = async(req, res, next) => {
  try {
    const {id} = req.params;
    const healthDoc = await prisma.healthRecord.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({message: "Delete Success"})
  } catch (error) {
    next(error)
  }
}


export const addDocRecord = async(req, res, next) => {
  try {
    const {userId, note} = req.body
    
    const result = await prisma.doctorNote.create({
      data:{
        userId: userId,
        note: note
      }
    })
    res.json({
      message: `Create Doc note complete`
    })
  } catch (error) {
    next(error)
  }
}

export const deleteDocRecordId = async(req, res, next) => {
  try {
    const {id} = req.params;
    const docNote = await prisma.doctorNote.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({message: "Delete Success"})
  } catch (error) {
    next(error)
  }
}