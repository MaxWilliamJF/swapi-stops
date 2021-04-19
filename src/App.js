import Home from './Pages/Home';
import Store from './Store';
import './App.css';

function App() {
  return (
    <Store>
      <div className="App">
        <Home></Home>
      </div>
    </Store>
  );
}

export default App;
