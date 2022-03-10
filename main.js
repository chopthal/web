import './plotly.js';
// import './odex.js';

const f = (t, y, k) => {
  const kon = k[0];
  const koff = k[1];

  let dy = new Array(3);
  dy[0] = 0;
  dy[1] = -kon*y[0]*y[1] + koff*y[2];
  dy[2] =  kon*y[0]*y[1] - koff*y[2];

  return dy;
}

const title = document.querySelector('.title');
title.innerHTML = ' ';

const conc = 1e-6;
const kon = 1e3;
const koff = 1e-6;
const k = [kon, koff];
const Rmax = 2000;
const numSys = 3;
const timeSpan = [0, 3000];
const deltaT = 1;
const steps = Math.round((timeSpan[1] - timeSpan[0]) / deltaT);
const tMat = new Array(steps+1);
tMat[0] = timeSpan[0];

const y0 = [conc, Rmax, 0]; 
if (y0.length !== numSys) {
  console.log(`y0 length should be ${numSys}`)  
}

let result = new Array(numSys);
for (let i=0; i<result.length; i++){
  result[i] = new Array(steps+1);
  result[i][0] = y0[i];
}

// Euler's method
for(let i=0; i<steps+1; i++){
  const t = tMat[i];  
  let tgt = new Array(result.length);
  for (let ii=0; ii<result.length; ii++){
    tgt[ii] = result[ii][i];
  }
  console.log(tgt)

  let odeRes = f(t, tgt, k);  
  let res = tgt;

  for(let ii=0; ii<tgt.length; ii++){
    res[ii] = res[ii] * deltaT + tgt[ii];
  }

  for(let ii=0; ii<odeRes.length; ii++){    
    result[ii][i+1] = res[ii];
  }

  tMat[i+1] = t + deltaT;
}


// Plot
const TESTER = document.getElementById('tester');

const data = [
    {
        x : tMat,
        y : result[2],
        type : 'scatter'
    }
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

