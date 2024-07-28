
const { where } = require('sequelize');

const {Page} = require('../db/models')

//View All the Sliders
const getAllPage = async(req , res , next)=>{
    try {
        const result = await Page.findAll();
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
const createPage = async(req, res, next)=>{
    const { title,slug, content } = req.body;
    console.log('val = ', title)
    console.log('val = ', content)
    // return res.status(200).json({
    //         status: 'success',
    //         pageval : {
    //             title,
    //             content
    //         },
    //         message: 'Page created successfully',
    //         });
  try {
   
    const newPage = await Page.create({
        title ,
        slug,
        content 
    });
    if(newPage){
        return res.status(200).json({
            status: 'success',
            pageval : {
                title,
                slug,
                content
            },
            message: 'Page created successfully',
          });
    }else{
        return res.status(500).json({
                status: 'error',
                message: 'Unable to Create Page ',
                });
    }
    
  } catch (error) {
    console.error('Error creating sliders:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

//delete Page 
const deletepage = async(req , res , next)=>{
    const { id } = req.params; 
    console.log('fun called')
    try {
        const singlepage = await Page.findByPk(id);
    
        if (!singlepage) {
          return res.status(404).json({ message: 'Page not found' });
        }
       
      // Delete the slider entry from the database
      await singlepage.destroy();

      return res.status(200).json({
        status: 'success',
        message: 'Page deleted successfully',
      });

      } catch (error) {
        console.error('Error deleting page:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports = {getAllPage , createPage , deletepage}