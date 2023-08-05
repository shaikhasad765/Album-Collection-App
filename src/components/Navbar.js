// Import React and necessary styles
import React from 'react';
import './CSS/Navbar.css';

// Import the icon image for the navbar
import iconImage from './Image/navicon.png';

// Navbar component
const Navbar = ({ onAddAlbumClick }) => {
    return (
        // Navbar container
        <nav className="navbar">
            {/* Content container */}
            <div className="navbar-content">
                {/* Brand section */}
                <div className="navbar-brand">
                    {/* Display the icon image */}
                    <div>
                        <img src={iconImage} alt="Icon" className="navbar-icon" />
                    </div>
                    {/* Display the text "Albums List React App" */}
                    <div className='nav-text'>Albums List React App</div>
                </div>
                {/* Links section */}
                <div className="navbar-links">
                    {/* Display the "Add Album" button, which triggers the onAddAlbumClick function */}
                    <button onClick={onAddAlbumClick}>Add Album</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
