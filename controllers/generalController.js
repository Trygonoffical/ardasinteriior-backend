
const { Op } = require('sequelize');
const {HomeSlider , AdBanner , Category , Product , ProductInfo, TabProduct  , ProductVariant , VariantAttribute , BusinessInfo , TopBar , Popup, HomeCat , MenuCat , About , Submenu} = require('../db/models')
/// get 

const GetAllRemote = async(req , res, next)=>{
   
    try {
        const Hsliders = await HomeSlider.findAll();
        // feaching banners data
        const adbanner = await AdBanner.findAll();
        // feaching all categoryies
        const cats  = await Category.findAll({
          include: {
            model: Category,
            as: 'subcategories',
            include: {
              model: Category,
              as: 'subcategories'
            }
          }
        });
        // featching all homeTags
        const TabData = await TabProduct.findAll()
        // const alltabsdata = TabProducts ? TabProducts : [];
        let homeTabsData = {};
        // fetching BusinessInfo data 
        const compnaydata = await BusinessInfo.findByPk(1)
        // fetching top head data
        const topHeadData = await TopBar.findByPk(1)
        // fetching Popup data
        const popUpData = await Popup.findByPk(1)
        // fetching homeTop Categories 
        const homeCats = await HomeCat.findByPk(1);
        // fetching Menu Datas
        const homeMenus = await MenuCat.findAll({
          include: [
            {
            model: Submenu,
            as: 'submenus',
            attributes: ['catIds']
            // Fetch only the category name catIds
          },
        ]
        });
        // fetching 
      // about page data 
      const aboutData = await About.findByPk(1);


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
        const compData = compnaydata ? compnaydata : [];
        const topData = topHeadData ? topHeadData : [];
        const popData = popUpData ? popUpData : [];
        const homecatsval =  homeCats ? homeCats.cats : []
        const homeMenu = homeMenus ? homeMenus : [];
        const about = aboutData ? aboutData : {}
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
            HomeTabs: homeTabsData,
            companyData : compData,
            topHeadData: topHeadData,
            popUpData: popUpData,
            homecatsval : homecatsval,
            homeMenu : homeMenu,
            about : about
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
        attributes: ['name' , 'slug'] // Fetch only the category name
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


const getSingleCategory = async(req , res, next)=>{
  const {name} = req.body ;
  try {
    const cat = await Category.findOne({
      where: { slug :  name },
      include: [
        {
        model: Category,
        as: 'subcategories',
        // attributes: ['name'] // Fetch only the category name
      },
      {
        model: Product,
        as: 'products',
        // Include any specific attributes you need for the products here
      }
    ]
    })
    if(!cat) return res.status(404).json({status: 'fail' , message: 'Category Not Found!'})
    return res.status(200).json({
      status :  'success',
      data: cat,
      message: 'Category fetch successfully',
    })
  } catch (error) {
    console.error('Error fetching Category:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

const GetAllProducts = async(req ,res ,next)=>{
  try {
    const product = await Product.findAll({
      include: [
        {
        model: Category,
        as: 'subcategory',
        attributes: ['name'] // Fetch only the category name
      },
      
    ]
    });
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
}
module.exports = {GetAllRemote , SingleProduct , GetLatestProductsByCategory , getSingleCategory , GetAllProducts}