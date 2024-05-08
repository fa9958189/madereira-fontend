
import React from 'react';
import './styles.css';
import logo from '../../assets/img/Logo.svg';
import backgroundImg from '../../assets/img/capa para o projeto.svg';
import Menu from '../../componente/Menu';
import imagem from '../../assets/img/Logo.svg'; // Adjust the filename accordingly
import Barrasuperior from '../../componente/Barrasuperior';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
        <Barrasuperior />
        <div className="dashboard-main">
            <div className='menu'>
                <Menu />
            </div>
            <div className='principal'>
                <h1>pagina principal</h1>
                <img src={imagem} alt="Imagem" className="centered-image" />
            </div>
            </div>
        </div>
    );
}
