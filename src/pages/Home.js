import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <div>
            <Link to="/packingList" className="btn btn-primary btn-lg">패킹 리스트 보기</Link>
        </div>
    );
}

export default Home;
