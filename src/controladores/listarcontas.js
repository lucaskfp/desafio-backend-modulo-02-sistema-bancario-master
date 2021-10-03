const data = require("../bancodedados");

module.exports = (req, res) => {
  const { senha_banco } = req.query;

  if (!senha_banco || senha_banco !== data.banco.senha) {
    res.status(400);
    res.json({ mensagem: "Senha inválida" });
    return;
  }

  res.status(200);
  res.json(data.contas);
};
