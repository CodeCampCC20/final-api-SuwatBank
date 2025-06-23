export const createError = (code, messg)=>{
  const error = new Error(messg)
    error.code = code
    throw error
};