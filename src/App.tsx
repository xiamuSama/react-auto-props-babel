import React from 'react';
import './app.less';
import {
  MyButton1,
  MyButton2,
  MyButton3
} from './modules'
import { VscodeSchemaCore } from './com'

const App = () => {
  return (
    <div>
      <VscodeSchemaCore>
        <MyButton1></MyButton1>
        <MyButton2></MyButton2>
        <MyButton3></MyButton3>
      </VscodeSchemaCore>
    </div>
    
  );
}

export default App;
