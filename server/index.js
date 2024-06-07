const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001; 

const db = require("./models");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'https://psych-dissertation-matching-production.up.railway.app', 
  credentials: true,
}));


const usersRouter = require("./routes/Users");
app.use("/", usersRouter);

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const meetingRouter = require("./routes/Meeting");
app.use("/meetings", meetingRouter);

const rankRouter = require("./routes/Ranks");
app.use("/rank", rankRouter);

const matchesRouter = require("./routes/Matches");
app.use("/matches", matchesRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter);

db.sequelize.sync().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });
});
