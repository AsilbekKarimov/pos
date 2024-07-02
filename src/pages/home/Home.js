import React from 'react'
import Modal from '../../components/Modal'

const Home = () => {
  return (
    <div>
      <Modal inputs={['first name', 'last name', 'geyman', 'daun']} topText={"dasdas"} buttonText={"Register"} />
    </div>
  )
}

export default Home