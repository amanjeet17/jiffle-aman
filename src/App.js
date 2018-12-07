import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link} from 'react-router-dom'
import axios from 'axios';
var i=0;
var questions;
class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      i:0,
      questions:[],
      question:{},
      report:[],
      options:[],
      answered:'',
      correctAnswer:'',
      report:[],
      correct:0
    }
  }
  optionSelected = (option)=>{
    document.getElementById("next").classList.remove("hid")
    this.setState({
      answered:option
    });
    if(this.state.question.answer == 0){
      this.setState({
        correctAnswer:"A"
      })
    }
    else if(this.state.question.answer == 1){
      this.setState({
        correctAnswer:"B"
      })
    }
    else if(this.state.question.answer == 2){
      this.setState({
        correctAnswer:"C"
      })
    }
    else {
      this.setState({
        correctAnswer:"D"
      })
    }



  }

  Next = ()=>{
    let report = {};
    report.question = this.state.question;
    report.answer = this.state.answered;
    report.correctAnswer = this.state.correctAnswer;
    this.setState((prevState)=>
      ({
        report:prevState.report.concat(report)
      }))
    if(this.state.correctAnswer == this.state.answered){
      this.setState((prevState)=>
        ({
          correct:prevState.correct+1
        })
      )
    }
    if(this.state.i === 7){
      document.getElementById("board").classList.add("hid")
      document.getElementById("report").classList.remove("hid")
    }
    document.getElementById("next").classList.add("hid")
    i++;
    if(i<8){
    var question=this.state.questions[i]
      this.setState({
        question:question,
        options:question.options,
        i:i
      });
    }

  }

  componentDidMount(nextProp){
    axios.get('https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json')
    .then(res=>{
      console.log("api response is",res);
      questions=res.data
      this.setState({
        questions:res.data,
        question:res.data[0],
        options:res.data[0].options
      });
    })
  }
  render() {
    console.log("State report",this.state.report);
    return (
      <div className="App">
       <header className="App-header" id="board">
       <div className="black-board">
         <div className="question">
            <span style={{fontSize:"8px"}}>Javascript Quiz {this.state.i+1} of 8</span>
           <p style={{marginTop:"0px"}}>{this.state.question.text}</p>
         </div>
         <div className="answers">
           <p>A - {this.state.options[0]}</p>
           <p>B - {this.state.options[1]}</p>
           <p>C - {this.state.options[2]}</p>
           <p>D - {this.state.options[3]}</p>
         </div>
         <div className="options">
           <button className="option" onClick={ ()=>this.optionSelected("A")}>A</button>
           <button className="option" onClick={ ()=>this.optionSelected("B")}>B</button>
           <button className="option" onClick={ ()=>this.optionSelected("C")}>C</button>
           <button className="option" onClick={ ()=>this.optionSelected("D")}>D</button>
           <button className="option hid" id="next" style={{textAlign:"right"}}  onClick={this.Next}>{this.state.i < 7 ? 'Next' : 'Submit'}</button>
         </div>
       </div>
        </header>
        <div className="hid" id="report">
        <table>
        <tbody>
          <tr>
            <th>Question  </th>
            <th>Options</th>
            <th>Coreect Answer</th>
            <th>Your Answer</th>
          </tr>

          {
            this.state.report.map((el)=>{
              return (
                  <tr>
                  <td>{el.question.text}</td>
                  <td>{el.question.options}</td>
                  <td>{el.correctAnswer}</td>
                  <td>{el.answer}</td>
                  </tr>
                  )
                })
              }
          </tbody>
        </table>
        <h2>Score : {this.state.correct}</h2>
        </div>
      </div>
    );
  }
}

export default App;
