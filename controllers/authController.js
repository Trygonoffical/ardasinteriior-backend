const { where } = require("sequelize");
const {User, Location} = require("../db/models");
const {Otp} = require('../db/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const { Op } = require('sequelize');
const cron = require('node-cron');
require('dotenv').config();

const genaratetoken = (payload) =>{
   return jwt.sign(payload , process.env.JWT_SECRATE_KEY , {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}

const registation = async(req, res, next)=>{
    const body = req.body;
    const hashPassword = bcrypt.hashSync(body.password , 10)
    const newAdminUser = await User.create({ 
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        password: hashPassword,
        userType: '0'
       })

       const result = newAdminUser.toJSON();
       delete result.password;
       delete result.deletedAt;

       result.token = genaratetoken({
        id: result.id 
       })
        
       if(!result){
        return res.status(400).json({
            status : 'Fail',
            message : 'Failed to create Admin User'
        })
       }
       return res.status(201).json({
             status : 'success',
            message : result
        })
   
};
    // Admin Login 
const login = async(req , res , next) =>{
   const {email , password} = req.body;

   console.log('email - ', email);
   console.log('password - ', password);
   if(!email || !password ){
    return res.status(400).json({
        status: 'fail',
        message : "please Provice email and Password"
    })
   }
   const result = await User.findOne({where : {email}})
   console.log('login result - ', result)
   if(!result || !(await bcrypt.compare(password , result.password))){
    return res.status(401).json({
        status : 'fail',
        message: "Incorrect Email Or Password"
    })
   }   
   const resultNew = result.toJSON();
   delete resultNew.password;
   delete resultNew.deletedAt;
   resultNew.token = genaratetoken({
    id:result.id
   })
   return res.status(200).json({
    status: "success",
    message: resultNew
   })
};

//View All the Users
const viewAll = async(req , res , next)=>{
    const result = await User.findAll();
    return res.status(200).json({
        status: "success",
        message : result
    })
}

const sendingOTP = async(phone)=>{
    const otpval =   otpGenerator.generate(6, { lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false });
    try {
        const checkNumber = await Otp.findOne({where: { phoneNo:  phone,}})
        if(checkNumber){
            const updateotp = await Otp.update({otpVal : otpval},{ where :{
                phoneNo:  phone,
            }})
            if(!updateotp){
                throw new Error('Failed to create OTP User');
            }
            try {
                // const otpsms =  `http://sms.trygon.in/sms-panel/api/http/index.php?username=TRYGON&apikey=E705A-DFEDC&apirequest=Text&sender=TRYGON&mobile=${phone}&message=Dear Vikas ${otpval} is the OTP for your login at Trygon. In case you have not requested this, please contact us at info@trygon.in&route=TRANS&TemplateID=1707162192151162124&format=JSON`;


               const otpsms = `http://sms.trygon.in/sms-panel/api/http/index.php?username=ARDAS&apikey=A028F-755BF&apirequest=Text&sender=ARDASS&mobile=${phone}&message=Dear User ${otpval} is the OTP for your login at Ardas Interior. In case you have not requested this, please contact us at ardasinterior@gmail.com or 18002571022.&route=TRANS&TemplateID=1707172112704680310&format=JSON`;

                const resSMS = fetch(otpsms);
                console.log(' resSMS val ', resSMS)
                const resSMSJson = await resSMS.json();
                if (resSMSJson.status !== 'success') {
                    throw new Error('Failed to send OTP SMS');
                }
                // else{
                //     return res.status(200).json({
                //         status : 'success'
                //     }) 
                // }
            } catch (error) {
                console.log('Failed to create OTP User', error)
            }
        }else{
            const newotpuser = await Otp.create({ 
                phoneNo:  phone,
                otpVal : otpval
                })
            
                if(!newotpuser){
                    throw new Error('Failed to create OTP User');
                }
            try {
                // const otpsms = `http://sms.trygon.in/sms-panel/api/http/index.php?username=TRYGON&apikey=E705A-DFEDC&apirequest=Text&sender=TRYGON&mobile=${phone}&message=Dear Vikas ${otpval} is the OTP for your login at Trygon. In case you have not requested this, please contact us at info@trygon.in&route=TRANS&TemplateID=1707162192151162124&format=JSON`;
                const otpsms = `http://sms.trygon.in/sms-panel/api/http/index.php?username=ARDAS&apikey=A028F-755BF&apirequest=Text&sender=ARDASS&mobile=${phone}&message=Dear User ${otpval} is the OTP for your login at Ardas Interior. In case you have not requested this, please contact us at ardasinterior@gmail.com or 18002571022.&route=TRANS&TemplateID=1707172112704680310&format=JSON`;
                const resSMS = await fetch(otpsms);
                console.log(' resSMS val ', resSMS)
                const resSMSJson = await resSMS.json();
                // if(resSMS.status == "success"){
                //     return res.status(200).json({
                //         status: 'success'
                //     })
                // }else{
                //     throw new Error('Failed to send OTP SMS');
                // }

                if (resSMSJson.status !== 'success') {
                    throw new Error('Failed to send OTP SMS');
                }
                // else{
                //     return res.status(200).json({
                //         status : 'success'
                //     }) 
                // }
            } catch (error) {
                console.log('Failed to send OTP SMS', error);
                throw new Error('Failed to send OTP SMS');
            }
        // return { status: 'success', message: 'OTP Saved' };
        }
    } catch (error) {
        console.log(error)
    }
}

// Customer Login
const customerLogin = async(req, res , next)=>{
    const {phone} =  req.body ; 
    try {
        const findUser = await User.findOne({where : {phone}})
        if(findUser){
            await sendingOTP(findUser.phone);
        }else{
            const newCustomer = await User.create({ 
                phone: phone,
                userType: '1'
               })
            if(!newCustomer){
                return res.status(400).json({
                     status : 'Fail',
                    message : 'Failed to create User'
                })
            }
            await sendingOTP(phone);
        }
        return res.status(200).json({
            status: 'success',
            message: 'OTP has been sent successfully'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
    try {
        // Destroy OTP records older than 2 minutes
        await Otp.destroy({
            where: {
                createdAt: {
                    [Op.lt]: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
                }
            }
        });
        console.log('Deleted expired OTPs');
    } catch (error) {
        console.error('Error deleting expired OTPs:', error);
    }
});

// validatining otp 
const validatePhone = async(req , res, next) =>{
    const {otpVal , phoneNo} = req.body;
    try {
        // check the otp and phone no in otps table
        const checkOtp = await Otp.findOne({where : {phoneNo , otpVal}})
        if(checkOtp){
            const userinfo = await User.findOne(
                {where : { phone : phoneNo },
                include: [
                {
                model: Location,
                foreignKey: 'userId', // Include all user information
                as: 'location',
                // attributes: ['catIds']
                // Fetch only the category name catIds
              },
            ]})
            if(!userinfo){
                return res.status(404).json({
                    status : "fail",
                    message : "User Not Found!"
                })
            }
            const newResult = userinfo.toJSON();
            delete newResult.password;
            delete newResult.deletedAt;
            delete newResult.userType;
            // delete newResult.userType;
            newResult.token = genaratetoken({
                id:newResult.id
            })
            return res.status(200).json({
                status : "success",
                userinfo : newResult
            })
        }else{
            return res.status(401).json({
                status : "fail",
                message : "Not a valid OTP"
            })
        }
    } catch (error) {
        console.error('Error validating OTP:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}



module.exports = {login , registation , viewAll , customerLogin , validatePhone};