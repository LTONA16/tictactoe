let siguiente = false;
let contador = 0;
let tiempo = 60;
let intervalo;

function turno(boton){
    boton.disabled = true;
    boton.value = (!siguiente) ? "X" : "O";
    siguiente = !siguiente;
    document.getElementById("turno").innerHTML = siguiente ? "Turno: O" : "Turno: X";
    verificar();
}

function verificar(){
    let botones = document.querySelectorAll("input[type='button']");
    const estilo = document.createElement("style");
    estilo.classList.add("linea-victoria");
    if(++contador==9){
        finalizarJuego(`¡¡Empate!!`);
    // Horizontales
    }else if(botones[0].value==botones[1].value && botones[1].value==botones[2].value && botones[0].value!=""){
        finalizarJuego(`Ganador: ${botones[0].value}`);
        estilo.textContent =`tr:nth-child(1)::after{
                            content: "";
                            position: absolute;
                            top: 50%;
                            left: 0;
                            right: 5px;
                            height: 5px;
                            background-color: #6F00FF;
                            z-index: inherit;
                            pointer-events: none;
                            }`;
    }else if(botones[3].value==botones[4].value && botones[4].value==botones[5].value && botones[3].value!=""){
        finalizarJuego(`Ganador: ${botones[3].value}`);
        bloquear();
        estilo.textContent =`tr:nth-child(2)::after{
                            content: "";
                            position: absolute;
                            top: 50%;
                            left: 0;
                            right: 5px;
                            height: 5px;
                            background-color: #6F00FF;
                            z-index: inherit;
                            pointer-events: none;
                            }`;
    }else if(botones[6].value==botones[7].value && botones[7].value==botones[8].value && botones[6].value!=""){
        finalizarJuego(`Ganador: ${botones[6].value}`);
        estilo.textContent =`tr:nth-child(3)::after{
                            content: "";
                            position: absolute;
                            top: 50%;
                            left: 0;
                            right: 5px;
                            height: 5px;
                            background-color: #6F00FF;
                            z-index: inherit;
                            pointer-events: none;
                            }`;
    // verticales
    }else if(botones[0].value==botones[3].value && botones[3].value==botones[6].value && botones[0].value!=""){
        finalizarJuego(`Ganador: ${botones[0].value}`);
        estilo.textContent = `td:nth-child(1)::after{
                            content: "";
                            position: absolute;
                            top: -1px;
                            bottom: -1px;
                            left: 50%;
                            width: 5px;
                            background-color: #6F00FF;
                            z-index: inherit;
                            pointer-events: none;
                            }";`;
    }else if(botones[1].value==botones[4].value && botones[4].value==botones[7].value && botones[1].value!=""){
        finalizarJuego(`Ganador: ${botones[1].value}`);
        estilo.textContent =`td:nth-child(2)::after{
                            content: "";
                            position: absolute;
                            top: -1px;
                            bottom: -1px;
                            left: 50%;
                            width: 5px;
                            background-color: #6F00FF;
                            z-index: inherit;
                            pointer-events: none;
                            }";`;
    }else if(botones[2].value==botones[5].value && botones[5].value==botones[8].value && botones[2].value!=""){
        finalizarJuego(`Ganador: ${botones[2].value}`);
        estilo.textContent =`td:nth-child(3)::after{
                            content: "";
                            position: absolute;
                            top: -1px;
                            bottom: -1px;
                            left: 50%;
                            width: 5px;
                            background-color: #6F00FF;
                            z-index: inherit;
                            pointer-events: none;
                            }";`;
    } else if(botones[0].value==botones[4].value && botones[4].value==botones[8].value && botones[0].value!=""){
        finalizarJuego(`Ganador: ${botones[0].value}`);
        estilo.textContent=`table::after{
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: calc(100% * 1.4);
                            height: calc(100% * 1.4);
                            border-top: 5px solid #6F00FF;
                            transform: rotate(45deg);
                            transform-origin: top left;
                            z-index: 1;
                            pointer-events: none;
                            }`;
    }else if(botones[2].value==botones[4].value && botones[4].value==botones[6].value && botones[2].value!=""){
        finalizarJuego(`Ganador: ${botones[2].value}`);
        estilo.textContent=`table::before{
                            content: "";
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: calc(100% * 1.4);
                            height: calc(100% * 1.4);
                            border-top: 5px solid #6F00FF;
                            transform: rotate(-45deg);
                            transform-origin: top right;
                            z-index: 1;
                            pointer-events: none;
                            }`;
    }
    document.head.appendChild(estilo);
}
   
function bloquear(){
    let botones = document.querySelectorAll("input[type='button']");
    for(let i=0; i<botones.length; i++){
        botones[i].disabled = true;
    }
}

function finalizarJuego(mensaje){
    document.getElementById("turno").innerHTML = mensaje;
    bloquear();
    clearInterval(intervalo);
    document.getElementById("reiniciar").style.display = "inline";
}


function reiniciar(){
    let botones = document.querySelectorAll("input[type='button']");
    botones.forEach(boton => {
        boton.value = "";
        boton.disabled = false;
    });

    siguiente = false;
    contador = 0;
    tiempo = 60;
    clearInterval(intervalo);
    iniciarTemporizador();

    document.getElementById("turno").innerHTML = "Turno: X";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("temporizador").innerHTML = `Tiempo restante: ${tiempo}s`;

    // Eliminar cualquier línea de victoria anterior
    let estilos = document.querySelectorAll("style.linea-victoria");
    estilos.forEach(e => e.remove());
}

function iniciarTemporizador() {
    document.getElementById("temporizador").innerHTML = `Tiempo restante: ${tiempo}s`;
    intervalo = setInterval(() => {
        tiempo--;
        document.getElementById("temporizador").innerHTML = `Tiempo restante: ${tiempo}s`;
        if(tiempo <= 0){
            clearInterval(intervalo);
            document.getElementById("turno").innerHTML = "¡Tiempo terminado!";
            bloquear();
            document.getElementById("reiniciar").style.display = "inline";
        }
    }, 1000);
}

window.onload = () => {
    iniciarTemporizador();
};
