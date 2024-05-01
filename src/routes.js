import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import Listaproduto from './pages/listarProduto';
import CadastroUsuario from './pages/cadastroUsuario';
import Cadastroproduto from './pages/cadastroProduto';
import Editarusuario from './pages/editarUsuario';
import Listaentrada from './pages/listaEntrada';
import Entradaproduto from './pages/cadastroEntrada';
import Listaestoque from './pages/listarEstoque';
import Listasaida from './pages/listarSaida';  
import CadastroSaida from './pages/cadastroSaida';
import ListarGraficos from './pages/listarGraficos';
import Editarproduto from './pages/editarProduto';
import CadastroOrcamento from './pages/cadastroOrcamento';
import ListarOrcamento from './pages/listarOrcamento'; // Importação do novo componente

export default function Rotas() {
   return (
       <BrowserRouter>
         <Routes>
             <Route path="/" element={<Logon />} />
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/listausuario" element={<Listausuario />} />
             <Route path="/listaprodutos" element={<Listaproduto />} />
             <Route path="/listaentradaProduto" element={<Listaentrada />} />
             <Route path="/cadastrousuario" element={<CadastroUsuario />} />
             <Route path="/cadastroproduto" element={<Cadastroproduto />} />
             <Route path="/entradaproduto" element={<Entradaproduto />} />
             <Route path="/editarusuario/:id" element={<Editarusuario />} />
             <Route path="/listaestoque" element={<Listaestoque />} />
             <Route path="/listarsaida" element={<Listasaida />} />
             <Route path="/cadastroSaida" element={<CadastroSaida />} /> 
             <Route path="/listarGraficos" element={<ListarGraficos />} /> 
             <Route path="/editarproduto/:id" element={<Editarproduto />} /> 
             <Route path="/cadastroOrcamento" element={<CadastroOrcamento />} />
             <Route path="/listarOrcamento" element={<ListarOrcamento />} /> {/* Nova rota para listar orçamento */}
          </Routes>  
       </BrowserRouter>
   );
}
