import './login.scss';
import '../../common-components/common.scss';
import Header from '../../common-components/components/header/header.component';
import LoginFooter from './components/login-footer.component/login-footer.component';
import LoginLeft from './components/login-left.component/login-left.component';
import LoginRight from './components/login-right/login-right.component';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {decrement, getMovieList, increment} from "./login.actions"



export function Login(props: any): JSX.Element {
  console.log("props : " ,props)
  return (
    <div className="grid-container debug">
      <div className="header-container">
        <Header></Header>
      </div>
      <LoginLeft onInputChange= {props.increment}></LoginLeft>
      <LoginRight></LoginRight>
      <LoginFooter></LoginFooter>
      <button onClick={() => console.log(props.decrement)}>-</button>
      <button onClick={() => props.increment()}>+</button>
    </div>
  )
}


const mapStateToProps = (state:any) => ({
  ...state
});

const mapDispatchToProps = (dispatch:any) => ({
  ...bindActionCreators({decrement, increment}, dispatch)
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
// conecteaza pagina la store, deci avem access la store

