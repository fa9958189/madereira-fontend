import'./styles.css'
import logo from'../../assets/img/Logo.png'


export default function Logon() {
    return (
      <div className="logon-container">
        <div className='logo'>
            <img src={logo} />
        </div>
        <section className="form">
          <h1>Faça seu login</h1>
          <form>
            <input placeholder="Email" />
            
            <input placeholder="Senha"  type='password'/>
            <button type="submit">Entrar</button>
            <a href="#">Novo Cadastro</a>
          </form>
        </section>
      </div>
  
    )
  
  }