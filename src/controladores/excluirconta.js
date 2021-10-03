const banco = require("../bancodedados");

module.exports = (req, res) => {
  const { numeroConta } = req.params;

  const indiceDaConta = banco.contas.findIndex(
    (conta) => conta.numero === String(numeroConta)
  );

  // Verifica se conta existe
  if (indiceDaConta === -1) {
    res.status(404);
    res.json({ mensagem: "Conta não encontrada" });
    return;
  }

  // Verifica se saldo é igual zero
  if (banco.contas[indiceDaConta].saldo === 0) {
    excluirConta(indiceDaConta);
  } else {
    res.status(400);
    res.json({
      mensagem: "Não foi possível exluir a conta pois ainda possui saldo.",
    });
    return;
  }

  res.status(200);
  res.json({ mensagem: "Conta excluída com sucesso!" });
};

function excluirConta(indiceDaConta) {
  banco.contas.splice(indiceDaConta, 1);
}
