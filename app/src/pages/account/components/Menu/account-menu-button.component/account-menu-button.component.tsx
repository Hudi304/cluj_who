import "./account-menu-button.component.scss"

interface AccountMenuButtonProps{
    text: string
    svg : any 
}

      
export function AccountMenuButton(props: AccountMenuButtonProps) : JSX.Element  {
    return (
        <div className="menu-button-container debug">
            
            <button className="menu-button debug">
                <props.svg/>
                <label className="menu-button-label debug"><b> { props.text}</b></label>
            </button>
            
        </div>
      
    )

}