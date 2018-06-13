import { addComponent } from 'Components/shared/actions';
import { addForm } from 'Form/actions';

const has = require('has-own-property-x');


const fromJSON = (jsonData) => {
  const forms = jsonData.forms;

  for (let i in forms) {
    addForm(forms[i]);
  }

  const components = jsonData.components;

  for (let i in components) {
    addComponent(components[i]);
  }
};

export default fromJSON;
