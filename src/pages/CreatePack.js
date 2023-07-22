import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function CreatePack({show, onClose, packingListId}) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleConfirm = () => {
        if (!name || !category) {
            alert('이름과 카테고리는 필수 입력 사항입니다.');
            return;
        }

        const newPack = {
            packingListId: packingListId,
            name: name,
            category: category,
        };

        // API 호출
        fetch('http://localhost:8080/api/v1/pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPack),
        })
            .then((response) => {
                if (response.ok) {
                    onClose();
                    window.location.reload();
                } else {
                    console.log('Failed to add pack.');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <Modal isOpen={show} toggle={onClose}>
            <ModalHeader toggle={onClose}>짐 추가</ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        짐 이름 <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categorySelect" className="form-label">
                        카테고리 <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        id="categorySelect"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            카테고리 선택
                        </option>
                        <option value="의류">의류</option>
                        <option value="세면용품">세면용품</option>
                        <option value="음식">음식</option>
                        <option value="기타">기타</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleConfirm}>
                    확인
                </Button>
                <Button color="secondary" onClick={onClose}>
                    취소
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CreatePack;
