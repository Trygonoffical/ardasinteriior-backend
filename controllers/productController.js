
const {Product , Category} = require('../db/models')

const GetAllProducts = async(req, res, next)=>{
    try {
        const products = await Product.findAll(
          {
            include: [{
              model: Category,
              as: 'subcategory',
              attributes: ['name'] // Fetch only the category name
            }]
          }
        );
        const data = products ? products : [];
        // if(data.length > 0) return res.status(200).json({
        //     status : 'success',
        //     message: "There is no Product in the table"
        // })
        console.log('products - ', products)
        
        return res.status(200).json({
            status : 'success',
            data : data,
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
  const addImage = req.files.addImage || [];
  
  try {
    // Assuming you're receiving other product details in req.body
    const { name, MRP, offerPrice, shortDescription, todaysDeal, yourSaving, tags, subcategoryId } = req.body;

    // Construct paths for images
    const mainImagePath = mainImage.length > 0 ? `/uploads/Products/${mainImage[0].filename}` : null;
    const productGalleryPaths = productGallery.map(file => `/uploads/Products/${file.filename}`);
    const addImagePath = addImage.length > 0 ? `/uploads/Products/${addImage[0].filename}` : null;

    // Create a new product
    const newProduct = {
      name,
      MRP,
      offerPrice,
      shortDescription,
      todaysDeal,
      yourSaving,
      tags: Array.isArray(tags) ? tags : [tags], // Ensure tags are an array
      subcategoryId,
      mainImage: mainImagePath,
      productGallery: productGalleryPaths,
      addImage: addImagePath
    };

    // Save the product to the database
    const createdProduct = await Product.create(newProduct);

    return res.status(200).json({
      status: 'success',
      data: createdProduct,
      message: 'Product created successfully',
    });
  } catch (err) {
    console.error('Error creating product:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  }

module.exports = {GetAllProducts , createProduct}