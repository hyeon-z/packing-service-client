import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CreatePack from './CreatePack';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function PackingList() {
    const {id} = useParams();
    const [packingList, setPackingList] = useState(null);
    const [packingItems, setPackingItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleCellClick = (event, pack) => {
        const target = event.target;
        const isCellClick = target.tagName.toLowerCase() === 'td';
        if (isCellClick) {
            setSelectedPack(pack);
            setShowTaskModal(true);
        }
    };

    const handleEditClick = () => {
        setShowEditModal(true);
        setShowModal(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
        setShowModal(false);
    };

    const handleEditConfirm = () => {
        console.log('Edit packing list:', selectedPack);
        setShowEditModal(false);
    };

    const handleDeleteConfirm = () => {
        console.log('Delete packing list with id:', selectedPack.id);
        setShowDeleteModal(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    if (!packingList) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container mt-4">
                <h2>{packingList.title}</h2>
                <p>출발 날짜: {packingList.departureDate}</p>
                {packingList.description && <p>설명: {packingList.description}</p>}

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
                        <th>작업</th>
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
                            <td onClick={(e) => handleCellClick(e, item)} style={{cursor: 'pointer'}}>
                                :
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

            {showTaskModal && (
                <Modal isOpen={showTaskModal} toggle={() => setShowTaskModal(false)}>
                    <ModalHeader toggle={() => setShowTaskModal(false)}>패킹리스트 작업 선택</ModalHeader>
                    <ModalBody>
                        <p>수정 또는 삭제를 선택하세요.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleEditClick}>수정</Button>{' '}
                        <Button color="danger" onClick={handleDeleteClick}>삭제</Button>{' '}
                        <Button color="secondary" onClick={() => setShowTaskModal(false)}>취소</Button>
                    </ModalFooter>
                </Modal>
            )}

            <Modal isOpen={showEditModal} toggle={() => setShowEditModal(false)}>
                <ModalHeader toggle={() => setShowEditModal(false)}>패킹리스트 수정</ModalHeader>
                <ModalBody>
                    <div>패킹리스트 수정 폼</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditConfirm}>확인</Button>{' '}
                    <Button color="secondary" onClick={() => setShowEditModal(false)}>취소</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
                <ModalHeader toggle={() => setShowDeleteModal(false)}>패킹리스트 삭제</ModalHeader>
                <ModalBody>
                    <p>정말로 패킹리스트를 삭제하시겠습니까?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteConfirm}>삭제</Button>{' '}
                    <Button color="secondary" onClick={handleDeleteCancel}>취소</Button>
                </ModalFooter>
            </Modal>
        </div>

    );
}

export default PackingList;
