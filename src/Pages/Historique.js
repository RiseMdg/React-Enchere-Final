import React,{useEffect,useState} from "react";
import axios from "axios";
import {Link,useNavigate,useLocation} from "react-router-dom";

export default function Historique()
{
  const [enchere,setEnchere]=useState([]);
  const [chargement,setChargement]=useState('Veuillez patientez...');

  const navigate=useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const user_id =parseInt(query.get('user_id'),10);

    const user={user_id};

  const loadEnchere=async()=>{
    console.log(user);
      const result=await axios.post("https://ws-enchere-production.up.railway.app/enchere/misesbyuserid",user);
      setEnchere(result.data);
      setChargement('');
  }

  useEffect(()=>{
      loadEnchere();
  },[]);

    return(
        <div className="container" id="historique">
            <div className="row">
            <h1>Historique de mes propres encheres:</h1>
            <p id="chargement">{chargement}</p>
        </div>
        <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">Numero Enchere</th>
                <th scope="col">Mise</th>
              </tr>
            </thead>
            <tbody>
              {
                enchere.map((enchere,index)=>(
                  <tr key={index}>
                    <td>{enchere.enchere_id}</td>
                    <td>{enchere.prixmise}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    )
}