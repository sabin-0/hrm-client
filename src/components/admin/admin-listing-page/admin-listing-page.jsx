import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './admin-listing-page.css';
import { Link } from "react-router-dom";

async function fetchDataFromAPI(pageNumber, pageSize, keyword) {
    try {
        let token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:2005/users?page=${pageNumber}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`, {
            "headers" : {
                "authorization" : `Bearer ${token}`
            }
        });
        console.log("API Response:", response.data);
        return response.data.data;
    } catch(error) {
        throw error;
    }
}

export default function AdminListingPage() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize, keyword]);

    const fetchData = async (pageNumber, pageSize,) => {
        try {
            const data = await fetchDataFromAPI(pageNumber, pageSize, keyword);
            console.log("Data from API:", data);
            setUsers(data.datas);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleSearchInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleViewUser = (userId) => {
        navigate(`/admin-view/${userId}`);   
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Admin Page</title>
            <div className="admin-container">
                <header id="admin-header">
                    <h1 id="admin-h1">User Management</h1>
                    <Link to={'/addUser'}><button className="admin-btn-primary admin-btn ">
                        Add User
                    </button>
                    </Link>
                    <button className="admin-btn-primary admin-btn ">
                        Logout
                    </button>
                </header>

                
            
                <main id="admin-main">

                    <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={keyword}
                    onChange={handleSearchInputChange}
                />
                <button onClick={() => fetchData(currentPage, pageSize)}>Search</button>
             </div>

                <table id="admin-table">
                        <thead>
                            <tr id="admin-tr">
                                <th className="admin-th">First Name</th>
                                <th className="admin-th">Last Name</th>
                                <th className="admin-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>
                                            <button className="btn btn-primary btn-edit" onClick={() => handleViewUser(user._id)}>View</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
            {/* Pagination section */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    );
}
