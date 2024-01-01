const axios = require("axios");
const {Team} = require("../db.js")

const getTeamsController = async ()=>{

    try {
        const response = await axios.get("http://localhost:5000/drivers")
    const teams = response.data.map(d=>d.teams);  
    
    const teamSet = new Set();

    
    for (const team of teams) {    
        if(team){
            const split= team.split(/\s*,\s*/)
            split.forEach((e)=>teamSet.add(e));
        }
    }
    
    const teamArray = Array.from(teamSet);

    for (const e of teamArray) {
        if(e){
            try {
                const [DBTeam, created] = await Team.findOrCreate({
                    where: { nombre: e }
                });
                console.log(DBTeam.get({ plain: true }), created ? 'creado' : 'ya existía');
            } catch (error) {
                console.error('Error al guardar el equipo en la base de datos:', error.message);
                throw error.message;
            }
        }
    }

    return teamArray;
    
    } catch (error) {
        console.error('Error al obtener equipos desde la API:', error.message);
        throw error;
    }
    
};

module.exports = {getTeamsController}