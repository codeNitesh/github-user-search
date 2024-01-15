import React from 'react';
import './UserTable.css';

interface UserTableProps {
    users: User[];
}

interface User {
    id: number;
    login: string;
    avatar_url: string;
    followers: number;
    html_url: string;
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Profile URL</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className='flex-td'> <img src={user.avatar_url} alt={`${user.login}'s avatar`} />{user.login}</td>
                        <td>
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                View Profile
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
