import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from 'react';

const App = () => {
  // so we can use setInterval
  const Ref = useRef(null);

  // timer state
  const [timer, setTimer] = useState("00:00:00");
  const [timer2, setTimer2] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update timer, add 0 before single digits
      setTimer((hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));
    }
  };

  const startTimer2 = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update timer, add 0 before single digits
      setTimer2((hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));
    }
  };
  
  const clearTimer = (e) => {
    // set timer--will need to add an if statement & state? to track pomo status
    setTimer("00:00:10");

    if(Ref.current) clearInterval(Ref.current);
    console.log(Ref.current);
    // call start timer every sec
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const clearTimer2 = (e) => {
    // set timer--will need to add an if statement & state? to track pomo status
    setTimer2("00:00:10");

    if(Ref.current) clearInterval(Ref.current);
    console.log(Ref.current);
    // call start timer every sec
    const id = setInterval(() => {
      startTimer2(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    
    deadline.setSeconds(deadline.getSeconds() + 10);
    console.log(deadline);
    return deadline;
  }
  
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  useEffect(() => {
    clearTimer2(getDeadTime());
  }, []);

  const onClickReset2 = () => {
    clearTimer2(getDeadTime());
  };

  return(
    <div style = {{ textAlign: "center", margin: "auto" }}>
      <h1 style = {{ color: "red" }}>
        Pomo Timer
      </h1>
      <h2>{timer}</h2>
      <button onClick={onClickReset}>reset</button>
      <br></br>
      <h2>{timer2}</h2>
      <button onClick={onClickReset2}>reset</button>
    </div>
  );

};

export default App;
