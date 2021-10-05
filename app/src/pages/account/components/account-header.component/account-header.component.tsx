import React from "react";

import "../../../../common-components/common.scss"

import "./account-header.component.scss"

import tqLogo from "../../../../assets/techquarter-logo-outline-rgb.png"

export default function AccountHeader()  : JSX.Element {
    return (
        <div className="profile-header-container debug">
            <span className="icon-container debug">
                <img className="profile-header-icon" src={tqLogo} alt="TQ"/>
            </span>
        </div>
            
      
    )   
}