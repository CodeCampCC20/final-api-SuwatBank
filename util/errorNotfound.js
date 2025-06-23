const notFoundError = (req,res) => {
  res.status(404).json({message: "Resource Not found"})
}

export default notFoundError