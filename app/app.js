import './app.css'
import React from 'react'
import { render } from 'react-dom'
import Main from './page'
window.onload =async function () { 
  render(<Main />, document.getElementById('main')) 
}