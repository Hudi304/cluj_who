import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage } from './main/main';

// interface WelcomeUI{
//   name: string;
// }

// "`", "'" , """
// function Welcome( props : WelcomeUI ) {
//   return <h1>{`Hello World! ${props.name}`}</h1>
// }

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Route path={'/'} component={MainPage} />
      </BrowserRouter>

      {/* <div>
        <LoginPage></LoginPage>
        <UserProfilePage></UserProfilePage>
      </div> */}
    </div>
  );
}

export default App;
