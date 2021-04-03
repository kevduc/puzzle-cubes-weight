import React, { Component } from 'react'
import Scale from './components/Scale'
import Shelf from './components/Shelf'

import { randInt } from './utils/utils'
import _ from 'lodash'

const NumCubes = 12

const initialState = {
  selectedSide: 'left',
  cubes: [...new Array(NumCubes).keys()].map((idx) => ({ id: idx, name: `${idx}`, weight: 1, location: 'shelf' })),
  specialCubeId: randInt(0, NumCubes - 1),
  showWeights: false,
}

initialState.cubes[initialState.specialCubeId].weight = Math.pow(NumCubes, 2 * Math.random() - 1) // Can weight NumCubes times less or more than the other normal cubes (that weight 1)
initialState.cubes[initialState.specialCubeId].special = true

export const WeightContext = React.createContext(initialState.showWeights)

class App extends Component {
  state = _.cloneDeep(initialState)

  reset = () => {
    this.setState(({ selectedSide }) => ({ ..._.cloneDeep(initialState), selectedSide }))
  }

  toggleShowWeights = () => {
    this.setState(({ showWeights }) => ({ showWeights: !showWeights }))
  }

  selectPan = (side) => {
    this.setState({ selectedSide: side })
  }

  deselectPans = () => {
    // this.setState({ selectedSide: 'none' })
  }

  handleScaleCubeClick = (cubeId, side) => {
    // console.debug(cubeId)
    const newCubes = [...this.state.cubes]
    newCubes[cubeId].location = 'shelf'
    this.setState({ cubes: newCubes })
  }

  handleShelfCubeClick = (cubeId) => {
    // console.debug(cubeId)
    if (this.state.selectedSide === 'none') return
    const newCubes = [...this.state.cubes]
    newCubes[cubeId].location = `${this.state.selectedSide}-pan`
    this.setState({ cubes: newCubes })
  }

  render() {
    const { selectedSide, cubes, showWeights } = this.state

    const panWeights = ['left', 'right'].map((side) =>
      cubes.filter((cube) => cube.location === `${side}-pan`).reduce((totalWeight, { weight }) => totalWeight + weight, 0)
    )
    const tilt = panWeights[0] > panWeights[1] ? 'left' : panWeights[1] > panWeights[0] ? 'right' : 'none'

    return (
      <div onClick={this.deselectPans} className={`d-flex flex-column h-100 ${showWeights ? 'weight' : ''}`}>
        <main className="d-flex flex-column justify-content-evenly align-items-center flex-nowrap flex-fill h-auto">
          <WeightContext.Provider value={showWeights}>
            <Scale
              onPanClick={this.selectPan}
              onCubeClick={this.handleScaleCubeClick}
              className="scale"
              cubes={cubes.filter((cube) => cube.location !== 'shelf')}
              tilt={tilt}
              selectedSide={selectedSide}
            />
            <Shelf
              onCubeClick={this.handleShelfCubeClick}
              className="shelf"
              cubes={cubes.filter((cube) => cube.location === 'shelf')}
            />
          </WeightContext.Provider>
        </main>

        <header className="d-flex flex-row justify-content-center flex-nowrap h-auto">
          <button type="button" className="btn btn-primary m-2" onClick={this.reset}>
            Reset
          </button>
          <button type="button" className="btn btn-primary m-2" onClick={this.toggleShowWeights}>
            {showWeights ? 'Hide' : 'Show'} Weights
          </button>
        </header>
      </div>
    )
  }
}

export default App
