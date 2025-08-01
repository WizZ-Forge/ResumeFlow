import './App.css';
import Form from './component/Form/Form';
import ResumeList from './component/ResumeList/ResumeList';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import React, { useState } from 'react';

function App() {
  const [changeUi, setChangeUi] = useState(false);
  const [test, setTest] = useState('Create Resume');
  const ui = () => {
    console.log('Create Resume button clicked');
    setChangeUi(!changeUi);
    setTest(changeUi ? 'Create Resume' : 'Back');
  };

  return (
    <div className='App'>
      <div>
        {changeUi ? (
          <div className='MakingForm'>
            {' '}
            <Form />
          </div>
        ) : (
          <ResumeList />
        )}
      </div>

      <button onClick={ui}>{test}</button>
    </div>
  );
}

export default App;
