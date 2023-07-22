import React, {useState} from 'react';
import {Button} from 'reactstrap';
import CreatePackingList from './CreatePackingList';

function AllPackingList({packingLists}) {
    const [showModal, setShowModal] = useState(false);

    const handleRowClick = (id) => {
        window.location.href = `/packingList/${id}`;
    };

    return (
        <div>
            <div className="container mt-4">
                <h2>패킹 리스트</h2>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>리스트 명</th>
                        <th>출발 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {packingLists.map((packingList) => (
                        <tr key={packingList.id} onClick={() => handleRowClick(packingList.id)}>
                            <td>{packingList.title}</td>
                            <td>{packingList.departureDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Button color="primary" onClick={() => setShowModal(true)}>
                        추가
                    </Button>
                </div>
            </div>

            {showModal && (
                <CreatePackingList
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default AllPackingList;
