// PasswordReset.jsx
import React, { useState } from 'react';
import '../style/PasswordReset.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="form-gap">
      <div className="forgot-container">
        <div className="forgot-row">
          <div className="form-forgot">
            <div className="panel">
              <div className="panel-body">
                <div className="text-center">
                  <h3><i className="fa fa-lock"></i></h3>
                  <h2>Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  
                  <div className="panel-body">
                    <form id="register-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                          <i class="fa fa-envelope"></i>
                          </span>
                          <input 
                            id="email" 
                            name="email" 
                            placeholder="email address" 
                            className="form-control"  
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <input 
                          name="recover-submit" 
                          className="btn btn-primary" 
                          value="Reset Password" 
                          type="submit"
                        />
                      </div>
                      <input type="hidden" className="hide" name="token" id="token" value="" /> 
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;