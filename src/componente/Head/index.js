import { FiLogOut } from 'react-icons/fi';
import { FaHamburger, FaReply, FaAlignJustify } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import '../../pages/global.css';

export default function Head({ title, to="" }) {
    const navigate = useNavigate();

    function retornar() {
        navigate(-1);
    }

    function sair() {
        navigate("/");
    }

    const confirmarSaida = () => {
        confirmAlert({
            message: "Deseja realmente sair?",
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        sair();
                    }
                },
                {
                    label: 'Não',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    };

    return (
        <div className="Head">
            <FaAlignJustify className='btn-menu' size={24} color="blue" />
            {to !== "" && <Link to={to} className='btn-novo'>Novo Cadastro</Link>}
            <h3 style={{color:"black"}}>{title}</h3>
        </div>
    );
}
