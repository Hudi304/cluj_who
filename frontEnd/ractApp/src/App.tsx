import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage } from './main/main';

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Route path={'/'} component={MainPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
