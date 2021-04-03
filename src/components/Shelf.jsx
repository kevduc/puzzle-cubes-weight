import React from 'react'
import Cube from './Cube'

const Shelf = (props) => {
  const { className, cubes, onCubeClick } = props

  return (
    <div className={`shelf d-flex flex-row flex-wrap justify-content-center align-items-center mx-2 ${className}`}>
      {cubes.map((cube) => (
        <Cube onClick={() => onCubeClick(cube.id)} key={cube.id} {...cube} />
      ))}
    </div>
  )
}

export default Shelf
