// index - lista de sessoes
// show - mostra uma sessão especifica
// store - criar sessão
// update - modificar sessão
// destroy - apagar sessão

// req.query = acessa query patterns (para filtros)
// req.params = acessa rout params (para edição, delete)
// req.body = acessa o corpo da requisição (para criação e edição)


const User = require('../models/User')

module.exports = {
    
    // Função assincrona
    // utiliza async na declaração e await no metodo assincrono.
    
    async store(req,res){
        
        // Desconstrução de objeto faz a linha const email = req.body.email; se tornar a linha abaixo
        const { email }  = req.body;

        let user = await User.findOne({ email });
        
        if (!user) {
            user = await User.create({ email });
        }
        return res.json(user);
    }
}