import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ManageRegistration from './pages/manageRegistration';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ManageRegistration />
      <Footer title="© QRS Training Platform.. 2024 All rights reserved." />
    </div>
  );
}

export default App;
