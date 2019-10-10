import './app.common.css'
import style from './app.css'
import React from 'react'
import axios from 'axios'
import { render } from 'react-dom'
const { useState, useEffect, useCallback } = React
const { CancelToken } = axios
const SEARCHSTATE = {
  loading: 0,
  success: 1,
  error: -1,
}
let cancelReq = null
const useSearchText = (data) => {
  const [text, setText] = useState(data)
  const [searchRes, setSearchRes] = useState({ state: SEARCHSTATE.loading, result: null, error: null })
  useEffect(() => {
    if (cancelReq !== null) { cancelReq() }
    setSearchRes({ state: SEARCHSTATE.loading, result: null, error: null })
    axios.get(`http://172.20.0.133:8080/api/search?text=${text}`, {
      cancelToken: new CancelToken(function executor(cb) { cancelReq = cb })
    })
      .then((response) => {
        const result = response.data
        if (result.err === 0) {
          setSearchRes({ state: SEARCHSTATE.success, result: result['res'], error: null })
        }
        else {
          setSearchRes({ state: SEARCHSTATE.error, error: result['errMsg'], result: null })
        }
      })
      .catch((err) => {
        if (err.constructor.name !== 'Cancel') {
          setSearchRes({ state: SEARCHSTATE.error, error: `${err}`, result: null })
        }

      })
  }, [text])
  const onChange = (e) => {
    setText(e.target.value)
  }
  return { text, searchRes, onChange }
}
const App = () => {
  const { text, searchRes, onChange } = useSearchText('哈哈')
  const renderRes = () => {
    switch (searchRes.state) {
      case SEARCHSTATE.loading: {
        return '搜索中'
        break
      }
      case SEARCHSTATE.success: {
        return `搜索 ${searchRes.result.text} 结果为 ${searchRes.result.number} 个`
        break
      }
      case SEARCHSTATE.error: {
        return `错误：${searchRes.error}`
        break
      }
    }
  }
  useCallback(() => {
    (e) => { setNumber(number + 1) }
  }, [text])
  return (
    <div className={style.main}>
      <div className={style.header}>
        <input onChange={onChange} value={text} className={style.input} />
      </div>
      <div className={style.body}>{
        renderRes()
      }</div>
    </div>
  )
}
window.onload = function () {
  render(<App />, document.getElementById('main'))
}