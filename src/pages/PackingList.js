import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CreatePack from './CreatePack';
import EditPack from './EditPack';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import '../App.css';

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

    const handleCheckBoxChange = (itemId, checked) => {
        const updatedPackingItems = packingItems.map((item) =>
            item.id === itemId ? {...item, checked} : item
        );
        setPackingItems(updatedPackingItems);

        fetch(`http://localhost:8080/api/v1/pack/${itemId}?checked=${checked}`, {
            method: 'PATCH',
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Checked status updated successfully.');
                } else {
                    console.error('Error updating checked status:', response);
                }
            })
            .catch((error) => {
                console.error('Error updating checked status:', error);
            });
    };

    const handleCellClick = (event, pack) => {
        const target = event.target;
        const isCellClick = target.tagName.toLowerCase() === 'td';
        if (isCellClick) {
            setSelectedPack(pack);
            setShowTaskModal(true);
        }
    };

    const handleEditClick = (pack) => {
        setSelectedPack(pack);
        setShowEditModal(true);
        setShowTaskModal(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
        setShowModal(false);
    };

    const handleUpdatePack = (updatedPack) => {
        const updatedPackingItems = packingItems.map((item) =>
            item.id === updatedPack.id ? {...item, name: updatedPack.name, category: updatedPack.category} : item
        );
        setPackingItems(updatedPackingItems);
    };

    const handleDeleteConfirm = () => {
        if (!selectedPack) {
            console.error('No selected pack.');
            setShowDeleteModal(false);
            return;
        }

        fetch(`http://localhost:8080/api/v1/pack/${selectedPack.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload();
                    console.log('Delete success');
                    setShowDeleteModal(false);
                } else {
                    console.error('Error deleting pack:', response);
                    setShowDeleteModal(false);
                }
            })
            .catch((error) => {
                console.error('Error deleting pack:', error);
                setShowDeleteModal(false);
            });
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    if (!packingList) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{fontFamily: 'CustomFont, sans-serif'}}>
            <div className="container mt-4">
                <h3>패킹리스트</h3>
                <p>제목: {packingList.title}</p>
                <p>출발 날짜: {packingList.departureDate}</p>
                {packingList.description && <p>설명: {packingList.description}</p>}

                <h3>짐 목록</h3>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Button color="primary" onClick={() => setShowModal(true)} style={{marginBottom: '30px'}}>
                        추가
                    </Button>
                </div>

                <table className="table table-bordered table-hover" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th className="text-center bg-info-subtle"
                            style={{fontFamily: 'CustomFontBold, sans-serif'}}>카테고리
                        </th>
                        <th className="text-center bg-info-subtle" style={{fontFamily: 'CustomFontBold, sans-serif'}}>이름
                        </th>
                        <th className="text-center bg-info-subtle" style={{fontFamily: 'CustomFontBold, sans-serif'}}>챙김 여부
                        </th>
                        <th className="text-center bg-info-subtle"
                            style={{fontFamily: 'CustomFontBold, sans-serif'}}>작업
                        </th>
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
                                    onChange={() => handleCheckBoxChange(item.id, !item.checked)}
                                    className="custom-checkbox"
                                />
                            </td>
                            <td onClick={(e) => handleCellClick(e, item)}
                                style={{cursor: 'pointer'}}>
                                :
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <CreatePack show={showModal} onClose={() => setShowModal(false)} packingListId={id}/>

            {showTaskModal && (
                <Modal isOpen={showTaskModal} toggle={() => setShowTaskModal(false)}
                       style={{fontFamily: 'CustomFont, sans-serif'}}>
                    <ModalHeader toggle={() => setShowTaskModal(false)}>짐 작업 선택</ModalHeader>
                    <ModalBody>
                        <p>수정 또는 삭제를 선택하세요.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => handleEditClick(selectedPack)}>
                            수정
                        </Button>{' '}
                        <Button color="danger" onClick={handleDeleteClick}>
                            삭제
                        </Button>{' '}
                        <Button color="secondary" onClick={() => setShowTaskModal(false)}>
                            취소
                        </Button>
                    </ModalFooter>
                </Modal>
            )}

            <EditPack
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                selectedPack={selectedPack}
                onUpdate={handleUpdatePack}
            />

            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}
                   style={{fontFamily: 'CustomFont, sans-serif'}}>
                <ModalHeader toggle={() => setShowDeleteModal(false)}>짐 삭제</ModalHeader>
                <ModalBody>
                    <p>정말로 짐을 삭제하시겠습니까?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteConfirm}>
                        삭제
                    </Button>{' '}
                    <Button color="secondary" onClick={handleDeleteCancel}>
                        취소
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PackingList;
