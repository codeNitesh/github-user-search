// defs
import React, { useState, useEffect } from 'react';

// external imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// components
import Search from './components/Search/Search.tsx';
import UserTable from './components/UserTable/UserTable.tsx';

// types
import type { User } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (searchTerm: string) => {
    if (searchTerm === "") {
      setResults([]);
      setError(null);
      return;
    }

    try {
      const response = await axios.get<{ items: User[] }>(
        `https://api.github.com/search/users?q=${searchTerm}&sort=followers`
      );
      setResults(response.data.items);
      setError(null);
    } catch (error) {
      console.error('Error fetching GitHub users:', error);
      setResults([]);
      setError('An error occurred while fetching GitHub users. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="App">
      <div className='body-container'>
        <h1 className='h1-text'>Welcome to GitHub Name Finder App</h1>
        <Search onSearch={fetchUsers} />

        <hr />

        <h3 className='h3-text'>Search Results</h3>

        {results.length > 0 ? (
          <UserTable users={results} />
        ) : (
          <p className='p-text'>No data</p>
        )}

      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />

    </div>
  );
};

export default App;
