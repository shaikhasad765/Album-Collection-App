// Import necessary modules and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // To GET API
import Album from './components/Album';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Link CSS File

// App component
const App = () => {

  // State variables to manage albums and album-related actions
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [deletedAlbumId, setDeletedAlbumId] = useState(null);
  const [userAddedAlbums, setUserAddedAlbums] = useState([]);

  // Fetch albums data from API using useEffect hook
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  // Function to handle adding a new album
    const handleAddAlbum = () => {
      // Check if the newAlbumTitle is blank before adding the album
      if (!newAlbumTitle.trim()) {
        // Display an error toast message or handle the case of a blank title
        toast.error('Please enter a title for the album.');
        return;
      }
      axios.post('https://jsonplaceholder.typicode.com/albums', { title: newAlbumTitle })
        .then(response => {   
          const newAlbum = response.data;
          // Simulate the new album with a temporary id (using Date.now())
          newAlbum.id = Date.now();
          // Add the new dummy album to the local albums state
          setAlbums([newAlbum, ...albums]);
          setNewAlbumTitle('');
          // Display success toast message
          toast.success('Album added successfully.');
        })
        .catch(error => {
          console.error('Error adding album:', error);
          // Display error toast message
          toast.error('Failed to add album. Please try again.');
      });
  };

  // Function to handle updating an existing album
  const handleUpdateAlbum = (albumId, updatedTitle) => {
    // Check if the updatedTitle is blank
    if (!updatedTitle.trim()) {
      toast.error('Please enter a title for the album.');
      return;
    }
    // Check if the albumId belongs to a user-added album or a fetched album
    const updatedAlbums = albums.map(album =>
      album.id === albumId ? { ...album, title: updatedTitle } : album
    );
    const updatedUserAddedAlbums = userAddedAlbums.map(album =>
      album.id === albumId ? { ...album, title: updatedTitle } : album
    );
    // Update both fetched albums and user-added albums
    setAlbums(updatedAlbums);
    setUserAddedAlbums(updatedUserAddedAlbums);
    // Display success toast message
    toast.success('Album updated successfully.');
  };

  // Function to handle deleting an album
  const handleDeleteAlbum = (albumId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then(() => {
        setDeletedAlbumId(albumId); // Set the deletedAlbumId
        // Wait for the slide-out animation to complete before updating the albums list
        setTimeout(() => {
          const updatedAlbums = albums.filter(album => album.id !== albumId);
          setAlbums(updatedAlbums);
          setDeletedAlbumId(null); // Reset deletedAlbumId to null after the deletion process
        }, 300);
        // Display success toast message
        toast.success('Album deleted successfully.');
      })
      .catch(error => {
        console.error('Error deleting album:', error);
        // Display success toast message
        toast.success('Album deleted successfully.');
      });
  };

  // Function to handle closing the 'Add Album' section
  const handleCloseAddAlbum = () => {
    setShowAddAlbum(false);
  };

  return (
    // Main app container
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar onAddAlbumClick={() => setShowAddAlbum(true)} />

      {/* Add Album Section */}
      <CSSTransition in={showAddAlbum} appear={true} timeout={500} classNames="slide-in">
        <section id="add-album">
          {showAddAlbum && (
            <div className="add-album">
              <input
                type="text"
                placeholder="Enter Album Title"
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
              />
              <button onClick={handleAddAlbum}>Add Album</button>
              <button className="close-btn" onClick={handleCloseAddAlbum}>
                Close
              </button>
            </div>
          )}
        </section>
      </CSSTransition>

      {/* Albums List */}
      <section id="albums">
        <h1>ALL ALBUMS</h1>
        <div className="albums-grid">
          {albums.map(album => (
            <CSSTransition
              key={album.id}
              in={album.id !== deletedAlbumId}
              appear={true}
              timeout={500}
              classNames={album.id === deletedAlbumId ? 'fade-out' : 'fade-in'}
            >
              <Album
                key={album.id}
                album={album}
                onUpdate={handleUpdateAlbum}
                onDelete={handleDeleteAlbum}
              />
            </CSSTransition>
          ))}
          {userAddedAlbums.map(album => (
            <CSSTransition
              key={album.id}
              in={true}
              appear={true}
              timeout={500}
              classNames="fade-in"
            >
              <Album
                key={album.id}
                album={album}
                onUpdate={handleUpdateAlbum}
                onDelete={handleDeleteAlbum}
              />
            </CSSTransition>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default App;
