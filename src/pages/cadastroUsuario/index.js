import React,{useState} from 'react';
import '../../pages/global.css';
import Menu from '../../componente/menu';
import { FiEdit,FiTranh,FiDelete,FiFilePlus, FiTrash }from "react-icons/fi";
import { FaAngry } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from 'react-router-dom'; 
import Head from '../../componente/Head';

export default function CadastroUsuario() {
    const navigate = useNavigate ();
    const [nome,setNome]  = useState("");
    const [email,setEmail]  = useState("");
    const [senha,setSenha]  = useState("");
    
    const usuario={
        id: Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
        nome,
        email,
        senha
    }
  
    function salvardados(e){
      e.preventDefault();
     // console.log(usuario);
     if(nome!=="")
     alert("preencha o campo nome")
    else if(email!=="")
    alert("preencha o campo email")
    else if(senha=="")
    alert("preencha o campo senha")
    else{
        const banco =JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
        banco.push(usuario);
        localStorage.setItem("cd-usuarios",JSON.stringify(banco));
       alert("Usuário salvo com sucesso");
       navigate("/listausuario");
    }

    }

    return (

    <div className="dashboard-container">
       

        <div className='menu'>

            <Menu />
        </div>
        <div className='principal'>
        <Head title="Cadastro de Usuario" />
        
       
    <div className='form-container'>
    <form className='form-cadastro' onSubmit={salvardados}>
            <input type='text'
            value={nome}
            onChange={e=>setNome(e.target.value)}
             placeholder='Digite o nome do Usuario'
              /> 
            <input 
            type='text' 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder='Digite o E-mail' 
            /> 
            <input 
            type='text' 
            value={senha}
            onChange={e=>setSenha(e.target.value)}
            placeholder='Digite a Senha' 
            /> 

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