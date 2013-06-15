var canvas = null;
var context = null;
var matriz;
var tam_w=null;
var tam_h=null;
var current_pos=[0,25];


function inicializar_matriz()
{
	//Creamos la matriz. Lo consideramos como un array de arrays.
	matriz=new Array(50);
	
	for(var i=0;i<matriz.length;i++){
		matriz[i]=new Array(50);
	}
	
	/*Creada la matriz, le asignamos valores.
		El criterio seguido es:
			"S" para la posición de INICIO (START).
			"E" para la posición de FIN (END).
			Un número aleatorio entre 0 y 3 para el resto de la matriz. El número 0 se considera un bloque o pared.
	*/
	for(i=0;i<matriz.length;i++){
		for(j=0;j<matriz[i].length;j++){
			if((i===current_pos[0])&&(j===current_pos[1])){
				matriz[i][j]="S";
			}
			else if((i===matriz.length-1)&&(j===Math.floor(matriz[i].length/2))){
				console.log(Math.floor(matriz[1].length/2));
				matriz[i][j]="E";
			}
			else{
				matriz[i][j]=Math.floor((Math.random()*4));
			}
		}
	}
}

main = function() {


	canvas    = document.getElementById('canvas');

	// obtiene el contexto
	context   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth-10;
	canvas.height = window.innerHeight-200;
	
	// definimos el tamaño que tendrán los bloques.
	tam_w=Math.floor(canvas.width/50);
	tam_h=Math.floor(canvas.height/50);
	
	inicializar_matriz();
	pintar();
};



function callKeyDownHandler(evnt) {
   var ev = (evnt) ? evnt : event;
   var code=(ev.which) ? ev.which : event.keyCode;
   var tecla=code;
   
   //mostramos el codigo de la tecla pulsada por consola.
   console.log("Tecla pulsada: " + tecla);
   
   //Una vez pulsada una tecla, si es uno de los cursores, procedemos a modificar los valores del array current_pos y a pintar de nuevo la pantalla.
   //si pulsa cursor abajo
   if((tecla===40)&&(current_pos[1]<49)){
	if(matriz[current_pos[0]][current_pos[1]+1]!==0){
		current_pos[1]++;
		pintar();
	}
   }
   //si pulsa cursor arriba
   else if((tecla===38)&&(current_pos[1]>0)){
		if(matriz[current_pos[0]][current_pos[1]-1]!==0){
			current_pos[1]--;
			pintar();
		}
	}
   //si pulsa cursor izquierdo
   else if((tecla===37)&&(current_pos[0]>0)){
   		if(matriz[current_pos[0]-1][current_pos[1]]!==0){
			current_pos[0]--;
			pintar();
		}
   }
   //si pulsa cursor derecho
   else if((tecla===39)&&(current_pos[0]<49)){
   		if(matriz[current_pos[0]+1][current_pos[1]]!==0){
			current_pos[0]++;
			pintar();
		}
   }
   
   //mostramos a continuación la nueva posición.
   console.log("Posicion actual: " + current_pos[0] + " ,  " + (current_pos[1])); 
   
   //si llegamos al bloque azul, recargamos la página para volver a empezar de nuevo.
   if(matriz[current_pos[0]][current_pos[1]]==="E")
   {
	document.location.href = document.location.href;
   }
}

if (window.document.addEventListener) {
   window.document.addEventListener("keydown", callKeyDownHandler, false);
} else {
   window.document.attachEvent("onkeydown", callKeyDownHandler);
}

// Con esta función, pintamos los bloques.
var pintar = function() {
	context.clearRect(0,0,canvas.width, canvas.height);
	context.fillStyle = "green";

		for(i=0;i<matriz.length;i++){
			for(j=0;j<matriz[i].length;j++){
				if((i===current_pos[0])&&(j===current_pos[1])){
					context.fillStyle="red";
					context.fillRect(i*tam_w,j*tam_h,tam_w,tam_h);
					context.fillStyle="green";
				}
				else if(matriz[i][j]===0){
					context.fillRect(i*tam_w,j*tam_h,tam_w,tam_h);
				}
				else if(matriz[i][j]==="E"){
					context.fillStyle="blue";
					context.fillRect(i*tam_w,j*tam_h,tam_w,tam_h);
					context.fillStyle="green";
				}
		}
	}
}

window.onload = main;