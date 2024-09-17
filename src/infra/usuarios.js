import { auth, db } from '../infra/firebase.js';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
  await auth.signOut();
  navigate('/login', { replace: true });
}

export async function CriaConta(email, senha) {
  let retorno = new Object();
  await createUserWithEmailAndPassword(auth, email, senha)
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

export async function inserirUsuario(novoUsuario) {
  const usuariosRef = collection(db, "usuarios");
  const docRef = doc(usuariosRef, novoUsuario.id);
  await setDoc(docRef, novoUsuario);
  return docRef;
}


export async function listarUsuarios() {
  let retorno;
  await getDocs(collection(db, "usuarios")).then((querySnapshot) => {
    retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  return retorno;
}

export async function obterUsuario(id) {
  const docRef = doc(db, "usuarios", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function atualizarUsuarios(usuarios) {
  await setDoc(doc(db, "usuarios", usuarios.id), usuarios);
}

export async function deletarUsuarios(id) {
  await deleteDoc(doc(db, "usuarios", id));
}