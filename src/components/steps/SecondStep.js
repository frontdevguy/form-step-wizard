import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
 
function SecondStep( {formData,setFormData,visibleSteps,setVisibleSteps,setCurrentStep}  ) {

  const [address, setAddress] = useState(formData.address);
  const [addressErrorText, setAddressErrorText] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth);
  const [dateOfBirthErrorText, setDateOfBirthErrorText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
  const [gender, setGender] = useState(formData.gender);
  const [genderErrorText, setGenderErrorText] = useState('');

  //handles this step submission
  let submitStep = (event) => {
      //prevent the form from being submitted
      event.preventDefault();
      
      //constructs this step form data
      const thisFormData = {
          address,
          phoneNumber,
          gender,
          dateOfBirth
      };
      
      //initilizie the validator with custom validaton rules
      let validator = new SimpleReactValidator({
          validators: {
              us_phone_number: { // name the rule
                  message: 'The :attribute must be a valid US Phone Number.',
                  rule: (val, params, validator) => {
                      return val.trim().match(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/g) !== null
                  },
                  messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)), // optional
                  required: true // optional
              },
              date_of_birth: { // name the rule
                  message: 'The :attribute must be a valid date of birth.',
                  rule: (val, params, validator) => {
                      return val.trim().match(/^([0-2][0-9]|(3)[0-1])(\/)(((0?)[0-9])|((1)[0-2]))(\/)\d{4}$/g) !== null
                  },
                  messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)), // optional
                  required: true // optional
              }
          }
      });

      //validates the address valueas required
      validator.message('address', address, 'required');
      //validates the phone numbe value as required and must be of us phone number format
      validator.message('phoneNumber', phoneNumber, 'required|us_phone_number');
      //validates the date of birth value as required and must be of the datae of birth dd/mmm/yyyy format
      validator.message('dateOfBirth', dateOfBirth, 'required|date_of_birth');

      //checks if address value validation failed
      //if failed, it set the address error text using the setAddressErrorText hook
      if (validator.errorMessages.address !== null) {
          setAddressErrorText(validator.errorMessages.address);
      }

      //checks if phone number value validation failed
      //if failed, it set the phone number error text using the setPhonNumberErrorText hook
      if (validator.errorMessages.phoneNumber !== null) {
          setPhoneNumberErrorText(validator.errorMessages.phoneNumber);
      }

      //checks if date of birth value validation failed
      //if failed, it set the date of birth error text using the setDateOfBirthErrorText hook
      if (validator.errorMessages.dateOfBirth !== null) {
          setDateOfBirthErrorText(validator.errorMessages.dateOfBirth);
      }

      //checks if gender value validation failed
      //if failed, it set the gender error text using the setgenderErrorText hook
      if (!(String(gender) === 'male' || String(gender) === 'female')) {
          setGenderErrorText("Select a valid gender");
      }

      //checks if all validations were passed
      if ((String(gender) === 'male' || String(gender) === 'female') && validator.allValid()) {
          //enables the third step to be viewed
          setVisibleSteps({
              ...visibleSteps,
              thirdStep: true
          });

          //updates the whole form data
          setFormData({
              ...formData,
              ...thisFormData
          });

          //switches view to the third step
          setCurrentStep(3);
      }

      return false;
  }

  //handles the address onchange event handler by setting the address value using the setAddress hook
  let handleAddress = ({
      target
  }) => setAddress(target.value);

  //handles the phone number onchange event handler by setting the phone number value using the setPhoneNumber hook
  let handlePhoneNumber = ({
      target
  }) => setPhoneNumber(target.value);

  //handles the date of birth onchange event handler by setting the date of birth using the setDateOfBirth hook
  let handleDateOfBirth = ({
      target
  }) => setDateOfBirth(target.value);

  //handles the male onchange event when the male gender is selected
  let selectMaleGender = () => {
      setGender('male');
      setGenderErrorText('');
  }

  //handles the male onchange event when the female gender is selected
  let selectFemaleGender = () => {
      setGender('female');
      setGenderErrorText('');
  }
  
  return (
    <form onSubmit={ submitStep }>
        <div className="form-group">
            <label> Full Address : </label>
            <input className="form-control" value={ address } placeholder=" Enter address" onChange={ handleAddress } onFocus={ () => setAddressErrorText('') } />
            { addressErrorText && <span className="form-error"> { addressErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Date of Birth : </label>
            <div className="customDateOfBirthPickerWidth">
                <InputMask mask="99/99/9999" maskChar={null} value={dateOfBirth} onChange={handleDateOfBirth} placeholder=" Enter Date of Birth" onFocus={ () => setDateOfBirthErrorText('') } className="form-control" />
            </div>
            { dateOfBirthErrorText && <span className="form-error"> { dateOfBirthErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Phone Number : </label>
            <InputMask mask="999-999-9999" value={phoneNumber} onChange={handlePhoneNumber} onFocus={ () => setPhoneNumberErrorText('') } placeholder=" Enter Phone Number" maskChar={null} className="form-control" />
            { phoneNumberErrorText && <span className="form-error"> { phoneNumberErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Gender : </label>
            <div>
                <label className="mr-3">
                    <input type="radio" className="mr-1" name="gender" defaultChecked={gender==='male' } onChange={ selectMaleGender } /> Male
                </label>
                <label className="mr-3">
                    <input type="radio" className="mr-1" name="gender" defaultChecked={gender==='female' } onChange={ selectFemaleGender } /> Female
                </label>
            </div>
            { genderErrorText && <span className="form-error"> { genderErrorText } </span> }
        </div>
        <div className="form-group" style={{ marginTop: '40px'}}>
            <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} onClick={ () => setCurrentStep(1) }> Previous </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Next </button>
        </div>
    </form>
  );
}

SecondStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default SecondStep;