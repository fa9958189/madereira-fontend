import React, { useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';

export default function CadastroUsuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [limiteCompraPrazo, setLimiteCompraPrazo] = useState("");

    function salvardados(e) {
        e.preventDefault();
        if (nome === "")
            alert("Preencha o campo nome");
        else if (limiteCompraPrazo === "")
            alert("Preencha o campo limite de compra a prazo");
        else if (isNaN(Number(limiteCompraPrazo)))
            alert("O limite de compra a prazo deve ser um valor numérico");
        else {
            const usuario = {
                id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
                nome,
                limiteCompraPrazo: parseFloat(limiteCompraPrazo)
            };

            const banco = JSON.parse(localStorage.getItem("cd-clientes") || "[]");
            banco.push(usuario);
            localStorage.setItem("cd-clientes", JSON.stringify(banco));
            alert("Cliente salvo com sucesso");
            navigate("/listacliente");
        }
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <Menu />
            </div>






            
            <div className='principal'>
                <Head title="Cadastro de Cliente" />
                <div className='form-container'>
                    <form className='form-cadastro' onSubmit={salvardados}>
                        <input type='text'
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder='Digite o nome do Cliente'
                        />
                        <input
                            type='text'
                            value={limiteCompraPrazo}
                            onChange={e => setLimiteCompraPrazo(e.target.value)}
                            placeholder='Digite o limite de compra a prazo'
                        />
                        <div className='acao'>
                            <button className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button className='btn-cancel' type="button" onClick={() => navigate("/listacliente")}>
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
