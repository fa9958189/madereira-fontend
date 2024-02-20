import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logon from './pages/logon';
import Dashbord from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import Listaproduto from './pages/listarProduto';
import CadastroUsuario from './pages/cadastroUsuario';
import Cadastroproduto from './pages/cadastroProduto';
import Editarusuario from './pages/editarUsuario';
import Listaentrada from './pages/listaEntrada';
import Entradaproduto from './pages/entradaProduto';
import CadastroUsuario1 from './pages/cadastroUsuario1';
import Listaestoque from './pages/listarEstoque';
import Listasaida from './pages/listarSaida';  
import Saidaproduto from './pages/saidaProduto';
import CadastroCliente from './pages/cadastroCliente'; 
import ListarCliente from './pages/listarCliente'; 

export default function Rotas() {
   return (
       <BrowserRouter>
          <Routes>
             <Route path="/" element={<Logon />} />
             <Route path="/dashboard" element={<Dashbord />} />
             <Route path="/listausuario" element={<Listausuario />} />
             <Route path="/listaprodutos" element={<Listaproduto />} />
             <Route path="/listaentrada_produto" element={<Listaentrada />} />
             <Route path="/cadastrousuario" element={<CadastroUsuario />} />
             <Route path="/cadastrousuario1" element={<CadastroUsuario1 />} />
             <Route path="/cadastroproduto" element={<Cadastroproduto />} />
             <Route path="/entradaproduto" element={<Entradaproduto />} />
             <Route path="/editarusuario/:id" element={<Editarusuario />} />
             <Route path="/listaestoque" element={<Listaestoque />} />
             <Route path="/listarsaida" element={<Listasaida />} />
             <Route path="/saidaProduto" element={<Saidaproduto />} />
             <Route path="/cadastroCliente" element={<CadastroCliente />} /> 
             <Route path="/listaCliente" element={<ListarCliente />} /> 
          </Routes>  
       </BrowserRouter>
   );
}
