const connection = require('../database/connection');

module.exports = {

    async delete(request,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
         
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        /* 
        EN:
            EDIT SUMMARY:
                #Added to check if the user given incident id correlates to a entry in the database averting a unhandled promise rejection
        PT-BR:    
            RESUMO DA EDIÇÃO:
                #Adicionado para verificiar se o id de incident dado pelo usuário foi encontrado no banco de dados evitando assim uma rejeição de promessa sem resposta
        */    
        if(!incident){
            return response.status(406).json({error: "Not Acceptable, Incident not found"});
        }
        
        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: "Operation not permitted."});
        }
       
       

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },

    async index(request,response) {
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count(0);

        response.header('X-Total-Count', count['count(*)']);
        
        const incidents = await connection('incidents')
           .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
           .limit(5)
           .offset((page - 1) * 5 )
           .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.email', 
                'ongs.city', 
                'ongs.uf'
            ]);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value} = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    }
};