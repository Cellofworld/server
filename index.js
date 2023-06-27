require('dotenv').config();

const express = require('express')
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./error/ApiError');


const PORT = process.env.PORT || 6000;


const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_API_URL
}))

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'storage')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT , () => console.log(`server start on Port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

start()