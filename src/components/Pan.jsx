import React from 'react'
import Cube from './Cube'

const Pan = (props) => {
  const { className, cubes, onCubeClick } = props

  return (
    <div
      className={`pan d-flex flex-row justify-content-center align-items-end flex-wrap-reverse align-content-start ${
        className || ''
      }`}>
      {cubes.map((cube) => (
        <Cube onClick={() => onCubeClick(cube.id)} key={cube.id} className="cube-sm" {...cube} />
      ))}
    </div>
  )
}

export default Pan
