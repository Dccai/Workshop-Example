import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Signup} from './pages/Signup';
import { Main } from './pages/MainPage';
function App() {
  let [pageSwitcher,setPageSwitcher]=useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {pageSwitcher?<Main/>:<Signup pageSetter={setPageSwitcher}/>}
      </header>
    </div>
  );
}

export default App;
