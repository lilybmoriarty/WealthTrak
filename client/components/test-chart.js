// Step 1 - Include react
import React from 'react'

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
    caption: 'Price and Volume Data for [ticker]',
    subCaption: 'OHLC and Volume Chart',
    xAxisName: 'Date',
    yAxisName: 'Price (USD)',
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

// example JSON from Yahoo Finance
/*
{
  open: [
  136.24000549316406,
  137.8000030517578,
  138,
  137.8699951171875,
  137.5800018310547
  ],
  high: [
  137.74000549316406,
  138.75999450683594,
  138.77999877929688,
  139.13999938964844,
  137.61000061035156
  ],
  low: [
  136.22999572753906,
  137.6300048828125,
  137.5500030517578,
  137.5800018310547,
  136.16000366210938
  ],
  close: [
  137.6699981689453,
  137.88999938964844,
  138.77999877929688,
  137.69000244140625,
  137.61000061035156
  ],
  volume: [
  3335400,
  3015000,
  4477300,
  4073800,
  2278400
  ],
  timestamp: [
  1572877800,
  1572964200,
  1573050600,
  1573137000,
  1573223400
  ]
  }
  */
