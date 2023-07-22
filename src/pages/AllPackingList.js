import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function AllPackingList({packingLists}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPackingList, setSelectedPackingList] = useState(null);

    const handleRowClick = (id) => {
        window.location.href = `/packingList/${id}`;
    };

    const handleEditClick = () => {
        setShowModal(false);
        // TODO: 수정 기능 구현
    };

    const handleDeleteClick = () => {
        setShowModal(false);
        // TODO: 삭제 기능 구현
    };

    const handleCellClick = (event, packingList) => {
        const target = event.target;
        const isCellClick = target.tagName.toLowerCase() === 'td';
        if (isCellClick) {
            setSelectedPackingList(packingList);
            setShowModal(true);
        }
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
                        <th>작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {packingLists.map((packingList) => (
                        <tr key={packingList.id}>
                            <td onClick={() => handleRowClick(packingList.id)} style={{cursor: 'pointer'}}>
                                {packingList.title}
                            </td>
                            <td onClick={() => handleRowClick(packingList.id)} style={{cursor: 'pointer'}}>
                                {packingList.departureDate}
                            </td>
                            <td onClick={(e) => handleCellClick(e, packingList)} style={{cursor: 'pointer'}}>
                                :
                            </td>
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
                <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                    <ModalHeader toggle={() => setShowModal(false)}>패킹리스트 작업 선택</ModalHeader>
                    <ModalBody>
                        <p>수정 또는 삭제를 선택하세요.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleEditClick}>
                            수정
                        </Button>{' '}
                        <Button color="danger" onClick={handleDeleteClick}>
                            삭제
                        </Button>{' '}
                        <Button color="secondary" onClick={() => setShowModal(false)}>
                            취소
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    );
}

export default AllPackingList;
