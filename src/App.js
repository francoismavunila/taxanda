import './App.css';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Components/Home/Admin';
import Layout from './Layout.js'
import Editor from './Components/Home/Editor';
import General from './Components/Home/General';
import Missing from './Components/Missing';
import { Home } from '@material-ui/icons';
import RequireAuth from './Components/RequireAuth';
import UnAthorized from './Components/UnAuthorized';
import HOme from './Components/Home/Home'
import Users from './Components/Home/Users';
import Driver from './Components/Driver/Driver'
import AddFinger from './Components/Driver/AddFinger';

function App() {
  return (
  
  <Routes>
    <Route path="/" element={<Layout/>}>
      {/* public routes */}
      <Route path="login" element={<Login/>}/>
      <Route path="unAthorized" element={<UnAthorized/>}/>
      <Route path="driver/registration"  element={<Driver />} />
      <Route path='registration' element={<Register/>}/>
      <Route path='addfingerprint' element={<AddFinger/>}/>
      
      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={[992,995,998]} />}  >
        <Route path="/" element={<HOme/>}/>
        <Route path='general' element={<General/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={[992,995]} />}  >
         <Route path='editor' element={<Editor/>}/>
         <Route path='admin' element={<Admin/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={[992]} />}  >
          
          <Route path='/users' element={<Users/>} />
      </Route>
      

      {/* missing routes catch */}
      <Route path='*' element={<Missing/>}/>
    </Route>
  </Routes>
  );
}

export default App;
