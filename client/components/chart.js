import React from 'react'

// Step 2 - Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Step 3 - Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Step 4 - Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts'

// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

let chartConfigs = {
  type: 'column2d', // The chart type
  width: '700', // Width of the chart
  height: '400', // Height of the chart
  dataFormat: 'json', // Data type,
  dataSource: {}
}

export class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = chartConfigs
  }

  componentDidMount() {
    console.log('this.props.chartInfo', this.props.chartInfo)
    // let fusionChartDataClose = [this.props.chartInfo.close]
    // let fusionChartDataDates = [this.props.chartInfo.timestamp]

    chartConfigs.dataSource = {
      chart: {
        caption: `Price and Volume Data for ${this.props.ticker}`,
        subCaption: 'OHLC and Volume Chart',
        xAxisName: 'Date',
        yAxisName: 'Price (USD)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      // Chart Data
      data: [] // array of objects
    }

    this.setState(chartConfigs)
  }

  render() {
    console.log('this is this.props', this.props)
    return <ReactFC {...this.state} />
  }
}

// function objOfTwoArr(arrKey, arrValue) {
//   let obj = {}
//   for (let i = 0; i < arrKey.length; i++) {}
//   return obj
// }
