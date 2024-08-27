import { auth } from '../infra/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function LogarUsuario(email, senha) {
  let retorno = new Object();
  await signInWithEmailAndPassword(auth, email, senha)
    .then((credenciais) => {
    console.log(credenciais);
    retorno.id = credenciais.user.uid;
    retorno.email = email;
    retorno.senha = senha;
  })
  .catch((error) => {
    console.log(`${error.code} = ${error.message}`);
    retorno.erro = `Login inválido`;
  });
  return retorno;
}

export async function DeslogarUsuario() {
    await auth.signOut(); // metodo do fire pra deslogar usuario
    navigate('/login', { replace: true }); // depois de deslogado, redireciona pra page login
}
