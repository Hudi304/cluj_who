import '../../common-components/common.scss';
import AccountHeader from './components/account-header.component/account-header.component';
import AccountBody from './components/body/account-profile-form.componet';
import AccountMenu from './components/Menu/account-menu.component/account-menu.component';

import './account.scss';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMovieListAct } from './account.actions';
import { store } from '../..';

const mapStateToProps = (state: any) => ({
    ...state
  })
  
  const mapDispatchToProps = (dispatch: any) => ({
      dispatch,
      ...bindActionCreators({ getMovieListAct },
      dispatch) //? astea sunt ACTIONS
  })
  
export const UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(Account)

// const handleClick = (event: any) => {
//     try {
//         props.login(loginaccount,history);
        
//       } catch (e: any) {
//         console.log('LOGIN PROBLEM!');
//         console.log(e.message);
//       }

// }

function Account(props: any): JSX.Element {
  useEffect(() => {
    props.getMovieListAct(), console.log('1234');
  }, []);
  // console.log("Props Account", props)

  function handleClick() {
    console.log('handle Click');
    props.getMovieList();
  }

  // const handleClick = someFetchActionCreator => {
  //     useEffect( () => {
  //       someFetchActionCreator();
  //     }, [])
  //   }

  return (
    <div className="profile-grid-container debug">
      <AccountHeader></AccountHeader>
      <AccountMenu></AccountMenu>
      <AccountBody></AccountBody>
      <button onClick={handleClick}>+</button>
    </div>
  );
}


