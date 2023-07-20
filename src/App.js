import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AllPackingList from "./pages/AllPackingList";
import Nav from './components/Nav';
import Home from './pages/Home';
import CreatePackingList from "./pages/CreatePackingList";

function App() {
    const [packingLists, setPackingLists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/packingList')
            .then((response) => response.json())
            .then((data) => setPackingLists(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Router>
            <div>
                <Nav/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/packingList/all" element={<AllPackingList packingLists={packingLists}/>}/>
                    <Route path="/packingList/create" element={<CreatePackingList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
