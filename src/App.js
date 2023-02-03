import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './Pages/Login';
import ListeEnchere2 from './Pages/ListeEnchere2';
import FicheEnchere from './Pages/FicheEnchere';
import Rencherir from './Pages/Rencherir';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Historique from './Pages/Historique';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<ListeEnchere2/>}/>
            <Route exact path="/Login" element={<Login/>}/>
            <Route exact path="/Rencherir" element={<Rencherir/>}/>
            <Route exact path="/Historique" element={<Historique/>}/>
            <Route exact path="/FicheEnchere" element={<FicheEnchere/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
