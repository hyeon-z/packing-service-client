import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from 'react-router-dom';

function CreatePackingList() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (!title || !departureDate) {
            alert('제목과 출발 날짜는 필수 입력 사항입니다.');
            return;
        }

        const newPackingList = {
            title: title,
            description: description,
            departureDate: departureDate
        };

        // API 호출
        fetch('http://localhost:8080/api/v1/packingList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPackingList)
        })
            .then(response => {
                console.log(newPackingList);
                if (response.ok) {
                    navigate('/packingList');
                    window.location.reload();
                } else {
                    console.log('Failed to add packing list.');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">패킹리스트 추가</h2>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                    패킹리스트 제목 <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required // 필수 입력 속성 추가
                />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">설명</label>
                <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    출발 날짜 <span className="text-danger">*</span>
                </label>
                <div>
                    <DatePicker
                        selected={departureDate}
                        onChange={date => setDepartureDate(date)}
                        className="form-control"
                    />
                </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary" type="button" onClick={handleConfirm}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default CreatePackingList;
