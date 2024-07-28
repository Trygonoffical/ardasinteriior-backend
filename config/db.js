// require('dotenv').config({path: `${process.cwd()}/.env`});
require('dotenv').config();
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config[env]);


module.exports = sequelize ;