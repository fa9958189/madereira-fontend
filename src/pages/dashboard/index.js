
import React from 'react';
import './styles.css';
import logo from '../../assets/img/Logo.png';
import backgroundImg from '../../assets/img/capa para o projeto.svg';
import Menu from '../../componente/menu';
import imagem from '../../assets/img/lapis.svg'; // Adjust the filename accordingly

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className='menu'>
                <Menu />
            </div>
            <div className='principal'>
                <h1>pagina principal</h1>
                <img src={imagem} alt="Imagem" className="centered-image" />
            </div>
        </div>
    );
}
