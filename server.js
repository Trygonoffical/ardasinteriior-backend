// require('dotenv').config({path: `${process.cwd()}/.env`});
require('dotenv').config();
const path = require('path')
const express = require('express');
const cors = require('cors')
const sequelize = require('./config/db');
const allRoutes = require('./routes/index')
const app = express();

// Middleware
app.use(express.json());
app.use(cors(
  {
    origin: 'http://195.35.20.31', // replace with your frontend's URL
    credentials: true
}
//   {
//   origin: 'http://localhost:3000/', // Your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // Enable to handle cookies
// }
))
app.use(express.urlencoded({ extended: true }));
// app.use('/public', express.static('public'));

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

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