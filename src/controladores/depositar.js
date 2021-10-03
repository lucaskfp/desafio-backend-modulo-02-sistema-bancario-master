const banco = require("../bancodedados");
const { dataFormatada } = require("../utilitários");

module.exports = (req, res) => {
  const { numero_conta, valor } = req.body;
  const { depositos, contas } = banco;
  const indiceDaConta = contas.findIndex(
    (conta) => conta.numero === numero_conta
  );

  // Se conta existe
  if (indiceDaConta === -1) {
    res.status(404);
    res.json({ mensagem: "Conta não encontrada" });
    return;
  }

  // Se valor foi informado
  if (!valor || valor < 0) {
    if (valor === 0 || valor < 0) {
      res.status(400);
      res.json({ mensagem: "O valor precisa ser maior que zero." });
      return;
    }

    res.status(400);
    res.json({ mensagem: "O valor não foi informado." });
    return;
  }

  banco.contas[indiceDaConta].saldo += valor;

  data = dataFormatada();

  depositos.push({
    data,
    numero_conta,
    valor,
  });

  res.status(200);
  res.json({ mensagem: "Depósito realizado com sucesso!" });
};
