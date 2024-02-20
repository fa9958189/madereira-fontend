import './styles.css';
import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiArrowUpCircle, FiArchive, FiArrowDownCircle } from "react-icons/fi"; // Importando ícones do React

export default function Menu() {
    return (
        <div>
            <h1>Menu</h1>
            <nav>
                <Link to="/listausuario" className='link'><FiUser className='icos' />Usuário</Link> {/* Adicionando ícone de usuário */}
                <Link to="/listacliente" className='link'><FiUser className='icos' />Cliente</Link> {/* Adicionando ícone de usuário */}
                <Link to="/listaprodutos" className='link'><FiPackage className='icos' />Produto</Link> {/* Adicionando ícone de produto */}
                <Link to="/listaentrada_Produto" className='link'><FiArrowUpCircle className='icos' />Entrada produto</Link> {/* Adicionando ícone de entrada de produto */}
                <Link to="/listaestoque" className='link'><FiArchive className='icos' />Estoque</Link> {/* Adicionando ícone de estoque */}
                <Link to="/listarSaida" className='link'><FiArrowDownCircle className='icos' />Saída</Link> {/* Adicionando ícone de saída */}
            </nav>
        </div>
    )
}
