import React,{useContext} from 'react'
import {UserContext} from '../context/user.context'
const Home = () => {
  const {user}=useContext(UserContext)
  
  function createProject(){
    console.log('create project')
  }
  return (
   <main className='p-4'>
    <div className="projects">
      <button className="project p-4 border border-slate-300 rounded-md">
      <i className="ri-sticky-note-add-line"></i>      </button>
    </div>
    </main>
  )
}

export default Home