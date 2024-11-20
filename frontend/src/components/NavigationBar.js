import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';


import { Container, Nav, Navbar as NavBarBs, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './nav.module.css';
import UserContext from '../context/UserContext';

import { useSelector, useDispatch } from 'react-redux';
import { mainActions } from '../store/main-slice';

function NavigationBar() {
    //const { user, updateUser } = useContext(UserContext);

    const filter = useSelector((state)=>state.main.filter);
    const [searchText, setSearchText] = useState(filter); 
    const dispatchAction = useDispatch();
    const [user, setUser] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    // useEffect(() => {
    //     if (!location.pathname.startsWith('/threads/search') ) { 
    //       dispatchAction(mainActions.setNewFilter('2'));   
    //     }
    //     else {setSearchText(filter)}
    //   }, [location, dispatchAction]);


    useEffect(() => {
        setSearchText(filter);
        console.log('filter', filter);
   }, [filter]);

    useEffect(() => {
        //localStorage.setItem('name', ' ');
        const storedUser = localStorage.getItem('name');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const toggleCreateThread = () => {
        dispatchAction(mainActions.toggleCreatePostVisibility());
    };
    
    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('authToken');
        window.location.reload();
    };

    const handleSearch = () => {
        if(searchText==''){return;}
        dispatchAction(mainActions.toggleSearchFilter());
        dispatchAction(mainActions.setNewFilter(searchText)); console.log('searchtext', searchText);
        navigate(`/search/${searchText}`);
    }

    return (
        <NavBarBs sticky="top" className={`shadow-sm  ${styles.navbar} `}>
        
            <Container fluid className="">
                <button
                    className={styles.createPostButton}
                    onClick={toggleCreateThread}
                >
                    {/* + Create */}
                        <span className="h2 ms-1 pb-2 mb-0" style={{fontWeight: '100', fontSize: '45px', lineHeight: '0.7', display: 'inline-block',  }}>+</span>
                        <span className=" ms-1 mb-0" style={{fontSize: '18px', lineHeight: '1', display: 'inline-block', paddingRight : '12px'}}>Create</span>
                
                
                </button>
                <div className="d-flex flex-grow-1 justify-content-center">
                    <form className="d-flex ms-3" style={{ width: '400px' }} onSubmit={(e) => e.preventDefault()}>
                        <input className="form-control me-2" type="text" placeholder='Search...' style={{ backgroundColor: 'white', borderRadius: '20px'}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
                    </form>
                </div>
                <Nav className={`${styles.navbarNav}`}>
                    {user ? (
                        <>
                            <span className={styles.userName}>{user}</span>
                            <span className={styles.logoutButtonContainer}>
                                <Button
                                    variant="outline-primary"
                                    className={styles.logoutButton}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </span>
                        </>
                    ) : (
                        // <></>
                        <NavLink to="/login" className={styles.navLink}>
                        Login
                        </NavLink>
                    )}
                </Nav>
            </Container>
        </NavBarBs>
    );
}

export default NavigationBar;
