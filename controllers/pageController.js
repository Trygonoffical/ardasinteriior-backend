
const { where } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {Page , BusinessInfo , TopBar, Popup , User , HomeCat , MenuCat , About, Submenu , Location} = require('../db/models');
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
  // If defaultVal is true, make sure no other location is Active
  if (defaultVal) {
    // Find any existing location for the user that is set to Active
    const existingActiveLocation = await Location.findOne({
      where: {
        userId: customer.id,
        Active: true,
      },
    });

    // If an active location exists, set its Active field to false
    if (existingActiveLocation) {
      await existingActiveLocation.update({ Active: false });
    }
  }
  const newResult = await Location.create(newData)

  if(!newResult) return res.status(401).json({status: 'fail', message: 'unable to create Location entry'})
  return res.status(200).json({
    status : 'success',
    userinfo : newResult,
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

module.exports = {getAllPage , createPage , deletepage , updateSocialLinks , updateTopHead , updateCompanyInfo, updatePopup , updateProfile , updateHomeCategories , getHomeCategories , updateHomeMenu, updateAboutPage, updateSubMenu, updateLocationProfile}