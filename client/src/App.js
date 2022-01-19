import './App.css';
import NavBar from './components/nav/NavBar';
import Chat from './page/Chat';
import Overview from './page/Overview';

function App() {
  return (
    <div className="App min-h-screen pb-[72px] overflow-y-hidden">
        {/* <Overview /> */}
        <Chat />
        <NavBar />
    </div>
  );
}

export default App;
