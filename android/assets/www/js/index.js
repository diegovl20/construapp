// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;
var xhReq = new XMLHttpRequest();
var pictureSource,destinationType;
var imagen;

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos

$(document).on('ready', main);

document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}




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
    //comprobarRegistros();

    //Crear la base de datos
    var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
    db.transaction(populateDB, errorDB, succesDB);

    //destinationType=navigator.camera.DestinationType;
    //pictureSource = navigator.camera.PictureSourceType;
    

}
   /*INICIO FUNCIONES BASE DE DATOS */

         function populateDB(tx)
         {

           var tabla_tipo_proyecto = "CREATE TABLE IF NOT EXISTS tipo_proyecto( id_tipo_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT)";
           var tabla_proyecto = "CREATE TABLE IF NOT EXISTS proyecto( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
           tx.executeSql(tabla_tipo_proyecto);
           tx.executeSql(tabla_proyecto);
           var execute = "INSERT INTO tipo_proyecto VALUES(null, 'prueba')";
           var execute2 = "INSERT INTO proyecto VALUES(null,1, '29-10-2014','foto')";
           tx.executeSql(execute);
           tx.executeSql(execute2);


         }
         

         function errorDB(error)
         {

          alert("Error DB");


         }

         function succesDB()
         {

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
              db.transaction(queryDB, errorQueryDB);
         }

         function verificarProyectos()
         {
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
              db.transaction(queryDB, errorQueryDB);

         }


         function queryDB(tx)
         {

          var consulta = "SELECT * FROM proyecto";
          tx.executeSql(consulta, [], consultaSuccess, consultaError)

         }


         function errorQueryDB(err)
         {

          alert("errorQueryDB "+err);

         }


         function consultaSuccess(tx, results)
         {

           var filas = results.rows.length;

               if(filas <= 0){
                      MostrarcontenedorVacio()
               }else{
                      //alert("hay registro");
                      //$("#contenidoCuerpo").empty();
               }

         }

         function consultaError(err){

           alert(err);

         }

  /*FUNCIONES PARA LA CAMARA */

  function capturarFotografiaEditable()
  {
     navigator.camera.getPicture(onPhotoURISuccess, onFail, 
      {
        quality: 50, 
        allowEdit: false,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true,
        sourceType: Camera.PictureSourceType.CAMERA
        //correctOrientation: true,
        //targetWidth: 1000, 
        //targetHeight: 1000
      });

  }


  function onPhotoURISuccess(imageURI)
  {
    
    /*$("#contenidoCuerpo").load("proyectos/opcion1.html");
    var src = "url(data:image/jpeg;base64,"+imageURI+")";
    $("#imgLugar").attr("src", src);
    alert("entro");*/

      // Uncomment to view the base64 encoded image data
  // console.log(imageData);

  // Get image handle
  //
  imagen = imageURI
  var smallImage = document.getElementById('imgLugar');
  smallImage.style.display = 'block';
  smallImage.src = imageURI;

  }

  function onFail(message)
  {
     alert("Error camara: "+message);
  }



  /*FIN FuNCIONES PARA LA CAMARA*/

  function MostrarcontenedorVacio(){

      $("#contenidoCuerpo").load("contenedor_vacio/contenedor_vacio.html");
  
  }
   
   /*FIN FUNCIONES BASE DE DATOS */

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

             
             var smallImage = document.getElementById('imgLugar');
             smallImage.style.display = 'block';
             smallImage.src = imagen;
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
          verificarProyectos();
          
        }else{

        xhReq.open("GET", "proyectos/opcion"+opcion+".html", false);
        xhReq.send(null);
        document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
        }


        // A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
         $("#cuerpo").removeClass();
         $("#cuerpo").addClass('page transition center');
         
        estado="cuerpo";

        //Cargar los eventos
        $("#btn_guardar").on("click",calculoSuperficieSimple);
        $("#ic_camara").on("click", capturarFotografiaEditable);
        //$("#imgLugar").css("background","url(img/logo.png)");
        
        // Refrescamos el elemento iscroll segœn el contenido ya a–adido mediante ajax, y hacemos que se desplace al top
        //myScroll.refresh();
        //myScroll.scrollTo(0,0);
        

        
        // Quitamos la clase a–adida al li que hemos presionado
        setTimeout(function() {
          removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
        }, 300);
         
       }

}