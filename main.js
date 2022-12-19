let f = nerdamer.convertFromLaTeX("x^2").buildFunction();
let derivativeScoped = (x) => 2 * x;
let latexF = '2x';
document.getElementById("formula").addEventListener("input", (ev) => {
  const latex = ev.target.getValue("latex");
  nfx = nerdamer.convertFromLaTeX(latex);
  latexF = nfx;
  
  console.log(latex);
  f = nfx.buildFunction();
  let derivative = nerdamer.diff(nfx, "x");
  let prime = nerdamer.diff(nfx, "x").buildFunction();
  derivativeScoped = prime;
  const dlatex = nerdamer.convertToLaTeX(derivative.toString()).replace('\\cdot', '').split('').filter(el => el !== '*').join('');

  console.log(dlatex);
  functionPlot({
    title: "f(x)",
    target: "#graph",

    grid: true,
    data: [
      {
        // force the use of builtIn math
        graphType: "polyline",
        fn: function (scope) {
          // scope.x = Number
          let x = scope.x;
          return f(x);
        },
      },
    ],
  });
  functionPlot({
    title: "f'(x)",
    target: "#prime",

    grid: true,
    data: [
      {
        // force the use of builtIn math
        graphType: "polyline",
        fn: function (scope) {
          // scope.x = Number
          let x = scope.x;
          return prime(x);
        },
      },
    ],
  });


    document.getElementById('graph-latex').innerHTML=`<math-field style="font-size: 32px;" read-only>
    ${latex}
    </math-field>`
    document.getElementById('prime-latex').innerHTML=`<math-field style="font-size: 32px;" read-only>
    ${dlatex}
    </math-field>`

});

document.getElementById('tansub').addEventListener('click', (e) => {
  const valueOfX =Number( document.getElementById('xvalue').value);
  const valueOfSlopeTan = derivativeScoped(valueOfX);
  const valueOfSlopeSec = -1 / derivativeScoped(valueOfX);
  const y1 = f(valueOfX);
  const bTan = (-1 * valueOfSlopeTan  * valueOfX) + y1;
  const bSec = (-1 * valueOfSlopeSec  * valueOfX) + y1;
  console.log(y1,valueOfX,bTan)
  console.log(bSec);
  const yTan = nerdamer(`${valueOfSlopeTan}${valueOfX} + ${bTan}`)
  const ySec = nerdamer(`${valueOfSlopeSec}${valueOfX} + ${bSec}`)
  
  const functionTan = nerdamer(`${valueOfSlopeTan}x + ${bTan}`).buildFunction()
  const functionSec = nerdamer(`${valueOfSlopeSec}x + ${bSec}`).buildFunction()
  functionPlot({
    title: "Tangent Line",
    target: "#tangraph",

    grid: true,
    data: [
      {
        // force the use of builtIn math
        graphType: "polyline",
        fn: function (scope) {
          // scope.x = Number
          let x = scope.x;
          return functionTan(x);
        },
      },
    ],
  });
  functionPlot({
    title: "Secant Line",
    target: "#secgraph",

    grid: true,
    data: [
      {
        // force the use of builtIn math
        graphType: "polyline",
        fn: function (scope) {
          // scope.x = Number
          let x = scope.x;
          return functionSec(x);
        },
      },
    ],
  });
  document.getElementById('tan-latex').innerHTML=`<math-field style="font-size: 32px;" class="text-center" read-only>
    y = ${valueOfSlopeTan}x + ${bTan}
    </math-field>`
  document.getElementById('sec-latex').innerHTML=`<math-field style="font-size: 32px;" read-only>
    y = ${valueOfSlopeSec}x + ${bSec}
    </math-field>`
  
});


document.getElementById('nthd').addEventListener('click', (e) => {
  const n = Number(document.getElementById('nvalue').value);
  const d = nerdamer.diff(nfx,"x", n );
  const latn =  nerdamer.convertToLaTeX(d.toString()).replace('\\cdot', '').split('').filter(el => el !== '*').join('')
  document.getElementById('nth-latex').innerHTML=`<math-field style="
  font-size: 32px;
  margin: 3em;
  
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .3);
  box-shadow: 0 0 8px rgba(0, 0, 0, .2);
  " read-only>
    ${latn}
    </math-field>`
})


functionPlot({
  title: "f(x)",
  target: "#graph",
  // width: 300,
  // height: 300,
  grid: true,
  data: [
    {
      // force the use of builtIn math
      graphType: "polyline",
      fn: "2x",
    },
  ],
});
functionPlot({
  title: "f'(x)",
  target: "#prime",
  // width: 300,
  // height: 300,
  grid: true,
  data: [
    {
      // force the use of builtIn math
      graphType: "polyline",
      fn: "2",
    },
  ],
});
                                                