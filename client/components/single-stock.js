import React from 'react'
import ReactDOM from 'react-dom'
import {Chart} from '../components'

export class SingleStock extends React.Component {
  render() {
    return (
      <div>
        {' '}
        single stock page
        <Chart />
      </div>
    )
  }
}
