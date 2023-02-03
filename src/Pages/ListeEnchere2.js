import React,{useEffect,useState} from "react";
import axios from "axios";
import '../css/Login.css';
import '../css/style.css';
import {Link} from "react-router-dom";
import moment from 'moment';

export default function ListeEnchere2()
{
    const [enchere,setEnchere]=useState([]);
    const [chargement,setChargement]=useState('Veuillez patientez...');

    const loadEnchere=async()=>{
        const result=await axios.get("https://ws-enchere-production.up.railway.app/enchere/encheres");
        setEnchere(result.data);
        setChargement('');
    }

    useEffect(()=>{
        loadEnchere();
    },[]);

    return(
        <div className="container">

            <p><Link to={"/Login?isHistorique=1"}><button id="rencherir" type="button" className="btn btn-primary">Mes historiques</button></Link></p>
            <hr/>
            <h1>Liste des encheres:</h1>
            <p id="remarque">*Cliquez sur les images pour voir les details de chaque produit</p>
          <div className="products-container">
          {
                enchere.map((enchere,index)=>(
                  
                  <div key={index} className="product" data-name="p-1">
                  <Link to={"FicheEnchere?enchere_id="+enchere.id}><img src="image/sary.png" alt=""/></Link>
                  <h3>{enchere.produit}</h3>
                  <div id="daty">{moment(enchere.datedebut).format('dddd, MMMM Do YYYY, h:mm:ss a')} - {moment(enchere.datefin).format('dddd, MMMM Do YYYY, h:mm:ss a')}</div>
                  <div class="price"><strong>Prix Min: </strong>{enchere.prixminimal} AR TTC</div>
                  </div>
                ))
          }

          </div>

          <div className="price">
            <p id="chargement">{chargement}</p>
          </div>
        </div>
    )
}