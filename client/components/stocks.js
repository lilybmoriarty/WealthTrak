import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class Stocks extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      results: [],
      noResults: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    let stocks = await axios.get(`/api/stocks/search/${this.state.searchTerm}`)
    stocks = stocks.data.body.ResultSet.Result

    if (!stocks.length) this.setState({noResults: true})
    this.setState({
      results: stocks
    })
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value}, () =>
      console.log('this is this.state', this.state)
    )
  }

  render() {
    console.log('this is this.state', this.state)
    return (
      <div>
        <p>Symbol Lookup</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input onChange={this.handleChange} type="text" name="keyword" />
          </label>
          <button type="submit">Search</button>
        </form>
        {this.state.results.length > 0 ? (
          <div>
            <div className="titles">
              <p>Symbol</p>
              <p>Name</p>
              <p>Price</p>
              <p>Change</p>
              <p>% Change</p>
              <p>Volume</p>
              <p>Market Cap</p>
            </div>
            <div className="stock-line-items">
              {this.state.results.map(ticker => (
                <div id="single-line-item" key={ticker.symbol}>
                  {/* <a href={`/stocks/${ticker.symbol}`}>{ticker.symbol}</a> */}
                  <Link
                    to={{
                      pathname: `/stocks/${ticker.symbol}`,
                      state: {results: this.state.results}
                    }}
                  >
                    {ticker.symbol}
                  </Link>

                  <p>{ticker.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>{this.state.noResults ? 'no results' : ''}</div>
        )}
      </div>
    )
  }
}
