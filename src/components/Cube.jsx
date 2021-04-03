import React from 'react'
import { formatWeight } from '../utils/utils'
import { WeightContext } from './../App'

const Cube = (props) => {
  const { name, weight, className, onClick, special } = props
  return (
    <WeightContext.Consumer>
      {(showWeights) => (
        <div
          onClick={(e) => {
            onClick()
            e.stopPropagation()
          }}
          className={`cube cursor-pointer rounded-lg d-flex justify-content-center align-items-center p-1 ${className || ''} ${
            showWeights && special ? `special-${weight > 1 ? 'heavier' : 'lighter'}` : ''
          }`}>
          <p className="m-0">{showWeights ? formatWeight(weight) : name}</p>
        </div>
      )}
    </WeightContext.Consumer>
  )
}

export default Cube
