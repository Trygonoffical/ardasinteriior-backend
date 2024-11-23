
const { where } = require('sequelize');
const crypto = require('crypto');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {Page , BusinessInfo , TopBar, Popup , User , HomeCat , MenuCat , About, Submenu , Location , Coupon , Order} = require('../db/models');
const submenu = require('../db/models/submenu');
const { count } = require('console');

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



// update Social Links 
const updateSocialLinks = async(req , res , next)=>{
  const {
    fb,insta,twitter,linkdin,youtube
  } = req.body;

  // Check if any of the required fields are empty
  if (!fb || !insta || !twitter || !linkdin || !youtube) {
    return res.status(400).json({
      status: 'error',
      message: 'All social links must be provided',
    });
  }


  try {
    const businessdata = await BusinessInfo.findByPk(1)
    if(businessdata){
      businessdata.facebook = fb;
      businessdata.insta = insta;
      businessdata.twitter = twitter;
      businessdata.youtube = youtube;
      businessdata.linkdin = linkdin;

      await businessdata.save();
      return res.status(200).json({
        status: 'success',
        message: 'Social Links Updated Successfully',
        pageval: {
          facebook: fb,
          insta,
          twitter,
          linkdin,
          youtube,
        },
      });

    }else{
      const newupdate = await BusinessInfo.create({
        facebook: fb,
        insta,
        twitter,
        linkdin,
        youtube
      });
      if(newupdate){
        return res.status(200).json({
            status: 'success',
            pageval : {
              facebook: fb ,
              insta,
              twitter,
              linkdin,
              youtube
            },
            message: 'Social Links Update Successfully',
          });
    }else{
        return res.status(500).json({
              status: 'error',
              message: 'Unable to Update Social Links',
              });
    }
    }
   }
     catch (error) {
    console.error('Error creating Social Links:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }

}


// update top bar 
const updateTopHead = async(req, res, next)=>{
  const {content, btnName, link } = req.body;

  // Check if any of the required fields are empty
  if (!content || !btnName || !link ) {
    return res.status(400).json({
      status: 'error',
      message: 'All data with links must be provided',
    });
  }
  try {
    const topBar = await TopBar.findByPk(1)
    if(topBar){
      topBar.content = content;
      topBar.btntext = btnName;
      topBar.link = link;
    

      await businessdata.save();
      return res.status(200).json({
        status: 'success',
        message: 'Top Head Updated Successfully',
        tophead: {
          content :content,
          btntext:btnName,
          link :link,
        },
      });

    }else{
      const newupdate = await TopBar.create({
        content :content,
        btntext:btnName,
        link :link,
      });
      if(newupdate){
        return res.status(200).json({
            status: 'success',
            tophead : {
              content :content,
              btntext:btnName,
              link :link,
            },
            message: 'Top Head Update Successfully',
          });
    }else{
        return res.status(500).json({
              status: 'error',
              message: 'Unable to Update Top Head',
              });
    }
    }
   }
     catch (error) {
    console.error('Error creating Top Head:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }

}

// update company info

const updateCompanyInfo = async(req , res , next)=>{
  const {
    compyName,compAddress,phone,email,gst
  } = req.body;
  const file = req.file;
  // Check if any of the required fields are empty
  if (!compyName || !compAddress || !phone || !email || !gst) {
    return res.status(400).json({
      status: 'error',
      message: 'All Filed must be provided',
    });
  }
  try {
    const newData = {
      logo: file ? `/uploads/companylogo/${file.filename}` : null,
      companyName: compyName,
      email: email,
      address: compAddress ,
      phone: phone ,
      GST: gst ,
    };

  // const createCat = await BusinessInfo.create(newcat);


    const businessdata = await BusinessInfo.findByPk(1)
    if(businessdata){
      businessdata.companyName = newData.companyName;
      businessdata.email = newData.email;
      businessdata.address = newData.address;
      businessdata.phone = newData.phone;
      businessdata.GST = newData.GST;
      businessdata.logo = newData.logo;

      await businessdata.save();
      return res.status(200).json({
        status: 'success',
        message: 'Company Details Updated Successfully',
        pageval: {
          companyName: newData.companyName,
          email: newData.email,
          address: newData.address,
          phone: newData.phone,
          GST: newData.GST,
          logo: newData.logo,
        },
      });

    }else{
      const newupdate = await BusinessInfo.create(newData);
      if(newupdate){
        return res.status(200).json({
            status: 'success',
            pageval : {
              companyName: newData.companyName,
              email: newData.email,
              address: newData.address,
              phone: newData.phone,
              GST: newData.GST,
              logo: newData.logo,
            },
            message: 'Company Info Update Successfully',
          });
    }else{
        return res.status(500).json({
              status: 'error',
              message: 'Unable to Update Company Info',
              });
    }
    }
   }
     catch (error) {
    console.error('Error creating Company Info:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }

}

// update popup data
const updatePopup = async(req , res , next)=>{
  const file = req.file;
  const Link = req.body.link;

  if(!Link){
    const popup = await Popup.findByPk(1)
    if(popup){
      popup.Img = null ;
      popup.Link = null;
      await popup.save();

      return res.status(200).json({
        status: 'success',
        message: 'Popup Deleted Successfully',
      });
    }
  }
  try {
    const newData = {
      Img: file ? `/uploads/popup/${file.filename}` : null,
      Link: Link,
    };

  // const createCat = await BusinessInfo.create(newcat);


    const popup = await Popup.findByPk(1)
    if(popup){
      popup.Img = newData.Img;
      popup.Link = newData.Link;


      await popup.save();
      return res.status(200).json({
        status: 'success',
        message: 'Popup Updated Successfully',
        pageval: {
          Img: newData.Img,
          Link: newData.Link,
        },
      });

    }else{
      const newupdate = await Popup.create(newData);
      if(newupdate){
        return res.status(200).json({
            status: 'success',
            pageval : {
              Img: newData.Img,
              Link: newData.Link,
            },
            message: 'Popup Update Successfully',
          });
    }else{
        return res.status(500).json({
              status: 'error',
              message: 'Unable to Update Popup',
              });
    }
    }
   }
     catch (error) {
    console.error('Error creating Popup:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }


}

// update user info
const updateProfile =async(req , res , next)=>{
  const {name , lname , email, gst} = req.body;
  try {
    const customer = req.user;
    
    // Optional: Add input validation and sanitization here
    if (email) {
      // Check if the email is already taken by another user
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== customer.id) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is already taken by another user',
        });
      }
      customer.email = email;
    }
  if(name) customer.firstName = name;
  if(lname) customer.lastName = lname;
  // if(email) customer.email = email;
  if(gst) customer.GST = gst;

  await customer.save();

  const newResult = customer.toJSON();
  delete newResult.password;
  delete newResult.deletedAt;
  delete newResult.userType;

  return res.status(200).json({
    status : 'success',
    userinfo : newResult,
    message: 'User has been updated'
  })
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  
}

// update Home Categories data 
const updateHomeCategories = async (req, res, next) => {
  const { cats } = req.body; // Extract the category IDs from the request body

  try {
    // Assuming you want to update a specific record by its ID
    

    // Find the home category record by its ID
    const homeCategory = await HomeCat.findByPk(1);

    if (!homeCategory) {
        const newhomeCats = await HomeCat.create({cats})
      if(!newhomeCats){
        return res.status(404).json({
          status: 'error',
          message: 'Home category not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Home categories updated successfully',
        data: newhomeCats,
      });      
    }

    // Update the categories
    homeCategory.cats = cats;

    // Save the updated record
    await homeCategory.save();

    return res.status(200).json({
      status: 'success',
      message: 'Home categories updated successfully',
      data: homeCategory,
    });
  } catch (error) {
    console.error('Error updating home categories:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};


// Fetch the updated Home Categories data
const getHomeCategories = async (req, res, next) => {
  try {
    const homeCategory = await HomeCat.findByPk(1); // Fetch the record with ID 1

    if (!homeCategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Home category not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: homeCategory,
    });
  } catch (error) {
    console.error('Error fetching home categories:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};


// Home Menu 

const updateHomeMenu = async(req , res, next)=>{
  const {names} = req.body;

  if (!names || !Array.isArray(names)) {
    return res.status(400).json({ error: 'Invalid data format. Expected an array of names.' });
  }

  try {
    // const createdMenus = await Promise.all(
    //   names.map(async (name) => {
    //     return await MenuCat.create({ name });
    //   })
    // );
    // Fetch all existing menu categories from the database
    const existingMenus = await MenuCat.findAll();
    const existingMenuNames = existingMenus.map((menu) => menu.name);

    // Determine which menus need to be created, retained, and deleted
    const menusToCreate = names.filter((name) => !existingMenuNames.includes(name));
    const menusToDelete = existingMenus.filter((menu) => !names.includes(menu.name));

    // Delete menus that are not in the provided names
    await Promise.all(
      menusToDelete.map(async (menu) => {
        await menu.destroy();
      })
    );

    // Create new menus that are not already in the database
    const createdMenus = await Promise.all(
      menusToCreate.map(async (name) => {
        return await MenuCat.create({ name });
      })
    );

    return res.status(201).json({
      status: 'success',
      message: `${createdMenus.length} menu categories created successfully`,
      data: createdMenus,
    });
  } catch (error) {
    console.error('Error creating menu categories:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating menu categories',
      error: error.message,
    });
  }
}
// Update Submenu
const updateSubMenu = async (req, res, next) => {
  const { menuId, categoryIds } = req.body;

  if (!menuId || !Array.isArray(categoryIds)) {
    return res.status(400).json({ error: 'Invalid data format.' });
  }

  try {
    // Find the existing submenu by menuId
    const existingSubMenu = await Submenu.findOne({ where: { menuId } });

    if (existingSubMenu) {
      // If submenu exists, check if categoryIds are different
      const existingCatIds = existingSubMenu.catIds || [];
      const isDifferent = JSON.stringify(existingCatIds.sort()) !== JSON.stringify(categoryIds.sort());

      if (isDifferent) {
        // Update the catIds if they are different
        existingSubMenu.catIds = categoryIds;
        await existingSubMenu.save();
        return res.status(200).json({
          status: 'success',
          message: 'Submenu updated successfully.',
          data: existingSubMenu,
        });
      } else {
        // No changes needed if catIds are the same
        return res.status(200).json({
          status: 'success',
          message: 'No changes made to the submenu as the category IDs are the same.',
        });
      }
    } else {
      // If no submenu exists for the menuId, create a new one
      const newSubMenu = await Submenu.create({
        menuId,
        catIds: categoryIds,
      });

      return res.status(201).json({
        status: 'success',
        message: 'New submenu created successfully.',
        data: newSubMenu,
      });
    }
  } catch (error) {
    console.error('Error updating submenu:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the submenu',
      error: error.message,
    });
  }
};

// update about section 
const updateAboutPage = async(req, res, next)=>{

  const {whyContent , topContent , title , whyTitle , statTitleOne , statContenteOne , staTitleTwo , statContenteTwo , statTitleThree , statContenteThree} = req.body ;
  // const leftImg = req.files.leftImg ;
  // const rightImg = req.files.rightImg ;

  const leftImg = req.files?.leftImg ? req.files.leftImg[0] : null;
  const rightImg = req.files?.rightImg ? req.files.rightImg[0] : null;

  // console.log('req.body:', req.body);
  // console.log('req.files:', req.files);
  try {
    const abData = await About.findByPk(1);
    if(!abData) {
      const newData = {
        LImg : leftImg ? `/uploads/about/${leftImg.filename}` : null,
        whyImg : rightImg ? `/uploads/about/${rightImg.filename}` : null,
        whyContent:whyContent ,
        topContent: topContent ,
         title:  title ,
         whytitle: whyTitle ,
         stattitleone:statTitleOne ,
         statcontenteone:statContenteOne ,
         stattitletwo:staTitleTwo ,
         statcontentetwo:statContenteTwo ,
         stattitlethree:statTitleThree ,
         statcontentethree:statContenteThree
      }
      const newCreation = await About.create({newData})

      if(!newCreation) return res.status(401).json({status: 'fail', message: 'unable to create about entry'})

        return res.status(201).json({
          status: 'success',
          message: `About page created successfully`,
          data: newCreation,
        });
    }else{
      abData.whyContent=whyContent ,
      abData.topContent= topContent ,
       abData.title=  title ,
       abData.whytitle= whyTitle ,
       abData.stattitleone=statTitleOne ,
       abData.statcontenteone=statContenteOne ,
       abData.stattitletwo=staTitleTwo ,
       abData.statcontentetwo=statContenteTwo ,
       abData.stattitlethree=statTitleThree ,
       abData.statcontentethree=statContenteThree

      
      // Paths to the old files
      let oldleftImg, oldrightImg;
      if(abData.LImg){
         oldleftImg = path.join(__dirname, '../public', abData.LImg);
      }
      if(abData.whyImg){
         oldrightImg = path.join(__dirname, '../public', abData.whyImg);
      }

       // updating images 
       
        // const oldleftImg = abData.LImg;
        if (leftImg && leftImg.length > 0 && oldleftImg) {
          if (fs.existsSync(oldleftImg)) {
            fs.unlinkSync(oldleftImg);
          }
        abData.LImg = `/uploads/about/${leftImg.filename}` ;
       }else if (rightImg) {
        // Handle case where there's no old image but a new image is uploaded
        abData.LImg = `/uploads/about/${leftImg.filename}`;
      }
    
      // updating images 
     
        // const oldrightImg = abData.rightImg;
        if (rightImg && rightImg.length > 0 && oldrightImg) {
          if (fs.existsSync(oldrightImg)) {
            fs.unlinkSync(oldrightImg);
          }
        abData.whyImg = `/uploads/about/${rightImg.filename}` ;
       }else if (rightImg) {
        // Handle case where there's no old image but a new image is uploaded
        abData.whyImg = `/uploads/about/${rightImg.filename}`;
      }
   

    await abData.save();
    return res.status(201).json({
      status: 'success',
      message: `About page created successfully`,
      data: abData,
    });

  } } catch (error) {
    console.error('Error creating About page:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating About page',
      error: error.message,
    });
  }

}
// update location of the customer
const updateLocationProfile = async(req , res ,next)=>{
 const {addressVal, add1, add2, pinCode , city ,state ,country , defaultVal   } = req.body;
 try {
  const customer = req.user;
  const newData = {
    Type : addressVal,
    Address1 : add1,
    Address2 : add2,
    City : city,
    State : state,
    Country : country,
    PinCode : pinCode,
    Active : defaultVal,
    userId : customer.id,
  }
  console.log('newData = ', newData)
  if (defaultVal) {
    // Set all locations for the user to inactive first
    await Location.update(
      { Active: false },
      {
        where: {
          userId: customer.id,
        },
      }
    );
  }
  const newResult = await Location.create(newData)

  const updatedResult = await Location.findAll({where : { userId: customer.id,}})

  if(!newResult) return res.status(401).json({status: 'fail', message: 'unable to create Location entry'})
  return res.status(200).json({
    status : 'success',
    userinfo : updatedResult,
    message: 'Location has been updated'
  })
 } catch (error) {
  console.error('Error creating Location:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating Location',
      error: error.message,
    });
 }
}

// update location of the customer
const deleteLocationProfile = async(req , res ,next)=>{
 const {id} =  req.params; 
//  console.log('res id - ', id)
   try{
    const customer = req.user;
   const updatedResult = await Location.findByPk(id);
    
   if(!updatedResult) return res.status(400).json({status: 'fail', message: 'unable to create Location entry'})
    await updatedResult.destroy();
   const updatedlocations = await Location.findAll({where : { userId: customer.id}})
   return res.status(200).json({
     status : 'success',
     userinfo : updatedlocations,
     message: 'Location has been Deleted'
   })
  } catch (error) {
   console.error('Error deleteing Location:', error);
     return res.status(500).json({
       status: 'error',
       message: 'An error occurred while deleting Location',
       error: error.message,
     });
  }
 }
// update Coupon 
const UpdateCoupon = async(req ,res , next)=>{
  const {name , type , value , expire} = req.body;
  console.log('name - ', name)
  console.log('type - ', type)
  console.log('value - ', value)
  console.log('expire - ', expire)
  try {
    const newData = {
      name:name.toUpperCase(),
      type:type , 
      value: value , 
      expireDate:expire ? expire : null
    }
    const createCoupon = await Coupon.create(newData);

    if(!createCoupon) return res.status(401).json({status: 'fail', message: 'unable to Create coupons'})

      return res.status(200).json({
        status : 'success',
        data : createCoupon,
        message: 'Coupons has been Created'
      })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while Creating Coupons',
      error: error.message,
    });
  }
  
}

// update Coupon 
const GetAllCoupons = async(req ,res , next)=>{
  try {
    const couponsall = await Coupon.findAll();

    if(!couponsall) return res.status(401).json({status: 'fail', message: 'unable to fetch coupons'})
    
      return res.status(200).json({
        status : 'success',
        data : couponsall,
        message: 'Coupons has been updated'
      })

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while gettting Coupons',
      error: error.message,
    });
  }
}

// delete Coupon 
const DeleteCoupon = async(req , res , next)=>{
  const { id } = req.params; 
  console.log('id value - ', id)
  if(!id ) return res.status(401).join({status: 'fail' , message : 'ID Cannot be empy or null'})
    try {
      const getdataID = await Coupon.findByPk(id)
      if(!getdataID) return res.status(401).json({status: 'fail' , message : 'Unable to find the Coupon'})

        await getdataID.destroy();

        return res.status(200).json({
          status : 'success',
          message: 'Data has been deleted'
        })

    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while Deleting Coupons',
        error: error.message,
      });
    }
}


const checkCoupon = async(req , res , next)=>{
  const {name} = req.body;
  if(!name) return res.status(401).json({status: 'fail' , message: 'Value cant be empty'})
    try {
      const checkcoup  = await Coupon.findOne({where : {name}})
      if(!checkcoup) return res.status(401).json({status : 'Fail' , message: 'Coupon Not Found'})
      
      return res.status(200).json({
        status : "success",
        data : checkcoup,
        message: 'Coupon Found'
      })
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while Deleting Coupons',
        error: error.message,
      });
    }
}

// genarate value 
const generateOrderNumber = () => {
  // Generate a random number between 100000 and 999999 for a 6-digit order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  return orderNumber.toString(); // Convert it to a string if needed
};

// genarate order unique order no 
const generateUniqueOrderNumber = async () => {
  let isUnique = false;
  let orderNumber;

  while (!isUnique) {
    orderNumber = generateOrderNumber();
    const existingOrder = await Order.findOne({ where: { orderID: orderNumber } });

    if (!existingOrder) {
      isUnique = true; // The order number is unique
    }
  } 

  return orderNumber;
};

// Function to generate hash
const generateHash = ({ key, txnid, amount, productinfo, firstname, email, salt, udf1 = '', udf2 = '', udf3 = '', udf4 = '', udf5 = '' }) => {
  // Concatenate the fields in the required order with a pipe '|' delimiter
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;

  // Generate SHA-512 hash of the concatenated string
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  return hash;
};

// creating order
const paymentInitials = async(req ,res , next)=>{
  const {payload , selectedLocation} = req.body;
  console.log('payload - ', payload);
  console.log('selectedLocation - ', selectedLocation);

  let key = process.env.MerchantKey ;
  let salt = process.env.MerchantSaltV1;
  let orderID = await generateUniqueOrderNumber();
  const customer = req.user;
  
  try {

    // Check and update email if different
    if (customer.email !== payload.email) {
      await customer.update({ email: payload.email });
    }

    // Check and update first name if different
    if (customer.firstName !== payload.firstName) {
      await customer.update({ firstName: payload.firstName });
    }

    // Check and update last name if different
    if (customer.lastName !== payload.lastName) {
      await customer.update({ lastName: payload.lastName });
    }

    const cusinfo = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone : customer.phone,
    }
    const orderdata = {
      orderID: orderID,
      couponInfo : payload.coupon,
      proValue : payload.proValue,
      subTotal : payload.subTotal,
      tax : payload.tax,
      productInfo : payload.cartItems,
      customerInfo: cusinfo,
      customerAddress:selectedLocation,
      status:'Proccessing',
      userId: customer.id
    }
    // create order 
    const createorder = await Order.create(orderdata)
    if(!createorder) return res.status(400).json({status : 'Fail' , data: orderdata, message: 'Unable to create New Order'})
    const hashval = generateHash({
      key,
      txnid:orderID,
      amount : payload.subTotal, 
      productinfo: 'ArdasInterior Product', 
      firstname : customer.firstName, 
      email: customer.email, 
      salt,
    })
    const newData = {
      key , 
      txnid:orderID,
      amount:payload.subTotal,
      productinfo : 'ArdasInterior Product',
      firstname: customer.firstName,
      email: customer.email,
      phone : customer.phone,
      hash: hashval,
      surl: process.env.SURL,
      furl: process.env.FURL
    }

    return res.status(200).json({
      status : "success",
      data : newData,
      message: 'Hash Created'
    })
  } catch (error) {
    console.error('Error while creating order:', error); // Added console log for error debugging
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating Order',
      error: error.message,
    });
  }
}
module.exports = {getAllPage , createPage , deletepage , updateSocialLinks , updateTopHead , updateCompanyInfo, updatePopup , updateProfile , updateHomeCategories , getHomeCategories , updateHomeMenu, updateAboutPage, updateSubMenu, updateLocationProfile , UpdateCoupon, GetAllCoupons , DeleteCoupon , checkCoupon , paymentInitials , deleteLocationProfile}