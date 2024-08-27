import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../infra/firebase.js';

export async function inserirProduto(novoProduto) {
    const docRef = await addDoc(collection(db, "produtos"), novoProduto);
    return docRef.id;
}

export async function listarProdutos() {
    let retorno;
    await getDocs(collection(db, "produtos")).then((querySnapshot) => {
        retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    return retorno;
}

export async function obterProduto(id) {
    const docRef = doc(db, "produtos", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function atualizarProduto(produto) {
    await setDoc(doc(db, "produtos", produto.id), produto);
}

export async function deletarProduto(id) {
    await deleteDoc(doc(db, "produtos", id));
}
