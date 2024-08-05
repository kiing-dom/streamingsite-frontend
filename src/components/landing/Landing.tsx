import React from 'react';
import { useNavigate } from 'react-router-dom';



function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <header className='flex justify-between items-center pt-[10px] p-[10px] bg-[#333333]' style={styles.appBar}>
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
                    className='flex flex-col justify-center items-center h-[70vh] bg-black'
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
                <div style={styles.container}>
                    <div style={styles.featureSection}>
                        <div style={styles.featureItem}>
                            <h3>Watch everywhere.</h3>
                            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
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

const styles: { [key: string]: React.CSSProperties } = {
    heroSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        backgroundSize: 'cover',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
    },
    featureSection: {
        padding: '40px 0',
        textAlign: 'center',
    },
    featureItem: {
        padding: '20px',
        margin: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },

};
