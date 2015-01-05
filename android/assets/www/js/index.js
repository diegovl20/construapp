// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;
var xhReq = new XMLHttpRequest();
var pictureSource,destinationType;
var imagen = null;
var imagenCeramicaEscogida;
var key = "estado";
var storage;
var tipo;
var array_tipo_proyecto = new Array("Inicio","Cerámicas","Ladrillos","Alfombras", "Pinturas");
var array_colores = new Array("Inicio","celeste","amarillo","rojo","naranjo");
var array_codigo_colores = new Array("Inicio", "#3398dc", "#f4c601", "red", "#f9870b");
var toggleMenu = true;
var idComplementar;
var salirApp = true;
var precio;
var idCeramica;
var totalCajasParaPrecio;
var map;
var myLatLng;
var directionsDisplay;
var directionsService;
var lugar;
var statusDraggable = true;
var fotografiaLugar;
var anguloRotacionCeramica = 90;
var movimientos = new Array();
var fotografiaPintura;
    var pulsado;
var radio = 10;
var dragging = false;
var minRad = 0.5;
var maxRad = 15;
var defaultRad=20;
var radSpan,decRad,incRad;
var colorPintar = "rgba(128,98,146,1)";
var crearCanvas = false;
//EN DUDA

var fotografiaComplementar = ""; 
var superficieTotalComplementar, totalCajasComplementar;

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos

$(document).on('ready', main);

document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    document.addEventListener("backbutton", onBackKeyDown, false);
    //storage = window.localStorage;
  }


  function onBackKeyDown(){

       if(salirApp){
        navigator.app.exitApp();
       }else{
            pantallaPrincipal();
        verificarProyectos();
      }
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
           var tabla_ceramicas = "CREATE TABLE IF NOT EXISTS ceramicas( id_ceramicas INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rendimiento_caja FLOAT, modelo TEXT, marca TEXT, color TEXT, uso TEXT, formato TEXT, precio INTEGER, lugar TEXT)";
           var tabla_proyecto = "CREATE TABLE IF NOT EXISTS proyecto( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT,superficie_total float, total_cajas float, precio_total INTEGER,id_ceramicas INTEGER,id_pinturas INTEGER,total_litros INTEGER, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
           tx.executeSql(tabla_tipo_proyecto);
           tx.executeSql(tabla_ceramicas);
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
              /*ingresar ceramicas*/

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/1.jpg', 1.53,'Cima Gris', 'Lamosa','Gris','Pisos y Muros','33x33',3810,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/2.jpg', 0.72,'Arcilla', 'Alberdi','Café Rojizo','Pisos y Muros','30x30',3953,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/3.jpg', 1.52,'Caribe', 'Lamosa','Gris','Muros','20x30',4241,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/4.jpg', 1.52,'Caribe', 'Lamosa','Beige','Muros','20x30',4241,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/5.jpg', 1.50,'Engobe', 'Kaztelo','Blanco','Muros','20x20',4485,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/6.jpg', 1.95,'Vulcano', 'Celima','Gris','Pisos','30x30',5246,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/7.jpg', 1.53,'Cima', 'Lamosa','Beige','Pisos y Muros','33x33',5340,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/8.jpg', 1.28,'Woodriver', 'Lamosa','Gris','Pisos y Muros','40x40',5747,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/9.jpg', 1.95,'Catahua', 'Celima','Café','Pisos','30x30',5831,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/10.jpg', 1.53,'Catalán', 'Celima','Café','Pisos','30x30',5831,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/11.jpg', 2.00,'Toledo', 'Moliza','Café','Pisos','40x40',5980,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/12.jpg', 1.50,'Enix Marfil', 'Cordillera','Beige','Muros','20x33',5985,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/13.jpg', 2.00,'Roca', 'Roca','Beige','Pisos','30x30',5980,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/14.jpg', 2.33,'Nativa', 'Nativa','Café','Pisos','36x36',8365,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/15.jpg', 2.00,'Evora HD', 'Evora HD','Variado','Pisos','45x45',11980,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/16.jpg', 1.50,'Alhambra', 'Alhambra','Verde','Pisos','33x20',8685,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/17.jpg', 0.96,'Piedra Pizarra', 'Piedra Pizarra','Gris','Pisos','40x40',9590,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'ceramica/18.jpg', 1.99,'Cemento', 'Cemento','Gris Plata','Pisos','40x40',6945,'Easy');"
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

         function obtenerFotografia(){
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(obtenerFotografiaDB, errorQueryDB);

         }



         function queryDB(tx)
         {

          var consulta = "SELECT * FROM proyecto";
          tx.executeSql(consulta, [], consultaSuccess, consultaError);

         }


         function errorQueryDB(err)
         {

          alert("errorQueryDB "+err.code);

         }


        function complementarBD(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
              db.transaction(queryComplementarDB, errorComplementarDBQueryDB);  


         }

         function queryComplementarDB(tx){
             var consulta = "SELECT * FROM proyecto WHERE id_proyecto ="+idComplementar;
             tx.executeSql(consulta,[],consultaComplementarSucces, consultaComplementarError);


         }

         function consultaComplementarError(){

          alert("consultaComplementarError");
         }

         function errorComplementarDBQueryDB(err){

          alert("errorComplementarDBQueryDB"+err.code);
         }


         function consultaComplementarSucces(tx,results){
               
             for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                  //fecha DATE, fotografia TEXT,superficie_total float, total_cajas float, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
                 //var proyecto = new Array(item.id_proyecto, item.id_tipo_proyecto, item.fecha, item.fotografia, item.superficie_total, item.total_cajas );
                 /*arrayProyecto[0] = item.id_proyecto;
                 arrayProyecto[1] = item.id_tipo_proyecto;
                 arrayProyecto[2] = item.fecha;
                 arrayProyecto[3] = item.fotografia;
                 arrayProyecto[4] = item.superficie_total;
                 arrayProyecto[5] = item.total_cajas;*/
                 if(item.id_ceramicas != null){
                
                                 if(item.id_ceramicas == 0){

                                  xhReq.open("GET", "complementacion/opcion1.html", false);
                                  xhReq.send(null);
                                  document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
                                  $("#btn_ayuda").on("click", funcionesDeAyuda);
                                
                                 fotografiaComplementar = item.fotografia;
                                 totalCajasComplementar = item.total_cajas;
                                 $("#imgLugar").attr("src", fotografiaComplementar);
                                 $("#total_superficie").text(item.superficie_total);
                                 $("#tipo_proyecto_complementar").text(array_tipo_proyecto[item.id_tipo_proyecto]);
                                 $("#cajas_total").text(Math.round(item.total_cajas));
                                 //alert(fotografiaComplementar);
                                 superficieTotalComplementar = item.superficie_total;
                                 //totalCajasComplementar = Math.round(item.total_cajas);
                                }else{

                                  navigator.notification.activityStart("Por favor espere", "Cargando Contenido...");
                                  xhReq.open("GET", "complementacion/opcion1_con_ceramica_guardada.html", false);
                                  xhReq.send(null);
                                  document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
                                  $("#btn_ayuda").on("click", funcionesDeAyuda);
                                  $("#btn_complementar").on("click", funcionComplementar);
                                  

                                  fotografiaComplementar = item.fotografia;
                                  totalCajasComplementar = item.total_cajas;
                                  $("#imgLugar").attr("src", fotografiaComplementar);
                                  $("#total_superficie").text(item.superficie_total);
                                  $("#tipo_proyecto_complementar").text(array_tipo_proyecto[item.id_tipo_proyecto]);
                                  $("#cajas_total").text(Math.round(item.total_cajas));
                                  //alert(fotografiaComplementar);
                                  superficieTotalComplementar = item.superficie_total;
                                  idCeramica = item.id_ceramicas;
                                  fotografiaLugar = item.fotografia;
                                  totalCajasParaPrecio = Math.round(item.total_cajas);
                                  verPrecioCeramicaBD();



                                }
                  }else {

                         opcion4ClickLista();




                  }


  
             }
 
         }

         function opcion4ClickLista(){

                                    xhReq.open("GET", "complementacion/opcion4.html", false);
                          xhReq.send(null);
                          document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

                          $("#btnVerImagenColores").on("click", rellenarImagenColor);
                          

                          var canvasDiv = document.getElementById('lienzo');
                          canvas = document.createElement('canvas');
                          canvas.setAttribute('width', 250);
                          canvas.setAttribute('height', 300);
                          canvas.setAttribute('id', 'canvas');
                          canvasDiv.appendChild(canvas);
                          if(typeof G_vmlCanvasManager != 'undefined') {
                              canvas = G_vmlCanvasManager.initElement(canvas);
                          }
                          context = canvas.getContext("2d");

                          context.rect(canvas.width / 2 - 200, canvas.height / 2 - 160, 380, 320);
                          context.fillStyle = "rgba(128,98,146,1)";

                          context.fill();
                          crearCanvas = true;
                        
                          


                         // activarTouch();
                          /*var imagenD = new Image();
                          imagenD.src = "img/ayuda_pinturas.jpg";

                          imagenD.onload = function(){
                             context.drawImage(imagenD,0,0,480,200,0,0,100,40);
                          }*/

                          /*canvas.addEventListener("mousedown", engage);
                          canvas.addEventListener("mousemove", putPoint);
                          canvas.addEventListener("mouseup", disengage);*/

                          /*$("#canvas").on('touchstart', engage);
                          $("#canvas").on('touchmove', putPoint);
                          $("#canvas").on('touchend', disengage);*/


                          var colores = document.getElementsByClassName("color");

                          for (var i = 0, n=colores.length; i < n; i++) {
                            colores[i].addEventListener('click', setSwatch);
                          }

                          $(".color").on("click", complementarColor);



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
                           


                          $("#contenidoCuerpo").css("background", "#f0f0f0");
                          //alert("entro al for");
                          var item = results.rows.item(i);

                           //if(item.id_pinturas == 0){
                           //fotografiaPintura = item.fotografia; }

                           if(i!=0){
                              
                                 $("#lista-proyectos").append('<li class="listado-proyecto" id="'+item.id_proyecto+'"><div id="'+array_colores[item.id_tipo_proyecto]+'_'+item.id_proyecto+'"></div><div class="informacion_'+item.id_proyecto+'"><span class="span-tipo_'+item.id_proyecto+'">'+array_tipo_proyecto[item.id_tipo_proyecto]+'</span><span class="fecha-proyecto_'+item.id_proyecto+'">'+item.fecha+'</span><span class="id_proyecto'+item.id_proyecto+'"></span></div></li>');
                               

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
                                    "color": array_codigo_colores[item.id_tipo_proyecto],
                                    "font-weight": "bold"
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



                              /*var cambioCSSImagen =
                              {
                                    width: "20px",
                                    height: "20px",
                                    "margin-left": "-75px",
                                    "margin-top": "28px",
                                    position: "relative"
                              };


                              $(".imgThumbUp_"+item.id_proyecto).css(cambioCSSImagen);*/



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

                             $("#lista-proyectos").append('<li class="listado-proyecto" id="'+item.id_proyecto+'"><div id="'+array_colores[item.id_tipo_proyecto]+'"></div><div class="informacion"><span class="span-tipo">'+array_tipo_proyecto[item.id_tipo_proyecto]+'</span><span class="fecha-proyecto" style="color: '+array_codigo_colores[item.id_tipo_proyecto]+'">'+item.fecha+'</span><span class="id_proyecto">'+item.id_proyecto+'</span></div></li>');

                           }
                          //alert("id proyecto: "+item.id_proyecto+" tipo proyecto: "+item.id_tipo_proyecto+" foto: "+item.fotografia);
                         

                          






                      }
                      $(".listado-proyecto").on("click", accederProyecto);

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
            tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, superficie_total, total_cajas, precio_total, id_ceramicas) values (?,?,?,?,?,?,?,?)",[null,tipo,fecha,imagen,superficieTotal,totalCajas,0,0]);


         }


         function guardarProyectoPinturasDB(tx,superficieTotal,totalLitros){

            var fecha_actual = new Date();
            var fecha = fecha_actual.getDate()+"-"+(fecha_actual.getMonth()+1)+"-"+fecha_actual.getFullYear();
            tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, superficie_total, total_litros, precio_total, id_pinturas) values (?,?,?,?,?,?,?,?)",[null,tipo,fecha,imagen,superficieTotal,totalLitros,0,0]);


    

         }


         function obtenerFotografiaDB(tx){
          
          var consulta = "SELECT fotografia FROM proyecto WHERE id_proyecto ="+idComplementar;
          tx.executeSql(consulta, [], consultaObtenerFotografia, consultaError);


         }

         function correctoGuardarProyectoDB()
         {
            alert("Proyecto ingresado correctamente");
            fotografiaPintura = imagen;
            imagen = null;
            verificarProyectos();
            //cambiar de vista, a la lista de proyectos
         }

         function errorGuardarProyectoDB(err)
         {
           alert("errorGuardarProyecto: "+err.code);
         }


        function ActualizarPrecioBD(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
              db.transaction(queryActualizarPrecioDB, errorQueryDB);



        }

        function errorActualizarPrecioQueryDB(err){

          alert("errorActualizarPrecioQueryDB"+err.code)
        }


        function queryActualizarPrecioDB(tx){

             var consulta = "update proyecto set precio_total ="+precio+" where id_proyecto ="+idComplementar;
             tx.executeSql(consulta,[],consultaSuccesActualizarPrecioDB, errorQueryDB);


        }

        function consultaSuccesActualizarPrecioDB(){


        }

        function consultaErrorActualizarPrecio(err){

          alert("error Lol"+err.code);
        }


         function ListarCeramicasBD(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
              db.transaction(queryListarDB, errorQueryDB);  


         }

         function queryListarDB(tx){
             var consulta = "SELECT * FROM ceramicas";
             tx.executeSql(consulta,[],consultaListarSuccess, consultaListarError);


         }

         function consultaObtenerFotografia(tx,results){
                    for (var i = 0; i < results.rows.length ; i++) {
                        

                      var item = results.rows.item(i);
                      fotografiaPintura = item.fotografia;
                    }




         }
         function consultaListarSuccess(tx,results){
            // programar aquí 
            

                 $("#contenidoCuerpo").css("background", "#FBC636");
                  var topp = 110;
                  for (var i = 0; i < results.rows.length ; i++) {
                        

                          var item = results.rows.item(i);
                          var imagenCeramica = "img/"+item.url;
                      if(i !=0){

                          $("#lista-proyectos").append('<li class="listado-proyecto" id="'+item.id_ceramicas+'"><div class="contenedor-ceramica_'+item.id_ceramicas+'"><img src="'+imagenCeramica+'" class="imagen_ceramica_'+item.id_ceramicas+'"/><span class="span-uso_'+item.id_ceramicas+'">Uso:</span> <span class="info_uso_'+item.id_ceramicas+'">'+item.uso+'</span><span class="span-dimension_'+item.id_ceramicas+'">Dimensión:</span> <span class="info_dimension_'+item.id_ceramicas+'">'+item.formato+'</span><span class="span-precio_'+item.id_ceramicas+'">Precio: </span> <span class="info-precio_'+item.id_ceramicas+'">$'+item.precio+'</span><span class="id-listado-ceramica">'+item.id_ceramicas+'</span></div><img class="btn-mas-info_'+item.id_ceramicas+'" src="img/ic_entrar.png"/></li>');

                           var contenedorCeramicaCSS = {
                                "width": "100%",
                                "height": "63px"  


                            };

                            $(".contenedor-ceramica_"+item.id_ceramicas).css(contenedorCeramicaCSS);


                            var imagenCeramicaCSS = {
                                  float: "left",
                                  "margin-top": "7px",
                                  "border-radius": "5px",
                                  "width": "50px",
                                  "height": "50px",
                                  "margin-left": "11px"
                            };

                            $(".imagen_ceramica_"+item.id_ceramicas).css(imagenCeramicaCSS);

                            //sigue span-uso_

                            var spanUsoCSS = {

                                  "margin-left": "2px", /*Disminuir mueve a la derecha; aumentar hacia la izquierda*/
                                  "margin-top": "15px",
                                  "font-size": "10px",
                                  "color": "black",
                                  "font-family": 'Contra',
                                  "font-weight": "bold",
                                  "position": "absolute"
                            };

                            $(".span-uso_"+item.id_ceramicas).css(spanUsoCSS);


                            var infoUsoCSS = {
                                  "margin-left": "25px",/*aumentar mueve hacia la derecha*/
                                  "margin-top": "15px",
                                  "font-size": "10px",
                                  "color": "black",
                                  "font-family": 'Contra',
                                  "font-weight": "bold",
                                  "position": "absolute"
                             
                            };

                            $(".info_uso_"+item.id_ceramicas).css(infoUsoCSS);

                            //span-dimension

                            var dimensionCSS = {
                                  "margin-left": "2px", /*aumentar mueve hacia la izquierda; disminuir hacia la derecha*/
                                  "margin-top": "26px",
                                  "font-size": "10px",
                                  "color": "black",
                                  "font-family": 'Contra',
                                  "font-weight": "bold",
                                  "position": "absolute"

                            };

                            $(".span-dimension_"+item.id_ceramicas).css(dimensionCSS);


                            var infoDimesionCSS = {

                                  "margin-left": "57px", /*disminuir mueve hacia la izquierda; aumentar hacia la derecha*/
                                  "margin-top": "26px",
                                  "font-size": "10px",
                                  "color": "black",
                                  "font-family": 'Contra',
                                  "font-weight": "bold",
                                  "position": "absolute"


                            };


                            $(".info_dimension_"+item.id_ceramicas).css(infoDimesionCSS);

                            var spanPrecioCSS = {

                                  "margin-left": "2px",/*aumentar mueve a la izquierda*/
                                  "margin-top": "38px",
                                  "font-size": "10px",
                                  "color": "black",
                                  "font-family": 'Contra',
                                  "font-weight": "bold",
                                  "position": "absolute"

                            };

                            $(".span-precio_"+item.id_ceramicas).css(spanPrecioCSS);


                            var infoPrecioCSS = {

                                  "margin-left": "35px", /*aumentar move a la drecha;*/
                                  "margin-top": "38px",
                                  "font-size": "10px",
                                  "color": "black",
                                  "font-family": 'Contra',
                                  "font-weight": "bold",
                                  "position": "absolute"

                            };

                            $(".info-precio_"+item.id_ceramicas).css(infoPrecioCSS);


                            var btnMasInfoCSS = {

                                  "margin-left": "270px",
                                  "margin-top": "-280px",/*aumentar*/
                                  "top":"-33px", /*dis hacia abajo*/
                                  "height": "20px",
                                  "width": "20px",
                                  "position": "relative"

                            };

                            $(".btn-mas-info_"+item.id_ceramicas).css(btnMasInfoCSS);
                            //topp+=60;




                      }else{ 


                          
                          $("#lista-proyectos").append('<li class="listado-proyecto" id="'+item.id_ceramicas+'"><div class="contenedor-ceramica"><img src="'+imagenCeramica+'" class="imagen_ceramica"/><span class="span-uso">Uso:</span> <span class="info_uso">'+item.uso+'</span><span class="span-dimension">Dimensión:</span> <span class="info_dimension">'+item.formato+'</span><span class="span-precio">Precio: </span> <span class="info-precio">$'+item.precio+'</span><span class="id-listado-ceramica">'+item.id_ceramicas+'</span></div><img class="btn-mas-info" src="img/ic_entrar.png"/></li>');
                       }


                }
                wait(2);
                $(".listado-proyecto").on("click", accederCeramica);
                
                navigator.notification.activityStop();



         }

         function consultaListarError(err){
          alert("consultaListarError: "+err.code);
         }

         function verCeramicaBD(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryVerCeramicaDB, errorDB);  


         }



        function queryVerCeramicaDB(tx){
             var consulta = "SELECT * FROM ceramicas WHERE id_ceramicas ="+idCeramica;
             tx.executeSql(consulta,[],consultaVerCeramicaSuccess, errorQueryDB);


         }



         function consultaVerCeramicaSuccess(tx,results){
               
             for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);

                 $("#txtRendimiento").text(item.rendimiento_caja+" m2");
                 $("#txtFormato").text(item.formato+" cm");
                 $("#txtModelo").text(item.modelo);
                 $("#txtMarca").text(item.marca);
                 $("#txtColor").text(item.color);
                 $("#txtUso").text(item.uso);
                 $("#txtPrecio").text("$"+item.precio);
                 $("#txtLugarVenta").text(item.lugar); 
                 lugar = item.lugar;               
 


             }

         }


        function verPrecioCeramicaBD(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryVerPrecioCeramicaDB, errorDB);  


         }



        function queryVerPrecioCeramicaDB(tx){
             var consulta = "SELECT * FROM ceramicas WHERE id_ceramicas ="+idCeramica;
             tx.executeSql(consulta,[],consultaVerPrecioCeramicaSuccess, errorQueryDB);


         }



         function consultaVerPrecioCeramicaSuccess(tx,results){
               
             for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var imagenCeramica = "img/"+item.url;
                 imagenCeramicaEscogida = imagenCeramica;
                  $("#precio_caja").text("$"+item.precio);
                  $("#imgCeramicaAgregada").attr("src", imagenCeramica);
                  var precio = totalCajasParaPrecio * item.precio;
                  $("#precio_total").text("$"+precio); 
                  lugar = item.lugar;


             }
             wait(1);
             navigator.notification.activityStop();
        }






     function verCeramicaWallpaperBD(){

          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

           db.transaction(queryVerCeramicaWallpaperDB, errorDB);  


         }



        function queryVerCeramicaWallpaperDB(tx){
             var consulta = "SELECT * FROM ceramicas WHERE id_ceramicas ="+idCeramica;
             tx.executeSql(consulta,[],consultaVerCeramicaWallpaperSuccess, errorQueryDB);


         }



         function consultaVerCeramicaWallpaperSuccess(tx,results){
               
             for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var imagenCeramica = "img/"+item.url;

                 $("#imgCeramicaWallpaper").attr("src", imagenCeramica);


             }

         }

        function guardarCeramicaBD(){

          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

           db.transaction(queryGuardarCeramicaDB, errorDB);  


         }



        function queryGuardarCeramicaDB(tx){
             var consulta = "update proyecto set id_ceramicas ="+idCeramica+" where id_proyecto ="+idComplementar;
             
             tx.executeSql(consulta,[],consultaGuardarCeramicaSuccess, errorQueryDB);


         }



         function consultaGuardarCeramicaSuccess(tx,results){
               alert("Cerámica Guardada");
              pantallaPrincipal();
              verificarProyectos();
                

         }




  /*FUNCIONES PARA LA CAMARA */

  function capturarFotografiaEditable()
  {
     navigator.camera.getPicture(onPhotoURISuccess, onFail, 
      {
        quality: 30, 
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



   function accederProyecto()
   {

        var id = $(this).attr('id');
        idComplementar = id;

        salirApp = false;
        fondoBlanco();
        //debugger;
        complementarBD();
        //Obtener fotografia
        obtenerFotografia();
        
      
        //btn_complementar...
        //wait(10);

       //aqui comenzar a programar



   }




   function funcionesDeAyuda(){
      
      xhReq.open("GET", "ayuda/ayuda.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      $("#cajas_total").text(Math.round(totalCajasComplementar));
      $("#btn_calcular").on("click", calculoPrecio);
      $("#ic_right").on("click", flechaDerecha);
      $("#ic_left").on("click", flechaIzquierda)
      


   }


   function calculoPrecio(){

     precio = $("#txtPrecio").val();
     var resultado = precio * Math.round(totalCajasComplementar);
     precio = resultado;
     $("#precio_total").text("$"+resultado);
  
     //ActualizarPrecioBD();




   }

   function flechaDerecha()
   {

          navigator.notification.confirm(
          "Para ver el vídeo necesitas conexión a internet ¿Dispones de dicha conexión?",
          onConfirm,
          "Aviso",
          "No,Sí"

      );

   }

    function cargarVideo()
    {
      var conexion = verificarConexion();
          if(conexion != 'No network connection' && conexion != 'Unknown connection'){

          xhReq.open("GET", "ayuda/video.html", false);
          xhReq.send(null);
          document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

          $("#ic_right").on("click", flechaIzquierda);
          $("#ic_left").on("click", flechaIzquierda2)
               
               
          }

          else{
            funcionesDeAyuda();
            alert("No dispones de conexión a internet");
          }

    }


    function flechaIzquierda2(){

      xhReq.open("GET", "ayuda/ayuda.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      $("#cajas_total").text(Math.round(totalCajasComplementar));
      $("#btn_calcular").on("click", calculoPrecio);
      $("#ic_right").on("click", flechaDerecha);
      $("#ic_left").on("click", flechaIzquierda)
    }




   function onConfirm(button){
     
     if(button == 1){

          funcionesDeAyuda();

     }else{

            cargarVideo();
     }

   }



   function flechaIzquierda(){
     
          navigator.notification.activityStart("Por favor espere", "Cargando Contenido...");
          xhReq.open("GET", "listado_ceramicas/listado_ceramicas.html", false);
          xhReq.send(null);
          document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

          ListarCeramicasBD();




   }




   function wait(nsegundos) {
objetivo = (new Date()).getTime() + 1000 * Math.abs(nsegundos);
while ( (new Date()).getTime() < objetivo );
}

 function calculoLitrosPintura(){
       //capturamos los datos del usuario
     var medida1 = $("#txtMedida1").val();
     var medida2 = $("#txtMedida2").val();
     var rendimientoTarro = $("#txtMedida3").val();


     var superficieTotal;
     var totalLitros;

     try{

     superficieTotal = medida1 * medida2;
     totalLitros = superficieTotal / rendimientoTarro;

     if(!isNaN(totalLitros) && imagen != null){

      superficieTotal = Math.round(superficieTotal * 100) / 100;
      totalLitros = Math.round(totalLitros * 100) / 100;

      xhReq.open("GET", "resultados/opcion4.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      $(".guardar_proyecto").on("click", function(){
               

           guardarProyectoPintura(superficieTotal, totalLitros);
               
               

           });

      $("#total_superficie").text(superficieTotal+"m2");
      $("#litros_total").text(totalLitros+"lt");
      $(".litros_total").text(totalLitros+"lt");

      var smallImage = document.getElementById('imgLugar');
      smallImage.style.display = 'block';
      smallImage.src = imagen;




     }else{
        
            if(imagen == null){
                        
                  alert("Debe tomar una fotografía del lugar");
             }else{

                  alert("Ingrese números correctos");
             }


     }
     


     }catch(e){

      alert("Catch: "+e);
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
           $("#cajas_total").text(Math.round(totalCajas)+" cajas");

             
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


  function guardarProyectoPintura(superficieTotal, totalLitros){

    var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
     db.transaction(function(tx){guardarProyectoPinturasDB(tx,superficieTotal,totalLitros)}, errorGuardarProyectoDB, correctoGuardarProyectoDB);


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
     salirApp = false;
    if(estado=="cuerpo"){
              if(toggleMenu){
                     $("#cuerpo").removeClass();
                     $("#cuerpo").addClass('page transition right');
                     toggleMenu = false;
              }else{
                     toggleMenu = true;
                     $("#cuerpo").removeClass();
                     $("#cuerpo").addClass('page transition center');
              }
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
        salirApp = true;

          
        }else{
         salirApp = false;
        xhReq.open("GET", "proyectos/opcion"+opcion+".html", false);
        tipo = opcion; //para guardarlo en la base de datos; el tipo de proyecto
        xhReq.send(null);
        document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
        fondoBlanco();
        }


        // A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
         $("#cuerpo").removeClass();
         $("#cuerpo").addClass('page transition center');
         
        estado="cuerpo";

        //Cargar los eventos
        if(opcion == 1){
        $("#btn_guardar").on("click",calculoSuperficieSimple);
        }
        if(opcion == 4){

          $("#btn_ayudaPintura").css({"display": "inline-block", "width": "40%"});
          $("#btn_guardar").css({"display": "inline-block", "width": "40%", "margin-left": "22px"});
          $("#btn_guardar").on("click", calculoLitrosPintura);
        }
        $("#ic_camara").on("click", capturarFotografiaEditable);
        $("#btn_ayudaPintura").on("click", ayudaPintura);
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
      salirApp = true;
}



function fondoBlanco()
{

  $("#contenidoCuerpo").css("background", "white");


}

function verificarConexion(){

        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        return states[networkState];
    

   }


function accederCeramica(){

      xhReq.open("GET", "tabla_ceramica/tabla_ceramica.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      $("#btnVerCeramica").on('click', verCeramicaWallpaper);
      $("#btnGuardarCeramica").on('click', guardarCeramica);
      $("#imgGps").on('click', verMapa);

      idCeramica = $(this).attr('id');
      verCeramicaBD();

}


function verCeramicaWallpaper()
{
      xhReq.open("GET", "wallpapers/ceramica.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      verCeramicaWallpaperBD();

}

function guardarCeramica(){
  
    guardarCeramicaBD();
  
}


function verMapa(){
      if(lugar == "Sodimac")
      {
          xhReq.open("GET", "mapa/mapa_homcenter.html", false);
          xhReq.send(null);
          document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
          navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
      }else{

          xhReq.open("GET", "mapa/mapa_easy.html", false);
          xhReq.send(null);
          document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
          navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);


      }

      $("#slcLugarDeVenta").on("change",actualizarMapa);


}




function onSuccessGPS(position){
  
  inicializarMapa(position.coords.latitude, position.coords.longitude);

}


function onErrorGPS(error){

  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');


}


function inicializarMapa(latitud, longitud){
                
                myLatlng = new google.maps.LatLng(latitud, longitud);
                directionsService = new google.maps.DirectionsService();
                directionsDisplay = new google.maps.DirectionsRenderer();
                var mapOptions = { 
                    zoom: 12, 
                    center: myLatlng
                  };

                  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

                 var marker = new google.maps.Marker({ 
                    position: myLatlng, 
                    map: map, 
                    title: 'Mi punto en el mapa' 
                }); 
                 
               marker.setMap(map);
               directionsDisplay.setMap(map);
                var lugar = $("#slcLugarDeVenta").val();
                var coordenadas = lugar.split(";")
                calcRoute(coordenadas[0],coordenadas[1]);

}


function actualizarMapa(){
 
  var lugar = $("#slcLugarDeVenta").val();
  var coordenadas = lugar.split(";")
  calcRoute(coordenadas[0],coordenadas[1]);
 

}





function calcRoute(lat, longy) {
  
  var start = myLatlng;

  var latlong = new google.maps.LatLng(lat, longy);
  var end = latlong;
  var request = {
    origin:start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      
    }
    else{
      
    }
  });
}

function resizable(){

      activarTouch();

      
      $("#resizeMe").resizable({handles: 'all'});

      $( "#insideParent" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent2" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent3" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent4" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent5" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent6" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent7" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent8" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent9" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent10" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent11" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent12" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent13" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent14" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent15" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent16" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent17" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent18" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent19" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $( "#insideParent20" ).draggable({containment: "#resizeMe", start: function(){ $("#resizeMe").css({"border": "3px solid #E0AC00"}) }, stop: function(){$("#resizeMe").css({"border": "3px solid #E7EBDF"})}});
      $("#resizeMe").draggable();
      




  






}

function rotarCeramica(){

   $(".ceramicaDrag").rotate(anguloRotacionCeramica);
   anguloRotacionCeramica +=90;

  if(anguloRotacionCeramica == 360){
    anguloRotacionCeramica = 90;
  }


}


function funcionComplementar(){
      xhReq.open("GET", "ver_ceramica_arrastre/drag_ceramica.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      resizable();

      $("#btnRotar").on("click", rotarCeramica);
      $("#btnDeshacer").on('click', funcionDeshacer);
      $(".ceramicaDrag").attr('src', imagenCeramicaEscogida);
      $("#fotografia").attr("src", fotografiaLugar);
      //Cargar foto y ceramica
      




}

function funcionDeshacer(){
   funcionComplementar();
    
}




function ayudaPintura(){

      xhReq.open("GET", "ayuda/ayuda_calculo_pinturas.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

}

function complementarColor(){

  var nombreColor = $(this).data("color");
  var codigoColor = $(this).data("codigo");
  $("#nombreColor").text(nombreColor);
  $("#codigoColor").text(codigoColor)
  
}

      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width,
            y: (evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height
        };
      }


/*var putPoint = function(evento){
//e.clientX
    
      if(dragging){

           var x = evento.x;
           var y = evento.y;
          var mouse = getMousePos(canvas,evento);
           x-= canvas.offsetLeft;
           y-= canvas.offsetTop;


            context.lineTo(evento.clientX,evento.clientY);
            context.stroke();
            context.beginPath();
            context.arc(evento.clientX,evento.clientY, radio, 0, Math.PI*2);
            context.fill();
            context.beginPath();
            context.moveTo(evento.clientX,evento.clientY);
      }
}*/

/*var engage = function(evento){
  dragging = true;
  putPoint(evento);
}

var disengage = function(){
  dragging = false;
  context.beginPath();
}*/


/*function setRadius(){
alert("setRadius");
alert($(this).attr("id"));
        if($(this).attr("id") == "#incrad"){
          radio +=2;
          alert("incRad")
        }else{
           radio -=2;
        }
        if(newRadius < minRad)
            newRadius = minRad;
          else if(newRadius > maxRad)
            newRadius = maxRad;
          radio = newRadius;
          context.lineWidth = radio*2;
          radSpan.innerHTML = radio;
}*/



function setColor(color){
 
var arrayRGB = color.split("b");
var rgba = arrayRGB[0]+"ba";

var parentesisRGB = color.split("(");
//alert(parentesisRGB[1]); 

var rgba = rgba +"("+parentesisRGB[1];



 var rgbaOtroParentesis = rgba.split(")");
 color = rgbaOtroParentesis[0]+", 0.9)";


 context.fillStyle = color;
 context.strokeStyle = color;

 var active = document.getElementsByClassName('active')[0];
 if(active){
  active.className = 'color';
 }

 colorPintar = color;
 context.fillStyle = colorPintar;
context.fill();


}


function setSwatch(e){
  var swatch = e.target;
  setColor(swatch.style.backgroundColor);
  swatch.className += ' active';


}


function rellenarImagenColor(){
      xhReq.open("GET", "ver_imagen_colores/ver_foto_colores.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      $("#btnAtras").on("click", opcion4ClickLista);
      $("#imgFotoLugar").css({ "background-image": "url("+fotografiaPintura+")"});
      var cortarPunto = colorPintar.split(".");
      var ordenarColor = cortarPunto[0]+".5)";

      $("#color").css({"background-color": ""+ordenarColor+""});
      //rgba(230,242,177,0.9)




}































function activarTouch(){

     /iPad|iPhone|Android/.test( navigator.userAgent ) && (function( $ ) {

var proto =  $.ui.mouse.prototype,
_mouseInit = proto._mouseInit;

$.extend( proto, {
    _mouseInit: function() {
        this.element
        .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );
        _mouseInit.apply( this, arguments );
    },

    _touchStart: function( event ) {
        /* if ( event.originalEvent.targetTouches.length != 1 ) {
            return false;
        } */

        this.element
        .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
        .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );

        this._modifyEvent( event );

        $( document ).trigger($.Event("mouseup")); //reset mouseHandled flag in ui.mouse
        this._mouseDown( event );

        //return false;           
    },

    _touchMove: function( event ) {
        this._modifyEvent( event );
        this._mouseMove( event );   
    },

    _touchEnd: function( event ) {
        this.element
        .unbind( "touchmove." + this.widgetName )
        .unbind( "touchend." + this.widgetName );
        this._mouseUp( event ); 
    },

    _modifyEvent: function( event ) {
        event.which = 1;
        var target = event.originalEvent.targetTouches[0];
        event.pageX = target.clientX;
        event.pageY = target.clientY;
    }

});

})( jQuery );


}