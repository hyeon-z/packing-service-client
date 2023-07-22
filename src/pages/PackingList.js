import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CreatePack from './CreatePack';
import {Button} from 'reactstrap';

function PackingList() {
    const {id} = useParams();
    const [packingList, setPackingList] = useState(null);
    const [packingItems, setPackingItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/packingList/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPackingList(data);
            })
            .catch((error) => console.log(error));

        fetch(`http://localhost:8080/api/v1/pack?packingListId=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPackingItems(data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleCheckBoxChange = (itemId) => {
        const updatedPackingItems = packingItems.map((item) =>
            item.id === itemId ? {...item, checked: !item.checked} : item
        );
        setPackingItems(updatedPackingItems);
    };

    if (!packingList) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container mt-4">
                <h2>{packingList.title}</h2>
                <p>출발 날짜: {packingList.departureDate}</p>
                <p>설명: {packingList.description}</p>

                <h2>패킹 리스트</h2>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Button color="primary" onClick={() => setShowModal(true)}>
                        추가
                    </Button>
                </div>

                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>짐 이름</th>
                        <th>챙김 여부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {packingItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.category}</td>
                            <td>{item.name}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleCheckBoxChange(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <CreatePack
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                packingListId={id}
            />
        </div>
    );
}

export default PackingList;
