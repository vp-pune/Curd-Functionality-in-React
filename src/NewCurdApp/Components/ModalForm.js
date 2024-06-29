import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { NewMemberAddedAlert, NewMemberCancelAlert } from './sweetAlerts';
import axios from 'axios';
function ModalForm({ onClose, addNewMemberToState, updateMemberInState, currentMember }) {
    const initialValue = { name: '', email: '', age: '', parentId: '' };
    const [input, setInput] = useState(initialValue);

    useEffect(() => {
        if (currentMember) {
            setInput(currentMember);
        } else {
            setInput(initialValue);
        }
    }, [currentMember]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: input.name,
            email: input.email,
            age: input.age,
            parentId: input.parentId
        };

        try {
            if (currentMember) {
                const response = await axios.put(`https://crudcrud.com/api/7ac2d1e21e9347d4873c764195729651/members/${currentMember._id}`, data);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                updateMemberInState(response.data);
                NewMemberAddedAlert();
            } else {
                const response = await axios.post('https://crudcrud.com/api/7ac2d1e21e9347d4873c764195729651/members', data);
                if (response.status !== 201) {
                    throw new Error('Network response was not ok');
                }
                addNewMemberToState(response.data);
                NewMemberAddedAlert();
            }
            onClose();
        } catch (error) {
            console.error('Error:', error);
            NewMemberCancelAlert();
        }
    };

    return (
        <div className="modal" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentMember ? 'Edit Member' : 'Add New Member'}</h5>
                        <button type="button" onClick={onClose} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="memberName">Member Name</label>
                                <input
                                placeholder='Member Name'
                                    onChange={handleChange}
                                    name="name"
                                    value={input.name}
                                    type="text"
                                    className="form-control"
                                    id="memberName"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="memberEmail">Member Email</label>
                                <input
                                placeholder='Member Email'
                                    onChange={handleChange}
                                    name="email"
                                    value={input.email}
                                    type="email"
                                    className="form-control"
                                    id="memberEmail"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="memberAge">Member Age</label>
                                <input
                                placeholder='Member Age'
                                    onChange={handleChange}
                                    name="age"
                                    value={input.age}
                                    type="number"
                                    className="form-control"
                                    id="memberAge"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="memberParentId">Member Parent Id</label>
                                <input
                                placeholder='Member Parent Id'
                                    onChange={handleChange}
                                    name="parentId"
                                    value={input.parentId}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-primary">
                                    {currentMember ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalForm;
