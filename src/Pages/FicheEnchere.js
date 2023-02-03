import React,{useEffect,useState} from "react";
import axios from "axios";
import '../css/Login.css';
import {Link,useLocation} from "react-router-dom";
import moment from 'moment';

export default function FicheEnchere()
{
    const [enchere,setEnchere]=useState('');
    const [chargement,setChargement]=useState('Veuillez patientez...');

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const enchere_id =parseInt(query.get('enchere_id'),10);
    
    const loadEnchere=async()=>{
        const result=await axios.get("https://ws-enchere-production.up.railway.app/enchere/encheres/"+enchere_id);
        setEnchere(result.data);
        setChargement('');
    }

    useEffect(()=>{
        loadEnchere();
    },[]);

    if(chargement.length==0){
    return(
        <div className="container">
            
            <div>
                <img src="image/sary.png" alt="" height="400px"/>
                <h3 className="title">{enchere.produit}</h3>
                
                <div id="daty">{moment(enchere.datedebut).format('dddd, MMMM Do YYYY, h:mm:ss a')} - {moment(enchere.datefin).format('dddd, MMMM Do YYYY, h:mm:ss a')}</div>
                <h3><strong>Description:</strong></h3>
                <p id="description">{enchere.description}</p>
                <div id="detail">{enchere.prixminimal} AR</div>
                
                <div>
                    <Link to={"/Login?enchere_id="+enchere_id}><button id="rencherir" type="button" className="btn btn-primary">Rencherir</button></Link>
                </div>
            </div>
        </div>
        
    )
    }
    
    else
    {
        return(
            <div className="container">
                <p id="chargement">{chargement}</p>
            </div>
        )
    }
}