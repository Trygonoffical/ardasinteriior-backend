
const {Product , Category , ProductInfo} = require('../db/models')

const GetAllProducts = async(req, res, next)=>{
    try {
        const products = await Product.findAll(
          {
            include: [
              {
              model: Category,
              as: 'subcategory',
              attributes: ['name'] // Fetch only the category name
            },
            {
              model: ProductInfo,
              foreignKey: 'productId' // Include all product information
            }
          ]
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


//update Product 
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    MRP,
    offerPrice,
    shortDescription,
    todaysDeal,
    yourSaving,
    tags,
    subcategoryId
  } = req.body;
  
  const mainImage = req.files['mainImage'] ? `/uploads/product/${req.files['mainImage'][0].filename}` : null;
  const addImage = req.files['addImage'] ? `/uploads/product/${req.files['addImage'][0].filename}` : null;
  const productGallery = req.files['productGallery'] ? req.files['productGallery'].map(file => `/uploads/product/${file.filename}`) : [];

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }

    // Update only the fields that are present in the request
    if (name) product.name = name;
    if (MRP) product.MRP = MRP;
    if (offerPrice) product.offerPrice = offerPrice;
    if (shortDescription) product.shortDescription = shortDescription;
    if (todaysDeal) product.todaysDeal = todaysDeal;
    if (yourSaving) product.yourSaving = yourSaving;
    if (tags) product.tags = tags;
    if (subcategoryId) product.subcategoryId = subcategoryId;

    if (mainImage) product.mainImage = mainImage;
    if (addImage) product.addImage = addImage;
    if (productGallery.length > 0) product.productGallery = productGallery;
    

    await product.save();

    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
};



const createProInfos = async(req, res, next)=>{
  const { title , content , proID} = req.body ;
  const newProduct = {
    title : title,
    content : content,
    productId : proID
  }
  try {
    // Save the product Info to the database
    const createdProduct = await ProductInfo.create(newProduct);

    if (!createdProduct) {
      return res.status(404).json({ status: 'fail', message: 'Fail to Create  Section' });
    }

    return res.status(200).json({
      status: 'success',
      data: createdProduct,
      message: 'Product created successfully',
    });

    
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
  return res.status(200).json({
    status : 'success',
    data : {
      title , content , proID
    },
    message : 'Create Product Section Successfully'
  })
}



module.exports = {GetAllProducts , createProduct , updateProduct , createProInfos }