import './App.css';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Components/Home/Admin';


function App() {
  return (
    <div className="App">
      <div>
      <Routes>
        <Route path='/' exact element={<Login/>} />
        <Route path="/register" exact element={<Register/>} />   
        <Route path="/admin" exact element={<Admin/>} />  
      </Routes>
      </div>
    
    </div>
  );
}

export default App;
