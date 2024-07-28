const { where } = require('sequelize');

const {User} = require("../db/models");
// get all customers

const getAllCustomers = async(req , res, next)=>{
    try {
        const customers = await User.findAll({where : {userType : '1'}});
        console.log('data: ', customers)
        return res.status(200).json({
            status: "success",
            data: customers,
            message: 'Customers featched successfully',    
        })
    } catch (error) {
        console.error('Error feateching  customers:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
    }
}

module.exports = {getAllCustomers}