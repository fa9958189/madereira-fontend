import '../../pages/global.css';
import Menu from '../../componente/menu';



export default function Listausuario() {

       const dados=[
            {id:1,nome:"carlos",email:"carlos@gmail.com",senha:"123"},
            {id:2,nome:"felipe",email:"felipe@gmail.com",senha:"123"},
            {id:3,nome:"felipe",email:"nilson@gmail.com",senha:"123"}
    
       ]
    return (

    <div className="dashboard-container">

        <div className='menu'>
            <h1>menu</h1>
            <Menu />
        </div>
        <div className='principal'>
           <h1>listar de Usuario</h1>
           <table border={1}>
             <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
             </tr> 
             {
                dados.map((usu)=>{
                    return(
                        <tr key={usu.toString()}>
                            <td>{usu.id}</td>
                            <td>{usu.nome}</td>
                            <td>{usu.email}</td>
                        </tr>
                    )
                })
             }


           </table>
        </div>       
    </div>
  
    )
  
  }