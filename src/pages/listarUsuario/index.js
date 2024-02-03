import React from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Listausuario() {
  const banco = JSON.parse(localStorage.getItem("cd-usuarios") || "[]");

  const removerUsuario = (id) => {
    // Filtra os usuários mantendo apenas aqueles com IDs diferentes do ID fornecido
    const novosUsuarios = banco.filter(usuario => usuario.id !== id);
    
    // Atualiza o localStorage com a nova lista de usuários
    localStorage.setItem("cd-usuarios", JSON.stringify(novosUsuarios));
    
    // Atualiza o estado ou recarrega a página para refletir as mudanças
    // (Você pode usar estado se estiver usando um estado de componente)
    // setState({ usuarios: novosUsuarios });
    // Ou recarrega a página
    window.location.reload();
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Usuario',
      message: 'Deseja realmente excluir esse Usuario?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerUsuario(id)
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