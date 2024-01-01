const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type: DataTypes.UUID,//tipo de dato
      defaultValue: DataTypes.UUIDV4,//algoritmo que me genera  un UUID aleatorio
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido:{
      type: DataTypes.STRING,
      allowNull:false,  
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    nacionalidad:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaDeNacimiento:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{timestamps:false});
};