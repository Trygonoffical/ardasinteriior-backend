const sequelize = require('../config/db');
const AdBanner = require('../db/models/adbanner')



// get all banners 

const getAllbanners = async(req , res, next)=>{

    try {
        const ban = await AdBanner.findAll();
        const bandata = ban ? ban : [];
        if(bandata.length > 0){
            return res.status(200).json({
                status : 'success',
                data: bandata,
                message: "data featched sucessfully"
            })
        }else{
            return res.status(200).json({
                status : 'success',
                data: bandata,
                message: "featched sucessfully"
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


// create banner 
const createbanner = async(req, res, next)=>{
    const file = req.file;
    const link = req.body.link;

    // return res.status(200).json({
    //     status: 'success',
    //     data: {file , link},
    //     message: 'Sliders created successfully',
    // })
    try {
        const newBanner = {
            Img: file ? `/uploads/adbanners/${file.filename}` : null,
            link: link,
            section: 'Home'
          };
  
      const createbanner = await AdBanner.create(newBanner);
  
      return res.status(200).json({
        status: 'success',
        data: createbanner,
        message: 'Sliders created successfully',
      });
    } catch (err) {
      console.error('Error creating sliders:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

module.exports = {getAllbanners , createbanner};