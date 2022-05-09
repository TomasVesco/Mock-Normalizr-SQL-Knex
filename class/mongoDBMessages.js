const mongoose = require('mongoose');
const mongoMessages = require('../DBcfg/MongodbModels');

class MongoMessagescontainer {

    async getAll() {
        try{

            let dbMessagesRead = await mongoMessages.find({});

            if(dbMessagesRead.length != 0){
                return dbMessagesRead;
            } else {
                return 'No hay mensajes';
            }

        }catch(err){
            console.log(err);
        }
    }

    async insertMessage(newMessages) {
        try{

            const { author, date, text } = newMessages;

            const messageObj = {
                author,
                date, 
                text
            }       
            
            await mongoMessages.insertMany(messageObj);

            return messageObj;

        }catch(err){
            console.log(err);
        }
    }

}

module.exports = MongoMessagescontainer;