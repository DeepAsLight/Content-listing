import React, { useState } from 'react';
import './../styles/Header.css';
import searchImg from '../images/search.png';

function Header({ onSearch }) {
    const [isSearchActive, setIsSearchActive] = useState(false)
    return (
        <header className="header">
            <div>
                <p>Romantic Comedy</p>
                <img src={searchImg} alt='ico-search' onClick={() => setIsSearchActive(!isSearchActive)} />
            </div>
            <div>  {isSearchActive ? <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
            /> : <></>}</div>
        </header>
    );
}

export default Header;