// import './login.scss'
import '../../common-components/common.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from 'react-router-dom'
import { login } from './home_actions'

function ClujWhoHome(props: any): JSX.Element {
    const history = useHistory()

    return <div>dsada</div>
}

const mapStateToProps = (state: any) => ({
    ...state
})

const mapDispatchToProps = (dispatch: any) => ({ dispatch, ...bindActionCreators({ login }, dispatch) })

export const ClujWhoHomePage = connect(mapStateToProps, mapDispatchToProps)(ClujWhoHome)
// conecteaza pagina la store, deci avem access la store
