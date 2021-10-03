const banco = require("../bancodedados");

module.exports = (req, res) => {
  const { body } = req;
  const { numeroConta } = req.params;

  const indiceDaConta = banco.contas.findIndex(
    (conta) => conta.numero === String(numeroConta)
  );
  const usuario = banco.contas[indiceDaConta].usuario;

  const mesclagem = {
    ...usuario,
    ...body,
  };

  // Verifica se conta existe
  if (!verificarSeExiste(numeroConta)) {
    res.status(404);
    res.json({ mensagem: "Conta não encontrada." });

    return;
  }

  // Verifica campos
  if (Object.keys(body).length === 0 || verificaCampos(body)) {
    res.status(400);
    res.json({ mensagem: "Informe pelo menos um campo." });
    return;
  }

  // Verifica se CPF ja existe
  if (verificaCPF(body.cpf)) {
    res.status(400);
    res.json({ mensagem: "CPF já existe." });
    return;
  }

  // Verifica se email ja existe
  if (verificaEmail(body.email)) {
    res.status(400);
    res.json({ mensagem: "Email já existe." });
    return;
  }

  banco.contas[indiceDaConta].usuario = mesclagem;

  res.json({ mensagem: "Conta atualizada com sucesso!" });
};

function verificarSeExiste(numeroConta) {
  const existe = banco.contas.find((conta) => conta.numero === numeroConta);

  return existe;
}

function verificaCampos(body) {
  for (let el in body) {
    if (!body[el]) {
      return true;
    }
  }
}

function verificaCPF(cpf) {
  const existe = banco.contas.find((conta) => conta.usuario.cpf === cpf);

  return existe;
}

function verificaEmail(email) {
  const existe = banco.contas.find((conta) => conta.usuario.email === email);

  return existe;
}
