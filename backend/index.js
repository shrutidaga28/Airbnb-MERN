// import express from "express"
// import dotenv from "dotenv"
// import connectDb from "./config/db.js"
// import authRouter from "./routes/auth.route.js"
// import cookieParser from "cookie-parser"
// dotenv.config()
// import cors from "cors"
// import userRouter from "./routes/user.route.js"
// import listingRouter from "./routes/listing.route.js"
// import bookingRouter from "./routes/booking.route.js"
// let port = process.env.PORT || 6000

// let app = express()
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

// app.use("/api/auth", authRouter )
// app.use("/api/user", userRouter )
// app.use("/api/listing",listingRouter )
// app.use("/api/booking",bookingRouter )


// app.listen(port,()=>{
//     connectDb()
//     console.log("server started")
// })

import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// Allow localhost only in dev
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

// ----------------------
// Serve React frontend in production
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

app.listen(port, () => {
  connectDb();
  console.log(`server started on port ${port}`);
});
