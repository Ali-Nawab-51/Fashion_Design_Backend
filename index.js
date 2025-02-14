require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db_connection');
const User = require('./models/user.model');
const cors = require('cors');
const cloudinary = require("./utils/cloudinaryConfig");
const bcrypt = require('bcrypt');
const router = require('./routers/router');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));  // Increase if needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api', router)

app.use((error, req, res, next) => {
    const message = error.message || "An error occurred";
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({ message });
})

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;