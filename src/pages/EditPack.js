import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import '../App.css';

function EditPack({show, onClose, selectedPack, onUpdate}) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (selectedPack) {
            setName(selectedPack.name);
            setCategory(selectedPack.category);
        }
    }, [selectedPack]);

    const handleConfirm = () => {
        if (!name || !category) {
            alert('이름과 카테고리는 필수 입력 사항입니다.');
            return;
        }

        const updatedPack = {
            name: name,
            category: category,
        };

        fetch(`http://localhost:8080/api/v1/pack/${selectedPack.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPack),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('네트워크 오류 - 서버 응답이 올바르지 않습니다.');
                }
                // 만약에 응답에 따른 처리가 필요하다면 여기서 처리할 수 있습니다.
                return response.json();
            })
            .then((data) => {
                onUpdate(data); // 업데이트된 데이터를 상위 컴포넌트로 전달합니다.
                onClose(); // 모달을 닫습니다.
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                alert('서버와의 통신 중 오류가 발생했습니다.');
            });
    };

    return (
        <Modal isOpen={show} toggle={onClose} style={{fontFamily: 'CustomFont, sans-serif'}}>
            <ModalHeader toggle={onClose}>짐 수정</ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        이름 <span className="text-danger">*</span>
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

export default EditPack;
