// PasswordReset.jsx
import React, { useState } from 'react';
import '../style/PasswordReset.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, resetPassword } from '../api/authService';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  // step 1: nhập email
  // step 2: nhập code, newPassword và newPasswordConfirm
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({email});
      if(response.status === 200) {
        toast.success("Check your email for the reset password");
        // nếu API BE trả về 200 thì chuyển qua bước 2 là nhập
        // code, newPassword và newPasswordConfirm
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleResetPassword = async(e) => {
    e.preventDefault();
    // kiểm tra newPassword và confirmPassword có giống nhau không
    if(newPassword !== confirmPassword) {
      toast.error("New password and confirm password must be the same");
      return;
    }

    try {
      const response = await resetPassword({email, code, newPassword});
      if(response.status === 200) {
        toast.success("Reset password successfully");
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="form-gap">
      <div className="forgot-container">
        <div className="forgot-row">
          <div className="form-forgot">
            <div className="panel">
              <div className="panel-body">
                <div className="text-center">
                  <h3><i className="fa fa-lock"></i></h3>
                  {step === 1 && (
                    <>
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
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h2>Enter Verification code & reset password</h2>
                      <p>Check your email for the reset password</p>
                      <form onSubmit={handleResetPassword}>
                        <div className='form-group'>
                          <input 
                            type="text"
                            placeholder='Verification code'
                            className='form-control'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button className='btn btn-primary' type='submit'>Reset password</button>
                      </form>
                    </>
                  )}
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