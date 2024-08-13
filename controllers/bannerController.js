const path = require('path');
const fs = require('fs');
const {AdBanner} = require('../db/models')



// get all banners 

const getAllBanners = async(req , res, next)=>{

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
const createBanner = async(req, res, next)=>{
    // const file = req.file;
    const deskfile = req.files.deskfile || [];
    const mobfile = req.files.mobfile || [];
    const link = req.body.link;
    console.log('dekfile- ',deskfile)
    // return res.status(200).json({
    //     status: 'success',
    //     data: {file , link},
    //     message: 'Sliders created successfully',
    // })
    try {
        const newBanner = {
            WImg: deskfile ? `/uploads/adbanners/${deskfile[0].filename}` : null,
            MImg: mobfile ? `/uploads/adbanners/${mobfile[0].filename}` : null,
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


// Delete Banner
const deleteBanner = async (req, res , next) => {
  const { id } = req.params; 
  // return res.status(200).json({ message: 'Slider deleted successfully' , id : id });
  try {
    const banner = await AdBanner.findByPk(id);

    if (!banner) {
      return res.status(404).json({ message: 'banner not found' });
    }
    // Paths to the files to be deleted
  const deskImgPath = path.join(__dirname, '../public', banner.WImg);
  const mobImgPath = path.join(__dirname, '../public', banner.MImg);

  // Delete the banner entry from the database
  await banner.destroy();

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
    message: 'Banner and associated files deleted successfully',
  });

    // await slider.destroy();
    // return res.status(200).json({ status: 'success' , message: 'Slider deleted successfully' });
  } catch (error) {
    console.error('Error deleting slider:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// edit Banner 
const editBanner = async(req, res , next) => {
const { id } = req.params; 
const deskfile = req.files.deskfile;
const mobfile = req.files.mobfile;
const link = req.body.link;
try {
  const banner = await AdBanner.findByPk(id);
  if (!banner) {
    return res.status(404).json({ message: 'banner not found' });
  }

  // Paths to the old files
  const oldDeskImgPath = path.join(__dirname, '../public', banner.WImg);
  const oldMobImgPath = path.join(__dirname, '../public', banner.MImg);
  
  // If new desktop file is provided, delete the old one
  if (deskfile && deskfile.length > 0) {
    if (fs.existsSync(oldDeskImgPath)) {
      fs.unlinkSync(oldDeskImgPath);
    }
    banner.WImg = `/uploads/Sliders/${deskfile[0].filename}`; // Save the new file path to the slider record
  }

  // If new mobile file is provided, delete the old one
  if (mobfile && mobfile.length > 0) {
    if (fs.existsSync(oldMobImgPath)) {
      fs.unlinkSync(oldMobImgPath);
    }
    banner.MImg = `/uploads/Sliders/${mobfile[0].filename}`; // Save the new file path to the slider record
  }

  if (link) {
    banner.link = link; // Update the link
  }

  await banner.save(); 
  return res.status(200).json({
    status: 'success',
    data : banner,
    message: 'Banner Updated successfully',
  });
} catch (error) {
  console.error('Error deleting banner:', error);
  return res.status(500).json({ message: 'Internal Server Error' });
}
}



module.exports = {getAllBanners , createBanner , deleteBanner , editBanner};