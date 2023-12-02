import React,{useState} from 'react';
import '../../pages/global.css';
import Menu from '../../componente/menu';
import { FiEdit,FiTranh,FiDelete,FiFilePlus, FiTrash }from "react-icons/fi";
import { FaAngry } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom'; 
import Head from '../../componente/Head';

export default function CadastroUsuario() {

    const [nome,setnome] = useState("")

    return (

    <div className="dashboard-container">
       

        <div className='menu'>

            <Menu />
        </div>
        <div className='principal'>
        <Head title="Cadastro de Usuario" />
        
       
    <div className='form-container'>
    <form className='form-cadastro'>
            <input type='text'
            value={nome}
            onChange={e=>setnome(e.target.value)}
             placeholder='Digite o nome do Usuario'
              /> 
            <input type='text' placeholder='Digite o E-mail' /> 
            <input type='text' placeholder='Digite a Senha' /> 

            <div className='acao'>

            <button className='btn-save'>
            <FaSave />
            Salvar
            </button>
            
            
            <button className='btn-cancel'>
            <ImCancelCircle />
            Cancelar
            </button>  

            </div> 
           </form>
   


            </div>
        </div>       
    </div>
  
    )
  
  }