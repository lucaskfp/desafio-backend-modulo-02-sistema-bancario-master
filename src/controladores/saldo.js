const banco = require("../bancodedados");
const {
  verificaSeContaExiste,
  verificarSenhaDoUsuario,
} = require("../utilitários");

module.exports = (req, res) => {
  const { numero_conta, senha } = req.query;
  const indiceDaConta = banco.contas.findIndex(
    (conta) => conta.numero === numero_conta
  );

  if (!numero_conta || !senha) {
    res.status(400);
    res.json({
      mensagem: "O número da conta e a senha precisam ser informados.",
    });
    return;
  }

  if (!verificaSeContaExiste(numero_conta, banco.contas)) {
    res.status(404);
    res.json({ mensagem: "Conta não encontrada." });

    return;
  }

  if (!verificarSenhaDoUsuario(senha, banco.contas, numero_conta)) {
    res.status(400);
    res.json({ mensagem: "Senha incorreta" });
    return;
  }

  const saldo = banco.contas[indiceDaConta].saldo;

  res.json({ saldo });
};
