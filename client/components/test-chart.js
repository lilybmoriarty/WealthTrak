// Step 1 - Include react
import React from 'react'
import ReactDOM from 'react-dom'

// Step 2 - Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Step 3 - Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Step 4 - Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts'

// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

let dataSource = {
  // Chart Configuration
  chart: {
    caption: 'Countries With Most Oil Reserves [2017-18]',
    subCaption: 'In MMbbl = One Million barrels',
    xAxisName: 'Country',
    yAxisName: 'Reserves (MMbbl)',
    numberSuffix: 'K',
    theme: 'fusion'
  },
  // Chart Data
  data: [
    {
      label: 'Venezuela',
      value: '290'
    },
    {
      label: 'Saudi',
      value: '260'
    },
    {
      label: 'Canada',
      value: '180'
    },
    {
      label: 'Iran',
      value: '140'
    },
    {
      label: 'Russia',
      value: '115'
    },
    {
      label: 'UAE',
      value: '100'
    },
    {
      label: 'US',
      value: '30'
    },
    {
      label: 'China',
      value: '30'
    }
  ]
}

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const chartConfigs = {
  type: 'column2d', // The chart type
  width: '700', // Width of the chart
  height: '400', // Height of the chart
  dataFormat: 'json', // Data type,
  dataSource
}

export class Chart extends React.Component {
  render() {
    return <ReactFC {...chartConfigs} />
  }
}
