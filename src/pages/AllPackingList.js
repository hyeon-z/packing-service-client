import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import CreatePackingList from './CreatePackingList';
import EditPackingList from './EditPackingList';
import '../App.css';

function AllPackingList({packingLists}) {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPackingList, setSelectedPackingList] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleRowClick = (id) => {
        window.location.href = `/packingList/${id}`;
    };

    const handleCellClick = (event, packingList) => {
        const target = event.target;
        const isCellClick = target.tagName.toLowerCase() === 'td';
        if (isCellClick) {
            setSelectedPackingList(packingList);
            setShowTaskModal(true);
        }
    };

    const handleEditClick = () => {
        setShowEditModal(true);
        setShowTaskModal(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
        setShowTaskModal(false);
    };

    const handleEditConfirm = () => {
        console.log('Edit packing list:', selectedPackingList);
        setShowEditModal(false);
    };

    const handleDeleteConfirm = () => {
        if (!selectedPackingList) {
            console.error('No selected packing list.');
            setShowDeleteModal(false);
            return;
        }

        fetch(`http://localhost:8080/api/v1/packingList/${selectedPackingList.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload();
                    console.log('Delete success');
                    setShowDeleteModal(false);
                } else {
                    console.error('Error deleting packing list:', response);
                    setShowDeleteModal(false);
                }
            })
            .catch((error) => {
                console.error('Error deleting packing list:', error);
                setShowDeleteModal(false);
            });
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="container mt-4" style={{fontFamily: 'CustomFont, sans-serif'}}>
            <h2 className="text-center mb-4">패킹 리스트</h2>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center bg-info-subtle" style={{fontFamily: 'CustomFontBold, sans-serif'}}>리스트 명
                    </th>
                    <th className="text-center bg-info-subtle" style={{fontFamily: 'CustomFontBold, sans-serif'}}>출발 날짜
                    </th>
                    <th className="text-center bg-info-subtle" style={{fontFamily: 'CustomFontBold, sans-serif'}}>작업
                    </th>
                </tr>
                </thead>
                <tbody>
                {packingLists.map((packingList) => (
                    <tr key={packingList.id}>
                        <td
                            className="text-center table-link"
                            style={{cursor: 'pointer'}}
                            onClick={() => handleRowClick(packingList.id)}
                        >
                            {packingList.title}
                        </td>
                        <td
                            className="text-center table-link"
                            style={{cursor: 'pointer'}}
                            onClick={() => handleRowClick(packingList.id)}
                        >
                            {packingList.departureDate}
                        </td>
                        <td
                            className="text-center table-link"
                            style={{cursor: 'pointer'}}
                            onClick={(e) => handleCellClick(e, packingList)}
                        >
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

            {showModal && (
                <CreatePackingList
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                />
            )}

            {showEditModal && (
                <EditPackingList
                    show={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                    }}
                    selectedPackingList={selectedPackingList}
                />
            )}

            {showTaskModal && (
                <Modal isOpen={showTaskModal} toggle={() => setShowTaskModal(false)}
                       style={{fontFamily: 'CustomFont, sans-serif'}}>
                    <ModalHeader toggle={() => setShowTaskModal(false)}>
                        패킹리스트 작업 선택
                    </ModalHeader>
                    <ModalBody>
                        <p>수정 또는 삭제를 선택하세요.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleEditClick}>
                            수정
                        </Button>{" "}
                        <Button color="danger" onClick={handleDeleteClick}>
                            삭제
                        </Button>{" "}
                        <Button color="secondary" onClick={() => setShowTaskModal(false)}
                                style={{fontFamily: 'CustomFont, sans-serif'}}>
                            취소
                        </Button>
                    </ModalFooter>
                </Modal>
            )}

            <Modal isOpen={showEditModal} toggle={() => setShowEditModal(false)}
                   style={{fontFamily: 'CustomFont, sans-serif'}}>
                <ModalHeader toggle={() => setShowEditModal(false)}>
                    패킹리스트 수정
                </ModalHeader>
                <ModalBody>
                    <div>패킹리스트 수정 폼</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditConfirm}>
                        확인
                    </Button>{" "}
                    <Button color="secondary" onClick={() => setShowEditModal(false)}>
                        취소
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}
                   style={{fontFamily: 'CustomFont, sans-serif'}}>
                <ModalHeader toggle={() => setShowDeleteModal(false)}>
                    패킹리스트 삭제
                </ModalHeader>
                <ModalBody>
                    <p>정말로 패킹리스트를 삭제하시겠습니까?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteConfirm}>
                        삭제
                    </Button>{" "}
                    <Button color="secondary" onClick={handleDeleteCancel}>
                        취소
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AllPackingList;
