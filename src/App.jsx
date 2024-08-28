import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import Navbar from './Navbar';  // Import the Navbar component

function App() {
  // State to handle user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('John Doe'); // Placeholder for user name

  // State to manage filter selection
  const [selectedFilter, setSelectedFilter] = useState('Latest');

  // Handle login (this would be replaced with actual login logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout (this would be replaced with actual logout logic)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar 
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="w-full">
        <div className="max-w-9xl mx-auto py-3 sm:px-6 lg:px-8">
          {/* Card Component */}
          <div className="bg-white border rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Comment (3)</h2>
              <div 
                className="flex items-center justify-between bg-gray-100 rounded-full p-1 cursor-pointer"
              >
                <div 
                  onClick={() => handleFilterChange('Latest')}
                  className={`px-4 py-2 rounded-full ${selectedFilter === 'Latest' ? 'font-bold' : 'text-gray-700'}`}
                >
                  Latest
                </div>
                <div 
                  onClick={() => handleFilterChange('Popular')}
                  className={`px-4 py-2 rounded-full ${selectedFilter === 'Popular' ? 'font-bold' : 'text-gray-700'}`}
                >
                  Popular
                </div>
              </div>
            </div>
            
            <RichTextEditor />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
