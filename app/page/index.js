import React from 'react'
import style from './css.css'
class Main extends React.Component{
  render(){
    return(
      <div className={style.main}>
        <div className={style.icon}></div>
      </div>
    )
  }
}
export default Main