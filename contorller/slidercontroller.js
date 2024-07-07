
const { where } = require('sequelize');
const sequelize = require('../config/db');
const homeslider = require('../db/models/homeslider')

//View All the Sliders
const getAllSlider = async(req , res , next)=>{
    try {
        const result = await homeslider.findAll();
        return res.status(200).json({
            status: "success",
            data: result,
            message: 'Sliders featched successfully',    
        })
    } catch (error) {
        console.error('Error creating sliders:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
    }
   
   
}

// create Slider 
const createSlider = async(req, res, next)=>{

    const files = req.files;
    const links = req.body.links;
    // console.log(files);
    // console.log(links);
    try {
        const linksArray = Array.isArray(links) ? links : [links];

        // Use a transaction to ensure all inserts succeed or fail together
        const createdSliders = await sequelize.transaction(async (t) => {
        return await Promise.all(files.map(async (file, index) => {
            const newSlider = {
            Img: `/uploads/Sliders/${file.filename}`,
            link: linksArray[index],
            };
            // console.log('newSlider' , newSlider);
            const slider = await homeslider.create(newSlider, { transaction: t });
            return slider;
        }));
        });

        return res.status(200).json({
        status: 'success',
        data: createdSliders,
        message: 'Sliders created successfully',
        });
      } catch (err) {
        console.error('Error creating sliders:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }

    // const {test} = req.body;
    // return res.status(200).json({
    //     status : 'success',
    //     message : `its working  ${test}`
    // })
}

// Delete Slider
const deleteSlider = async (req, res , next) => {
    const { id } = req.params; 
    // return res.status(200).json({ message: 'Slider deleted successfully' , id : id });
    try {
      const slider = await homeslider.findByPk(id);
  
      if (!slider) {
        return res.status(404).json({ message: 'Slider not found' });
      }
  
      await slider.destroy();
      return res.status(200).json({ status: 'success' , message: 'Slider deleted successfully' });
    } catch (error) {
      console.error('Error deleting slider:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


module.exports = {getAllSlider , createSlider , deleteSlider}