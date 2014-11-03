// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;
var xhReq = new XMLHttpRequest();
var pictureSource,destinationType;
var imagen = null;
var key = "estado";
var storage;
var tipo;
var array_tipo_proyecto = new Array("Inicio","Cerámicas","Ladrillos","Alfombras", "Pinturas");
var array_colores = new Array("Inicio","celeste","amarillo","rojo","naranjo");
var array_codigo_colores = new Array("Inicio", "#3398dc", "#f4c601", "red", "#f9870b");

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos

$(document).on('ready', main);

document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    //storage = window.localStorage;
  }




function main(){
   estado="cuerpo";
      storage = window.localStorage;
      //storage.setItem(key,"ok");
      
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
    var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 200000);
    db.transaction(populateDB, errorDB, succesDB);

    //destinationType=navigator.camera.DestinationType;
    //pictureSource = navigator.camera.PictureSourceType;
    

}
   /*INICIO FUNCIONES BASE DE DATOS */

         function populateDB(tx)
         {

           var tabla_tipo_proyecto = "CREATE TABLE IF NOT EXISTS tipo_proyecto( id_tipo_proyecto INTEGER PRIMARY KEY, nombre TEXT)";
           var tabla_proyecto = "CREATE TABLE IF NOT EXISTS proyecto( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT,superficie_total float, total_cajas float, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
           tx.executeSql(tabla_tipo_proyecto);
           tx.executeSql(tabla_proyecto);
           //tratar de usar localstorage
           var l = storage[key];
           if(typeof l === 'undefined'){

              var execute = "INSERT INTO tipo_proyecto VALUES(1, 'ceramica')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(2, 'pintura')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(3, 'ladrillos')";
              tx.executeSql(execute);

              storage.setItem(key,"ingresado");

           }
        
           
           //var execute2 = "INSERT INTO proyecto VALUES(null,1,'29-10-2014','foto')";
           
           //tx.executeSql(execute2);


         }
         

         function errorDB(error)
         {

          alert("Error DB   "+error.code);


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
          tx.executeSql(consulta, [], consultaSuccess, consultaError);

         }


         function errorQueryDB(err)
         {

          alert("errorQueryDB "+err);

         }


         function consultaSuccess(tx, results)
         {

           var filas = results.rows.length;
           //alert("consultaSucces Filas"+filas);

               if(filas <= 0){
                      pantallaPrincipal();
                      MostrarcontenedorVacio()
               }else{


                      xhReq.open("GET", "listado_proyectos/listado_proyectos.html", false);
                      xhReq.send(null);
                      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;





                      for (var i = 0; i < results.rows.length ; i++) {
                        
                          //alert("entro al for");
                          var item = results.rows.item(i);
                           if(i!=0){
                              
                                 $("#lista-proyectos").append('<li class="listado-proyecto"><div id="'+array_colores[item.id_tipo_proyecto]+'_'+item.id_proyecto+'"></div><div class="informacion_'+item.id_proyecto+'"><span class="span-tipo_'+item.id_proyecto+'">'+array_tipo_proyecto[item.id_tipo_proyecto]+'</span><span class="fecha-proyecto_'+item.id_proyecto+'">'+item.fecha+'</span><img class="imgThumbUp_'+item.id_proyecto+'" src="img/ic_thumb_up.png"><span class="id_proyecto'+item.id_proyecto+'"></span></div></li>');
                               

                                 //Obtener margin-top original
                                 var margin = $(".fecha-proyecto").css("margin-top");
                                 margin = margin.split("px");
                                 var marginTop = parseInt(margin[0]);
                                 marginTop+=35;


                                 //Obtener margin-left original


                                 var numero = $(".fecha-proyecto").css("margin-left");
                                 numero = numero.split("px");
                                 var marginLeft = parseInt(numero[0]);
                                 marginLeft+=-20;
                                 
                                var cambioCSSFecha = {

                                    "font-style": "italic",
                                    "margin-top": marginTop+"px",
                                    "margin-left": marginLeft+"px",
                                    "position": "relative",
                                    "font-size": "9px",
                                    "color": "black"
                               };



                               $(".fecha-proyecto_"+item.id_proyecto).css(cambioCSSFecha);

                               
                                 var numero1 = $(".informacion").css("margin-left");
                                 numero1 = numero1.split("px");
                                 var marginLeftInfo = parseInt(numero1[0]);
                                 marginLeftInfo+=30;

                                var cambioCSSInformacion =
                                 {
                                     float: "left",
                                     width: "80%",
                                     height: "45px",
                                     padding: "2px",
                                     color: "black",
                                     "margin-top": "-60px",
                                     "margin-left": marginLeftInfo+"px",
                                     position: "relative",
                                     color: "black"


                                 };

                                 $(".informacion_"+item.id_proyecto).css(cambioCSSInformacion);



                              var cambioCSSImagen =
                              {
                                    width: "20px",
                                    height: "20px",
                                    "margin-left": "-75px",
                                    "margin-top": "28px",
                                    position: "relative"
                              };


                              $(".imgThumbUp_"+item.id_proyecto).css(cambioCSSImagen);



                              var cambioCSSTipo = 
                              {
                                    "margin-left": "18px",
                                    "margin-top": "-10px",
                                    "font-size": "13px"
                              };
                                
                              $(".span-tipo"+item.id_proyecto).css(cambioCSSTipo);


                                
                               var cambioCSSInformacionSpan =
                               {

                                  float: "left",
                                  "margin-right": "5px"


                               };

                               var texto = ".informacion_"+item.id_proyecto+" span";

                              $(texto).css(cambioCSSInformacionSpan);


                              var cambioCSSColores = {
                                    float: "left",
                                    "margin-top": "7px",
                                    "margin-left": "11px",
                                    "border-radius": "5px",
                                    "width": "50px",
                                    "height": "50px",
                                    "background": array_codigo_colores[item.id_tipo_proyecto]

                              };


                               var idColores = "#"+array_colores[item.id_tipo_proyecto]+'_'+item.id_proyecto;
                              $(idColores).css(cambioCSSColores);
                                

                              
 

                           }
                           else{

                             $("#lista-proyectos").append('<li class="listado-proyecto"><div id="'+array_colores[item.id_tipo_proyecto]+'"></div><div class="informacion"><span class="span-tipo">'+array_tipo_proyecto[item.id_tipo_proyecto]+'</span><span class="fecha-proyecto">'+item.fecha+'</span><img class="imgThumbUp" src="img/ic_thumb_up.png"><span class="id_proyecto">'+item.id_proyecto+'</span></div></li>');

                           }
                          //alert("id proyecto: "+item.id_proyecto+" tipo proyecto: "+item.id_tipo_proyecto+" foto: "+item.fotografia);
                         

                          






                      }
               }

         }

         function consultaError(err){

           alert("consulta error"+err.code);

         }


         function guardarProyectoDB(tx,superficieTotal, totalCajas)
         {
            //alert("guardar proyecto: "+superficieTotal+" totalCajas: "+totalCajas);
            var fecha_actual = new Date();
            var fecha = fecha_actual.getDate()+"-"+(fecha_actual.getMonth()+1)+"-"+fecha_actual.getFullYear();
            tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, superficie_total, total_cajas) values (?,?,?,?,?,?)",[null,tipo,fecha,imagen,superficieTotal,totalCajas]);


         }

         function correctoGuardarProyectoDB()
         {
            alert("Proyecto ingresado correctamente");
            imagen = null;
            verificarProyectos();
            //cambiar de vista, a la lista de proyectos
         }

         function errorGuardarProyectoDB(err)
         {
           alert("errorGuardarProyecto: "+err.code);
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
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation: true

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
           if(!isNaN(totalCajas) && imagen != null){
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
           $(".guardar_proyecto").on("click", function(){
               

                  guardarProyecto(superficieTotal, totalCajas);
               
               

           });

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


                      if(imagen == null){
                        
                          alert("Debe tomar una fotografía del lugar");
                      }else{              
                       alert("Ingrese números correctos");
                     }
          }

     }catch(e){
          alert(e);
     }

  }

  function guardarProyecto(superficieTotal, totalCajas)
  {
    

     var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
     db.transaction(function(tx){guardarProyectoDB(tx,superficieTotal,totalCajas)}, errorGuardarProyectoDB, correctoGuardarProyectoDB);

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
          
        pantallaPrincipal();
        verificarProyectos();

          
        }else{

        xhReq.open("GET", "proyectos/opcion"+opcion+".html", false);
        tipo = opcion; //para guardarlo en la base de datos; el tipo de proyecto
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

function pantallaPrincipal()
{

      xhReq.open("GET", "index.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
}