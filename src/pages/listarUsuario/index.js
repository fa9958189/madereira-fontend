import React, { useEffect, useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';

export default function Listausuario() {
  const [banco, setBanco] = useState([]);

  async function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao consultar o CEP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }

  function mostrardados() {
    api.get('/usuario')
      .then(res => {
        console.log(res.data.usuario);
        setBanco(res.data.usuario);
      });
  }

  useEffect(() => {
    mostrardados();
  }, []);

  const removerUsuario = (id) => {
    const novosUsuarios = banco.filter(usuario => usuario.id !== id);
    localStorage.setItem("cd-usuarios", JSON.stringify(novosUsuarios));
    window.location.reload();
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Usuario',
      message: 'Deseja realmente excluir esse Usuario?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>{

            api.delete(`/usuario/${id}`)
            .then(res=>{
              if(res.status==200){
                alert(`Voce apagou o usuario id:${id}`);
                mostrardados();
                 
              }else{
                alert("Houve um proplema no servodor")
              }
            })
          

          } 
        },
        {
          label: 'Não',
          onClick: () => alert('Clique em Não')
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
        <Head title="Lista de Usuários" />
        <Link to="/CadastroUsuario" className='btn-novo'>Novo Cadastro</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {banco.map((usu) => (
              <tr key={usu.id}>
                <td>{usu.id}</td>
                <td>{usu.nome}</td>
                <td>{usu.email}</td>
                <td className='botoes'>
                  <Link to={`/editarusuario/${usu.id}`}>
                    <FiEdit size={18} color='yellow' />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagar(usu.id)}
                    cursor="pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
