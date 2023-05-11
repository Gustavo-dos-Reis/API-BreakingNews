const express = require("express");
const app = express();

//ROTA
    //Method HTTP - CRUD (CREATE, READ, UPDATE, DELETE)
        //GET - Pega uma info
        //POST - Cria uma info
        //PUT - Altera uma info
        //PATH - Altera parte de uma info
        //DELETE - Apaga uma info

    //Name - Um identificador da rota

    //Function (Callback) -Responsavel por executar algum comando

app.get("/home", (req,res) => {
   const soma = 1 + 2;
   
   res.json(soma)
});

app.listen(3000);