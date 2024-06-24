require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');
const cors = require('cors')
const sequelize = require('./config/db');
const allRoutes = require('./routes/index')
const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT ||  3002;

// all routes here 

app.use('/api/vi/', allRoutes);
// app.get('/', (req, res)=>{
//     res.status(200).json({
//         status : 'success' , 
//         message : "first route completed"

//     })
// })
app.use('*', (req , res , next)=>{
    res.status(404).json({
        status : 'fail',
        message: 'Not Found'
    })
})


app.listen(PORT , async()=>{
    console.log(`Server is running on port ${PORT}`);

    //database connection test 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})