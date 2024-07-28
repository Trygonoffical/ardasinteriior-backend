

const {HomeSlider , AdBanner , Category} = require('../db/models')
/// get 

const GetAllRemote = async(req , res, next)=>{
   
    try {
        const Hsliders = await HomeSlider.findAll();
        // feaching banners data
        const adbanner = await AdBanner.findAll();
        // feaching all categoryies
        const cats  = await Category.findAll();
        const sliderval = Hsliders ? Hsliders : [];
        const adbannerval = adbanner ? adbanner : [];
        const allCategories = cats ? cats : [];


        res.status(200).json({
            status : "success",
            message: "Remote Config successfully",
            Homesliders : sliderval,
            adbans : adbannerval,
            categories : allCategories,
        })
    } catch (error) {
            console.error('Error creating sliders:', error);
            return res.status(500).json({
              status: 'error',
              message: 'Internal Server Error',
            });
        }
}



module.exports = {GetAllRemote}