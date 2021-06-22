import './login.page.scss';

import '../../common-components/common.scss';
import Header from '../../common-components/components/header/header.component';
import LoginFooter from './components/login-footer.component/login-footer.component';
import LoginLeft from './components/login-left.component/login-left.component';
import LoginRight from './components/login-right/login-right.component';

export default function LoginPage(): JSX.Element {
  return (
    <div className="grid-container debug">
      <div className="header-container">
        <Header></Header>
      </div>
      <LoginLeft></LoginLeft>
      <LoginRight></LoginRight>
      <LoginFooter></LoginFooter>
    </div>
  );
}
