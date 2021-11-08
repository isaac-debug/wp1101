import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';

function App() {
  const [calc, setCalc] = useState('0');
  const [memory, setMemory] = useState('0');
  const [error, setError] = useState(false);
  const [operator, setOperator] = useState('');

  const operation_list = ['+', '-', '*', '/'];
  const calcBtn = [];
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '.'].forEach(item =>{
    if(error==false)
      calcBtn.push(
        <button onClick = {e => {
          if(true){
            if(calc == 0)
              setCalc(()=>e.target.value)
            else
              setCalc(()=>calc + e.target.value)
          }
        }}
        value = {item}
        key = {item}>
          {item}
        </button>
      )
  })

  const remove_last = ()=>{
    //remove last opperator
    let new_calc = calc.substr(0, calc.length-1)
    setCalc(()=>new_calc)
  }
  const check_op = ()=>{
    if(operation_list.includes(calc.substr(calc.length-1)))
      remove_last();
  }

  const calculate = (cal) =>{
    // calculate new ans
    if (calc[calc.length-2] == '/' && calc[calc.length-1] == '0'){
      setError(()=>true)
    }
    else{
      setCalc(()=>
        String(eval(cal)).length > 3 &&
          String(eval(cal)).includes('.')
            ?String(eval(cal).toFixed())
              :String(eval(cal))
      )
    }
  }

  const operate = (event) =>{
    let new_operator = event.target.value;
    if(operator == ''){
      // not yet calculate
      setOperator(()=>new_operator);
      setCalc(calc=>(calc + new_operator));
     
    }
    else if (operation_list.includes(calc[calc.length-1])){
      if(new_operator == '='){
        // calculate now
        check_op()
      }
      else{
        // repeat press or change
        check_op()
        setOperator(()=>new_operator);
        setCalc(calc=>(calc + new_operator));
      }
    }
    else{
      calculate(calc);
      // store new data
      if(new_operator != '='){
         setOperator(()=>new_operator);
        setCalc(calc=>(calc + new_operator));
      }
    }
  }

  const percent = ()=>{
    if(operation_list.includes(calc[calc.length-1]))
      check_op()
    // do percentage
    setCalc(calc=>calc/100);
  }

  const reverse = ()=>{
    if (calc[0] == '-'){
      let new_string = calc.substring(1)
      setCalc(calc=>new_string)
    }
    else{
      let negative = '-'
      let new_string = negative.concat(calc)
      setCalc(calc=>new_string)
    }
  }
  const Mplus = ()=>{
    if(operation_list.includes(calc[calc.length-1]))
      check_op()
    // do Mplus
    let Mplus = calc + '+' + memory;
    alert(Mplus)
    setMemory(()=>
        String(eval(Mplus)).length > 3 &&
          String(eval(Mplus)).includes('.')
            ?String(eval(Mplus).toFixed())
              :String(eval(Mplus))
      )
  }

  return (
    <div className="wrapper">
      {error || (calc == 'Infinity')
        ?<div className='show-input'>Error</div>
        :<div className='show-input'>{calc}</div>
      }
      
      <div className='digits flex'>{calcBtn}</div>
      <div className='modifiers subgrid'>
        <button onClick={()=> setCalc(()=>0)}> C </button>
        <button onClick={percent}> % </button>
        <button onClick={reverse}> +/-</button>
      </div>
      <div className='operations subgrid'>
        <button onClick={operate} value='+'> + </button>
        <button onClick={operate} value='-'> - </button>
        <button onClick={operate} value='*'> × </button>
        <button onClick={operate} value='/'> ÷ </button>
        <button onClick={operate} value='='> = </button>
      </div>
      <div className='extra subgrid'>
        <button onClick={()=> setCalc(()=>calc.substr(0, calc.length-1))}> Del </button>
        <button onClick={Mplus}> M+ </button>
        <button onClick={()=> setCalc(()=>memory)}> MR </button>
        <button onClick={()=> {setMemory(()=>'0'); alert('Memory Cleared')}}> MC </button>
      </div>
    </div>
  );
}

export default App;
