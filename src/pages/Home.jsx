import compras from "../assets/compras.jpg";

export default function Home() {
    return (
        <>
            <h1 className="w-full text-center mt-10 text-slate-500 text-5xl">ACME</h1>
            <div className="w-[100%] h-[100%] flex justify-center items-center mt-20">
                <div className="flex w-[80%] shadow-lg rounded-lg">
                    <div className="w-[50%]"> 
                        <img src={compras} alt="Compras" className="w-full h-auto object-cover rounded-lg"/> 
                    </div>
                    <div className="w-[50%] flex flex-col text-center justify-center">
                        <h2 className="mt-10 font-bold text-slate-500 text-2xl">Bem vindo(a) ao sistema de compras da empresa, colaborador!</h2>
                        <p className="p-10">
                            Fazer requisições de compra nunca foi tão fácil, apenas preencha o formulário com o que precisa e
                            o setor de compras logo te enviará as três melhores cotações para o produto desejado.
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-center mt-20 text-xs">Projeto de Bloco - Front-end Avançado</p>
        </>
    );
}
