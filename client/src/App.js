import './App.css';
import NavBar from './components/nav/NavBar';
import Chat from './page/Chat';
import ChatScreen from './page/chat/ChatScreen';
import Overview from './page/Overview';

function App() {
  return (
    // <div className="App min-h-screen pb-[72px] overflow-y-hidden">
    <div className="App min-h-screen overflow-y-hidden">
        {/* <Overview /> */}
        {/* <Chat /> */}
        <ChatScreen />
        {/* <NavBar /> */}
    </div>
  );
}

export default App;
