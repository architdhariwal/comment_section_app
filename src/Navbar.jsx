// Navbar.jsx
import React from 'react';

function Navbar({ isLoggedIn, userName, handleLogin, handleLogout }) {
  return (
    <header className="py-2">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {isLoggedIn ? (
          // When logged in
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/color/48/000000/user.png" // Placeholder for user icon
              alt="User Icon"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-700 font-medium">{userName}</span>
          </div>
        ) : (
          // Empty div to push the button to the right side
          <div></div>
        )}

        {/* Button aligned to the right */}
        {isLoggedIn ? (
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            className="bg-white text-gray-700 border border-gray-300 font-bold py-2 px-4 rounded flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google Icon"
              className="mr-2"
            />
            Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
