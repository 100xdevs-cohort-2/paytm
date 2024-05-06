import React from 'react'
import AppBar from '../components/AppBar'
import Ballance from '../components/Ballance'
import SearchComponent from '../components/SearchComponent'

const Dashboard = () => {
  return (
    <div className=' w-full h-full flex flex-col'>
      <AppBar />
      <hr />
      <Ballance />
      <SearchComponent />
    </div>
  )
}

export default Dashboard;
