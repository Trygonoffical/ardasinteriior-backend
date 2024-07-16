
const sequelize = require('../config/db');
const homeslider = require('../db/models/homeslider')

//View All the Sliders
const remote = async(req , res , next)=>{
        try {
           const Hsliders = await homeslider.findAll();
            if(Hsliders){
                return res.status(200).json({
                    status: "success",
                    Homesliders : Hsliders,
                    message: 'Remote Config successfully',    
                })
            }else {
                return res.status(200).json({
                    status: "success",
                    Homesliders : [],
                    message: 'Remote Config successfully but empty',    
                })
            }

            
        } catch (error) {
            console.error('Error creating sliders:', error);
            return res.status(500).json({
              status: 'error',
              message: 'Internal Server Error',
            });
        }
    }


module.exports = {remote}