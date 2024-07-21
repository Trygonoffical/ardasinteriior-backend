
const { where } = require('sequelize');
const sequelize = require('../config/db');
const homeslider = require('../db/models/homeslider')

//View All the Sliders
const getAllSlider = async(req , res , next)=>{
    try {
        const result = await homeslider.findAll();
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
      // Paths to the files to be deleted
    const deskImgPath = path.join(__dirname, '../public', slider.WImg);
    const mobImgPath = path.join(__dirname, '../public', slider.MImg);

    // Delete the slider entry from the database
    await slider.destroy();

    // Function to delete a file if it exists
    const deleteFile = (filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    };

    // Delete the associated files
    deleteFile(deskImgPath);
    deleteFile(mobImgPath);

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
  // const deskfiles = req.files.deskfiles ;
  // const mobfiles = req.files.mobfiles ;
  // const links = req.body.links;
  try {
    const slider = await homeslider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    return res.status(200).json({
      status: 'success',
      data : slider,
      message: 'Slider and associated files deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting slider:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {getAllSlider , createSlider , deleteSlider , editSlider}