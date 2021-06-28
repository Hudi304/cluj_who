import '../../common-components/common.scss'
import AccountHeader from './components/account-header.component/account-header.component'
import { AccountBody } from './components/body/account-profile-form.componet'
import AccountMenu from './components/Menu/account-menu.component/account-menu.component'

import './account.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginData } from '../login/login.types'
import { useHistory } from 'react-router-dom'
import { saveChanges } from "./account.actions"

function Account(props: any): JSX.Element {
    const history = useHistory()

    function handleClick() {
        console.log('handle Click ACC')
        // props.getMovieListAct();
        const user: LoginData = {
            username: 'Itachi',
            password: '1234'
        }
        props.saveChanges(user, history)
    }

    return (
        <div className="profile-grid-container">
            <AccountHeader></AccountHeader>
            <AccountMenu></AccountMenu>
            <AccountBody></AccountBody>

            <button onClick={handleClick}>+</button>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    ...state
})

const mapDispatchToProps = (dispatch: any) => ({
    dispatch,
    ...bindActionCreators({ saveChanges }, dispatch) //? astea sunt ACTIONS
})

export const UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(Account)
