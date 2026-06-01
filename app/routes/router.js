const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        erros: null,
        retorno: null,
        valores: {
            salario: ""
        }
    });
});

router.post(
    "/classificar",
    [
        body("salario")
            .notEmpty().withMessage("O salário é obrigatório.")
            .isFloat({ min: 0 }).withMessage("Digite um salário válido.")
    ],
    (req, res) => {

        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            return res.render("pages/index", {
                erros: erros.array(),
                retorno: null,
                valores: {
                    salario: req.body.salario
                }
            });
        }

        let salario = parseFloat(req.body.salario);

        let porcentagem;
        let aumento;
        let salarioF;

        if (salario <= 1400) {
            porcentagem = 15;
        } else if (salario <= 4500) {
            porcentagem = 10;
        } else if (salario <= 10000) {
            porcentagem = 7.5;
        } else {
            porcentagem = 5;
        }

        aumento = salario * porcentagem / 100;
        salarioF = salario + aumento;

        let objJson = {
            salario: salario,
            porcentagem: porcentagem,
            aumento: aumento,
            salarioF: salarioF
        };

        res.render("pages/index", {
            erros: null,
            retorno: objJson,
            valores: {
                salario: req.body.salario
            }
        });

    }
);

module.exports = router;
