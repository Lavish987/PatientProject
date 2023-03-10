import './App.css';
import Home from './Home';
import {
  
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import UserDashboard from './pages/userRoute/UserDashboard';
import PrivateRoute from './RouteComponent/PrivateRoute';
import ProfileInfo from './pages/userRoute/ProfileInfo';
import Contact from './Contact';
import About from './About';
import UpdatePass from './pages/userRoute/updatePass';
import DoctorLogin from './MyComponent/DoctorLogin';
import DoctorDashboard from './pages/DoctorRoute/DoctorDashboard';
import DoctorPrivateRoute from './RouteComponent/DoctorPrivateRoute';
import DoctorInfo from './pages/DoctorRoute/DoctorInfo';
import BackLogin from './RouteComponent/BackLogin';
import { ToastContainer } from 'react-toastify';



function App() {
  
  return (
    <BrowserRouter>
    <ToastContainer/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/doctor' element={<DoctorLogin/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/user' element={<PrivateRoute/>}>
        <Route path='dashboard' element={<UserDashboard/>}/>
        <Route path='profile-info' element={<ProfileInfo/>}/>
        <Route path='updatePass' element={<UpdatePass/>}/>
          </Route>
          <Route path='/doct' element={<DoctorPrivateRoute/>}>
        <Route path='dashboard' element={<DoctorDashboard/>}/>
        <Route path='doctor-info' element={<DoctorInfo/>}/>
          </Route>

       </Routes>
       </BrowserRouter>
  );
}

export default App;
