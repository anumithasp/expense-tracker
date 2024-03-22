import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Route, Routes } from 'react-router-dom';
import "@fontsource/poppins";
import "@fontsource/poppins/100.css"; 
import "@fontsource/poppins/100-italic.css";
import "@fontsource/poppins/200.css"; 
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/300.css"; 
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/400.css"; 
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/500.css"; 
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/600.css"; 
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700.css"; 
import "@fontsource/poppins/700-italic.css";
import "@fontsource/poppins/800.css"; 
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/900.css"; 
import "@fontsource/poppins/900-italic.css";
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn/SignIn';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= '/' element = {<LandingPage />}></Route>
        <Route path= '/login' element={<SignIn />}></Route>
        <Route path='/signup' element ={<SignUp/>}></Route>
        <Route path='/dashboard'element={<Dashboard />}></Route>
        <Route path='/forgotpassword'element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
