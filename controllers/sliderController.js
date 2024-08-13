const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');
const sequelize = require('../config/db');
const {HomeSlider , TabProduct} = require('../db/models')

//View All the Sliders
const getAllSlider = async(req , res , next)=>{
    try {
        const result = await HomeSlider.findAll();
        if(result){
          return res.status(200).json({
            status: "success",
            data: result,
            message: 'Sliders featched successfully',    
        })
        }
        return res.status(200).json({
            status: "success",
            data: [],
            message: 'No data in Sliders',    
        })
    } catch (error) {
        console.error('Error creating sliders:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
    }
}

// create Slider 
const createSlider = async(req, res, next)=>{
  const deskfiles = req.files.deskfiles || [];
  const mobfiles = req.files.mobfiles || [];
  const links = req.body.links;
  console.log('res data = ' ,req )
  try {
    const linksArray = Array.isArray(links) ? links : [links];

    const createdSliders = await sequelize.transaction(async (t) => {
      return await Promise.all(linksArray.map(async (link, index) => {
        const deskfile = deskfiles[index] || null;
        const mobfile = mobfiles[index] || null;

        const newSlider = {
          WImg: deskfile ? `/uploads/Sliders/${deskfile.filename}` : null,
          MImg: mobfile ? `/uploads/Sliders/${mobfile.filename}` : null,
          link: link,
        };

        const slider = await HomeSlider.create(newSlider, { transaction: t });
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
}

// Delete Slider
const deleteSlider = async (req, res , next) => {
    const { id } = req.params; 
    // return res.status(200).json({ message: 'Slider deleted successfully' , id : id });
    try {
      const slider = await HomeSlider.findByPk(id);
  
      if (!slider) {
        return res.status(404).json({ message: 'Slider not found' });
      }
      let  deskImgPath;
      let mobImgPath ;
      // Paths to the files to be deleted
      if(slider.WImg){
        deskImgPath = path.join(__dirname, '../public', slider.WImg);
      }
      if(slider.MImg){
         mobImgPath = path.join(__dirname, '../public', slider.MImg);
      }

    // Delete the slider entry from the database
    await slider.destroy();

    // Function to delete a file if it exists
    const deleteFile = (filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    };

    // Delete the associated files
    if(deskImgPath){
      deleteFile(deskImgPath);
    }
    if(mobImgPath){
      deleteFile(mobImgPath);
    }
    

    return res.status(200).json({
      status: 'success',
      message: 'Slider and associated files deleted successfully',
    });
  
      // await slider.destroy();
      // return res.status(200).json({ status: 'success' , message: 'Slider deleted successfully' });
    } catch (error) {
      console.error('Error deleting slider:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


// edit Slider 
const editSlider = async(req, res , next) => {
  const { id } = req.params; 
  const deskfiles = req.files.deskfiles ;
  const mobfiles = req.files.mobfiles ;
  const link = req.body.link;
  try {
    const slider = await HomeSlider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    // Paths to the old files
    const oldDeskImgPath = path.join(__dirname, '../public', slider.WImg);
    const oldMobImgPath = path.join(__dirname, '../public', slider.MImg);
    
    // If new desktop file is provided, delete the old one
    if (deskfiles && deskfiles.length > 0) {
      if (fs.existsSync(oldDeskImgPath)) {
        fs.unlinkSync(oldDeskImgPath);
      }
      slider.WImg = `/uploads/Sliders/${deskfiles[0].filename}`; // Save the new file path to the slider record
    }

    // If new mobile file is provided, delete the old one
    if (mobfiles && mobfiles.length > 0) {
      if (fs.existsSync(oldMobImgPath)) {
        fs.unlinkSync(oldMobImgPath);
      }
      slider.MImg = `/uploads/Sliders/${mobfiles[0].filename}`; // Save the new file path to the slider record
    }

    if (link) {
      slider.link = link; // Update the link
    }

    await slider.save(); 
    return res.status(200).json({
      status: 'success',
      data : slider,
      message: 'Slider Updated successfully',
    });
  } catch (error) {
    console.error('Error deleting slider:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
// create Tags 
const createTags = async(req, res, next)=>{
  const {title , tagName } = req.body;
  const newData = {
    title : title , 
    TagName : tagName
  }
  try {
    const cerateTags = await TabProduct.create(newData)
    return res.status(200).json({
      status: 'success',
      data : cerateTags,
      message: 'Tabs created successfully',
    })
  } catch (error) {
    console.error('Error deleting tabs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}


// get all Tabs 
const GetAllTabs = async(req, res, next)=>{
 
  try {
    const TabProducts = await TabProduct.findAll()
    const allData = TabProducts ? TabProducts : [] ;
    return res.status(200).json({
      status: 'success',
      data : allData,
      message: 'Tabs created successfully',
    })
  } catch (error) {
    console.error('Error deleting tabs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}

module.exports = {getAllSlider , createSlider , deleteSlider , editSlider , createTags , GetAllTabs}