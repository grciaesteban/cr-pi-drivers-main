const {Driver} = require("../db.js")
const {getAllDriversController,getDriverByIdController,getDriverByNameController,createDriverController} = require("../controllers/driversControllers.js");

const getAllDriversHandler = async (req,res)=>{

    const {name} = req.query;

    try {

     const response = name ? await getDriverByNameController(name) : await getAllDriversController();
 
     res.status(200).json(response)
    } catch (error) {
     res.status(400).json({error:error.message})
    }
 };

 const getDriverByIdHandler = async (req,res)=>{

    const {idDriver} = req.params;
    
    try {
        const response = await getDriverByIdController(idDriver);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
 }

 const createDriverHandler = async (req,res)=>{
    const {nombre,
        apellido,
        descripcion,
        imagen,
        nacionalidad,
        fechaDeNacimiento,
        teams
    } = req.body;
    
    if (!nombre || !apellido ||!descripcion||!imagen||!nacionalidad||!fechaDeNacimiento || !teams) {
        throw new Error("Todos los campos son obligatorios");
      }

    try {

        const driver = await createDriverController(nombre,apellido,descripcion,imagen,nacionalidad,fechaDeNacimiento,teams);

        res.status(200).json(driver);

    } catch (error) {
        res.status(400).json({error:error.message})
    }
 }

 module.exports={
    getAllDriversHandler,
    getDriverByIdHandler,
    createDriverHandler
 }

