import connectDatabase from "./database/databse.connection";
import Express from "express";
import cors from "cors";
import userRouter from "./route/users/users.route";
import dotenv from "dotenv"
import refreshTokenRouter from "./route/refresh-token/refresh-token.route";

dotenv.config();

const app = Express();

app.use(cors());
app.use(Express.json());


app.use("/api", userRouter)
app.use("/auth", refreshTokenRouter)

const startServer = async () => {

    const PORT = Number(process.env.PORT) || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        connectDatabase()
            .then(() => console.log("Database connected"))
    });

};

startServer();