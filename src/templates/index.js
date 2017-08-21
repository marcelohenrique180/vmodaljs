import vmodalDefaultTemplate from '../templates/vmodalDefaultTemplate.pug';
import vmodalSuccessTemplate from '../templates/vmodalSuccessTemplate.pug';
import vmodalErrorTemplate from '../templates/vmodalErrorTemplate.pug';

// All Templates
export default [
  {
    type: 'default', builder: vmodalDefaultTemplate
  },
  {
    type: 'error', builder: vmodalErrorTemplate
  },
  {
    type: 'success', builder: vmodalSuccessTemplate
  }
];
