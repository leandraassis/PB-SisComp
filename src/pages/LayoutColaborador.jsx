import { Outlet, Link } from "react-router-dom";

export default function LayoutColaborador() {
    return (
        <div className="w-screen h-screen m-0 font-mono">
            <div className="w-full">
                <nav>
                    <ul className="flex justify-around w-[10] h-[8vh] bg-slate-300">
                        <li className="itemLista">
                            <Link to={"/"}>Início</Link>
                        </li>
                        <li className="itemLista">
                            <Link to={"/requisicoes"}>Requições</Link>
                        </li>
                        <li className="itemLista">
                            <Link to={"/conta"}>Conta</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}