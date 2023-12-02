import './styles.css'
import Logo from '../../assets/img/Logo.png';
import {useNavigate} from 'react-router-dom';
import backgroundImg from '../../assets/img/capa para o projeto.svg';



export default function Logon() {
const navigate = useNavigate();
  
const logar =(e)=>{
    e.preventDefault();
    navigate('/dashboard');
}

  return (
    <div className="logon-container">
      <div className='logo'>
        <img src={Logo}></img>
      </div>
      <section className="form">
        <h1>Faça seu login</h1>
        <form onSubmit={logar}>
          <input placeholder="Email" />
          <input placeholder="Senha" type='password' />
          <button type="submit">Entrar</button>
          <a href="#">Novo Cadastro</a>
        </form>
      </section>
      
    </div>

  )

}