import express from "express";
import dotenv from "dotenv";
import {connectDb} from "./src/config/database.js";
import authRoutes from "./src/routes/auth.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3500;

dotenv.config();


connectDb();
app.use(express.json());
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());


app.get("/" , (req,res)=>{
    res.send("API is running...");
});

app.use('/api/auth', authRoutes);

app.listen(PORT , ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})
