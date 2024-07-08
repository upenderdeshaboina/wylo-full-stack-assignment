import NavBar from './components/NavBar';
import Posts from './components/Posts'
import './App.css';
import {Route,Routes} from 'react-router-dom';
import EditPost from './components/EditPost';
import AddPost from './components/AddPost';

function App() {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Posts/>}/>
            <Route path='/edit-post/:id' element={<EditPost/>}/>
            <Route path='/add-post' element={<AddPost/>}/>
        </Routes>
    </>
    
    
  );
}

export default App;
