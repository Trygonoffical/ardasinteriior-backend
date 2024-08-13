const path = require('path');
const fs = require('fs');
const {Product , Category , ProductInfo , ProductVariant , VariantAttribute} = require('../db/models')


 // Function to delete a file if it exists
 const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};


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
            },
            {
              model: ProductVariant,
              as: 'variants',
              include: [
                {
                  model: VariantAttribute,
                  as: 'attributes'
                }
              ]
            }
          ]
          }
        );
        const data = products ? products : [];
        
        // console.log('products - ', products)
        
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


// Get Single Product All Data 
const SingleProduct = async(req, res, next)=>{
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
      include: [
        {
        model: Category,
        as: 'subcategory',
        attributes: ['name'] // Fetch only the category name
      },
      {
        model: ProductInfo,
        foreignKey: 'productId' // Include all product information
      },
      {
        model: ProductVariant,
        as: 'variants',
        include: [
          {
            model: VariantAttribute,
            as: 'attributes'
          }
        ]
      }
    ]
     });

    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
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

  const mainImage = req.files.mainImage || [];
  const productGallery = req.files.productGallery || [];
  const addImage = req.files.addImage || [];

  const newmainImage = mainImage.length > 0 ? `/uploads/Products/${mainImage[0].filename}` : null;
  const newaddImage =  addImage.length > 0 ? `/uploads/Products/${addImage[0].filename}` : null;
  const newproductGallery = productGallery.length > 0 ? productGallery.map(file => `/uploads/Products/${file.filename}`) : [];

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    const oldmainImage = product.mainImage;
    const oldproductGallery = product.productGallery;
    const oldaddImage =   product.addImage;


    // Update only the fields that are present in the request
    if (name) product.name = name;
    if (MRP) product.MRP = MRP;
    if (offerPrice) product.offerPrice = offerPrice;
    if (shortDescription) product.shortDescription = shortDescription;
    if (todaysDeal) product.todaysDeal = todaysDeal;
    if (yourSaving) product.yourSaving = yourSaving;
    if (tags) product.tags = Array.isArray(tags) ? tags : [tags];
    if (subcategoryId) product.subcategoryId = subcategoryId;

    // if (newmainImage) product.mainImage = newmainImage;
    // if (newaddImage) product.addImage = newaddImage;
    // if (newproductGallery.length > 0) product.productGallery = newproductGallery;
    
    if (newmainImage) {
      product.mainImage = newmainImage;
      if (oldmainImage) deleteFile(path.join(__dirname, '..', oldmainImage));
    }

    if (newaddImage) {
      product.addImage = newaddImage;
      if (oldaddImage) deleteFile(path.join(__dirname, '..', oldaddImage));
    }

    if (newproductGallery.length > 0) {
      product.productGallery = newproductGallery;
      if (oldproductGallery && Array.isArray(oldproductGallery)) {
        oldproductGallery.forEach(filePath => deleteFile(path.join(__dirname, '..', filePath)));
      }
    }

    await product.save();

   
  // deleteFile(oldmainImage);
  // deleteFile(oldproductGallery);
  // deleteFile(oldaddImage);

    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
};


// Create Product INfos
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

//update Product  info
const updateProductinfo = async (req, res , next) => {
  const { id } = req.params;
  const {
    title , content 
  } = req.body;
  

  try {
    const product = await ProductInfo.findByPk(id);

    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product Info not found' });
    }

    // Update only the fields that are present in the request
    if (title) product.title = title;
    if (content) product.content = content;
  
    

    await product.save();

    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error updating productinfo :', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
};
// Delete Product Info section
const deleteProductinfo = async(req , res , next)=>{
  const { id } = req.params;
  try {
    const productinfo = await ProductInfo.findByPk(id);

    if (!productinfo) {
      return res.status(404).json({ status: 'fail', message: 'Product Info not found' });
    }

    await productinfo.destroy();
    res.status(200).json({ status: 'success'});
  } catch (error) {
    console.error('Error updating productinfo:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
}

// Create Product Varients
const createProductVarient = async(req, res, next)=>{
  const mainImage = req.files.mainImage || [];
  const productGallery = req.files.productGallery || [];

  try {
    // Assuming you're receiving other product details in req.body
    const { name, MRP, offerPrice, attributename , attributeValue , productId} = req.body;

    if (!name || !MRP || !offerPrice || !productId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: name, MRP, offerPrice, or productId',
      });
    }

    // Construct paths for images
    const mainImagePath = mainImage.length > 0 ? `/uploads/Products/${mainImage[0].filename}` : null;
    const productGalleryPaths = productGallery.map(file => `/uploads/Products/${file.filename}`);
    

    // Create a new product
    const newProductVarient = {
      variantName:name,
      MRP,
      offerPrice,
      mainImage: mainImagePath,
      productGallery: productGalleryPaths,
      productId : productId,
    };

    // Save the product varient to the database
    const createdProductVarient = await ProductVariant.create(newProductVarient);
    if(!createdProductVarient) res.status(401).json({ status: 'fail', message: 'Unable to create Product Varient' });

    // create a new attribute
    const newattribute = {
      productVariantId : createdProductVarient.id,
      attributeName : attributename.toUpperCase(),
      attributeValue : attributeValue
    }
  // save the product attributes to the database
    const createdProductattribute = await VariantAttribute.create(newattribute);
    if(!createdProductattribute) res.status(401).json({ status: 'fail', message: 'Unable to create Product attribute' });


    return res.status(200).json({
      status: 'success',
      data: {
        variant: createdProductVarient,
        attribute: createdProductattribute,
      },
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
// Delete Product Varient
const deleteProductVarient = async(req , res )=>{
  const { id } = req.params;
  try {
    const provarient = await ProductVariant.findByPk(id);

    if (!provarient) {
      return res.status(404).json({ status: 'fail', message: 'Product Varient not found' });
    }
   
    if (provarient.mainImage) {
     
      if (provarient.mainImage) deleteFile(path.join(__dirname, '..', provarient.mainImage));
    }

    if (provarient.productGallery.length > 0) {
      if (provarient.productGallery && Array.isArray(provarient.productGallery)) {
        provarient.productGallery.forEach(filePath => deleteFile(path.join(__dirname, '..', filePath)));
      }
    }

    await provarient.destroy();
    res.status(200).json({ status: 'success'});
  } catch (error) {
    console.error('Error updating productinfo:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
}
module.exports = {GetAllProducts , createProduct , updateProduct , createProInfos ,updateProductinfo  , deleteProductinfo , createProductVarient , SingleProduct , deleteProductVarient}