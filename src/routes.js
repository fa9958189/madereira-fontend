import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Logon from './pages/logon'
import Dashbord from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import CadastroUsuario from './pages/cadastroUsuario';
import Cadastroproduto from './pages/cadastroProduto';


export default function Rotas(){
   return(
       <BrowserRouter>
          <Routes>
             <Route path="/" exact element={<Logon />} />
             <Route path="/dashboard" element={<Dashbord />} />
             <Route path="/listausuario" element={<Listausuario />} />
             <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
             <Route path="/cadastroproduto" element={<Cadastroproduto />} />
       
             {/* <Route path="/editarusuario/:id" element={<Editarusuario />} /> */}

          </Routes>  
       </BrowserRouter>


   )
}