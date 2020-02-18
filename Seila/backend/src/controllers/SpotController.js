const Spot = require('../models/Spot');

module.exports = {
    async store(req,res){
        
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { userid } = req.headers;
        console.log(req.headers);

        const spot = await Spot.create({
            user: userid,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(techs => techs.trim()),
            price,
        })
                 
        return res.json(spot)
    }
}