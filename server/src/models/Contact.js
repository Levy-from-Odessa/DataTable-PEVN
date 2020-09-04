module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    email: DataTypes.STRING 
  })

 

  return Contact
}
