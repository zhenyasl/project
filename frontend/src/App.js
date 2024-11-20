import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import NotFound from './pages/NotFound';
import NavigationBar from './components/NavigationBar';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import Login from './pages/Login';
import MyComments from './pages/MyComments';
import User from './pages/User';
import MyPosts from './pages/MyPosts';
import Thread from './pages/Thread';
import Search from './pages/Search';
import Layout from './Layout';

function App() {
    return (
        <Router>
            <NavigationBar />
            <SideBar />
            <Layout >
                <Routes>
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/thread/:threadId" element={<Thread />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/my-comments" element={<MyComments />} />
                    {/* <Route path="/user/:userId" element={<User />} /> */}
                    <Route path="/user/:username" element={<User />} />
                    <Route path="/my-posts" element={<MyPosts />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
