const User = require('./user');
const Notes = require('./notes');
Notes.belongsTo(User, {foreignKey: 'id',as:'user'});