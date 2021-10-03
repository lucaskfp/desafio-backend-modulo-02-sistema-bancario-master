const banco = require("../bancodedados");
const {
  verificaSeContaExiste,
  verificarSenhaDoUsuario,
} = require("../utilitários");

module.exports = (req, res) => {
  const { contas, depositos, saques, transferencias } = banco;
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    res.status(400);
    res.json({ mensagem: "Informe o número da conta e a senha." });
    return;
  }

  if (!verificaSeContaExiste(numero_conta, contas)) {
    res.status(404);
    res.json({ mensagem: "Conta não encontrada." });
    return;
  }

  if (!verificarSenhaDoUsuario(senha, contas, numero_conta)) {
    res.status(400);
    res.json({ mensagem: "Senha incorreta" });
    return;
  }

  const extrato = criarExtrato(numero_conta, depositos, saques, transferencias);

  res.json(extrato);
};

function criarExtrato(numero_conta, depositos, saques, transferencias) {
  const transferenciasEnviadas = transferencias.filter(
    (transferencia) => transferencia.numero_conta_origem === numero_conta
  );

  const transferenciasRecebidas = transferencias.filter(
    (transferencia) => transferencia.numero_conta_destino === numero_conta
  );

  depositos = depositos.filter(
    (deposito) => deposito.numero_conta === numero_conta
  );

  saques = saques.filter((saque) => saque.numero_conta === numero_conta);

  return { depositos, saques, transferenciasEnviadas, transferenciasRecebidas };
}
