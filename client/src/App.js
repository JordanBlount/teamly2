import './App.css';
import NavBar from './components/nav/NavBar';
import Overview from './page/Overview';

function App() {
  return (
    <div className="App min-h-screen pb-[72px] overflow-y-hidden">
        <Overview />
        <NavBar />
    </div>
  );
}

export default App;
