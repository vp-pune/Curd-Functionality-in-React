import React, { useEffect, useState } from 'react';
import ModalForm from './ModalForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import { cancelledDeleteMember, memberDeletedAlert, memberIsAliveAlert } from './sweetAlerts';
import Pagination from './Pagination';
import ShowEntries from './ShowEntries';
import { Toast } from 'react-bootstrap'; // Import Toast component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styles

function AllMembers() {
    const [modalFormOpen, setModalFormOpen] = useState(false);
    const [allMembers, setAllMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentMember, setCurrentMember] = useState(null);
    const [entries, setEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [showToast, setShowToast] = useState(false); // State to control toast visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://crudcrud.com/api/7ac2d1e21e9347d4873c764195729651/members');
                console.log('Data fetched successfully:', response.data);
                setAllMembers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleModalFormOpen = () => {
        setCurrentMember(null);
        setModalFormOpen(true);
    };

    const handleCloseModalForm = () => {
        setModalFormOpen(false);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const addNewMemberToState = (newMember) => {
        setAllMembers((prevMembers) => [...prevMembers, newMember]);
    };

    const updateMemberInState = (updatedMember) => {
        setAllMembers((prevMembers) =>
            prevMembers.map((member) =>
                member._id === updatedMember._id ? updatedMember : member
            )
        );
    };

    const filteredData = allMembers.filter((member) =>
        (member.name && member.name.toLowerCase().includes(search.toLowerCase())) ||
        (member.email && member.email.toLowerCase().includes(search.toLowerCase()))
    );

    const handleEditMember = (member) => {
        setCurrentMember(member);
        setModalFormOpen(true);
    };

    const handleDeleteMember = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "If you delete this Member Then this action can not be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "light-blue",
            cancelButtonText: "Cancel",
            cancelButtonColor: "red"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://crudcrud.com/api/7ac2d1e21e9347d4873c764195729651/members/${id}`);
                    if (response.status !== 200) {
                        throw new Error('Network response was not ok');
                    }
                    const newData = allMembers.filter((member) => member._id !== id);
                    setAllMembers(newData);
                    memberDeletedAlert();
                    setShowToast(true); // Show toast after successful deletion
                } catch (error) {
                    console.error('Error:', error);
                    memberIsAliveAlert();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelledDeleteMember();
            }
        });
    };

    const totalPages = Math.ceil(filteredData.length / entries);
    const currentData = filteredData.slice((currentPage - 1) * entries, currentPage * entries);

    return (
        <div>
            <div className='d-flex justify-content-around my-3'>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control p-3"
                        id="searchMembers"
                        onChange={handleSearch}
                    />
                </div>
                <div>
                    <button
                        onClick={handleModalFormOpen}
                        className='btn btn-success rounded text-center px-4 py-2 mb-0'
                    >
                        Add New Member
                    </button>
                </div>
            </div>
            <hr />
            {currentData.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Member Name</th>
                            <th scope="col">Member Email</th>
                            <th scope="col">Member Age</th>
                            <th scope="col">Member Parent Id</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((person, i) => (
                            <tr key={person._id}>
                                <td>{i + 1}</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => handleEditMember(person)}>{person.name}</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => handleEditMember(person)}>{person.email}</td>
                                <td>{person.age}</td>
                                <td>{person.parentId}</td>
                                <td>
                                    <span onClick={() => handleDeleteMember(person._id)} className="material-symbols-outlined text-danger" style={{ cursor: 'pointer' }}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No members found</p>
            )}
            {modalFormOpen && (
                <ModalForm
                    onClose={handleCloseModalForm}
                    addNewMemberToState={addNewMemberToState}
                    updateMemberInState={updateMemberInState}
                    currentMember={currentMember}
                />
            )}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <ShowEntries entries={entries} setEntries={setEntries} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            {/* Toast Message */}
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Member Deleted</strong>
                </Toast.Header>
                <Toast.Body>Member has been successfully deleted!</Toast.Body>
            </Toast>
        </div>
    );
}

export default AllMembers;
