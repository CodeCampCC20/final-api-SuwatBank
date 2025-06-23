import express from "express"
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js"
import error from "./util/error.js";
import notFoundError from "./util/errorNotfound.js";

const app = express();
const PORT = 8000;

app.use(express.json())
app.use(morgan("dev"))

// app.get("/", (req, res) => {
//   res.json({message: "test run server"})
// })

app.use("/auth", authRouter);
app.use("/doctors", userRouter);

app.use(error);
app.use(notFoundError);

app.listen(8000, () => console.log(`Server run at port ${PORT}`));

