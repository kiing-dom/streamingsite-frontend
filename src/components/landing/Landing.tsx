import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider } from '@mui/material';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <header className='flex justify-between items-center pt-[10px] p-[10px] bg-[#333333]'>
                <div className='text-white ml-4 py-2 text-xl font-semibold'>MyStreamingApp</div>
                <button
                    className='py-1 px-4 bg-red-500 text-white font-semibold rounded-md cursor-pointer'
                    onClick={() => navigate("/login")}
                >
                    Sign In
                </button>
            </header>

            <>
                <div
                    className='flex flex-col justify-center items-center w-full h-[70vh] text-center bg-black'
                >
                    <h1 className='text-white text-3xl font-bold mb-2'>Unlimited Content, Tutorials, Guides, and more.</h1>
                    <p className='text-white'>Watch anywhere. Cancel anytime.</p>
                    <button
                        onClick={() => navigate("/login")}
                        className='py-1 px-4 mt-4 bg-red-500 text-white font-semibold rounded-md cursor-pointer'
                    >
                        Get Started
                    </button>
                </div>

                <Divider />

                <div className='w-full m-auto p-[20px] bg-black'>
                    <div className='text-center p-[40px]'>
                        <div className='p-[20px] m-[20px] drop-shadow-lg border border-neutral-500 border-opacity-30 rounded-md'>
                            <h3 className='font-semibold text-white'>Watch everywhere.</h3>
                            <p className='font-light text-neutral-300'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                        </div>
                    </div>
                </div>

                <footer className='bg-[#2e2e2e] p-[20px]'>
                    <p className='text-center text-white'>&copy; 2024 Dominion Gbadamosi, Inc.</p>
                </footer></>
        </>
    );
}

export default LandingPage;