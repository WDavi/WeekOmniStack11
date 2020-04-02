
const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

/* 
EN:
    EDIT SUMMARY:
        #Added verification of the sent authorization header and of the params sent
PT-BR:    
    RESUMO DA EDIÇÃO:
        #Adicionada verificação de envio do header de autenticação e dos parâmetros enviados
*/
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),  
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

}), IncidentController.create);

/* 
EN:
    EDIT SUMMARY:
        #Added verification of the sent authorization header and of the params sent
PT-BR:    
    RESUMO DA EDIÇÃO:
        #Adicionada verificação de envio do header de autenticação e dos parâmetros enviados
*/  
routes.delete('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

routes.put('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), IncidentController.update)

module.exports = routes;
