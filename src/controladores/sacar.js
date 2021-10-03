const banco = require("../bancodedados");
const {
  dataFormatada,
  verificaSeContaExiste,
  verificarSenhaDoUsuario,
} = require("../utilitários");

module.exports = (req, res) => {
  const { numero_conta, valor, senha } = req.body;
  const indiceDaConta = banco.contas.findIndex(
    (conta) => conta.numero === numero_conta
  );

  // Verifica se existe os campos e estão preenchidos
  if (!numero_conta || !valor || !senha) {
    res.status(400);
    res.json({
      mensagem: "O número da conta, valor e senha são obrigatórios.",
    });

    return;
  }

  // Verifica se conta existe
  if (!verificaSeContaExiste(numero_conta, banco.contas, numero_conta)) {
    res.status(404);
    res.json({ mensagem: "Conta não encontrada." });

    return;
  }

  // Verifica a senha
  if (!verificarSenhaDoUsuario(senha, banco.contas, numero_conta)) {
    res.status(400);
    res.json({ mensagem: "Senha incorreta" });
    return;
  }

  // Verifica se saldo é suficiente
  if (banco.contas[indiceDaConta].saldo < valor) {
    res.status(400);
    res.json({ mensagem: "Saldo insuficiente." });
    return;
  }
  banco.contas[indiceDaConta].saldo -= valor;

  const data = dataFormatada();

  banco.saques.push({
    data,
    numero_conta,
    valor,
  });

  res.json({ mensagem: "Saque realizado com sucesso!" });
};
