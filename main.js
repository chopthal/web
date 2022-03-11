import './plotly.js';

const title = document.querySelector('.title');
const updateBtn = document.querySelector('.updateBtn');
const inputAssoStart = document.querySelector('.assoStart');
const inputDissoStart = document.querySelector('.dissoStart');
const inputDissoEnd = document.querySelector('.dissoEnd');
const inputConc = document.querySelector('.conc');
const inputKon = document.querySelector('.kon');
const inputKoff = document.querySelector('.koff');
const inputRmax = document.querySelector('.rmax');

const NUMBER_OF_SYSTEMS = 3;
const DELTA_T = 1;

updateBtn.addEventListener('click', updateBtnClickEvent);

function updateBtnClickEvent() { 
  const assoStart = inputAssoStart.value || inputAssoStart.placeholder;
  const dissoStart = inputDissoStart.value || inputDissoStart.placeholder;
  const dissoEnd = inputDissoEnd.value || inputDissoEnd.placeholder;
  const conc = inputConc.value || inputConc.placeholder;
  const kon = inputKon.value || inputKon.placeholder;
  const koff = inputKoff.value || inputKoff.placeholder;
  const rmax = inputRmax.value || inputRmax.placeholder;

  const timeSpanAsso = [parseInt(assoStart), parseInt(dissoStart-1)];
  const timeSpanDisso = [parseInt(dissoStart), parseInt(dissoEnd)];  
  const k = [kon, koff];
  
  const y0Asso = [conc, rmax, 0]; 
  if (y0Asso.length !== NUMBER_OF_SYSTEMS) {
    console.log(`y0 asso length should be ${NUMBER_OF_SYSTEMS}`)  
  }
  
  const odeResult = odeSolver(NUMBER_OF_SYSTEMS, y0Asso, timeSpanAsso, DELTA_T, k);
  
  const tMat = odeResult.time;
  const result = odeResult.result;  

  const y0Disso = [0, 0, result[2][result[2].length-1]]; 
  if (y0Disso.length !== NUMBER_OF_SYSTEMS) {
    console.log(`y0 disso length should be ${NUMBER_OF_SYSTEMS}`)  
  }

  const odeResult2 = odeSolver(NUMBER_OF_SYSTEMS, y0Disso, timeSpanDisso, DELTA_T, k);
  const tMat2 = odeResult2.time;
  const result2 = odeResult2.result;

  const TESTER = document.getElementById('tester');

  const data = [  
    {
      x : tMat,
      y : result[2],
      type : 'scatter'
    },
    {
      x : tMat2,
      y : result2[2],
      type : 'scatter'
    },  
  ];

  const layout = {
    autosize: false,
    width: 800,
    height: 600,
    title: 'ODE Solver',
    xaxis: {
      autorange : true,
      type: 'numeric'
    },
    yaxis: {
      autorange: true,    
      type: 'numeric'
    }
  }

  Plotly.newPlot( TESTER, data, layout);
  
}


title.innerHTML = ' ';

// const conc = 1e-6;
// const kon = 1e4; const koff = 1e-2;
// const k = [kon, koff]; const Rmax = 2000;
// const numSys = 3;
// const timeSpanAsso = [0, 180]; 
// const timeSpanDisso = [181, 480];
// const deltaT = 1;

// const y0Asso = [conc, Rmax, 0]; 
// if (y0Asso.length !== numSys) {
//   console.log(`y0 asso length should be ${numSys}`)  
// }


// Plot


function f(t, y, k) {
  const kon = k[0];
  const koff = k[1];

  let dy = new Array(3);
  dy[0] = 0;
  dy[1] = -kon*y[0]*y[1] + koff*y[2];
  dy[2] =  kon*y[0]*y[1] - koff*y[2];

  return dy;
}

function odeSolver(numSys, y0, timeSpan, deltaT, k) {

  const steps = Math.round((timeSpan[1] - timeSpan[0]) / deltaT);
  const time = new Array(steps+1);
  time[0] = timeSpan[0];

  let result = new Array(numSys);
  for (let i=0; i<result.length; i++){
    result[i] = new Array(steps+1);
    result[i][0] = y0[i];
  }

  // Euler's method
  for(let i=0; i<steps+1; i++){
    const t = time[i];  
    let tgt = new Array(result.length);
    for (let ii=0; ii<result.length; ii++){
      tgt[ii] = result[ii][i];
    }
    
    const odeRes = f(t, tgt, k);
    for(let ii=0; ii<odeRes.length; ii++){    
      result[ii][i+1] = result[ii][i] + odeRes[ii] * deltaT;
    }

    time[i+1] = t + deltaT;    
  }

  return {time, result}
}