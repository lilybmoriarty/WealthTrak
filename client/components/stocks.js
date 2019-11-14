import React from 'react'
import ReactDOM from 'react-dom'
import {Chart} from '../components'

export class Stocks extends React.Component {
  render() {
    return (
      <div>
        {' '}
        stocks page
        <Chart />
      </div>
    )
  }
}
