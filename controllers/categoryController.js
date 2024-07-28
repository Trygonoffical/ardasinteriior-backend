
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

module.exports = {getAllCategory , createCategory };