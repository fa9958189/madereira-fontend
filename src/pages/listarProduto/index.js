import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit,FiTranh,FiDelete,FiFilePlus, FiTrash }from "react-icons/fi";
import { FaAngry } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom'; 
import Head from '../../componente/Head';

export default function Listaproduto() {

      //  const dados=[
      //       {id:1,nome:"carlos",email:"carlos@gmail.com",senha:"123"},
      //       {id:2,nome:"felipe",email:"felipe@gmail.com",senha:"123"},
      //       {id:3,nome:"nilson",email:"nilson@gmail.com",senha:"123"},
    
      //  ]

       const banco =JSON.parse(localStorage.getItem("cd-produtos") || "[]");

       const apagar = (id) => {
        confirmAlert({
          title: 'Excluir Produto',
          message: 'Deseja realmente excluir esse Produto?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => alert(`Voce apagou o Produto id:${id}`)
            },
            {
              label: 'Nao',
              onClick: () => alert('Click No')
            }
          ]
        });
      };

      

      

    return (

    <div className="dashboard-container">

        <div className='menu'>

            <Menu />
        </div>
        <div className='principal'>
        <Head title="listar de Produto" />
           
           <Link to="/CadastroProduto" className='btn-novo'>Novo Cadastro</Link>
           <table>
             <tr>
                    <th>Id</th>
                    <th>status</th>
                    <th>Descriçao</th>
                    <th>Estoque minimo</th>
                    <th>Estoque maximo</th>
                    <th></th>
                    <th></th>
             </tr> 
             {
                banco.map((pro)=>{
                    return(
                        <tr key={pro.toString()}>
                            <td>{pro.id}</td>
                            <td>{pro.status}</td>
                            <td>{pro.descricao}</td>
                            <td>{pro.estoque_minimo}</td>
                            <td>{pro.estoque_maximo}</td>

                            <td className='botoes'>  
                                    <Link to={`/editarusuario/${pro.id}`}>
                                 <FiEdit size={18} color='yellow'  /> 
                               </Link>       
                            </td>

                            <td className='botoes'>  
                                <FiTrash 
                                size={18}
                                color='red'
                                onClick={(e)=>apagar(pro.id)}
                                cursor="pointer"/> 
                            </td>

                
                        
                        </tr>
                    )
                })
             }


           </table>
        </div>       
    </div>
    
  
    )
  
  }