import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';

function FirstStep( {visibleSteps,setVisibleSteps,setCurrentStep,formData,setFormData} ) {

  const [email, setEmail] = useState(formData.email);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [password, setPassword] = useState(formData.password);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(formData.password);
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  
  let submitStep = (event) => {
      //prevent the form from submission
      event.preventDefault();
  
      //constructs the form data object
      const thisFormData = {
          email,
          password
      };
  
      //initialize the validator
      let validator = new SimpleReactValidator();
  
      //validates the email value as required and must match being an email
      validator.message('email', email, 'required|email');
      //validates the pasword value as required and minimus of 8 letter characters
      validator.message('password', password, 'required|min:8');
  
      //checks if email validation if
      //if failed, it sets the email error message using the setEmailErrorText hook
      if (validator.errorMessages.email !== null) {
          setEmailErrorText(validator.errorMessages.email);
      }

      //checks if password validation if
      //if failed, it sets the password error message using the setPasswordErrorText hook
      if (validator.errorMessages.password !== null) {
          setPasswordErrorText(validator.errorMessages.password);
      }

      //checks if password and confirm password value matches
      //if failed, it sets the confrim password error message using the setConfrirmPasswordErrorText hook
      if (password.length < 1 || password !== confirmPassword) {
          setConfirmPasswordErrorText("Confirmed password does not match");
      }
  
      // checks if all validations were passed
      if (password === confirmPassword && validator.allValid()) {

        //enables second form step to be viewed
          setVisibleSteps({
              ...visibleSteps,
              secondStep: true
          });
        
        //updates the form data for the whole step
          setFormData({
              ...formData,
              ...thisFormData
          });

        // switches view to the second step
          setCurrentStep(2);
      }
  
      return false;
  }

  //handle the email onchange event handler and set the email value using the setEmail hook
  let handleEmail = ({
      target
  }) => setEmail(target.value);

  //handles the password onchange event handler and set the password value using the setPassword hook
  let handlePassword = ({
      target
  }) => setPassword(target.value);
  

  //handles the confrim password event handler and set the confirmed passwod valueusing the setConfirmPassword hook
  let handleConfirmPassword = ({
      target
  }) => setConfirmPassword(target.value);

  return (
    <form onSubmit={ submitStep }>
        <div className="form-group">
            <label> Email Address : </label>
            <input className="form-control" type="text" value={ email } placeholder=" Enter email address" onChange={ handleEmail } onFocus={ () => setEmailErrorText('') } />
            { emailErrorText && <span className="form-error"> { emailErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Password : </label>
            <input className="form-control" type="password" value={ password } placeholder=" Enter password" onChange={ handlePassword } onFocus={ () => setPasswordErrorText('') }/>
            { passwordErrorText && <span className="form-error"> { passwordErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Confirm Password : </label>
            <input className="form-control" type="password" value={ confirmPassword } placeholder=" Confirm password" onChange={ handleConfirmPassword } onFocus={ () => setConfirmPasswordErrorText('') }/>
            { confirmPasswordErrorText && <span className="form-error"> { confirmPasswordErrorText } </span> }
        </div>
        <div className="form-group" style={{ marginTop: '40px'}}>
            <button className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} disabled> Previous </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Next </button>
        </div>
    </form>
  );
}

FirstStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default FirstStep;