import React from 'react'
import Pan from './Pan'

const tiltMap = {
  left: ['down', 'up'],
  right: ['up', 'down'],
  none: ['middle', 'middle'],
}

const Scale = (props) => {
  const { selectedSide, className, onPanClick, onCubeClick, cubes, tilt } = props

  return (
    <div className={`scale d-flex flex-row justify-content-between align-items-stretch ${className || ''}`}>
      {['left', 'right'].map((side, idx) => {
        const tiltClass = `pan-base-${tiltMap[tilt][idx]}`

        return (
          <div key={side} className={`d-flex flex-column justify-content-end align-items-stretch`}>
            <Pan
              onCubeClick={(cubeId) => onCubeClick(cubeId, side)}
              cubes={cubes.filter(({ location }) => location === `${side}-pan`)}
            />
            <div
              onClick={(e) => {
                onPanClick(side)
                e.stopPropagation()
              }}
              className={`pan-base cursor-pointer flex-shrink-0 d-flex flex-column justify-content-stretch align-items-center ${
                side === selectedSide ? 'selected' : ''
              }`}>
              <div className={`border border-dark ${tiltClass}`}></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Scale
