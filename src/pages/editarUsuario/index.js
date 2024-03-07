import React,{useState, useEffect} from 'react';

import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import {useNavigate,useParams} from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';

export default function Editarusuario(){
  let { id } = useParams();
  const navigate =useNavigate();
  const [nome,setNome]  = useState("");
  const [email,setEmail]  = useState("");
  const [senha,setSenha]  = useState("");
  const [banco,setBanco] = useState([]);
  const [status, setStatus] = useState(false);

  
  
  const usuario={    
     id, 
      nome,
      email,
      senha
  }
  useEffect(()=>{
  
      mostrardados(id);


   
  },[])
  async function mostrardados(idu) {

      const response = await api.get(`/usuario/${idu}`);

      setNome(response.data.usuario.nome || "");
      setEmail(response.data.usuario.email || "");
 

  
}
  
  


  function salvardados(e){
    e.preventDefault();

  let i=0;
  if(nome=="")
  i++;
 else if(email=="")
  i++;
 else if(senha=="")
 i++;
if(i==0)
 {
  //  const banco =JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
  //  let dadosnovos = banco.filter(item => item.id !== id);
  //  console.log(dadosnovos);
  //  dadosnovos.push(usuario);
  //  localStorage.setItem("cd-usuarios",JSON.stringify(dadosnovos));
  //  alert("Usuário salvo com sucesso");
  api.put('/usuario',usuario,
  {headers:{"Content-Type":"application/json"}})
  .then(function(response){
      console.log(response.data)
      alert(response.data.mensagem);
      navigate('/listausuario');
  })

 }else{
  alert("Verifique! Há campos vazios!")
 }
  }
 
  return(
    <div className="dashboard-container">
      
        <div className='menu'>
     
        <Menu />
        </div>
        <div className='principal'>
        <Head title="Editar Usuário" />
        <div className='form-container'>
        <form className='form-cadastro' onSubmit={salvardados} >
            <input 
            type='text'
            value={nome}
            onChange={e=>setNome(e.target.value)}
             placeholder='Digite o nome do usuário'
              />
            <input 
                type='email' 
                value={email}
               
                placeholder='Digite o email'
             />
          
          
            <input 
                    type='password' 
                    value={senha}
                    onChange={e=>setSenha(e.target.value)}
                    placeholder='Digite a senha' 
            />
            
            <div className='acao'>
            <button className='btn-save'>
               <FaSave />
              Salvar
            </button>
            <button className='btn-cancel'>
            <MdCancel />
              Cancelar</button>
            </div>
        </form>
   
        </div>
        </div>
    </div>

   )

}