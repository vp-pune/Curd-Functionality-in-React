import React from 'react'
import AllMembers from './AllMembers';

function Header( {allMembers}) {
  return (
    <div className='container shadow p-4'>
      <h1>All Members</h1>
      <AllMembers allMembers={allMembers}  />
      
    </div>
  )
}

export default Header;