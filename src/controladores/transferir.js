const banco = require("../bancodedados");
const {
  dataFormatada,
  verificaSeContaExiste,
  verificarSenhaDoUsuario,
} = require("../utilitários");

module.exports = (req, res) => {
  const { contas, transferencias } = banco;
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
  const data = dataFormatada();
  const indiceDaContaOrigem = contas.findIndex(
    (conta) => conta.numero === numero_conta_origem
  );
  const indiceDaContaDestino = contas.findIndex(
    (conta) => conta.numero === numero_conta_destino
  );

  // Verifica se todos os campos foram informados
  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    res.status(400);
    res.json({
      mensagem: "Informe todos os campos.",
    });
    return;
  }

  // Verifica se o número das contas são iguais
  if (numero_conta_origem === numero_conta_destino) {
    res.status(400);
    res.json({ mensagem: "Não é possível tranferir para a mesma conta." });
    return;
  }

  if (!verificaSeContaExiste(numero_conta_origem, contas)) {
    res.status(404);
    res.json({ mensagem: "Conta de origem não encontrada." });
    return;
  }

  // Verifica se conta de origem existe
  if (!verificaSeContaExiste(numero_conta_destino, contas)) {
    res.status(404);
    res.json({ mensagem: "Conta de destino não encontrada." });
    return;
  }

  // Verifica se conta de destino existe
  if (!verificarSenhaDoUsuario(senha, contas, numero_conta_origem)) {
    res.status(400);
    res.json({ mensagem: "Senha incorreta" });
    return;
  }

  // Verifica se saldo é suficiente
  if (contas[indiceDaContaOrigem].saldo < valor) {
    res.status(400);
    res.json({ mensagem: "Saldo insuficiente." });
    return;
  }

  contas[indiceDaContaOrigem].saldo -= valor; // Subtrai valor da conta de origem
  contas[indiceDaContaDestino].saldo += valor; // Adiciona valor na conta de destino

  const registro = {
    data,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(registro);

  res.json({ mensagem: "Transferência realizada com sucesso!" });
};
