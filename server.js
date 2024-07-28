const express = require('express')
require('dotenv').config();
const app = express();
const path = require('path')
const cors = require('cors')
const sequelize = require('./config/db')
const PORT = process.env.PORT || 5002;
const allRoutes = require('./routes/index')

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000', // replace with your frontend's URL
        credentials: true   
    }
));
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

//all routes 
app.use('/api/vi/', allRoutes);

app.use('*', (req , res , next)=>{
    res.status(404).json({
        status : 'fail',
        message: 'Not Found'
    })
})

app.listen(PORT , async()=>{
    console.log(`server is live on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})
