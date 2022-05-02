import React, { Component } from "react";
import Counter from "./Counter";
import styles from '../style/Wrapper.module.css';

export default class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      count : '',
      showCounter: true,
      startTimer : false,
      showWelcome : true
    };
  }


  startCounter = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showCounter : true,
        startTimer : true,
        value : Number(this.state.count),
        count : ''
      }
    })
  };

  stopCounter = () => {
    this.setState({startTimer : false})
  };

  handleRemoveCounter = () => {
    clearInterval(this.interval);
    this.setState(prevState => {
      return {
        ...prevState,
        value: 0,
        count : 0,
        showCounter: true,
        startTimer : false
      }
    })
  }

  handleChange = (e) => {
    this.setState(prevState => {
      return {
        ...prevState,
        count : e.target.value
      }
    })
  }


  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({showWelcome : false})
    }, 3000);
  }
  componentDidUpdate() {
    if(this.interval) {
      clearInterval(this.interval)
    }

    if(this.state.startTimer) {
      this.interval = setInterval(() => {
        this.setState((prevState) => {
          return {
            value:  prevState.value + 1,
          };
        });
      }, 1000);
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
    clearTimeout(this.timeOut)
  }

  render() {
    return (
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          {this.state.showWelcome && <h1 className={styles["heading"]}>Welcome To</h1>}
          <h1 className={styles["heading"]}>Counter</h1>
          {this.state.showCounter && <Counter startFrom={this.state.value} />}
          <input type="number" placeholder="Enter..." value={this.state.count} onChange={this.handleChange} />
          <div className={styles["btn-group"]}>
            <button className={styles["btn"]} onClick={this.startCounter}>Start</button>
            <button disabled={!this.state.startTimer} className={`${styles['btn']} ${styles['btn-2']}`} onClick={this.stopCounter}>Stop</button>
            <button className={styles["btn"]} onClick={this.handleRemoveCounter}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
