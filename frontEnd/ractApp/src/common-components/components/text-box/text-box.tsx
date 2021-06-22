import './text-box.scss';
import { Eye, Eye_slash } from '../../../pages/svgs';
import { ChangeEventHandler, useState } from 'react';

interface TextBoxProps {
  label: string;
  type: string;

  enableHide: boolean;

  defaultText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function TextBox(props: TextBoxProps): JSX.Element {
  const [isVisible, setVisible] = useState(false);
  const [inputType, setinputType] = useState(props.type);

  function hide() {
    setVisible(!isVisible);
    if (inputType == 'password') {
      setinputType('text');
    }
    if (inputType == 'text') {
      setinputType('password');
    }
  }


  return (
    <div className="text-box-container">
      <label className="form-label">{props.label}</label>
      <br />

      <input
        className="input"
        type={inputType}
        defaultValue={props.defaultText}
        onChange={props.onChange}/>

      <div>
        {props.enableHide ? (
          <div className="visibility-icon-container">
            <div className="visibility-icon">
              <button className="text-box-button"
                onClick={hide}>
                {isVisible ?
                  <Eye_slash></Eye_slash>
                  : <Eye className="svg-icon"></Eye>}
              </button>
            </div>
          </div>
        )
        : (
          <div></div>
        )}
      </div>
    </div>
  );
}
