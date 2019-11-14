import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_STOCKS_BY_KEYWORD = 'GET_STOCKS_BY_KEYWORD'

/**
 * ACTION CREATORS
 */

const getStocksByKeyword = stocks => ({
  type: GET_STOCKS_BY_KEYWORD,
  stocks
})

/**
 * THUNK CREATORS
 */

export const getStocksThunk = keyword => async dispatch => {
  console.log('this is keyword ----->', keyword)
  try {
    const {data} = await axios.get(`/api/stocks/search/${keyword}`)
    console.log('this is data ------->', data)
    dispatch(getStocksByKeyword(data))
  } catch (error) {
    console.error('there was an error in the getStocksThunk')
  }
}

/**
 * REDUCER
 */

export default function(state = {}, action) {
  console.log('-----------> this is action --->', action)
  switch (action.type) {
    case GET_STOCKS_BY_KEYWORD:
      return action.stocks
    default:
      return state
  }
}
