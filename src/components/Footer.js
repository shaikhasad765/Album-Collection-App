// Import React and necessary styles
import React from 'react';
import './CSS/Footer.css';

// Footer Component
const Footer = () => {
    // Render a simple footer component
    return (
        <footer className="footer">
            {/* Display the copyright notice with the current year and creator's name */}
            <p>&copy; {new Date().getFullYear()} My Albums App. All rights reserved. Created by Asadullah Shaikh</p>
        </footer>
    );
};

export default Footer;
