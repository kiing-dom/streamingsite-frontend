import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserStore } from '../../state/userStore';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const LogOutButton: React.FC = () => {
    const navigate = useNavigate();
    const clearUser = useUserStore(state => state.clearUser);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }


    const handleSignOut = async () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');

        clearUser();

        toast.success("Logged Out Successfully");

        navigate('/login');
    };

    return (
        <><button
            className='bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-800 transition duration-500'
            onClick={handleClickOpen}
        >
            Log Out
        </button><Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='aria-dialog-description'
        >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Log Out"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to Log Out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color='error' onClick={() => {
                        handleClose();
                        handleSignOut();
                    }} autoFocus>
                        Log Out
                    </Button>
                </DialogActions>

            </Dialog></>
    );
};

export default LogOutButton;