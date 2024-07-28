
const {Product} = require('../db/models')

const GetAllProducts = async(req, res, next)=>{
    try {
        const products = await Product.findAll();
        const data = products ? products : [];
        // if(data.length > 0) return res.status(200).json({
        //     status : 'success',
        //     message: "There is no Product in the table"
        // })
        console.log('products - ', products)
        
        return res.status(200).json({
            status : 'success',
            data : products,
            message: "Data Fetch successfully"
        })
    } catch (error) {
        console.error('Error deleting slider:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}


// create Product 
const createProduct = async(req, res, next)=>{
    const mainImage = req.files.mainImage || [];
    const productGallery = req.files.productGallery || [];
    // const links = req.body.links;
    console.log('res data = ' ,req )
      return res.status(200).json({
        status: 'success',
        message: 'Product created successfully',
      });
    // try {
    //   const linksArray = Array.isArray(links) ? links : [links];
  
    //   const createdSliders = await sequelize.transaction(async (t) => {
    //     return await Promise.all(linksArray.map(async (link, index) => {
    //       const deskfile = deskfiles[index] || null;
    //       const mobfile = mobfiles[index] || null;
  
    //       const newSlider = {
    //         WImg: deskfile ? `/uploads/Sliders/${deskfile.filename}` : null,
    //         MImg: mobfile ? `/uploads/Sliders/${mobfile.filename}` : null,
    //         link: link,
    //       };
  
    //       const slider = await Product.create(newSlider, { transaction: t });
    //       return slider;
    //     }));
    //   });
  
    //   return res.status(200).json({
    //     status: 'success',
    //     data: createdSliders,
    //     message: 'Sliders created successfully',
    //   });
    // } catch (err) {
    //   console.error('Error creating sliders:', err);
    //   return res.status(500).json({
    //     status: 'error',
    //     message: 'Internal Server Error',
    //   });
    // }
  }

module.exports = {GetAllProducts , createProduct}