// Import necessary modules and styles
import React, { useState } from 'react';
import './CSS/Album.css';
import { CSSTransition } from 'react-transition-group';
import iconImage from './Image/album.png';

// Album Component
const Album = ({ album, onUpdate, onDelete }) => {

    const [isEditing, setIsEditing] = useState(false);  // State to track whether the album is being edited or not
    const [updatedTitle, setUpdatedTitle] = useState(album.title); // State to store the updated title during editing

    // Function to handle the "Update" or "Save" button click
    const handleUpdateClick = () => {
        if (isEditing) {
            // If editing is true, call the parent component's onUpdate function to save the changes
            onUpdate(album.id, updatedTitle);
            setIsEditing(false); // Set isEditing back to false to exit editing mode
        } else {
            setIsEditing(true); // Set isEditing to true to enter editing mode
        }
    };

    // Function to handle the "Cancel" button click during editing
    const handleCancelClick = () => {
        setIsEditing(false); // Set isEditing back to false to exit editing mode
        setUpdatedTitle(album.title); // Reset the updated title to the original title
    };

    return (
        // CSS transition to apply animations when the component mounts and appears
        <CSSTransition in={true} appear={true} timeout={300} classNames="slide-in">
            <li className="album-item">
                <div className="album-info">
                    {/* Display the album icon */}
                    <img src={iconImage} alt="Icon" className="navbar-icon" />
                    <br/>
                    
                    {/* Conditionally render an input field for editing or a span to display the title */}
                    {isEditing ? (
                        <input
                            className="album-input"
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    ) : (
                        <span className="album-title">{album.title}</span>
                    )}
                </div>
                <div className="album-buttons">
                    {/* Display the "Update" or "Save" button based on the editing state */}
                    <button className="album-button" onClick={handleUpdateClick}>
                        {isEditing ? 'Save' : 'Update'}
                    </button>
                    {/* Display the "Cancel" button only during editing */}
                    {isEditing && (
                        <button className="album-button" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    )}
                    {/* Display the "Delete" button */}
                    <button className="album-button" onClick={() => onDelete(album.id)}>
                        Delete
                    </button>
                </div>
            </li>
        </CSSTransition>
    );
};

export default Album;
