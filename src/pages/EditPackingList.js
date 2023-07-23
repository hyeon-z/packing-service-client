import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {format, parseISO} from 'date-fns';
import '../App.css';

function EditPackingList({show, onClose, selectedPackingList}) {
    const [title, setTitle] = useState(selectedPackingList?.title || '');
    const [description, setDescription] = useState(selectedPackingList?.description || '');
    const [departureDate, setDepartureDate] = useState(
        selectedPackingList?.departureDate ? parseISO(selectedPackingList.departureDate) : null
    );

    const handleConfirm = () => {
        const editedPackingList = {
            title: title,
            description: description,
            departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : null
        };

        fetch(`http://localhost:8080/api/v1/packingList/${selectedPackingList.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedPackingList),
        })
            .then((response) => {
                if (response.ok) {
                    onClose();
                    window.location.reload();
                } else {
                    console.log('패킹리스트 수정에 실패했습니다.');
                }
            })
            .catch((error) => console.error('오류:', error));
    };

    return (
        <Modal isOpen={show} toggle={onClose} style={{fontFamily: 'CustomFont, sans-serif'}}>
            <ModalHeader toggle={onClose}>패킹리스트 수정</ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        제목 <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">
                        설명
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        출발 날짜 <span className="text-danger">*</span>
                    </label>
                    <div>
                        <DatePicker
                            selected={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                            className="form-control"
                        />
                    </div>
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

export default EditPackingList;
