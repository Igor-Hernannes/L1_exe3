const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("pages/index",{"retorno":null,"valores":{"salario":""}});
});

router.post("/classificar", (req, res)=>{

    //recuperar a idade do nadador
    let salario = parseInt(req.body.salario);

    //manipular os dados -> classificar
    if(salario <= 1400){
        var porcentagem = 15;
        var aumento = salario * porcentagem / 100;
        var salarioF = salario + aumento;
    }else if(salario > 1400 && salario <= 4500){
        var porcentagem = 10;
        var aumento = salario * porcentagem / 100;
        var salarioF = salario + aumento;
    }else if(salario > 4500 && salario <= 10000){
        var porcentagem = 7.5;
        var aumento = salario * porcentagem / 100;
        var salarioF = salario + aumento;
    }else{(salario > 10000)
        var porcentagem = 5;
        var aumento = salario * porcentagem / 100;
        var salarioF = salario + aumento;
    }




     //formatação 
    let objJson = {"salario":salario, "porcentagem":porcentagem,"aumento":aumento, "salarioF":salarioF};

    //envio dos dados para mescalr com o HTML
    res.render("pages/index",{"retorno":objJson,"valores":{"dia":req.body.salario}})

});

module.exports = router;