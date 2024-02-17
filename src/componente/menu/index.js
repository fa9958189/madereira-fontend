import './styles.css';
import {Link} from 'react-router-dom';
export default function Menu(){
    return(
        <div>
            <h1>Menu</h1>
            <nav>
                <Link to="/listausuario" className='link'>Usuário</Link>
                <Link to="/listaprodutos" className='link'>Produto</Link>
                <Link to="/listaEntrada_Produto" className='link'>Entrada produto</Link>
                <Link to="/listaEstoque" className='link'>Estoque</Link>
                <Link to="/listarSaida" className='link'>Saida</Link>

            </nav>
        </div>
    )
}