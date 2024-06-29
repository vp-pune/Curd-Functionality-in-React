import React from 'react';

function ShowEntries({ entries, setEntries, currentPage, setCurrentPage }) {
    const handleEntriesChange = (e) => {
        const newEntries = Number(e.target.value);
        if (newEntries >= 1) {
            setEntries(newEntries);
            const newTotalPages = Math.ceil(entries / newEntries);
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages);
            }
        }
    };

    return (
        <div className="d-flex align-items-center">
            <span>Show</span>
            <input
                type="number"
                value={entries}
                onChange={handleEntriesChange}
                className="form-control mx-2"
                style={{ width: '80px' }}
            />
            <span>Entries</span>
        </div>
    );
}

export default ShowEntries;
