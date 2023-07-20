import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from 'react-router-dom';

function CreatePack() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (!name || !category) {
            alert('이름과 카테고리는 필수 입력 사항입니다.');
            return;
        }

        const newPack = {
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
                console.log(newPack);
                if (response.ok) {
                    navigate('/packingList/all');
                    window.location.reload();
                } else {
                    console.log('Failed to add packing list.');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">짐 추가</h2>
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
                    required // 필수 입력 속성 추가
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
                    required // 필수 입력 속성 추가
                >
                    <option value="" disabled>
                        카테고리 선택
                    </option>
                    <option value="FOOD">음식</option>
                    <option value="CLOTHING">의류</option>
                    <option value="ELECTRONICS">전자제품</option>
                    {/* 기타 옵션들을 필요에 따라 추가 */}
                </select>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary" type="button" onClick={handleConfirm}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default CreatePack;
