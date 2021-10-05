import './navbar-component.scss'
import Typography from '@mui/material/Typography'

import logo from '../../../../assets/LEGO_logo.svg.png'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function NavBarComponent(props: any): JSX.Element {
    const { inView } = props

    const [navBarClasses, setNavBarClasses] = useState('')

    useEffect(() => {
        console.log('IN VIEW', inView)
        if (inView) {
            setNavBarClasses('')
        } else {
            setNavBarClasses('nav-bar-active')
        }
    }, [inView])
    return (
        <div className={`nav-bar-component ${navBarClasses}`}>
            <div className="nav-bar-container-grid">
                <div className="nav-bar-logo-container">
                    <img className="nav-bar-logo" src={logo} />
                </div>

                <div className="nav-bar-flex-container">
                    <div className="nav-bar-buttons-container">
                        <NavBarButton text={'Home'} />
                        <NavBarButton text={'Apply now'} />
                        <NavBarButton text={'About us'} />
                        <NavBarButton text={'Schedule'} />
                        <NavBarButton text={'Committees'} />
                        <NavBarButton text={'Our Team'} />
                        <NavBarButton text={'Resources'} />
                        <NavBarButton text={'Contact'} />
                        <NavBarButton text={'Sponsors'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavBarButton(props: any): JSX.Element {
    const { text } = props
    return <button className="nav-bar-btn">{text}</button>
}
