const fs = require("fs");

class FileSystemMessages {
  
  constructor(route) {
      this.route = route;
  }

  async getAll() {
    try {
        
        let readFile = await fs.promises.readFile(this.route, "utf-8");

        if (readFile == "") {
            const str = 'No hay mensajes';
            fs.promises.writeFile(this.route, JSON.stringify(str));
            return str;
        }

        readFile = await fs.promises.readFile(this.route, "utf-8");
        
        return JSON.parse(readFile);

        } catch (error) {
        console.log(error);
        }
    }

  async insertMessage(newMessage) {
    try {

        const { author, date, text } = newMessage;

        let arrayOfMessages = await this.getAll();

        if(arrayOfMessages === 'No hay mensajes'){
            arrayOfMessages = [];
        }

        const messageObj = {
            author,
            date, 
            text
        }   
        
        arrayOfMessages.push(messageObj);

        fs.writeFileSync(this.route, JSON.stringify(arrayOfMessages, null, 4));

        return messageObj;

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = FileSystemMessages;