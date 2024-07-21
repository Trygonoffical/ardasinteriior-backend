
const sequelize = require('../config/db');
const HomeSlider = require('../db/models/homeslider')
const AdBanner = require('../db/models/adbanner')
//View All the Sliders
const remote = async(req , res , next)=>{
        try {
            // feaching Slider data
           const Hsliders = await HomeSlider.findAll();
           // feaching banners data
           const adbanner = await AdBanner.findAll();

           const sliderval = Hsliders ? Hsliders : [];
           const adbannerval = adbanner ? adbanner : [];
           
            return res.status(200).json({
                status: "success",
                Homesliders : sliderval,
                adbans : adbannerval,
                message: 'Remote Config successfully',    
            })
            
        } catch (error) {
            console.error('Error creating sliders:', error);
            return res.status(500).json({
              status: 'error',
              message: 'Internal Server Error',
            });
        }
    }


module.exports = {remote}