import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../infra/firebase.js';

export async function inserirRequisicao(novaRequisicao) {
    const docRef = await addDoc(collection(db, "requisicao"), novaRequisicao);
    return docRef.id;
}

export async function listarRequisicoes() {
    let retorno;
    await getDocs(collection(db, "requisicao")).then((querySnapshot) => {
        retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    return retorno;
}

export async function obterRequisicao(id) {
    const docRef = doc(db, "requisicao", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function atualizarRequisicao(requisicao) {
    await setDoc(doc(db, "requisicao", requisicao.id), requisicao);
}

export async function deletarRequisicao(id) {
    await deleteDoc(doc(db, "requisicao", id));
}
