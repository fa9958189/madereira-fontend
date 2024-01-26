import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Logon from './pages/logon'
import Dashbord from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import CadastroUsuario from './pages/cadastroUsuario';
import cadastroProduto from './pages/cadastroProduto';


export default function Rotas(){
   return(
       <BrowserRouter>
          <Routes>
             <Route path="/" exact element={<Logon />} />
             <Route path="/dashboard" element={<Dashbord />} />
             <Route path="/listausuario" element={<Listausuario />} />
             <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
             <Route path="/CadastroProduto" element={<cadastroProduto />} />
             <Route path="/editarusuario/:id" element={<Editarusuario />} />

          </Routes>  
       </BrowserRouter>


   )
}