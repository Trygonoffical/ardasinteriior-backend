const path = require('path');
const fs = require('fs');
const { Category } = require('../db/models');

// get all Category 

const getAllCategory = async(req , res, next)=>{
    try {
        const ban = await Category.findAll({
          include: {
            model: Category,
            as: 'subcategories',
            include: {
              model: Category,
              as: 'subcategories'
            }
          }
        });
        const cat = ban ? ban : [];
        if(cat.length > 0){
            return res.status(200).json({
                status : 'success',
                data: cat,
                message: "data featched sucessfully"
            })
        }else{
            return res.status(200).json({
                status : 'success',
                data: cat,
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


// create Category 
const createCategory = async(req, res, next)=>{
    const file = req.file;
    const name = req.body.name;
    const slug = req.body.slug;
    const partID = req.body.catID ? parseInt(req.body.catID, 10) : null;
    try {
        const newcat = {
            Img: file ? `/uploads/category/${file.filename}` : null,
            name: name,
            slug: slug,
            parentId: partID 
          };
  
      const createCat = await Category.create(newcat);
  
      return res.status(200).json({
        status: 'success',
        data: createCat,
        message: 'Category created successfully',
      });
    } catch (err) {
      console.error('Error creating Category:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

// // create SubCategory 
// const createSubCategory = async(req, res, next)=>{
//   const file = req.file;
//   const name = req.body.name;
//   const slug = req.body.slug;
//   const catId = req.body.catID;

//   try {
//       const newcat = {
//           Img: file ? `/uploads/category/${file.filename}` : null,
//           catName: name,
//           slug: slug,
//           parentId: catId
//         };

//     const createCat = await Category.create(newcat);

//     return res.status(200).json({
//       status: 'success',
//       data: createCat,
//       message: 'Category created successfully',
//     });
//   } catch (err) {
//     console.error('Error creating Category:', err);
//     return res.status(500).json({
//       status: 'error',
//       message: 'Internal Server Error',
//     });
//   }
// }


// delete Category 
const deleteCategory = async(req, res, next)=>{
  const { id} = req.params ;    
  
  try {

    const singleCat = await Category.findByPk(id);

    if(!singleCat) res.status(404).json({status : 'Fail', message: "Category Not Found"})

      let  CatImgPath;
  
      // Paths to the files to be deleted
      if(singleCat.Img){
        CatImgPath = path.join(__dirname, '../public', singleCat.Img);
      }
      

    // Delete the slider entry from the database
    await singleCat.destroy();

    // Function to delete a file if it exists
    const deleteFile = (filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    };

    // Delete the associated files
    if(CatImgPath){
      deleteFile(CatImgPath);
    }
    
    return res.status(200).json({
      status: 'success',
      data: singleCat,
      message: 'Category Deleted successfully',
    });
  } catch (err) {
    console.error('Error creating Category:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}


// Update Category 
const updateCategory = async(req, res, next)=>{
  const { id} = req.params ;    
  // console.log('res body - ', req.body)
  try {

    const singleCat = await Category.findByPk(id);

    if(!singleCat) res.status(404).json({status : 'Fail', message: "Category Not Found"})

      const file = req.file;
      const name = req.body.name;
      const slug = req.body.slug;
      const partID = req.body.catID ? parseInt(req.body.catID, 10) : null;


    // Paths to the old files
    const oldImgPath = path.join(__dirname, '../public', singleCat.Img);

    if (file ) {
      if (fs.existsSync(oldImgPath)) {
        fs.unlinkSync(oldImgPath);
      }
      singleCat.Img = `/uploads/category/${file.filename}`; // Save the new file path to the slider record
    }

    // Update other fields
    // if(name){
    //   singleCat.name = name;;
    //   singleCat.slug = slug
    // }
    // if(partID){
    //   singleCat.parentId = partID
    // }

    singleCat.name = name || singleCat.name;
    singleCat.slug = slug || singleCat.slug;
    singleCat.parentId = partID !== null ? partID : singleCat.parentId;


    // Save entry from the database
    await singleCat.save(); 

    return res.status(200).json({
      status: 'success',
      data: singleCat,
      message: 'Category Updated successfully',
    });
  } catch (err) {
    console.error('Error creating Category:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}



module.exports = {getAllCategory , createCategory , deleteCategory , updateCategory};