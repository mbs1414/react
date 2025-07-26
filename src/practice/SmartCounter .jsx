// import { useState } from "react"
// import styles from './SmartCounter.module.css'
// import classNames from "classnames"
// const SmartCounter = (props) => {
//     const [num, setNum] = useState(0)
//     const isAdmin = true
//     const adminClass = classNames(
//         'bg-red',
//         { 'font-weight': isAdmin }
//     )
//     function increment() {
//         setNum(num + 1)
//     }
//     return (
//         <div>
//             <p>شمارنده: {Math.floor(Math.random() * 1000)}</p>
//             <p className={styles.Counter}>{props.value}</p>
//             <p>{props.children}</p>
//             <button onClick={increment}>increase</button>
//             <h1>{num}</h1>
//             <h3 className={adminClass}>مسئول پروژه</h3>
//             <button className="btn btn-primary">
//                 <i className="fa fa-home"></i> Home
//             </button>

//         </div>
//     )
// }

import { Component } from 'react';
import Clock from './Clock';
class SmartCounter extends Component {
  constructor() {
    super();
    this.state = { date: new Date(), showClock: true };
  }
  tick() {
    this.setState({ date: new Date() });
  }
  handleShowClock = () => {
    this.setState({ showClock: !this.state.showClock });
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    console.log('UnMounted');
    clearInterval(this.timer);
  }
  //   state = {
  //     name: 'Mohammad',
  //     familyName: 'Parsa',
  //   };
  render() {
    // const { name, familyName } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
        dir="ltr"
      >
        {/* <div>{name}</div>
        <div>{familyName}</div> */}
        {/* Clock */}
        <div>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={this.handleShowClock}
          >
            حذف ساعت
          </button>
        </div>
        {this.state.showClock ? <Clock date={this.state.date} /> : null}
      </div>
    );
  }
}
export default SmartCounter;
