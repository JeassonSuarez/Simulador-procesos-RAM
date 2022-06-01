let $d = document,
randomColor = () => {
    col = Math.round(Math.random() * 16777215);
    return [
        "#" + ("000000" + col.toString(16)).slice(-6),
        "#" + ("000000" + (16777215 - col).toString(16)).slice(-6),
        ];
};

$d.addEventListener("click", (e)=>{
    if (e.target.matches(".panel-btn") || e.target.matches(`${".panel-btn"} *`)) {
        $d.querySelector(".panel").classList.toggle("is-active");
        $d.querySelector(".panel-btn").classList.toggle("is-active");
    }

    if (e.target.matches(".menu a")) {
        $d.querySelector(".panel").classList.remove("is-active");
        $d.querySelector(".panel-btn").classList.remove("is-active");
    }
})

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
),
noProgram = new Program(
    "",
    0,
    0,
    0,
    ""
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
pEjecutados = 0,
espacioT = 16*1024*1024,
programasRAM = [
    {programa:programas[0], tam:espacioT*0.062500},
    {programa:noProgram, tam:espacioT*0.125000},
    {programa:noProgram, tam:espacioT*0.125000},
    {programa:noProgram, tam:espacioT*0.187500},
    {programa:noProgram, tam:espacioT*0.062500},
    {programa:noProgram, tam:espacioT*0.062500},
    {programa:noProgram, tam:espacioT*0.062500},
    {programa:noProgram, tam:espacioT*0.062500},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    {programa:noProgram, tam:espacioT*0.031250},
    ],
libre = 16*1024*1024,
usado = 1*1024*1024;



for (let p of programas) {
    p.resize();
    if (p.nombre!=="S.O.") {
        fig = `<figure data-name="${p.nombre}">
        <img src="${p.logo}" alt="${p.nombre}" data-name="${p.nombre}">
        <figcaption data-name="${p.nombre}"><span data-name="${p.nombre}">${p.nombre}</span></figcaption>
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
});

const renderizar = ()=> {
    programasRAM.forEach((e, i) => {
        if (!(e.programa === noProgram)) {
            col = randomColor();
            segs[i].querySelector("span").textContent = e.programa.nombre;
            segs[i].setAttribute(
            "style",
            `background: ${col[0]};text-shadow: -1.5px 2.5px 2px black, 1.5px -1.5px 0.08em ${col[1]}, 0 0 2em black;`
            );
        }
    });
    //detalle();
}

renderizar();

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
        if (!(e.programa === noProgram) && !(e.programa === programas[0])) {
            let $articles = `<article><span>P${i-1}</span></article>`;
            for (const key in e.programa) {
                if (key !== "logo") {
                    $articles += `<article><span>${e.programa[key]}</span></article>`;
                }
            }
            $articles += `<article><span>${parseInt((e.programa.memoria / 1024) * 100) / 100}</span></article>`;
            $d.querySelector(".proc").innerHTML += $articles;
        }
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
let usada = 0,
    libre = 16*1024*1024,
    pdif = 0;

    programasRAM.forEach((e, i) => {
        if (!(e.programa === noProgram)) {
            usada += e.tam
        }
    });
    
    $d.querySelector(".usada").children[0].textContent = `USADA: ${usada}`;
    libre = libre-usada;
    $d.querySelector(".libre").children[0].textContent = `LIBRE: ${libre}`;

}

calculos();

// PRIMER AJUSTE

let arrPos = [];

const $ajuste = $d.querySelector(".select__ajuste");

let paraPrograma = (e) => {
    if (e.target.matches(".article__pEjecucion") || e.target.matches(".article__pEjecucion span")) {
        if (e.target.children[0].textContent === "S.O.") {
            alert("No puede cerrar el SO")
        }else{
            let posPrograma = parseInt(e.target.getAttribute("data-number"));
            pEjecutados--;
            programasRAM[posPrograma-1].programa=noProgram;
            //programasRAM.splice(parseInt(e.target.getAttribute("data-number"))-2,1);
            //console.log(parseInt(e.target.getAttribute("data-number")), "--", programasRAM);
            //renderizar();
            segs[posPrograma-1].querySelector("span").textContent = "";
            segs[posPrograma-1].setAttribute(
                "style",
                `background: #ddd`
            );
            detalle();
            calculos();
            //console.log(i-1, " arr: ", programasRAM);
        }
    }
}

let pAjuste = () => {
    //primer ajuste
    $d.querySelector(".div-select__ajuste").setAttribute("hidden", true);
    $d.addEventListener("dblclick", e=>{
        if (e.target.matches(".icons figure") || e.target.matches(".icons img") || e.target.matches(".icons figcaption") || e.target.matches(".icons span")) {
            //console.log(e.target);
            detalle();
            if (pEjecutados===15) {
            alert("No se puede ejecutar mas, debe cerrar algun programa");
            }else{
                // ejecucion de programas
                programas.forEach(elemento => {
                    if (elemento.nombre === e.target.getAttribute("data-name")) {
                        let i = 0;
                        for (const e of programasRAM) {
                            // i++;
                            // console.log(`Memoria en pos ${i}: ${e.tam}`);
                            // console.log(`Programa clickeado: ${elemento.memoria}`);
                            // console.log(`Programa Clickeado < pos ${i}:${(elemento.memoria < e.tam) }`);
                            // console.log("--------------------------------");
                            if (elemento.memoria < e.tam && e.programa === noProgram ) {
                                //console.log("CABE");
                                e.programa = elemento;
                                pEjecutados++;
                                //console.log(pEjecutados);
                                break;
                            }else if(elemento.memoria > e.tam){
                                i++
                                // console.log(i);
                                if (i===15) {
                                    alert(`El programa ${elemento.nombre} pesa ${elemento.memoria} y no es posible ejecutarlo, ya que no cabe en las particiones`);
                                }
                            }
                        }
                        renderizar();
                        detalle();
                        calculos();
                        // programasRAM.forEach(element => {
                        //     console.log(element.tam,"-",element.programa.nombre);
                        // });
                    }
                });
            }
        }

    paraPrograma(e);
    // for (const e of programasRAM) {
    //     console.log(e.programa.nombre);
    // }
    });
}

let mAjuste = () => {
    $d.querySelector(".div-select__ajuste").setAttribute("hidden", true);
    console.log("MEJOR AJUSTE");
    $d.addEventListener("dblclick", e=>{
        let memOrdenada = [];
        programasRAM.forEach((e, i) => {
            if (e.programa === noProgram) {
                memOrdenada.push(e.tam);
            }
        });
        memOrdenada.sort(function(a, b) {
            return a - b;
        });
        console.log(memOrdenada);
        if (e.target.matches(".icons figure") || e.target.matches(".icons img") || e.target.matches(".icons figcaption") || e.target.matches(".icons span")) {
            //console.log(e.target);
            detalle();
            if (pEjecutados===15) {
            alert("No se puede ejecutar mas, debe cerrar algun programa");
            }else{
                // ejecucion de programas
                programas.forEach(elemento => {
                    if (elemento.nombre === e.target.getAttribute("data-name")) {
                        let aux = 0;
                        for (const tam of memOrdenada) {
                            if (elemento.memoria<tam) {
                                for (let i = 0; i < programasRAM.length; i++) {
                                    if (programasRAM[i].tam === tam && programasRAM[i].programa === noProgram) {
                                        programasRAM[i].programa = elemento;
                                        break;
                                    }
                                }
                                break;
                            }else{
                                aux++;
                            }
                        }
                        if (aux === memOrdenada.length) {
                            alert(`No se puede ejecutar el programa ${elemento.nombre} debido a que pesa ${elemento.memoria}, y no cabe en las particiones disponibles`);
                        }
                        renderizar();
                        detalle();
                        calculos();
                        // programasRAM.forEach(element => {
                        //     console.log(element.tam,"-",element.programa.nombre);
                        // });
                    }
                });
            }
        }

    paraPrograma(e);
    // for (const e of programasRAM) {
    //     console.log(e.programa.nombre);
    // }
    });


}

let peorAjuste = () => {
    $d.querySelector(".div-select__ajuste").setAttribute("hidden", true);
    console.log("PEOR AJUSTE");

    $d.addEventListener("dblclick", e=>{
        let memOrdenada = [];
        programasRAM.forEach((e, i) => {
            if (e.programa === noProgram) {
                memOrdenada.push(e.tam);
            }
        });
        memOrdenada.sort(function(a, b) {
            return a - b;
        }).reverse();
        //console.log(memOrdenada);
        if (e.target.matches(".icons figure") || e.target.matches(".icons img") || e.target.matches(".icons figcaption") || e.target.matches(".icons span")) {
            //console.log(e.target);
            detalle();
            if (pEjecutados===15) {
            alert("No se puede ejecutar mas, debe cerrar algun programa");
            }else{
                // ejecucion de programas
                programas.forEach(elemento => {
                    if (elemento.nombre === e.target.getAttribute("data-name")) {
                        let aux = 0;
                        for (const tam of memOrdenada) {
                            if (elemento.memoria<tam) {
                                for (let i = 0; i < programasRAM.length; i++) {
                                    if (programasRAM[i].tam === tam && programasRAM[i].programa === noProgram) {
                                        programasRAM[i].programa = elemento;
                                        break;
                                    }
                                }
                                break;
                            }else{
                                aux++;
                            }
                        }
                        if (aux === memOrdenada.length) {
                            alert(`No se puede ejecutar el programa ${elemento.nombre} debido a que pesa ${elemento.memoria}, y no cabe en las particiones disponibles`);
                        }
                        renderizar();
                        detalle();
                        calculos();
                        // programasRAM.forEach(element => {
                        //     console.log(element.tam,"-",element.programa.nombre);
                        // });
                    }
                });
            }
        }

    paraPrograma(e);
    // for (const e of programasRAM) {
    //     console.log(e.programa.nombre);
    // }
    });

}

//se verifica que tipo de ajuste se desea para el tipo de particiones
$ajuste.addEventListener("change", e =>{
    let seleccion = $ajuste.options[$ajuste.selectedIndex].textContent;
    if (seleccion === "Primer Ajuste") {
        pAjuste();
    } else if (seleccion === "Mejor Ajuste") {
        mAjuste();
    } else if(seleccion === "Peor Ajuste") {
        peorAjuste();
    }
})

// let i = 0;
// for (const e of programasRAM) {
// i++;
// console.log(`Memoria en pos ${i}: ${e.tam}`);
// console.log(`Programa clickeado: ${elemento.memoria}`);
// console.log(`Programa Clickeado < pos ${i}:${(elemento.memoria < e.tam) }`);
// console.log("--------------------------------");

// for (const e of programasRAM) {
// if (menor <= e.tam) {
// menor = menor;
// }else{
// menor = e.tam;
// }
// }

// if (elemento.memoria < e.tam && e.programa === noProgram ) {
// //console.log("CABE");
// e.programa = elemento;
// pEjecutados++;
// //console.log(pEjecutados);
// break;
// }else if(elemento.memoria > e.tam){
// i++
// // console.log(i);
// if (i===15) {
// alert(`El programa ${elemento.nombre} pesa ${elemento.memoria} y no es posible ejecutarlo, ya que no cabe en las particiones`);
// }
// }
// }