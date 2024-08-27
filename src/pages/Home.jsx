import { useLocation } from "react-router-dom";

export default function Home() {

    return (
        //temporario
        <div className="h-[50vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Sistema de compras</h2>
            <p className="text-lg">Bem vindo(a) ao Sistema de Compras da Empresa ACME! </p>

            <p>|</p>
            <p>Ao filtrar uma cotação, para voltar a lista com todas as cotações, limpe o campo e clique novamente em filtrar.</p>
            <p>|</p>

            <ul className="text-center">
                <p><strong>Implementações da atualização:</strong></p>
                <li>Tela requisições</li>
                <li>CRUD requisições</li>
                <li>Login funcional (autenticação)</li>
                <li>Atualização no layout</li>
            </ul>
            <p>|</p>
            <p>|</p>
            <span className="text-sm">versão 0.2</span>
        </div>
    );
}