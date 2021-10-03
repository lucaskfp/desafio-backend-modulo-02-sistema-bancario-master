const listarcontas = require("./listarcontas");
const criarconta = require("./criarconta");
const excluirconta = require("./excluirconta");
const atualizarusuario = require("./atualizarusuario");
const depositar = require("./depositar");
const sacar = require("./sacar");
const transferir = require("./transferir");
const saldo = require("./saldo");
const extrato = require("./extrato");

module.exports = {
  listarcontas,
  criarconta,
  excluirconta,
  atualizarusuario,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
};
