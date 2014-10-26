// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;
var xhReq = new XMLHttpRequest();

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos


//COMENTARIO
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

    /*onBeforeScrollStart: function(e) {
        var target = e.target;
        while (target.nodeType != 1) target = target.parentNode;
        if(target.tagName != 'select'
            && target.tagName != 'input'
            && target.tagName != 'textarea') {
            e.preventDefault();
        }
    } - See more at: http://www.phonegapspain.com/topic/problemas-con-form/#sthash.EaGxXE4n.dpuf
    */

    new FastClick(document.body);

    //Comprobamos si hay algo en la base de datos
    comprobarRegistros();
    

}


  function comprobarRegistros(){

    var comprobar = true;

    if(comprobar){
           //si la consulta no trae registros mostrar esto

           $("#contenidoCuerpo").load("contenedor_vacio/contenedor_vacio.html");
    }else{

    }
  }


  function calculoSuperficieSimple(){

     //capturamos los datos del usuario
     var medida1 = $("#txtMedida1").val();
     var medida2 = $("#txtMedida2").val();
     var rendimientoCaja = $("#txtMedida3").val();

     //variables locales

     var superficie;
     var superficieTotal;
     var totalCajas;
     var excedente;


     try{
         
          superficie = medida1 * medida2;
          superficieTotal = superficie * 1.05;
          excedente = superficie * 0.05;
          totalCajas = superficieTotal / rendimientoCaja;
           if(!isNaN(totalCajas)){
          //alert("Superficie"+superficie+"superficieTotal"+superficieTotal+"totalCajas"+totalCajas);
          //Reducir decimales

           
           superficie = Math.round(superficie * 100) / 100;
           superficieTotal = Math.round(superficieTotal * 100) / 100;
           excedente = Math.round(excedente * 100) / 100;
           totalCajas = Math.round(totalCajas * 100) / 100;

          //Cambiar Contendio de la pantalla
           
           xhReq.open("GET", "resultados/opcion1.html", false);
           xhReq.send(null);
           document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

           //document.getElementById('total_superficie').firstChild.nodeValue = superficie+" m2";
           $("#total_superficie").text(superficie+" m2");
           $("#excedente_material").text(excedente+" m2");
           $("#metros_total").text(superficieTotal+" m2");
           $("#cajas_total").text(totalCajas+" m2");
           //document.getElementById('excedente_material').firstChild.nodeValue = superficie;
           //document.getElementById('cajas_total').firstChild.nodeValue = totalCajas;









          }else{
              
             alert("Ingrese números correctos");
          }

     }catch(e){
          alert(e);
     }

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
      //$("#header").css("position", "absolute");
      estado="menuprincipal";
    }else if(estado=="menuprincipal"){
      $("#cuerpo").removeClass();
      $("#cuerpo").addClass('page transition center');
      //$("#header").css("position", "fixed");
      estado="cuerpo";  
    }
  // Si pulsamos un bot—n del menu principal entramos en el else
  }else{
    
    // A–adimos la clase al li presionado
    addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
    
    // Recogemos mediante ajax el contenido del html segœn la opci—n clickeada en el menu
    if(opcion == 0){
      comprobarRegistros();
    }else{

    xhReq.open("GET", "ceramicas/opcion"+opcion+".html", false);
    xhReq.send(null);
    document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
  }


        // A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
     $("#cuerpo").removeClass();
     $("#cuerpo").addClass('page transition center');

    estado="cuerpo";

    //Cargar los eventos
    $("#btn_guardar").on("click",calculoSuperficieSimple);
    
    // Refrescamos el elemento iscroll segœn el contenido ya a–adido mediante ajax, y hacemos que se desplace al top
    //myScroll.refresh();
    //myScroll.scrollTo(0,0);
    

    
    // Quitamos la clase a–adida al li que hemos presionado
    setTimeout(function() {
      removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
    }, 300);
     
   }

}