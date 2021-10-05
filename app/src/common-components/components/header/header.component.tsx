import './header.component.scss';

import logo from '../../../assets/techquarter-logo-mark-outline-rgb.png';

export default function Header()  : JSX.Element {
  return (
    <div className="common-header-container">
      <div className="common-header-left">
        <span className="common-icon-container">
          <img src={logo} alt="TQ"></img>
        </span>
      </div>

      <div className="common-header-right"></div>
    </div>
  );
}
