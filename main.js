import "./plotly.js";

const title = document.querySelector(".title");
const updateBtn = document.querySelector(".updateBtn");
const inputAssoStart = document.querySelector(".assoStart");
const inputDissoStart = document.querySelector(".dissoStart");
const inputDissoEnd = document.querySelector(".dissoEnd");
const inputConc = document.querySelector(".conc");
const inputKon = document.querySelector(".kon");
const inputKoff = document.querySelector(".koff");
const inputRmax = document.querySelector(".rmax");

const NUMBER_OF_SYSTEMS = 3;
const DELTA_T = 1;

updateBtn.addEventListener("click", updateBtnClickEvent);
updateBtnClickEvent();

function updateBtnClickEvent() {
  const axes = document.getElementById("axes");

  const assoStart = inputAssoStart.value || inputAssoStart.placeholder;
  const dissoStart = inputDissoStart.value || inputDissoStart.placeholder;
  const dissoEnd = inputDissoEnd.value || inputDissoEnd.placeholder;
  const conc = inputConc.value || inputConc.placeholder;
  const kon = inputKon.value || inputKon.placeholder;
  const koff = inputKoff.value || inputKoff.placeholder;
  const rmax = inputRmax.value || inputRmax.placeholder;

  const timeSpanAsso = [parseInt(assoStart), parseInt(dissoStart - 1)];
  const timeSpanDisso = [parseInt(dissoStart), parseInt(dissoEnd)];
  const k = [parseFloat(kon), parseFloat(koff)];

  const y0Asso = [parseFloat(conc), parseFloat(rmax), 0];
  if (y0Asso.length !== NUMBER_OF_SYSTEMS) {
    console.log(`y0 asso length should be ${NUMBER_OF_SYSTEMS}`);
  }

  const odeResult = odeSolver(
    NUMBER_OF_SYSTEMS,
    y0Asso,
    timeSpanAsso,
    DELTA_T,
    k
  );

  const tMat = odeResult.time;
  const result = odeResult.result;

  const y0Disso = [0, 0, result[2][result[2].length - 1]];
  if (y0Disso.length !== NUMBER_OF_SYSTEMS) {
    console.log(`y0 disso length should be ${NUMBER_OF_SYSTEMS}`);
  }

  const odeResult2 = odeSolver(
    NUMBER_OF_SYSTEMS,
    y0Disso,
    timeSpanDisso,
    DELTA_T,
    k
  );
  const tMat2 = odeResult2.time;
  const result2 = odeResult2.result;

  const tMatTotal = tMat.concat(tMat2);
  const resultTotal = result[2].concat(result2[2]);
  const plotTitle = "ODE-Solver";

  plotData(axes, tMatTotal, resultTotal, plotTitle);
}

title.innerHTML = " ";

function f(t, y, k) {
  const kon = k[0];
  const koff = k[1];

  let dy = new Array(3);
  dy[0] = 0;
  dy[1] = -kon * y[0] * y[1] + koff * y[2];
  dy[2] = kon * y[0] * y[1] - koff * y[2];

  return dy;
}

function odeSolver(numSys, y0, timeSpan, deltaT, k) {
  const steps = Math.round((timeSpan[1] - timeSpan[0]) / deltaT);
  const time = new Array(steps + 1);
  time[0] = timeSpan[0];

  let result = new Array(numSys);
  for (let i = 0; i < result.length; i++) {
    result[i] = new Array(steps + 1);
    result[i][0] = y0[i];
  }

  // Euler's method
  for (let i = 0; i < steps + 1; i++) {
    const t = time[i];
    let tgt = new Array(result.length);
    for (let ii = 0; ii < result.length; ii++) {
      tgt[ii] = result[ii][i];
    }

    const odeRes = f(t, tgt, k);
    for (let ii = 0; ii < odeRes.length; ii++) {
      result[ii][i + 1] = result[ii][i] + odeRes[ii] * deltaT;
    }

    time[i + 1] = t + deltaT;
  }
  return { time, result };
}

function plotData(axes, xData, yData, title) {
  if (xData.length !== yData.length) {
    console.log("xData and yData length is not equal!");
    return;
  }

  let arrLength = 1;

  if (Array.isArray(xData[0])) {
    arrLength = xData.length;
  }

  let data = new Array(arrLength);
  if (Array.isArray(xData[0])) {
    for (let i = 0; i < xData.length; i++) {
      data[i] = {
        x: xData[i],
        y: yData[i],
        type: "scatter",
      };
    }
  } else {
    data = [
      {
        x: xData,
        y: yData,
        type: "scatter",
      },
    ];
  }

  const layout = {
    autosize: false,
    width: 800,
    height: 600,
    title: title,
    xaxis: {
      autorange: true,
      type: "numeric",
    },
    yaxis: {
      autorange: true,
      type: "numeric",
    },
  };

  Plotly.newPlot(axes, data, layout);
}
