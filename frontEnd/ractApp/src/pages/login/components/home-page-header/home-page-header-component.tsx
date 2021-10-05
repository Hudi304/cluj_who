import './home-page-header-component.scss'
import Typography from '@mui/material/Typography'

export function HomePageHeaderComponent(props: any): JSX.Element {
    return (
        <div className="header-container-component debug">
            <Typography variant="h1" component="div" gutterBottom>
                ClujWHO
            </Typography>
        </div>
    )
}
