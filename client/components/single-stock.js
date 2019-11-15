import React from 'react'
import {Chart} from '../components'
import axios from 'axios'

export class SingleStock extends React.Component {
  constructor() {
    super()
    this.state = {
      chartInfo: {},
      tickerInfo: {}
    }
  }

  async componentDidMount() {
    let ticker = this.props.match.params.ticker
    let chartInfo = await axios.get(`/api/stocks/${ticker}/chart`)
    let tickerInfo = await axios.get(`/api/stocks/${ticker}/detail`)
    this.setState({
      tickerInfo: tickerInfo.data,
      chartInfo: chartInfo.data
    })
  }

  render() {
    return (
      <div className="single-stock-view">
        {this.state.tickerInfo.quoteData ? (
          <div>
            <h3>
              {this.props.match.params.ticker} -{' '}
              {
                this.state.tickerInfo.quoteData[this.props.match.params.ticker]
                  .longName
              }
            </h3>
            <Chart
              chartInfo={this.state.chartInfo}
              ticker={this.props.match.params.ticker}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}
