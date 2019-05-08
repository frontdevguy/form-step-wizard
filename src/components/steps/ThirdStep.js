import React, { useState } from 'react';
import SweetAlert from 'sweetalert2-react';
import PropTypes from 'prop-types';

import "./package-style.css";

function ThirdStep( {formData,setFormData,visibleSteps,setVisibleSteps,setCurrentStep}  ) {
  
  const [packageType, setPackageType] = useState(formData.packageType);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  //handles the submit event for this step
  let submitStep = (event) => {
      //prenvent the form from being submitted
      event.preventDefault();
    
      //constructs this step form data
      const thisFormData = {
          packageType
      }

      //updates the whole form data
      setFormData({
          ...formData,
          ...thisFormData
      });

      //update the whole form submission state to true
      setFormSubmitted(true);

      console.log({
          ...formData,
          ...thisFormData
      }) //the whole form data could be forwarded to an api for processing

      return false;
  }

  return (
  
  <React.Fragment>
    <form onSubmit={ submitStep } className="package-form">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <div className={ packageType===1 ? "panel panel-primary active" : "panel panel-primary" }>
                        <input type="radio" className="select-package" />
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                Monthly Plan</h3>
                        </div>
                        <div className="panel-body">
                            <div className="the-price">
                                <h1>
                                    $10<span className="subscript">/mo</span></h1>
                                <small>1 month FREE trial</small>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            1 Account
                                        </td>
                                    </tr>
                                    <tr className="active">
                                        <td>
                                            1 Project
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            100K API Access
                                        </td>
                                    </tr>
                                    <tr className="active">
                                        <td>
                                            100MB Storage
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="panel-footer">
                            <button type="button" className="btn-sm btn-primary" onClick={ () => setPackageType(1)}>Select This Package </button>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-6">
                    <div className={ packageType===2 ? "panel panel-success active" : "panel panel-success" }>
                        <div className="cnrflash">
                            <div className="cnrflash-inner">
                                <span className="cnrflash-label">MOST
                                    <br />
                                    POPULR</span>
                            </div>
                        </div>
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                Yearly Plan</h3>
                        </div>
                        <div className="panel-body">
                            <div className="the-price">
                                <h1>
                                    $20<span className="subscript">/mo</span></h1>
                                <small>1 month FREE trial</small>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            2 Account
                                        </td>
                                    </tr>
                                    <tr className="active">
                                        <td>
                                            5 Project
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            100K API Access
                                        </td>
                                    </tr>
                                    <tr className="active">
                                        <td>
                                            200MB Storage
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="panel-footer">
                            <button type="button" className="btn-sm btn-primary" onClick={ () => setPackageType(2)}>Select This Package </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-group" style={{ marginTop: '40px'}}>
            <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} onClick={ () => setCurrentStep(2) }> Previous </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Submit </button>
        </div>
    </form>
    <SweetAlert show={formSubmitted} title="Submission" text="Your submission has been received" onConfirm={() => setCurrentStep(1)} />
  </React.Fragment>

  )
}

ThirdStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};
export default ThirdStep;