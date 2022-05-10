const admin = require("firebase-admin");

class FirestoreClass {
    async getAll() {
      try { 
          
          const db = admin.firestore();
          const query = db.collection('arrayOfMessages');
    
          const querySnapshot = await query.get();
    
          let dbMessagesRead = await querySnapshot.docs;

          const arrayOfMessages = [];

          if(dbMessagesRead[0] != undefined){
              dbMessagesRead.forEach(e => {
                  arrayOfMessages.push(e.data());
              });
              return arrayOfMessages;
          } else {
              return 'No hay mensajes';
          }
    
      } catch (error) {
      console.log(error);
      }
    }

    async insertMessage(newMessages) {
        try {
            
            const db = admin.firestore();
            const query = db.collection('arrayOfMessages');
            let doc = query.doc();
            
            const { text, date, author } = newMessages;

            const newMessageToADD = {
                text,
                author,
                date
            }
        
            await doc.create(newMessageToADD);

            return newMessageToADD;
        
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FirestoreClass;