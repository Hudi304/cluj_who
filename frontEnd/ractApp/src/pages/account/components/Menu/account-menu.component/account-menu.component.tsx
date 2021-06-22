import "./account-menu.component.scss"
import  { Home, User,Folder, File, PieChart, Flag, PowerOff } from "../../../../svgs";
import { AccountMenuButton } from "../account-menu-button.component/account-menu-button.component";

export default function AccountMenu()  : JSX.Element {
    return (
        <div className="menu-container debugMenu"> 
            <div className="side-bar-grid debug">
                <AccountMenuButton text="Dashboard" svg={Home}/>
                <AccountMenuButton text="User Profile" svg={User} />
                <AccountMenuButton text="Employee Files" svg={Folder} />
                <AccountMenuButton text="Entity Files" svg={File} />  
                <AccountMenuButton text="Risk Assessemt" svg={PieChart} />
                <AccountMenuButton text="Latest Flagships" svg={Flag} />


                {/* //? ar trebui sa fac o componenta separata pentru el? */}
                <div className="log-out-button-container debug2">
                    <AccountMenuButton text="Logout" svg={PowerOff}/>
                </div>

            </div>
        </div>
    ) 
}
       