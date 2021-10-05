import './login.scss'
import '../../common-components/common.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from './login.actions'
import { useHistory } from 'react-router-dom'

import { NavBarComponent } from './components/navbar/navbar-component'
import { useEffect, useState } from 'react'
import InView, { useInView } from 'react-intersection-observer'
import './login.scss'

function Login(props: any): JSX.Element {
    const history = useHistory()

    const [navBarClasses, setNavBarClasses] = useState('')

    const [ref, inView] = useInView({
        threshold: 0.5
    })

    useEffect(() => {
        console.log('IN VIEW', inView)
        if (inView) {
            setNavBarClasses('')
        } else {
            setNavBarClasses('nav-bar-active')
        }
    }, [inView])

    return (
        <>
            <div className={`nav-bar-container`}>
                <NavBarComponent inView={inView} />
            </div>
            <div className="page-grid-container debug">
                <div ref={ref}>
                    <div className="page-grid-item debug">
                    </div>
                </div>

                <div className="page-grid-item debug"></div>
                <div className="page-grid-item debug"></div>
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    ...state
})

const mapDispatchToProps = (dispatch: any) => ({ dispatch, ...bindActionCreators({ login }, dispatch) })

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login)
// conecteaza pagina la store, deci avem access la store
