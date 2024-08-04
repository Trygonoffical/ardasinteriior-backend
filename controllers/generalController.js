
const { Op } = require('sequelize');
const {HomeSlider , AdBanner , Category , Product , ProductInfo, TabProduct} = require('../db/models')
/// get 

const GetAllRemote = async(req , res, next)=>{
   
    try {
        const Hsliders = await HomeSlider.findAll();
        // feaching banners data
        const adbanner = await AdBanner.findAll();
        // feaching all categoryies
        const cats  = await Category.findAll();
        // featching all homeTags
        const TabData = await TabProduct.findAll()
        // const alltabsdata = TabProducts ? TabProducts : [];
        let homeTabsData = {};

      if (TabData) {
        for (const tab of TabData) {
          const productsWithTag = await Product.findAll({
            where: {
              tags: {
                [Op.contains]: [tab.TagName] // Assuming `tagName` is the field in TabProduct that contains the tag
              }
            }
          });
          homeTabsData[tab.title] = productsWithTag;
        }
      }
        
        const sliderval = Hsliders ? Hsliders : [];
        const adbannerval = adbanner ? adbanner : [];
        const allCategories = cats ? cats : [];
        
        const featPros = await Product.findAll({
            where: {
                tags: {
                  [Op.contains]: ['Feature']
                }
              }
        })
        const homeFeatureProducts = featPros ? featPros : [];
        res.status(200).json({
            status : "success",
            message: "Remote Config successfully",
            Homesliders : sliderval,
            adbans : adbannerval,
            categories : allCategories,
            featureProducts : homeFeatureProducts,
            HomeTabs: homeTabsData
        })
    } catch (error) {
            console.error('Error creating sliders:', error);
            return res.status(500).json({
              status: 'error',
              message: 'Internal Server Error',
            });
        }
}

const SingleProduct = async(req, res, next)=>{
  const {
    name
  } = req.body;
  try {
    const product = await Product.findOne({
      where: { name },
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


const GetLatestProductsByCategory = async (req, res, next) => {
  const { category } = req.query; // Assuming category is sent as a query parameter

  try {
    const products = await Product.findAll({
      where: {
        subcategoryId: category,
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    const data = products ? products : [];
    res.status(200).json({
      status: "success",
      message: "Latest products fetched successfully",
      data : data,
    });
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

module.exports = {GetAllRemote , SingleProduct , GetLatestProductsByCategory}