import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../infra/firebase.js';

export async function inserirCotacao(novaCotacao) {
    const docRef = await addDoc(collection(db, "cotacao"), novaCotacao);
    return docRef.id;
}

export async function listarCotacoes() {
    let retorno;
    await getDocs(collection(db, "cotacao")).then((querySnapshot) => {
        retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    return retorno;
}

export async function obterCotacao(id) {
    const docRef = doc(db, "cotacao", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function atualizarCotacao(cotacao) {
    await setDoc(doc(db, "cotacao", cotacao.id), cotacao);
}

export async function deletarCotacao(id) {
    await deleteDoc(doc(db, "cotacao", id));
}
