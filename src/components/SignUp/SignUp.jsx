import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
  
    const handleRegister = () => {
      // Add your registration logic here
      if (agreeTerms) {
        // Perform registration
        console.log('Registration successful');
      } else {
        alert('Please agree to the terms and conditions');
      }
    };
  
    return (
      <div className="signup-container">
        {/* First half section */}
        <div className="signup-section">
          <h2 style={{ color: '#063970' }}>Welcome!</h2>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name"  
              value={name} 
              onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="familyName">Family Name</label>
              <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
              <button type="button" 
              onClick={() => console.log('Family name selected')}>
              Select Family Name
              </button>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
                I agree to terms and conditions
              </label>
            </div>
            <button type="button" 
               onClick={handleRegister} 
               style={{ backgroundColor: '#063970' }}>
               Register
            </button>
          </form>
          <p>Already have an account? 
            <a href="/Sign in"></a>Sign in
          </p>
        </div>
  
        {/* Second half section */}
        <div className="second-half-section">
          <h2>ayoola</h2>
          <p><h5>Get Started by Creating Account </h5>
          Empowering you to track expenses and achieve financial goals seamlessly</p>
          <p>  © Ayoola</p>
        </div>
      </div>
    );
}

export default SignUp