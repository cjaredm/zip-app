import { CustomNavigation } from './components/CustomNavigation';

function CustomLogo () {
  return <img src="https://zip-usa.com/img/zip-logo.png" alt="ZIP" />
}

export const components = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
}
