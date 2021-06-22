import React from 'react';

import './login-right.component.scss';
import ill from '../../../../assets/illustration.png';

export default function LoginRight(): JSX.Element {
  return (
    <div className="grid-item login-image-container debug">
      <img className="illustration debug" src={ill} alt="TQ" />
    </div>
  );
}
