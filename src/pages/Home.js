import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

function Home() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: "url('/홈화면.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontFamily: 'CustomFontBold, sans-serif',
            }}
        >
            <Link
                to="/packingList/all"
                className="btn btn-info btn-lg"
            >
                짐 싸러 GOGO!
            </Link>
        </div>
    );
}

export default Home;
