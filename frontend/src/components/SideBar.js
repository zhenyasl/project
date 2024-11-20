import React, { useContext, useState, useEffect } from 'react';

import { Container, Nav, Navbar as NavBarBs, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { mainActions } from '../store/main-slice';

function SideBar() {
    const [user, setUser] = useState('');
    const dispatchAction = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('name');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const resetFilter = () => {
      // dispatchAction(mainActions.setNewFilter('')); 
    }

    return (
    <nav className="navbar bg-light " style={{ width: '300px', height : '100%', position: 'fixed',  top: '56px', display: 'flex', flexDirection: 'column',  borderRight: '1px solid #ccc'}}>
      <div className="container-fluid" style={{}}>
        <ul className="navbar-nav ms-3" >
          <li className="nav-item ">
            <a className="nav-link mt-3" href="/" onClick={resetFilter}>Home</a>
          </li>
          <hr style={{ width: '250px', marginLeft: '-10px' }} />
          <li className="nav-item">
            <a className="nav-link" href="/my-posts">My threads</a>
          </li>
          <hr style={{ width: '250px', marginLeft: '-10px' }}/>
          {/* <li className="nav-item">
            <a className="nav-link" href="#">Link 3</a>
          </li> */}
        </ul>
      </div>
    </nav>
    );
}

export default SideBar;
