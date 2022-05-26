let $d = document,
  randomColor = () => {
    col = Math.round(Math.random() * 16777215);
    return [
      "#" + ("000000" + col.toString(16)).slice(-6),
      "#" + ("000000" + (16777215 - col).toString(16)).slice(-6),
    ];
  };

segs = $d.querySelectorAll(".ram article");

class Program {
  constructor(nombre, t_codigo, t_data, t_bss, logo) {
    this.nombre = nombre;
    this.t_disco = encabezado;
    this.t_codigo = t_codigo;
    this.t_data = t_data;
    this.t_bss = t_bss;
    this.memoria = encabezado + stack + heap;
    this.logo = logo;
  }
  resize() {
    this.t_disco += this.t_codigo + this.t_data + this.t_bss;
    this.memoria += this.t_codigo + this.t_data + this.t_bss;
  }
}

const kernel = 1048576,
  stack = 65536,
  heap = 131072,
  encabezado = 180,
  SO = new Program("S.O.", 431592, 207365, 916),
  particion = 1048576,
  Notepad = new Program(
    "Notepad",
    18654,
    10352,
    164,
    "https://icon-library.com/images/notepad-icon-png/notepad-icon-png-16.jpg"
  ),
  Word = new Program(
    "Word",
    81465,
    13548,
    276,
    "https://icon-library.com/images/icon-word/icon-word-5.jpg"
  ),
  Excel = new Program(
    "Excel",
    91776,
    15000,
    300,
    "https://icon-library.com/images/excel-sheet-icon/excel-sheet-icon-8.jpg"
  ),
  AutoCAD = new Program(
    "AutoCAD",
    122883,
    137842,
    1055,
    "https://icon-library.com/images/autodesk-autocad.png"
  ),
  Calculadora = new Program(
    "Calculadora",
    20480,
    303,
    387,
    "https://icon-library.com/images/windows-calculator-icon/windows-calculator-icon-8.jpg"
  ),
  Chrome = new Program(
    "Chrome",
    384762,
    224288,
    1228,
    "https://icon-library.com/images/chrome-icon/chrome-icon-5.jpg"
  ),
  GTA5 = new Program(
    "Grand Theft Auto V",
    2359361,
    532470,
    8692,
    "https://icon-library.com/images/grand-theft-auto-v-icon/grand-theft-auto-v-icon-20.jpg"
  ),
  Oracle = new Program(
    "Oracle",
    576319,
    614403,
    2364,
    "https://icon-library.com/images/oracle-icon-png/oracle-icon-png-14.jpg"
  );

let programas = [
  SO,
  Notepad,
  Word,
  Excel,
  AutoCAD,
  Calculadora,
  Chrome,
  GTA5,
  Oracle
],
pEjecutados = 0;

let programasRAM = [];

for (let p of programas) {
  p.resize();
  if (p.nombre!=="S.O.") {
  fig = `<figure>
    <img src="${p.logo}" alt="${p.nombre}">
    <figcaption><span>${p.nombre}</span></figcaption>
  </figure>`;
  $d.querySelector(".icons").innerHTML += fig;
  }
}

col = randomColor();
segs[0].querySelector("span").textContent = SO.nombre;
segs[0].setAttribute(
  "style",
  `background: ${col[0]};text-shadow: -1.5px 2.5px 2px black, 1.5px -1.5px 0.08em ${col[1]}, 0 0 2em black;`
);

$d.querySelectorAll(".icons figure").forEach((e) => {
  e.addEventListener("click", (fig) => {
    
    Array(...e.parentElement.children).forEach((f) => {
      f.classList.remove("figclick");
    });
    let $figure = fig.target;
    while (!$figure.matches("figure")) $figure = $figure.parentNode;
    $figure.classList.add("figclick");
  });
  e.addEventListener("dblclick", (fig) => {
    $d.querySelector(".proc").innerHTML = `<article><span>Item</span></article>
    <article><span>Nombre</span></article>
    <article><span>Tamaño en disco</span></article>
    <article><span>Tamaño codigo</span></article>
    <article><span>Datos inicializados</span></article>
    <article><span>Datos sin inicializar</span></article>
    <article><span>Memoria inicial</span></article>
    <article><span>Memoria inicial (KiB)</span></article>`;
    //console.log(e.children[0].getAttribute("alt"));
    if (pEjecutados===15) {
      alert("No se puede ejecutar mas, debe cerrar algun programa");
    }else{
      programas.forEach(elemento => {
        if (elemento.nombre === e.children[0].getAttribute("alt")) {
            if (elemento.memoria>particion) {
              alert(`No es posible ejecutar ${elemento.nombre} debido a que su tamaño es ${elemento.memoria}, y las particiones son maximo de ${particion}`)
              renderizar();
            }else{
              programasRAM.push(elemento);
              pEjecutados++;
              calculos();
              //console.log(elemento.memoria, "tamaño", elemento.nombre);
              // location.reload();
              //console.log(programas);
              renderizar();
            }
        }
      });
    }
  });
});
//console.log(programas);

document.querySelectorAll(".article__pEjecucion").forEach((elemento, i) => {
    elemento.addEventListener("dblclick", e => {
      if (e.target.children[0].textContent === "S.O.") {
        alert("No puede cerrar el SO")
      } else {
        pEjecutados--;
        programasRAM.splice(i-1,1);
        //renderizar();
        segs[i].querySelector("span").textContent = "";
        segs[i].setAttribute(
          "style",
          `background: #ddd`
        );
        detalle();
        calculos();
        //console.log(i-1, " arr: ", programasRAM);
      }
    })
});



const renderizar = ()=> {
  programasRAM.forEach((e, i) => {
    col = randomColor();
    segs[i+1].querySelector("span").textContent = e.nombre;
    segs[i+1].setAttribute(
      "style",
      `background: ${col[0]};text-shadow: -1.5px 2.5px 2px black, 1.5px -1.5px 0.08em ${col[1]}, 0 0 2em black;`
    );
    detalle();
  });
}

const detalle = () =>{
  
    $d.querySelector(".proc").innerHTML = `<article><span>Item</span></article>
    <article><span>Nombre</span></article>
    <article><span>Tamaño en disco</span></article>
    <article><span>Tamaño codigo</span></article>
    <article><span>Datos inicializados</span></article>
    <article><span>Datos sin inicializar</span></article>
    <article><span>Memoria inicial</span></article>
    <article><span>Memoria inicial (KiB)</span></article>`;
    programasRAM.forEach((e, i) => {
      let $articles = `<article><span>P${i}</span></article>`;
      for (const key in e) {
        if (key !== "logo") {
          $articles += `<article><span>${e[key]}</span></article>`;
        }
      }
      $articles += `<article><span>${
        parseInt((e.memoria / 1024) * 100) / 100
      }</span></article>`;
      $d.querySelector(".proc").innerHTML += $articles;
    });
}

const datos = () => {
  $d.querySelectorAll(".article__DataSO").forEach((e,i) => {
    if (i===0) {
      e.children[0].textContent = `KERNEL: ${kernel}`
    }else if (i === 1) {
      e.children[0].textContent = `STACK: ${stack}`
    } else if (i === 2) {
      e.children[0].textContent = `HEAP: ${heap}`
    } else if( i === 3){
      e.children[0].textContent = `ENCABEZADO: ${encabezado}`
    }
  });
}

datos();

const calculos = () => {
  let usada = 1*1024*1024,
    libre = 16*1024*1024-usada;

  if (programasRAM.length === 0) {
    $d.querySelector(".usada").children[0].textContent = `USADA: ${usada}`;
    $d.querySelector(".libre").children[0].textContent = `LIBRE: ${libre}`;
  }else{
    usada = usada+(programasRAM.length)*1024*1024;
    $d.querySelector(".usada").children[0].textContent = `USADA: ${usada}`;
    libre = libre-usada;
    $d.querySelector(".libre").children[0].textContent = `LIBRE: ${libre}`;
  }
}

calculos();


