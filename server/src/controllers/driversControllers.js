const axios = require("axios");
const {Driver,Team} = require("../db.js");
const { Sequelize } = require("sequelize");

const getAllDriversController = async()=>{
try {
    const response = await axios.get("http://localhost:5000/drivers");
    const drivers = response.data.map((d)=>{
        return{
            id:d.id,
            nombre: d.name.forename,
            apellido: d.name.surname,
            imagen: d.image.url,
            dob: d.dob,
            nacionalidad: d.nationality,
            descripcion: d.description,
            team: d.teams
    
        }
    })
    
    const driversDeBd =  await Driver.findAll();
    
    const allDrivers = [...driversDeBd,...drivers]
    if(allDrivers.length>0) return allDrivers;
} catch (error) {
    throw error.message;
}
};

const getDriverByIdController = async(driverId)=>{
    try {
        if(isNaN(driverId)){
            const driver = await Driver.findByPk(driverId,{
                 include:{
                     model:Team,
                     as:"Teams",
                     attributes:["nombre"],
                     through:{
                         attributes:[]
                     }
                 }
             });
             return driver;  
         }else{
             const response = (await axios.get(`http://localhost:5000/drivers/${driverId}`)).data;
             const driver = {
                     id: response.id,
                     name: response.name.forename,
                     lastname: response.name.surname,
                     description: response.description,
                     image: response.image.url,
                     nationality: response.nationality,
                     birthdate: response.birthdate,
                     teams: response.teams,
                 };   
                 return driver;
             };
         
    } catch (error) {
        throw new Error(`Error al obtener detalles del conductor: ${error.message}`);
    }
    
}

const getDriverByNameController = async (name)=>{

    const nameLC = name.toLowerCase();

    
    const driversInDb = await Driver.findAll({
        where: {
            nombre: {
                [Sequelize.Op.iLike]: `%${nameLC}%`
            }
        },
        limit: 15
    });

    if (driversInDb.length > 0) {
        return driversInDb;
    }

    
    const response = await axios.get("http://localhost:5000/drivers");
    const driversInApi = response.data.map((d) => {
        return {
            id: d.id,
            nombre: d.name.forename,
            apellido: d.name.surname,
            imagen: d.image.url,
            dob: d.dob,
            nacionalidad: d.nationality,
            descripcion: d.description,
            team: d.teams
        };
    });

    
    const filteredDriversInApi = driversInApi.filter((d) => d.nombre.toLowerCase().includes(nameLC));

    if (filteredDriversInApi.length > 0) {
        return filteredDriversInApi.slice(0, 15);
    }

    throw new Error(`No se encontraron conductores con el nombre '${name}'`);
};

const createDriverController = async (nombre,apellido,descripcion,imagen,nacionalidad,fechaDeNacimiento,teams)=>{
    
    try {
        const driver = await  Driver.create({
            nombre,
            apellido,
            descripcion,
            imagen,
            nacionalidad,
            fechaDeNacimiento,
        })
    
        if(typeof teams ==="string"){
    
            const teamSplit = teams.split(",");

            if (teamSplit.length === 0) {
                throw new Error("Al menos un equipo debe ser proporcionado");
            }
    
            for (const team of teamSplit) {
                const trimmedTeam = team.trim().toLowerCase();
                let teamName = await Team.findOne({where:{nombre:trimmedTeam}})
                if(!teamName){
                    teamName = await Team.create({nombre:trimmedTeam})
                }
                await driver.addTeam(teamName)
            }
        }
    
        return driver;
    } catch (error) {
       throw error.message;
    }
    
}

module.exports={
    getAllDriversController,
    getDriverByIdController,
    getDriverByNameController,
    createDriverController
}
