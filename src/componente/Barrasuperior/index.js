import {FiLogOut} from 'react-icons/fi';
import { FaReply } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import '../../pages/global.css';

export default function Barrasuperior(){
    const navigate = useNavigate();
    function retornar(){
      navigate(-1);
    }
    function sair(){
       navigate("/");
    }
   const confirmarsaida=()=> {
       confirmAlert({
           message: "Deseja realmente sair?",
           buttons: [
          {
              label: 'Sim',
              onClick: () => {
                sair();
             }
          },
          {
             label: 'Não',
            // onClick: () => alert('Click No')
           }
           ]
       });
    
        };
    return(
        <div className="barra">
            <FaReply onClick={retornar} size={24} color='blue' />
            <h1 style={{color:"white"}}>Ideal Madeiras</h1>
            <FiLogOut onClick={confirmarsaida} size={24} color='red' />
        </div>
    )
}