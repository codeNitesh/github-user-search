import React, { useState, ChangeEvent } from 'react';
import './Search.css';

interface SearchProps {
    onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const debounce = (func: (term: string) => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;

        return (term: string) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(term);
            }, delay);
        };
    };

    const debouncedSearch = debounce((term: string) => {
        onSearch(term);
    }, 500);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
        debouncedSearch(newTerm);
    };

    return (
        <div className='container'>
            <label className='input-label'>Search</label>
            <input
                type="text"
                className="input-box"
                placeholder="Enter GitHub username"
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Search;
