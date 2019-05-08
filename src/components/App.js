import React, { useState } from 'react';
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
import ThirdStep from './steps/ThirdStep';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  //set hook getter and setter hook for the whole form data
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      address: '',
      dateOfBirth: '01/01/1990',
      phoneNumber: '',
      gender: 'male',
      packageType: 1
  })
  
  const [visibleSteps, setVisibleSteps] = useState({
      firstStep: true,
      secondStep: false,
      thirdStep: false
  });
  
  let showStep = () => { // displays the current step
      if (currentStep === 2 && visibleSteps.secondStep === true) {
          return <SecondStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
      } else if (currentStep === 3 && visibleSteps.thirdStep === true) {
          return <ThirdStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
      } else {
          return <FirstStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
      }
  }

  return (
    <div className="container step-container">
        <h3 className="text-muted" style={{ textTransform: 'capitalize'}}> Complete Form Below </h3>
        <div className="row" style={{ margin :'25px 0 10px 0' }}>
            <div className={ currentStep === 1 ? "col col-md-4 step-card active" : "col col-md-4 step-card" }>
                Account Details
            </div>
            <div className={ currentStep === 2 ? "col col-md-4 step-card active" : "col col-md-4 step-card" }>
                Personal Details
            </div>
            <div className={ currentStep === 3 ? "col col-md-4 step-card active" : "col col-md-4 step-card" }>
                Plan Details
            </div>
        </div>
        { showStep() }
    </div>
  );
}

export default App;
