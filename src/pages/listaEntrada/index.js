import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit,FiTranh,FiDelete,FiFilePlus, FiTrash }from "react-icons/fi";
import { FaAngry } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom'; 
import Head from '../../componente/Head';

export default function Listaentrada() {

      //  const dados=[
      //       {id:1,nome:"carlos",email:"carlos@gmail.com",senha:"123"},
      //       {id:2,nome:"felipe",email:"felipe@gmail.com",senha:"123"},
      //       {id:3,nome:"nilson",email:"nilson@gmail.com",senha:"123"},
    
      //  ]

       const banco =JSON.parse(localStorage.getItem("cd-entradas") || "[]");

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
        <Head title="Entrada Produto" />
           
           <Link to="/entrada_produto" className='btn-novo'>Novo Produto</Link>
           <table>
             <tr>
                    <th>Id</th>
                    <th>Id produto</th>
                    <th>Quantidade</th>
                    <th>Valor Unitario</th>
                    <th>Data Entrada</th>
                    <th></th>
                    <th></th>
             </tr> 
             {
                banco.map((enpr)=>{
                    return(
                        <tr key={enpr.toString()}>
                            <td>{enpr.id_produto}</td>
                            <td>{enpr.quantidade}</td>
                            <td>{enpr.valor_unitario}</td>
                            <td>{enpr.data_entrada}</td>


                            <td className='botoes'>  
                                <FiTrash 
                                size={18}
                                color='red'
                                onClick={(e)=>apagar(enpr.id)}
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