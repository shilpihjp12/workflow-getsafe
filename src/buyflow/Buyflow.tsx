import React, { useState } from 'react';
import AgeStep from './AgeStep';
import NameStep from './NameStep';
import EmailStep from './EmailStep';
import SummaryStep from './SummaryStep';
import {
  BuyflowProps,
  PRODUCT_IDS_TO_NAMES
} from '../configuration/workflowConf';

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const [currentStep, setStep] = useState('name');
  const [collectedData, updateData] = useState({
    name: '',
    email: '',
    age: 0
  });
  const [error, setError] = useState(false);

  /**
   * validate all inputs in the flow.
   */
  const validInput = (value: any) => {
    if (typeof value === 'number' && value > 0) {
      return true;
    } else if (typeof value === 'string' && value.length !== 0) {
      if (
        currentStep === 'name' &&
        (value.split(' ')[0].length === 0 || value.split(' ')[1].length === 0)
      ) {
        return false;
      }
      return true;
    }
    return false;
  };

  /**
   * callback function should have validation to move to next step.
   */
  const getStepCallback = (nextStep: string) => (field: string, value: any) => {
    if (validInput(value)) {
      updateData({ ...collectedData, [field]: value });
      setStep(nextStep);
      setError(false);
    } else {
      setError(true);
    }
  };

  /**
   * define steps.
   * If we want to add new steps. It will be easy to maintain the steps array rather than
   * changing the JSX.
   * For future steps, Please create new functional components and add the details into the array.
   * name: name will be the name of the step
   * component: compoenent will be the functional component for new step and also contain the next step in callback function.
   */
  const steps = [
    {
      name: 'name',
      component: <NameStep key='name' cb={getStepCallback('email')} />
    },
    {
      name: 'email',
      component: <EmailStep key='email' cb={getStepCallback('age')} />
    },
    {
      name: 'age',
      component: <AgeStep key='age' cb={getStepCallback('summary')} />
    },
    {
      name: 'summary',
      component: <SummaryStep key='summary' collectedData={collectedData} />
    }
  ];

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[props.productId]}</h4>
      {error ? <div style={{ color: 'red' }}>Enter a valid input</div> : null}
      {steps.map((val, index) => {
        if (currentStep === val.name) return val.component;
        return null;
      })}

      {/* {(currentStep === 'name' && <NameStep cb={getStepCallback('email')} />) ||
        (currentStep === 'email' && (
          <EmailStep cb={getStepCallback('age')} />
        )) ||
        (currentStep === 'age' && (
          <AgeStep cb={getStepCallback('summary')} />
        )) ||
        (currentStep === 'summary' && (
          <SummaryStep collectedData={collectedData} />
        ))} */}
    </>
  );
};

export default Buyflow;
