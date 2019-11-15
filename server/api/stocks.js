const router = require('express').Router()
const unirest = require('unirest')
const {API_KEY, API_HOST} = require('../../secrets')
const region = 'US',
  lang = 'en'

router.get('/', (req, res, next) => {
  try {
    unirest
      .get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers`)
      .headers({
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      })
      .query({
        lang,
        region
      })
      .end(function(result) {
        res.send(result)
      })
  } catch (error) {
    next(error)
  }
})

router.get('/search/:keyword', (req, res, next) => {
  try {
    unirest
      .get(
        `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete`
      )
      .headers({
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      })
      .query({
        lang,
        region,
        // this is going to have to be req.body or something, when i try searching for a single stock
        query: req.params.keyword
      })
      .end(function(result) {
        res.send(result)
      })
  } catch (error) {
    next(error)
  }
})

router.get('/:ticker/detail', (req, res, next) => {
  try {
    unirest
      .get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail`)
      .headers({
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      })
      .query({
        lang,
        region,
        // this is going to have to be req.body or something, when i try searching for a single stock
        symbol: req.params.ticker
      })
      .end(function(result) {
        console.log('this is parseddown', {
          summaryProfile: result.body.summaryProfile,
          recommendationTrend: result.body.recommendationTrend,
          quoteData: result.body.quoteData
        })
        res.send({
          summaryProfile: result.body.summaryProfile,
          recommendationTrend: result.body.recommendationTrend,
          quoteData: result.body.quoteData
        })
      })
  } catch (error) {
    next(error)
  }
})

router.get('/:ticker/chart', (req, res, next) => {
  try {
    unirest
      .get(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-histories'
      )
      .headers({
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      })
      .query({
        region: 'US',
        lang: 'en',
        symbol: req.params.ticker,
        //The epoch time in seconds
        from: '1572877800',
        to: '1573246800',
        // Pass this param multiple times to get more related events (div|split|earn), such as : &events=div&events=split&events=earn
        events: 'div',
        // Allowed values are (1d|5d|1mo|3mo|6mo|1y|2y|5y|max)
        interval: '1d'
      })
      .end(function(result) {
        let chartData = {
          open: result.body.chart.result[0].indicators.quote[0].open,
          high: result.body.chart.result[0].indicators.quote[0].high,
          low: result.body.chart.result[0].indicators.quote[0].low,
          close: result.body.chart.result[0].indicators.quote[0].close,
          volume: result.body.chart.result[0].indicators.quote[0].volume,
          timestamp: result.body.chart.result[0].timestamp
        }
        res.send(chartData)
      })
  } catch (error) {
    next(error)
  }
})
router.get('/:symbol', (req, res, next) => {
  try {
    unirest
      .get(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile'
      )
      .headers({
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      })
      .query({
        symbol: req.params.symbol
      })
      .end(function(result) {
        if (res.error) throw new Error(res.error)
        console.log(res.body)
        res.send(result.body)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
