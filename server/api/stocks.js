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

router.get('/:symbol/chart', (req, res, next) => {
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
        symbol: req.params.symbol,
        //The epoch time in seconds
        from: '1231866000',
        to: '1547524844',
        // Pass this param multiple times to get more related events (div|split|earn), such as : &events=div&events=split&events=earn
        events: 'div',
        // Allowed values are (1d|5d|1mo|3mo|6mo|1y|2y|5y|max)
        interval: '1d'
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
