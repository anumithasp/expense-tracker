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

export function formatNum(number) {
  var decPlaces = 2;
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {

    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round(number * decPlaces / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if ((number == 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
}

import Insights from './components/Insights/Insights';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= '/' element = {<LandingPage />}></Route>
        <Route path= '/login' element={<SignIn />}></Route>
        <Route path='/signup' element ={<SignUp/>}></Route>
        <Route path='/dashboard'element={<Dashboard />}></Route>
        <Route path='/insights'element={<Insights />}></Route>
        <Route path='/forgotpassword'element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
