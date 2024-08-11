import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserStore } from '../../state/userStore';

const LogOutButton: React.FC = () => {
    const navigate = useNavigate();
    const clearUser = useUserStore(state => state.clearUser);


    const handleSignOut = async () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');

        clearUser();

        toast.success("Logged Out Successfully");

        navigate('/login');
    };

    return (
        <button
            className='bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-800 transition duration-500'
            onClick={handleSignOut}
        >
            Log Out
        </button>
    );
};

export default LogOutButton;