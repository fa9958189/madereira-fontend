
import'./styles.css'
import logo from'../../assets/img/Logo.png'
import Menu from '../../componente/menu'

export default function Dashboard() {
    return (

    <div className="dashboard-container">

        <div className='menu'>
           
            <Menu />
        </div>

        <div className='principal'>
           <h1>pagina principal</h1>
        </div>
       
        
    </div>
  
    )
  
  }