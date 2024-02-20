import React from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function listacliente() {
  const usuarios = JSON.parse(localStorage.getItem("cd-clientes") || "[]");

  const removerUsuario = (id) => {
    const novosUsuarios = usuarios.filter(usuario => usuario.id !== id);
    localStorage.setItem("cd-clientes", JSON.stringify(novosUsuarios));
    window.location.reload();
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Usuário',
      message: 'Deseja realmente excluir esse usuário?',
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
        <Head title="Lista de Clientes" />
        <Link to="/CadastroCliente" className='btn-novo'>Cadastro Cliente</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Limite de Compra a Prazo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.limiteCompraPrazo}</td>
                <td className='botoes'>
                  <Link to={`/editarusuario/${usuario.id}`}>
                    <FiEdit size={18} />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    onClick={() => apagar(usuario.id)}
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
