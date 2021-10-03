const express = require("express");
const rotas = express();
const controladores = require("./controladores/all");

// Listar todas as contas
rotas.get("/contas", controladores.listarcontas);

// Criar conta
rotas.post("/contas", controladores.criarconta);

// Deletar conta
rotas.delete("/contas/:numeroConta", controladores.excluirconta);

// Atualizar usuario
rotas.patch("/contas/:numeroConta/usuario", controladores.atualizarusuario);

// Depositar
rotas.post("/transacoes/depositar", controladores.depositar);

// Sacar
rotas.post("/transacoes/sacar", controladores.sacar);

// Transferir
rotas.post("/transacoes/transferir", controladores.transferir);

// Saldo
rotas.get("/contas/saldo", controladores.saldo);

// Extrato
rotas.get("/contas/extrato", controladores.extrato);

module.exports = rotas;
