import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function AllPackingList({packingLists}) {
    useEffect(() => {
    }, []);


    return (
        <div>
            <div className="container mt-4">
                <h2>패킹 리스트</h2>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>리스트 명</th>
                        <th>출발 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {packingLists.map((packingList) => (
                        <tr key={packingList.id}>
                            <td>{packingList.title}</td>
                            <td>{packingList.departureDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Link to="/packingList/create" className="btn btn-primary me-md-2">
                        추가
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AllPackingList;
