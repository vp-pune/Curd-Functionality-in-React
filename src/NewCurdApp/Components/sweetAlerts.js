
import Swal from 'sweetalert2';


export const NewMemberAddedAlert =()=> {
    Swal.fire(
        'Success!',
        'New member added.',
        'success'
    );
}

export const NewMemberCancelAlert = () => {
    Swal.fire(
        'Error!',
        'There was a problem adding the member.',
        'error'
    );
}

export const memberDeletedAlert = () => {
    Swal.fire(
        "Deleted!",
        "The member has been deleted.",
        "success"
    );}

export const memberIsAliveAlert = () => {
    Swal.fire(
        'Error!',
        'There was a problem deleting the member.',
        'error'
    );
}

export const cancelledDeleteMember=()=>{
    Swal.fire(
        "Cancelled",
        "The member is safe :)",
        "error"
    );
}