const banco = require("../bancodedados");

module.exports = (req, res) => {
  // Identificador unico
  let numero = 1;
  if (banco.contas.length > 0) {
    const indice = Number(banco.contas[banco.contas.length - 1].numero);
    numero = indice + 1;
  }

  const dados = {
    numero: "",
    saldo: 0,
    usuario: {
      nome: "",
      cpf: "",
      data_nascimento: "",
      telefone: "",
      email: "",
      senha: "",
    },
  };

  const body = req.body;

  dados.usuario.nome = body.nome;
  dados.usuario.cpf = body.cpf;
  dados.usuario.data_nascimento = body.data_nascimento;
  dados.usuario.telefone = body.telefone;
  dados.usuario.email = body.email;
  dados.usuario.senha = body.senha;

  // Verifica se todos os campos estao preenchidos
  if (verificaCampos(dados)) {
    res.status(400);
    res.json({ mensagem: "Todos os campos são obrigatórios" });
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

  dados.numero = String(numero);

  banco.contas.push(dados);

  res.status(201);
  res.json(dados);
};

function verificaCampos(dados) {
  for (let el in dados.usuario) {
    if (!dados.usuario[el]) {
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
