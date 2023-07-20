import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function PackingList() {
    const {id} = useParams();
    const [packingList, setPackingList] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/packingList/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPackingList(data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (!packingList) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container mt-4">
                <h2>{packingList.title}</h2>
                <p>출발 날짜: {packingList.departureDate}</p>
            </div>
        </div>
    );
}

export default PackingList;
