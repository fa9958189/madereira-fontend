import '../../pages/global.css';
import Menu from '../../componente/menu';
import { FiEdit,FiTranh,FiDelete,FiFilePlus, FiTrash }from "react-icons/fi";
import { FaAngry } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom'; 
import Head from '../../componente/Head';

export default function Listausuario() {

      //  const dados=[
      //       {id:1,nome:"carlos",email:"carlos@gmail.com",senha:"123"},
      //       {id:2,nome:"felipe",email:"felipe@gmail.com",senha:"123"},
      //       {id:3,nome:"nilson",email:"nilson@gmail.com",senha:"123"},
    
      //  ]

       const banco =JSON.parse(localStorage.getItem("cd-usuarios") || "[]");

       const apagar = (id) => {
        confirmAlert({
          title: 'Excluir Usuario',
          message: 'deseja realmente excluir esse Usuario?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => alert(`Voce apagou o Usuario id:${id}`)
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
        <Head title="listar de Usuario" />
           
           <Link to="/CadastroUsuario" className='btn-novo'>Novo Cadastro</Link>
           <table>
             <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
             </tr> 
             {
                banco.map((usu)=>{
                    return(
                        <tr key={usu.toString()}>
                            <td>{usu.id}</td>
                            <td>{usu.nome}</td>
                            <td>{usu.email}</td>

                            <td className='botoes'>  
                                <FiEdit size={18}
                                 color='white' 
                                 cursor="pointer"/>                                    
                            </td>

                            <td className='botoes'>  
                                <FiTrash 
                                size={18}
                                color='red'
                                onClick={(e)=>apagar(usu.id)}
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