import './App.css';
import Login from './components/Login';
import MyPosts from './components/MyPosts';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import EditPost from './components/EditPost';
import DeletePost from './components/DeletePost';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">      
    <Router>
      <Routes>    
            <Route path= "/" element = {<MyPosts/>} exact />               
            <Route path= "/post/create" element = {<CreatePost />} exact />
            <Route path= "/post/:id" element = {<Post />} exact />            
            <Route path= "/post/:id/edit" element = {<EditPost />} exact />
            <Route path= "/post/:id/delete" element = {<DeletePost />} exact />

            <Route path= "/login" element = {<Login/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
