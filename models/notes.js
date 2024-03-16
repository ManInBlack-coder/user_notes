const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const Notes = sequelize.define('Notes', {

  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
  },

  title:{
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
},
{
  tableName: 'notes'
});

module.exports = Notes;