import '../../pages/global.css';
import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiArrowUpCircle, FiArchive, FiArrowDownCircle, FiBarChart2, FiDollarSign } from "react-icons/fi"; // Importing React icons
import { FiUsers } from "react-icons/fi"; // Importe o ícone para listar clientes

export default function Menu() {
    return (
        <div>
       
            <nav>
                <Link to="/listausuario" className='link'><FiUser className='icos' />Usuário</Link> {/* User icon */}
                <Link to="/listarCliente" className='link'><FiUsers className='icos' />Clientes</Link> {/* Cliente icon */}
                <Link to="/listarOrcamento" className='link'><FiDollarSign className='icos' />Orçamento</Link> {/* Budget icon */}
                <Link to="/listarGraficos" className='link'><FiBarChart2 className='icos' />Gráficos</Link> {/* Graphs icon - Change to the appropriate route */}
                <Link to="/listaprodutos" className='link'><FiPackage className='icos' />Produto</Link> {/* Product icon */}
                <Link to="/listaentradaProduto" className='link'><FiArrowUpCircle className='icos' />Entrada produto</Link> {/* Product entry icon */}
                <Link to="/listaestoque" className='link'><FiArchive className='icos' />Estoque</Link> {/* Stock icon */}
                <Link to="/listarSaida" className='link'><FiArrowDownCircle className='icos' />Vendas</Link> {/* Exit icon */}            
            </nav>
        </div>
    )
}
