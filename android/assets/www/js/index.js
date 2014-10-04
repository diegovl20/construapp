// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos



$(document).on('ready', main);

function main(){
   estado="cuerpo";
      
      // Creamos el elemento style, lo a–adimos al html y creamos la clase cssClass para aplicarsela al contenedor wrapper
      var heightCuerpo=window.innerHeight-46;
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.cssClass { position:absolute; z-index:2; left:0; top:46px; width:100%; height: '+heightCuerpo+'px; overflow:auto;}';
      document.getElementsByTagName('head')[0].appendChild(style);
      
      // A–adimos las clases necesarias
    $("#cuerpo").addClass('page center');
    $("#menuprincipal").addClass('page center');
    $("#wrapper").addClass('cssClass');
    
      
    // Leemos por ajax el archivos opcion1.html de la carpeta opciones
    $("#contenidoMenu").load("menu/opciones.html")

    
    // Creamos los 2 scroll mediante el plugin iscroll, uno para el menœ principal y otro para el cuerpo
    //myScroll = new iScroll('wrapper', { hideScrollbar: true });
    //myScrollMenu = new iScroll('wrapperMenu', { hScroll: true });

    new FastClick(document.body);

}



// Funci—n para a–adir clases css a elementos
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
      return;
    }
    if( cn != '' ) {
      classname = ' '+classname;
    }
    element.className = cn+classname;
}

// Funci—n para eliminar clases css a elementos
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

function menu(opcion){
  
  // Si pulsamos en el bot—n de "menu" entramos en el if
  if(opcion=="menu"){
    if(estado=="cuerpo"){
      $("#cuerpo").removeClass();
      $("#cuerpo").addClass('page transition right');
      estado="menuprincipal";
    }else if(estado=="menuprincipal"){
      $("#cuerpo").removeClass();
      $("#cuerpo").addClass('page transition center');
      estado="cuerpo";  
    }
  // Si pulsamos un bot—n del menu principal entramos en el else
  }else{
    
    // A–adimos la clase al li presionado
    addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
    
    // Recogemos mediante ajax el contenido del html segœn la opci—n clickeada en el menu
    xhReq.open("GET", "opciones/opcion"+opcion+".html", false);
    xhReq.send(null);
    document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
    
    // Refrescamos el elemento iscroll segœn el contenido ya a–adido mediante ajax, y hacemos que se desplace al top
    myScroll.refresh();
    myScroll.scrollTo(0,0);
    
    // A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
    cuerpo.className = 'page transition center';
    estado="cuerpo";
    
    // Quitamos la clase a–adida al li que hemos presionado
    setTimeout(function() {
      removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
    }, 300);
     
   }

}