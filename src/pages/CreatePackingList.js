import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {format} from 'date-fns';

function CreatePackingList({show, onClose}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [departureDate, setDepartureDate] = useState(null);

    const handleConfirm = () => {
        if (!title || !departureDate) {
            alert('제목과 출발 날짜는 필수 입력 사항입니다.');
            return;
        }

        const formattedDate = format(departureDate, 'yyyy-MM-dd');

        const newPackingList = {
            title: title,
            description: description,
            departureDate: formattedDate,
        };

        fetch('http://localhost:8080/api/v1/packingList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPackingList),
        })
            .then((response) => {
                if (response.ok) {
                    onClose();
                    window.location.reload();
                } else {
                    console.log('Failed to add packing list.');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <Modal isOpen={show} toggle={onClose}>
            <ModalHeader toggle={onClose}>패킹리스트 추가</ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        패킹리스트 제목 <span className="text-danger">*</span>
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

export default CreatePackingList;
