const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser")
const cors = require("cors");
connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts",require("./routes/postRoutes"))
app.listen(port, () => console.log(`Server started on port ${port}`));
