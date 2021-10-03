const dataFormatada = () => {
  let data = new Date();
  let ano = data.getFullYear();
  let mes = String(data.getMonth() + 1).padStart(2, 0);
  let dia = String(data.getDate()).padStart(2, 0);
  let hora = String(data.getHours()).padStart(2, 0);
  let minuto = String(data.getMinutes()).padStart(2, 0);
  let segundo = String(data.getSeconds()).padStart(2, 0);

  return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
};

const verificaSeContaExiste = (numero_conta, contas) => {
  const existe = contas.find((conta) => conta.numero === numero_conta);

  return existe;
};

const verificarSenhaDoUsuario = (senha, contas = [], numero_conta) => {
  const indiceDaConta = contas.findIndex(
    (conta) => conta.numero === numero_conta
  );

  if (contas[indiceDaConta].usuario.senha === senha) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  dataFormatada,
  verificaSeContaExiste,
  verificarSenhaDoUsuario,
};
