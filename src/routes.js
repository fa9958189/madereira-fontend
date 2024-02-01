import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Logon from './pages/logon'
import Dashbord from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import Listaproduto from './pages/listarProduto';
import CadastroUsuario from './pages/cadastroUsuario';
import Cadastroproduto from './pages/cadastroProduto';
import Editarusuario from './pages/editarUsuario';


export default function Rotas(){
   return(
       <BrowserRouter>
          <Routes>
             <Route path="/" exact element={<Logon />} />
             <Route path="/dashboard" element={<Dashbord />} />
             <Route path="/listausuario" element={<Listausuario />} />
             <Route path="/listaprodutos" element={<Listaproduto />} />
             <Route path="/cadastrousuario" element={<CadastroUsuario />} />
             <Route path="/cadastroproduto" element={<Cadastroproduto />} />
             <Route path="/editarusuario/:id" element={<Editarusuario />} />
       
             {/* <Route path="/editarusuario/:id" element={<Editarusuario />} /> */}

          </Routes>  
       </BrowserRouter>


   )
}