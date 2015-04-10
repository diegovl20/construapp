// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;
var ceramica = false;
var ladrillo = false;
var pintura = false;
var alfombra = false;
var ceramica_bool = false;
var pintura_bool = false; 
var alfombra_bool = false;
var ladrillo_bool = false;
var OpcionesMenu = false;
var contador= 0;
var ancho_py, largo_py;
var imagenALaBD = "jiji";
var idCeramicaClickeada = 0;
var idColorCirculoClickeado = 0;
var idAlfombraClickeada = 0;
var idLadrilloClickeado = 0
var tipo_proyecto;
var tipo_superficie;
var nombreProyecto;
var xhReq = new XMLHttpRequest();
var pictureSource,destinationType;
var imagen = null;
var imagenCeramicaEscogida;
var key = "estado";
var imagenAMenu = "undefined";
var storage;
var tipo;
var array_tipo_proyecto = new Array("nada","baño","dormitorio","patio","living", "cocina", "comedor");
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
var quitarCapa = false;
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

    alert(opcionesMenu);

       if(salirApp){
        navigator.app.exitApp();
       }
       else if(quitarCapa){
         $(".flotante").hide("slow");
         $("#mask").css("display", "none");
            
       }
       //else if(OpcionesMenu){
        //complementarBD();
       //}
       else{
            pantallaPrincipal();
        verificarProyectos();
      }
  }


function main(){
   estado="cuerpo";
      storage = window.localStorage;
    $(".fancybox").fancybox();

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

function menuOpciones(){
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
}
   /*INICIO FUNCIONES BASE DE DATOS */

         function populateDB(tx)
         {

           var tabla_tipo_proyecto = "CREATE TABLE IF NOT EXISTS tipo_proyecto( id_tipo_proyecto INTEGER PRIMARY KEY, nombre TEXT)";
           var tabla_ceramicas = "CREATE TABLE IF NOT EXISTS ceramicas( id_ceramicas INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rendimiento_caja FLOAT, modelo TEXT, marca TEXT, color TEXT, uso TEXT, formato TEXT, precio INTEGER, lugar TEXT)";
           var tabla_proyecto = "CREATE TABLE IF NOT EXISTS proyecto( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo FLOAT, ancho FLOAT, superficie_total FLOAT, total_cajas FLOAT, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, id_alfombras, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, nombre_proyecto TEXT, tipo_proyecto TEXT, precio_frague INTEGER, precio_pegamento INTEGER, total_frague INTEGER, total_pegamento INTEGER, rendimiento_caja FLOAT, rendimiento_pintura FLOAT, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
           var tabla_pinturas = "CREATE TABLE IF NOT EXISTS pintura (id_pintura INTEGER PRIMARY KEY AUTOINCREMENT, nombre_color TEXT, codigo TEXT, rgba_color TEXT)";
           tx.executeSql(tabla_tipo_proyecto);
           tx.executeSql(tabla_ceramicas);
           tx.executeSql(tabla_proyecto);
           tx.executeSql(tabla_pinturas);
           //tratar de usar localstorage
           var l = storage[key];
           if(typeof l === 'undefined'){
              
              var execute = "INSERT INTO tipo_proyecto VALUES(1, 'baño')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(2, 'dormitorio')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(3, 'patio')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(4, 'living')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(5, 'cocina')";
              tx.executeSql(execute);
              var execute = "INSERT INTO tipo_proyecto VALUES(6, 'comedor')";
              tx.executeSql(execute);
              /*ingresar ceramicas*/

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/1.jpg', 1.53,'Cima Gris', 'Lamosa','Gris','Pisos y Muros','33x33',3810,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/2.jpg', 0.72,'Arcilla', 'Alberdi','Café Rojizo','Pisos y Muros','30x30',3953,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/3.jpg', 1.52,'Caribe', 'Lamosa','Gris','Muros','20x30',4241,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/4.jpg', 1.52,'Caribe', 'Lamosa','Beige','Muros','20x30',4241,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/5.jpg', 1.50,'Engobe', 'Kaztelo','Blanco','Muros','20x20',4485,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/6.jpg', 1.95,'Vulcano', 'Celima','Gris','Pisos','30x30',5246,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/7.jpg', 1.53,'Cima', 'Lamosa','Beige','Pisos y Muros','33x33',5340,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/8.jpg', 1.28,'Woodriver', 'Lamosa','Gris','Pisos y Muros','40x40',5747,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/9.jpg', 1.95,'Catahua', 'Celima','Café','Pisos','30x30',5831,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/10.jpg', 1.53,'Catalán', 'Celima','Café','Pisos','30x30',5831,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/11.jpg', 2.00,'Toledo', 'Moliza','Café','Pisos','40x40',5980,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/12.jpg', 1.50,'Enix Marfil', 'Cordillera','Beige','Muros','20x33',5985,'Sodimac');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/13.jpg', 2.00,'Roca', 'Roca','Beige','Pisos','30x30',5980,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/14.jpg', 2.33,'Nativa', 'Nativa','Café','Pisos','36x36',8365,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/15.jpg', 2.00,'Evora HD', 'Evora HD','Variado','Pisos','45x45',11980,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/16.jpg', 1.50,'Alhambra', 'Alhambra','Verde','Pisos','33x20',8685,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/17.jpg', 0.96,'Piedra Pizarra', 'Piedra Pizarra','Gris','Pisos','40x40',9590,'Easy');"
              tx.executeSql(execute);

              var execute = "INSERT INTO ceramicas VALUES(null, 'img/ceramica/18.jpg', 1.99,'Cemento', 'Cemento','Gris Plata','Pisos','40x40',6945,'Easy');"
              tx.executeSql(execute);
              /*ingresar pinturas*/ 

              var execute = "INSERT INTO pintura VALUES(null, 'Purple Passion', '7006W', 'rgba(128,98,146,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blue Cool', '7090W', 'rgba(215,238,243,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Ondine Blue', '7091W', 'rgba(201,231,240,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Inpiration Blue', '7092W', 'rgba(174,221,238,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Baby Blue Eyes', '7093M', 'rgba(136,205,228,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blue Stencil', '7094M', 'rgba(98,192,222,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Granada Blue', '7095D', 'rgba(0,161,197,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Deep Marine', '7096A', 'rgba(0,136,174,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Tiffany Glass', '7190W', 'rgba(237,244,211,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Rain Reflection', '7191W', 'rgba(240,239,192,1)')";
              tx.executeSql(execute);  

              var execute = "INSERT INTO pintura VALUES(null, 'Tangy Green', '7192W', 'rgba(230,232,176,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Green Moth', '7193W', 'rgba(223,226,156,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Spring Grass', '7194D', 'rgba(212,216,129,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Picnic Green', '7195AW', 'rgba(191,196,93,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Bistro Green', '7196N', 'rgba(170,179,82,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Serenity', '7250W', 'rgba(251,246,225,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lemon Meringue', '7251W', 'rgba(255,241,191,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Sundew', '7252W', 'rgba(255,240,175,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Golden Corn', '7253M', 'rgba(255,231,143,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Black-eyed-susan', '7254D', 'rgba(255,218,93,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'High Sun', '7255A', 'rgba(255,211,64,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Coronation Gold', '7256W', 'rgba(255,194,0,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Rose Morn', '7460W', 'rgba(242,232,235,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Island Dawn', '7461W', 'rgba(238,221,235,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Fresh Bud', '7462W', 'rgba(231,202,227,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Laurel Blossom', '7463M', 'rgba(211,163,203,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Violet Cluster', '7464D', 'rgba(200,142,187,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Violet Cluster', '7464D', 'rgba(200,142,187,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Imperial Purple', '7465D', 'rgba(184,123,171,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Royal Robe', '7466N', 'rgba(158,93,137,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blue Surf', '8014M', 'rgba(128,168,199,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Water Works', '8015D', 'rgba(92,138,173,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Deep Waters', '8016N', 'rgba(69,106,136,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Sunset Snow', '8400W', 'rgba(249,223,226,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Strawberry Cream', '8401W', 'rgba(238,209,215,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Pinkwater', '8402W', 'rgba(233,197,205,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Moon Rose', '8403M', 'rgba(221,176,185,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Wine Cordial', '8404M', 'rgba(204,150,163,1')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Red Valerian', '8405D', 'rgba(179,119,130,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Red Jarrah', '8406N', 'rgba(144,90,92,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Tomatillo', 'AC115N', 'rgba(175,85,88,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Roasted Pepper', 'AC116N', 'rgba(158,76,78,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'French Red', 'AC117N', 'rgba(139,83,87,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Red Alert', 'AC118R', 'rgba(198,59,71,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Sizzling Haute', 'AC119R', 'rgba(180,59,68,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Weight Red', 'AC120R', 'rgba(194,64,86,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Soft Whisper', 'CW001W', 'rgba(225,229,238,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Rain Shimmer', 'CW002W', 'rgba(234,237,240,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Mysterious', 'CW003W', 'rgba(239,240,238,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Delicate Blue', 'CW004W', 'rgba(229,235,240,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Winterscape', 'CW005W', 'rgba(226,230,231,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Shaded Ice', 'CW006W', 'rgba(227,230,229,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blue Twinkle', 'CW007W', 'rgba(223,232,240,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blue Glance', 'CW008W', 'rgba(228,236,238,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Barely Blue', 'CW009W', 'rgba(236,241,239,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blueberry Haze', 'CW010W', 'rgba(223,231,229,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Serene White', 'CW011W', 'rgba(222,228,224,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blueberry Mist', 'CW012W', 'rgba(229,233,230,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blueberry Hint', 'CW013W', 'rgba(222,234,233,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Blueberry Frost', 'CW014W', 'rgba(232,238,235,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Perfect Mint', 'CW015W', 'rgba(233,242,238,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lime Squeeze', 'CW016W', 'rgba(232,239,231,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Limon', 'CW017W', 'rgba(229,233,223,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lime Treat', 'CW018W', 'rgba(237,244,233,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lemonade', 'CW019W', 'rgba(245,237,214,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lemonade White', 'CW020W', 'rgba(246,240,224,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lemon Peel', 'CW021W', 'rgba(240,238,223,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Soft Gold', 'CW022W', 'rgba(255,241,217,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lis Creme', 'CW023W', 'rgba(252,245,227,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Soaring White', 'CW024W', 'rgba(252,245,231,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'White Lilac', '7000W', 'rgba(236,226,236,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lilac Glaze', '70001W', 'rgba(233,220,235,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lavender Bubble', '7002W', 'rgba(217,199,227,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Lively Lavender', '7003W', 'rgba(202,180,215,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Candy Violet', '7004W', 'rgba(189,163,206,1)')";
              tx.executeSql(execute);

              var execute = "INSERT INTO pintura VALUES(null, 'Purple Sequel', '7005W', 'rgba(156,127,177,1)')";
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

         function obtenerNombreProyecto(){
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(obtenerNombreProyectoDB, errorQueryDB);

         }

         function ingresarHerramientasAlProyectoBD(){
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(ingresarHerramientasAlProyectoDB, errorQueryDB);


         }

         function ActualizarDatosCeramicaDB(){
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(queryActualizarDatosCeramicaDB, errorQueryDB);

         }

         function ActualizarDatosPinturasDB(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(queryActualizarDatosPinturasDB, errorQueryDB);

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


         function obtenerIdHerramientasClickeadasDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryObtenerIdHerramientasClickeadas, errorComplementarDBQueryDB);



         }

         function realizarCalculoCeramicasDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryRealizarCalculosCeramicasDB, errorComplementarDBQueryDB);


         }

         function queryObtenerIdHerramientasClickeadas(tx){
          var consulta = "SELECT id_ceramicas, id_pinturas, id_alfombras, id_ladrillos, ancho, largo, rendimiento_pintura FROM proyecto WHERE id_proyecto ="+idComplementar;
          tx.executeSql(consulta,[],SuccesQueryObtenerIdHerramientasClickeadas, consultaComplementarError);

         }

         function queryRealizarCalculosCeramicasDB(tx){
            

             var consulta = "SELECT rendimiento_caja, precio FROM ceramicas WHERE id_ceramicas ="+idCeramicaClickeada;
             tx.executeSql(consulta,[],SuccesQueryRealizarCalulos, consultaComplementarError);

         }

         function SuccesQueryObtenerIdHerramientasClickeadas(tx, results){

               for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var rendimiento_pintura = item.rendimiento_pintura;

                 idCeramicaClickeada = item.id_ceramicas;
                 idColorCirculoClickeado = item.id_pinturas;
                 idLadrilloClickeado = item.id_ladrillos;
                 idAlfombraClickeada = item.id_alfombras;
                 ancho_py = item.ancho;
                 largo_py = item.largo
               }
               realizarCalculoCeramicasDB();

               if(idCeramicaClickeada  == 0){
                  //No mostrar el cuadro de ceramicas
               }

               if(idColorCirculoClickeado  == 0){
                  //no mostrar el cuadro de pinturas
                  
               }else{
                  calculoLitrosPintura(rendimiento_pintura, ancho_py, largo_py);
               }

               if(idLadrilloClickeado == 0){
                  //no mostrar el cuadro de ladrillo
               }

               if(idAlfombraClickeada == 0){
                  //no mostrar el cuadro de alfombra
               }



         }

         

         function SuccesQueryRealizarCalulos(tx,results){
          for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var rendimiento = item.rendimiento_caja;
                 var precio = item.precio;
                 
               }


               RealizarCalculosCeramicas(rendimiento, ancho_py, largo_py);

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
                 OpcionesMenu = true;

                  //fecha DATE, fotografia TEXT,superficie_total float, total_cajas float, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
                 //var proyecto = new Array(item.id_proyecto, item.id_tipo_proyecto, item.fecha, item.fotografia, item.superficie_total, item.total_cajas );
                 /*arrayProyecto[0] = item.id_proyecto;
                 arrayProyecto[1] = item.id_tipo_proyecto;
                 arrayProyecto[2] = item.fecha;
                 arrayProyecto[3] = item.fotografia;
                 arrayProyecto[4] = item.superficie_total;
                 arrayProyecto[5] = item.total_cajas;*/
                 if(item.id_ceramicas != null){
                                  //alert("ceramica "+item.id_ceramicas+" ladrillo "+ item.id_ladrillos+ " alfombra "+item.id_alfombras+" pintura "+item.id_pinturas);
                                 if((item.id_ceramicas !=0 || item.id_ladrillos !=0) || (item.id_pinturas !=0 || item.id_alfombras !=0)){ // si no tiene un ceramica asignada
                                                                    //navigator.notification.activityStart("Por favor espere", "Cargando Contenido...");
                                  //xhReq.open("GET", "complementacion/opcion1_con_ceramica_guardada.html", false);
                                  //xhReq.send(null);
                                  //document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
                                  //$("#btn_ayuda").on("click", funcionesDeAyuda);
                                  //$("#btn_complementar").on("click", funcionComplementar);

                                  clickFlechaDerechaDecorar("lista");
                                  

                                  //fotografiaComplementar = item.fotografia;
                                  //totalCajasComplementar = item.total_cajas;
                                  //$("#imgLugar").attr("src", fotografiaComplementar);
                                  //$("#total_superficie").text(item.superficie_total);
                                  //$("#tipo_proyecto_complementar").text(array_tipo_proyecto[item.id_tipo_proyecto]);
                                  //$("#cajas_total").text(Math.round(item.total_cajas));
                                  //alert(fotografiaComplementar);
                                  //superficieTotalComplementar = item.superficie_total;
                                  //idCeramica = item.id_ceramicas;
                                  //fotografiaLugar = item.fotografia;
                                  //totalCajasParaPrecio = Math.round(item.total_cajas);
                                  //verPrecioCeramicaBD();


                                }else{
                                  

                                  //
                                  xhReq.open("GET", "complementacion/accederProyecto.html", false);
                                  xhReq.send(null);
                                  document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

                                  if (tipo_proyecto == "living"){


                                  }

                                  if (tipo_proyecto == "bano"){
                                   //xhReq.open("GET", "complementacion/accederProyectoBano.html", false);
                                   //xhReq.send(null);
                                   //document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

                                     $(".imagen").attr("src", "img/bano1.jpg");
                                     $(".imagen2").attr("src", "img/bano2.jpg");
                                     $(".imagen3").attr("src", "img/bano3.jpg");
                                     $(".imagen4").attr("src", "img/bano4.jpg");

                                     $(".imagen").attr("data-tipo", "bano");



                                  }

                                  if(tipo_proyecto == "dormitorio"){
                                      //xhReq.open("GET", "complementacion/accederProyectoDormitorio.html", false);
                                      //xhReq.send(null);
                                      //document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
                                     $(".imagen").attr("src", "img/dormitorio1.jpg");
                                     $(".imagen2").attr("src", "img/dormitorio2.jpg");
                                     $(".imagen3").attr("src", "img/dormitorio3.jpg");
                                     $(".imagen4").attr("src", "img/dormitorio4.jpg");

                                     $(".imagen").attr("data-tipo", "dormitorio");
                                  }

                                  if(tipo_proyecto == "patio"){
                                     //xhReq.open("GET", "complementacion/accederProyectoPatio.html", false);
                                     //xhReq.send(null);
                                     //document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
                                     $(".imagen").attr("src", "img/patio1.jpg");
                                     $(".imagen2").attr("src", "img/patio2.jpg");
                                     $(".imagen3").attr("src", "img/patio3.jpg");
                                     $(".imagen4").attr("src", "img/patio4.jpg");

                                     $(".imagen").attr("data-tipo", "patio");
                                  }

                                  if(tipo_proyecto == "cocina"){
                                     //xhReq.open("GET", "complementacion/accederProyectoCocina.html", false);
                                     //xhReq.send(null);
                                     //document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

                                     $(".imagen").attr("src", "img/cocina1.jpg");
                                     $(".imagen2").attr("src", "img/cocina2.jpg");
                                     $(".imagen3").attr("src", "img/cocina3.jpg");
                                     $(".imagen4").attr("src", "img/cocina4.jpg");

                                     $(".imagen").attr("data-tipo", "cocina");

                                  }

                                  $("#btn_ayuda").on("click", funcionesDeAyuda);
                                
                                 //fotografiaComplementar = item.fotografia;
                                 totalCajasComplementar = item.total_cajas;
                                 //$("#imgLugar").attr("src", fotografiaComplementar);
                                 $("#total_superficie").text(item.superficie_total);
                                 $("#tipo_proyecto_complementar").text(array_tipo_proyecto[item.id_tipo_proyecto]);
                                 $("#cajas_total").text(Math.round(item.total_cajas));
                                 //alert(fotografiaComplementar);
                                 superficieTotalComplementar = item.superficie_total;
                                 $("#btn_decorar2").on("click", elegirImagenDecorar);
                                 //$("#btn_calculo_material2").on("click", calculosHerramientas);
                                  $("#btn_calculo_material2").on("click", function(){
                                    shortToast("Debes decorar la imagén primero.");

                                  });
                                 //$("#btn_presupuesto2").on("click", presupuestoMaterial);
                                 $("#btn_presupuesto2").on("click", function(){
                                  shortToast("Debes decorar la imagén primero.");

                                 });
                                 //totalCajasComplementar = Math.round(item.total_cajas);



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



         function consultaSuccess(tx, results) //Mostrar listado de proyectos
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
                           


                          //$("#contenidoCuerpo").css("background", "#A9C0D0");
                          //alert("entro al for");
                          var item = results.rows.item(i);

                           //if(item.id_pinturas == 0){
                           //fotografiaPintura = item.fotografia; }

                           
                              
                                 //$("#lista").append('<li class="detalles-lista" data-tipo="'+item.tipo_proyecto+'" id="'+item.id_proyecto+'"><h2> '+item.nombre_proyecto+'</h2> <br/><p>Click para ver los detalles.</p> <br/> <p>"'+item.fecha+'"</p></li>');
                                 //sin lista, solo div
                                 $("#lista").append('<div class="item" id="'+item.id_proyecto+'" data-tipo="'+item.tipo_proyecto+'"><div id="titulo-proyecto">'+item.nombre_proyecto+'</div><div id="descripcion-proyecto">Click para ver más detalles</div><div id="fecha-proyecto">'+item.fecha+'</div><div id="imagen-proyecto"><img src="img/img_lista.png"/></div><div id="eliminar-proyecto"> <img src="img/img_eliminar.png"></div></div>');

                                 //Obtener margin-top original
                                 /*var margin = $(".fecha-proyecto").css("margin-top");
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


                              /*
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
                                

                              */
 

                           
                           

                             //$("#lista").append('<li class="listado-proyecto" data-tipo="'+item.tipo_proyecto+'" id="'+item.id_proyecto+'"></li>');

                           
                          //alert("id proyecto: "+item.id_proyecto+" tipo proyecto: "+item.id_tipo_proyecto+" foto: "+item.fotografia);
                         

                          






                      }
                      $(".item").on("click", accederProyecto);
                      OpcionesMenu = false;

               }

         }

         function consultaError(err){

           alert("consulta error"+err.code);

         }


         function guardarProyectoDB(tx,largo, ancho)
         {
            //alert("guardar proyecto: "+superficieTotal+" totalCajas: "+totalCajas);
            
            var fecha_actual = new Date();
            var fecha = fecha_actual.getDate()+"-"+(fecha_actual.getMonth()+1)+"-"+fecha_actual.getFullYear();
            //tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, superficie_total, total_cajas, precio_total, id_ceramicas) values (?,?,?,?,?,?,?,?)",[null,tipo,fecha,superficieTotal,totalCajas,0,0]);
            tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, largo, ancho, superficie_total, total_cajas, precio_total, id_ceramicas, id_pinturas, id_alfombras, total_litros, id_ladrillos, total_ladrillos, pintura_bool, ladrillo_bool, alfombra_bool, ceramica_bool, nombre_proyecto, tipo_proyecto, precio_frague, precio_pegamento, total_frague, total_pegamento, rendimiento_caja, rendimiento_pintura) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[null,tipo,fecha,"#NA", largo,ancho,0,0,0,0,0,0,0,0,0,pintura, ladrillo, alfombra, ceramica, nombreProyecto, tipo_superficie,0,0,0,0,0,0]);
            //var tabla_proyecto = "CREATE TABLE ( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo float, ancho float, superficie_total float, total_cajas float, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";


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

         function obtenerNombreProyectoDB(tx){
          
           var consulta = "SELECT nombre_proyecto, tipo_proyecto FROM proyecto WHERE id_proyecto ="+idComplementar;
           tx.executeSql(consulta, [], consultaObtenerNombreProyecto, consultaError);

         }

         function correctoGuardarProyectoDB()
         {
            shortToast("Proyecto Ingresado Correctamente");
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


        function queryActualizarDatosCeramicaDB(tx){
          var largo_db = $("#largoCeramicaresultado").text();
          var largo_db_ok = largo_db.split(" ");
          largo_db = largo_db_ok[0]; 
          largo_db = parseFloat(largo_db);


          var ancho_db = $("#anchoCeramicaresultado").text();
          var ancho_db_ok = ancho_db.split(" ");
          ancho_db = ancho_db_ok[0];
          ancho_db = parseFloat(ancho_db);

          var superficie_db = $("#superficieTotalCeramicaResultado").text();
          var superficie_db_ok = superficie_db.split(" ");
          superficie_db = superficie_db_ok[0];
          superficie_db = parseFloat(superficie_db);

          var frague_db = $("#fragueCeramicaresultado").text();
          var frague_db_ok = frague_db.split(" ");
          frague_db = frague_db_ok[0];
          frague_db = parseInt(frague_db);

          var pegamento_db = $("#pegamentoCeramicaresultado").text();
          var pegamento_db_ok = pegamento_db.split(" ");
          pegamento_db = pegamento_db_ok[0];
          pegamento_db = parseInt(pegamento_db);

          var cajas_db = $("#cajasCeramicaresultado").text();
          var cajas_db_ok = cajas_db.split(" ");
          cajas_db = cajas_db_ok[0];
          cajas_db = parseFloat(cajas_db);

          var rendimiento_db = $("#rendimientoCeramicaresultado").text()
          var rendimiento_db_ok = rendimiento_db.split(" ");
          rendimiento_db = rendimiento_db_ok[0];
          rendimiento_db = parseFloat(rendimiento_db);


          var consulta = "update proyecto set largo = "+largo_db+", ancho = "+ancho_db+", superficie_total = "+superficie_db+", total_frague = "+frague_db+", total_pegamento = "+pegamento_db+", total_cajas = "+cajas_db+", rendimiento_caja = "+rendimiento_db+" where id_proyecto ="+idComplementar;
          tx.executeSql(consulta,[],consultaSuccessActualizarDatosCeramicaDB, errorQueryDB);
          //largo, ancho, superficie_total

        }


        function queryActualizarDatosPinturasDB(tx){

          var largo_db = $("#largoPinturaresultado").text();
          var largo_db_ok = largo_db.split(" ");
          largo_db = largo_db_ok[0]; 
          largo_db = parseFloat(largo_db);
          


          var ancho_db = $("#anchoPinturaresultado").text();
          var ancho_db_ok = ancho_db.split(" ");
          ancho_db = ancho_db_ok[0];
          ancho_db = parseFloat(ancho_db);

        

          var superficie_db = $("#superficieTotalPinturaResultado").text();
          var superficie_db_ok = superficie_db.split(" ");
          superficie_db = superficie_db_ok[0];
          superficie_db = parseFloat(superficie_db);
          

          var rendimiento_db = $("#RendimientoPinturaresultado").text();
          var rendimiento_db_ok = rendimiento_db.split(" ");
          rendimiento_db = rendimiento_db_ok[0];
          rendimiento_db = parseFloat(rendimiento_db);
          

          var totalPintura_db = $("#totalPinturaresultado").text();
          var totalPintura_db_ok = totalPintura_db.split(" ");
          totalPintura_db = totalPintura_db_ok[0];
          totalPintura_db = parseInt(totalPintura_db);
          


          var consulta = "update proyecto set largo = "+largo_db+", ancho = "+ancho_db+", superficie_total = "+superficie_db+", rendimiento_pintura = "+rendimiento_db+", total_litros = "+totalPintura_db+" where id_proyecto ="+idComplementar;
          
          tx.executeSql(consulta,[],consultaSuccessActualizarDatosPinturaDB, errorQueryDB);

        }

        function consultaSuccessActualizarDatosCeramicaDB(){
          shortToast("Guardado Correctamente");
        }

        function consultaSuccessActualizarDatosPinturaDB(){
          shortToast("Guardado Correctamente");

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

         function consultaObtenerNombreProyecto(tx,results){
                      
                      for (var i = 0; i < results.rows.length ; i++) {
                        

                      var item = results.rows.item(i);
                      nombreProyecto = item.nombre_proyecto;
                      tipo_proyecto = item.tipo_proyecto;
                      $(".tituloProyecto").text(primeraLetraMayuscula(nombreProyecto));
                    }




         }

         
         function consultaListarSuccess(tx,results){
            // programar aquí 
            

                 //$("#contenidoCuerpo").css("background", "#FBC636");
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
             var consulta = "SELECT * FROM ceramicas WHERE id_ceramicas ="+idCeramicaClickeada;
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


         function ingresarHerramientasAlProyectoDB(tx){
          var consulta = "update proyecto set id_ceramicas ="+idCeramicaClickeada+", id_pinturas="+idColorCirculoClickeado+", id_alfombras = "+idAlfombraClickeada+", id_ladrillos = "+idLadrilloClickeado+", fotografia = '"+imagenALaBD+"' where id_proyecto ="+idComplementar;
          //alert(consulta);
          tx.executeSql(consulta,[],consultaSuccesIngresarHerramientasAlProyecto, errorQueryDB);
          //id_ceramicas INTEGER, id_pinturas INTEGER, id_alfombras

         }

         function consultaSuccesIngresarHerramientasAlProyecto(tx, results){
           shortToast("Herramientas Guardadas");

           //Aplicar Ajax
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


        function verificarTiposDeSuperficie(){
             var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryVerrificarTipoDeSuperficie, errorDB);  

        }

        function queryVerrificarTipoDeSuperficie(tx){

             var consulta = "SELECT pintura_bool, ladrillo_bool, alfombra_bool, ceramica_bool FROM proyecto WHERE id_proyecto ="+idComplementar;
             //pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN
             tx.executeSql(consulta,[],consultaVerificarTipoSuperficieSuccess, errorQueryDB);

        }

        function consultaVerificarTipoSuperficieSuccess(tx, results){
           var minimenu = false;

            for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 ceramica_bool = item.ceramica_bool;
                 ladrillo_bool = item.ladrillo_bool;
                 alfombra_bool = item.alfombra_bool;
                 pintura_bool = item.pintura_bool;

             }

                     
                  if(ceramica_bool == "true"){
                        if (minimenu == false){

                        $("#scrollDecorarCeramica").css("display" , "block");
                        minimenu = true;
                        }

                        $("#herramientaCeramica").on("click", herramientaCeramicaClick);

                  }

                  else{

                        $("#herramientaCeramica").css("background-color", "#8B0000");
                  }


                  if(alfombra_bool == "true"){

                        if (minimenu == false){
                            //$("#scrollDecorarCeramica").css("display" , "block");
                            minimenu = true;
                        }

                  }

                  else{
                        $("#herramientaAlfombra").css("background-color", "#8B0000");
                  }

                  if(pintura_bool == "true"){

                        if (minimenu == false){
                            $("#scrollColores").css("display" , "block");
                            minimenu = true;
                        }

                        $("#herramientaPintura").on("click", herramientaColoresClick);

                  }

                  else{
                        $("#herramientaPintura").css("background-color", "#8B0000");
                  }

                  if(ladrillo_bool == "true"){

                        if (minimenu == false){
                            //$("#scrollDecorarCeramica").css("display" , "block");
                            minimenu = true;
                        }

                  }else{

                        $("#herramientaLadrillo").css("background-color", "#8B0000");
                  }

                  //Si hay ceramicas que las cargue
                  if(ceramica_bool == "true"){
                    cargarCeramicasBD();
                  }

                  if(pintura_bool == "true"){
                    cargarPinturasBD();

                  }

        }


        function cargarCeramicasBD(){
             var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryCargarCeramicas, errorDB);  
              

        }

        function queryCargarCeramicas(tx){

            var consulta = "SELECT * FROM ceramicas";
             //pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN
             tx.executeSql(consulta,[],consultaCargarCeramicasSuccess, errorQueryDB);

        }

        function consultaCargarCeramicasSuccess(tx, results){

              for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 
                 $("#scrollDecorarCeramica").append('<div class="imagenHerramienta" > <img src="'+item.url+'" id="'+item.id_ceramicas+'"/> </div>');
                  //ceramicas( id_ceramicas INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rendimiento_caja FLOAT, modelo TEXT, marca TEXT, color TEXT, uso TEXT, formato TEXT, precio INTEGER, lugar TEXT)";




             }
             $(".imagenHerramienta img").on("click", subrayarImagen);

        }


        function cargarPinturasBD(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryCargarPinturas, errorDB);

        }

        function queryCargarPinturas(tx){
              var consulta = "SELECT * FROM pintura";
             //pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN
             tx.executeSql(consulta,[],consultaCargarPinturaSuccess, errorQueryDB);

        }

        function consultaCargarPinturaSuccess(tx, results){
              for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 
                 $("#scrollColores").append('<div class="color" id="'+item.id_pintura+'" data-color="'+item.nombre_color+'" data-codigo="'+item.codigo+'" style="background-color:'+item.rgba_color+'"></div>');
                 //<div class="imagenHerramienta" id="'+item.id_ceramicas+'"> <img src="'+item.url+'"/> </div>
                  //ceramicas( id_ceramicas INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rendimiento_caja FLOAT, modelo TEXT, marca TEXT, color TEXT, uso TEXT, formato TEXT, precio INTEGER, lugar TEXT)";
   //(id_pintura INTEGER PRIMARY KEY AUTOINCREMENT, nombre_color TEXT, codigo TEXT, rgba_color TEXT)";



             }

             $(".color").on("click", subrayarCirculoColor);
        }

        function herramientaCeramicaClick(){
           $("#herramientaCeramica").css("border", "3px solid rgb(161, 39, 39)");
           $("#herramientaAlfombra").css("border", "none");
           $("#herramientaLadrillo").css("border" , "none");
           $("#herramientaPintura").css("border", "none");

           $("#scrollColores").css("display" , "none");
           $("#scrollDecorarCeramica").css("display" , "block");

        }

        function herramientaColoresClick(){
           $("#herramientaPintura").css("border", "3px solid rgb(161, 39, 39)");
           $("#herramientaCeramica").css("border", "none");
           $("#herramientaLadrillo").css("border" , "none");
           $("#herramientaAlfombra").css("border", "none");

           $("#scrollDecorarCeramica").css("display" , "none");
           $("#scrollColores").css("display" , "block");

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

         function obtenerNombreFotografiaDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

           db.transaction(queryObtenerNombreFotografiaDB, errorDB);

         }

         function queryObtenerNombreFotografiaDB(tx){
             var consulta = "SELECT fotografia, nombre_proyecto FROM proyecto WHERE id_proyecto ="+idComplementar;
             tx.executeSql(consulta,[],consultaObtenerNombreFotografiaSuccess, errorQueryDB);

         }



         function consultaObtenerNombreFotografiaSuccess(tx,results){

              for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 nombreProyecto = item.nombre_proyecto;
                 imagenALaBD = item.fotografia;


             }

            $("#imgEscogidaAnt").attr("src", imagenALaBD);
            $(".tituloProyecto").text(primeraLetraMayuscula(nombreProyecto));



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
       tipo_proyecto = "";

        var id = $(this).attr('id');
        tipo_proyecto = $(this).attr("data-tipo");

        //'+array_codigo_colores[item.id_tipo_proyecto]+'">'+item.fecha+'</span><span class="id_proyecto">'+item.id_proyecto+'</span></div></li>');
        //tipo_proyecto = $("this .informacion .span-tipo").text();
        idComplementar = id;

        salirApp = false;
        fondoBlanco();
        //debugger;
        complementarBD();
        obtenerNombreProyecto();
         // y el tipo de proyecto
         // ir al listado de if para escoger que imagenes poner
        
                                  //nombreProyecto = primeraLetraMayuscula(nombreProyecto);
                                
                                  



        //Obtener fotografia
        //obtenerFotografia();
        
      
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

  function guardarProyectoOriginal(){

     //capturamos los datos del usuario
     var medida1 = $("#txtMedida1").val();
     var medida2 = $("#txtMedida2").val();
     //var rendimientoCaja = $("#txtMedida3").val();

     //variables locales

     //var superficie;
     //var superficieTotal;
     //var totalCajas;
     //var excedente;


     try{
         
          //superficie = medida1 * medida2;
          //superficieTotal = superficie * 1.05;
          //excedente = superficie * 0.05;
          //totalCajas = superficieTotal / rendimientoCaja;
           if(!medida1 == "" && !medida2=="" && !isNaN(medida1) && !isNaN(medida2)){
          //alert("Superficie"+superficie+"superficieTotal"+superficieTotal+"totalCajas"+totalCajas);
          //Reducir decimales

           
           //superficie = Math.round(superficie * 100) / 100;
           //superficieTotal = Math.round(superficieTotal * 100) / 100;
           //excedente = Math.round(excedente * 100) / 100;
           //totalCajas = Math.round(totalCajas * 100) / 100;

          //Cambiar Contendio de la pantalla
           
           //xhReq.open("GET", "resultados/opcion1.html", false);
           //xhReq.send(null);
           //document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
           //$(".guardar_proyecto").on("click", function(){
               

                  guardarProyectoBD(medida1, medida2);
               
               

           //});

           //document.getElementById('total_superficie').firstChild.nodeValue = superficie+" m2";
           //$("#total_superficie").text(superficie+" m2");
           //$("#excedente_material").text(excedente+" m2");
           //$("#metros_total").text(superficieTotal+" m2");
           //$("#cajas_total").text(Math.round(totalCajas)+" cajas");

             
             //var smallImage = document.getElementById('imgLugar');
             //smallImage.style.display = 'block';
             //smallImage.src = imagen;
           //document.getElementById('excedente_material').firstChild.nodeValue = superficie;
           //document.getElementById('cajas_total').firstChild.nodeValue = totalCajas;









          }else{


            //          if(imagen == null){
                        
              //            alert("Debe tomar una fotografía del lugar");
                //      }else{              
                    alert("Ingrese números correctos");
                    // }
          }

     }catch(e){
          alert(e);
     }

  }

  function guardarProyectoBD(medida1, medida2)
  {
    

     var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
     db.transaction(function(tx){guardarProyectoDB(tx,medida1, medida2)}, errorGuardarProyectoDB, correctoGuardarProyectoDB);

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
        //fondoBlanco();
        }


        // A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
         $("#cuerpo").removeClass();
         $("#cuerpo").addClass('page transition center');
         
        estado="cuerpo";

        //Cargar los eventos
        if(opcion == 1){
        //$("#btn_guardar").on("click",calculoSuperficieSimple);
        $("#btn_guardar").on("click", function(){
          
          tipo_superficie = $("#slcLugarDeSuperficie").val();
          tipo = $("#slcLugarDeSuperficie")[0].selectedIndex;
          tipo = tipo + 1;
          //alert(tipo_superficie);
          
          var n = $( "input:checked" ).length;
          nombreProyecto = $("#txtNombreProyecto").val();
          

          
          if (n =! 0 && !nombreProyecto == "") {
              if($("#myonoffswitch:checked").is(':checked'))
              {
                    pintura = true
                    
              }

              if($("#myonoffswitch2:checked").is(':checked'))
              {
                    //Ceramica
                    ceramica = true
                    
              }

              if($("#myonoffswitch3:checked").is(':checked'))
              {
                    //Ladrillo
                    ladrillo = true
                    
              }

              if($("#myonoffswitch4:checked").is(':checked'))
              {
                    //Alfombra
                    alfombra = true
                    
              }
              xhReq.open("GET", "proyectos/opcion1_continuacion.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

              $("#btn_guardar_proyecto").on("click", guardarProyectoOriginal)
         }else{

             if (n = 0){
             alert("Debe escoger una superficie");
             }
             else{
              alert("Debe asignar un nombre al proyecto");
             }
         }

        });

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

  //$("#contenidoCuerpo").css("background", "#A9C0D0");


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


function elegirImagenDecorar(){
        xhReq.open("GET", "decorar/decorar.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      var estiloImg = {

        "display" : "inline-block",
        "width": "160px",
        "height": "150px"
                        
      };

      //Poner imagen al <a>
       if(tipo_proyecto == "patio"){

              $("#Aimg1").attr("href", "img/patio1.jpg");
              $("#Aimg2").attr("href", "img/patio2.jpg");
              $("#Aimg3").attr("href", "img/patio3.jpg");
              $("#Aimg4").attr("href", "img/patio4.jpg");

              $("#imagen1").attr("src", "img/patio1.jpg");
              $("#imagen2").attr("src", "img/patio2.jpg");
              $("#imagen3").attr("src", "img/patio3.jpg");
              $("#imagen4").attr("src", "img/patio4.jpg");


              //$("#Aimg5").attr("data-tipo", "patio");
        }
        if(tipo_proyecto == "bano"){

              $("#Aimg1").attr("href", "img/bano1.jpg");
              $("#Aimg2").attr("href", "img/bano2.jpg");
              $("#Aimg3").attr("href", "img/bano3.jpg");
              $("#Aimg4").attr("href", "img/bano4.jpg");

              $("#imagen1").attr("src", "img/bano1.jpg");
              $("#imagen2").attr("src", "img/bano2.jpg");
              $("#imagen3").attr("src", "img/bano3.jpg");
              $("#imagen4").attr("src", "img/bano4.jpg");


              //$("#Aimg5").attr("data-tipo", "patio");
        }

        if(tipo_proyecto == "dormitorio"){

              $("#Aimg1").attr("href", "img/dormitorio1.jpg");
              $("#Aimg2").attr("href", "img/dormitorio2.jpg");
              $("#Aimg3").attr("href", "img/dormitorio3.jpg");
              $("#Aimg4").attr("href", "img/dormitorio4.jpg");

              $("#imagen1").attr("src", "img/dormitorio1.jpg");
              $("#imagen2").attr("src", "img/dormitorio2.jpg");
              $("#imagen3").attr("src", "img/dormitorio3.jpg");
              $("#imagen4").attr("src", "img/dormitorio4.jpg");


              //$("#Aimg5").attr("data-tipo", "patio");
        }

        if(tipo_proyecto == "cocina"){

              $("#Aimg1").attr("href", "img/cocina1.jpg");
              $("#Aimg2").attr("href", "img/cocina2.jpg");
              $("#Aimg3").attr("href", "img/cocina3.jpg");
              $("#Aimg4").attr("href", "img/cocina4.jpg");

              $("#imagen1").attr("src", "img/cocina1.jpg");
              $("#imagen2").attr("src", "img/cocina2.jpg");
              $("#imagen3").attr("src", "img/cocina3.jpg");
              $("#imagen4").attr("src", "img/cocina4.jpg");


              //$("#Aimg5").attr("data-tipo", "patio");
        }                                





      $("#imagen1").css(estiloImg);
      $("#imagen2").css(estiloImg);
      $("#imagen3").css(estiloImg);
      $("#imagen4").css(estiloImg);

      $("#imagen1").on("click", ponerticket1);
      $("#imagen2").on("click", ponerticket2);
      $("#imagen3").on("click", ponerticket3);
      $("#imagen4").on("click", ponerticket4);

      $("#btn_aceptar").on("click", mostrarMenuDecorar);

}

function ponerticket1(){
$("#ticket2").css("visibility", "hidden");
$("#ticket3").css("visibility", "hidden");
$("#ticket4").css("visibility", "hidden");
 $("#ticket1").css("visibility", "visible");
 imagenAMenu = "1"

}

function ponerticket2(){
 $("#ticket1").css("visibility", "hidden");
$("#ticket3").css("visibility", "hidden");
$("#ticket4").css("visibility", "hidden");
 $("#ticket2").css("visibility", "visible");
 imagenAMenu = "2"

}

function ponerticket3(){

  $("#ticket2").css("visibility", "hidden");
$("#ticket1").css("visibility", "hidden");
$("#ticket4").css("visibility", "hidden");
    
 $("#ticket3").css("visibility", "visible");
 imagenAMenu = "3"

}

function ponerticket4(){
  $("#ticket2").css("visibility", "hidden");
$("#ticket3").css("visibility", "hidden");
$("#ticket1").css("visibility", "hidden");
    
 $("#ticket4").css("visibility", "visible");
 imagenAMenu = "4"

}

function mostrarMenuDecorar(){

  if (imagenAMenu != "undefined"){

   var hrefImagen = "img/"+tipo_proyecto + imagenAMenu+".jpg";
   imagenALaBD = hrefImagen;

      xhReq.open("GET", "decorar/menu_decorar.html", false);
      xhReq.send(null);
      document.getElementById("body").innerHTML=xhReq.responseText;
        verificarTiposDeSuperficie();
      /*ver los tipos de proyectos*/
      

      $("#imagenDecorar").attr("src", hrefImagen);
      $("#derecha_decorar").on("click", function(){

        clickFlechaDerechaDecorar("otro");

      });
  
      
  }
  else{
    shortToast("Debes Seleccionar Una Imagén");
    alert("Debes seleccionar una imagen");

  }

}

function subrayarImagen(){
  
  $(".imagenHerramienta img").css("border-bottom", "none");
  $(this).css("border-bottom", "6px solid #197D9B");
  idCeramicaClickeada = $(this).attr("id");

}

function subrayarCirculoColor(){

  $("#scrollColores .color").css("border", "none");
  $(this).css("border", "3px solid white");
  idColorCirculoClickeado = $(this).attr("id");
}


function clickFlechaDerechaDecorar(origen){

   if (origen == "lista"){
             

            xhReq.open("GET", "esqueleto.html", false);
            xhReq.send(null);
            document.getElementById("body").innerHTML=xhReq.responseText;
            menuOpciones();

            xhReq.open("GET", "complementacion/accederProyecto.html", false);
            xhReq.send(null);
            document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
            obtenerNombreFotografiaDB();

            $("#cuadroResultados").css("display", "none");
            $("#cuadroResultados2").css("display", "block");

            $("#btn_decorar3").on("click", elegirImagenDecorar);
            $("#btn_calculo_material3").on("click", calculosHerramientas);
            $("#btn_presupuesto3").on("click", presupuestoMaterial);
            //$("#simple").css("margin-top", "0%");
            //$("h1.complementaProyecto").css("top", "88%");
            //$("#imgEscogidaAnt").attr("src", imagenALaBD);
            //$(".tituloProyecto").text(primeraLetraMayuscula(nombreProyecto));
            //$(".tituloProyecto").css("margin-top", "14%");

    }
    else{
          if(!idCeramicaClickeada == 0 || !idColorCirculoClickeado == 0){

          //var idAlfombraClickeada = 0;
          //var idLadrilloClickeado
          ingresarHerramientasAlProyectoBD();

            xhReq.open("GET", "esqueleto.html", false);
            xhReq.send(null);
            document.getElementById("body").innerHTML=xhReq.responseText;
            menuOpciones();

            xhReq.open("GET", "complementacion/accederProyecto.html", false);
            xhReq.send(null);
            document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

            $("#cuadroResultados").css("display", "none");
            $("#cuadroResultados2").css("display", "block");
            //$("#simple").css("margin-top", "0%");
            //$("h1.complementaProyecto").css("top", "88%");
            $("#imgEscogidaAnt").attr("src", imagenALaBD);
            $(".tituloProyecto").text(primeraLetraMayuscula(nombreProyecto));
            $("#btn_decorar3").on("click", elegirImagenDecorar);
            $("#btn_calculo_material3").on("click", calculosHerramientas);
            $("#btn_presupuesto3").on("click", presupuestoMaterial);
            //$(".tituloProyecto").css("margin-top", "14%");




        }
        else{
          shortToast("Debes Seleccionar Una Herramienta");
        }

    

    }

 }

function alertaRendimientos(){
        $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
        $('#mask').fadeTo("fast", 1);
      //un alert
      alertify.alert("<b>Importante:</b> Clickea En Editar Para Ingresar Los rendimientos De Las Herramientas", function () {
            //aqui introducimos lo que haremos tras cerrar la alerta.
            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
            $("#mask").css("display", "none");

      });
}





function calculosHerramientas(){

      xhReq.open("GET", "resultados/resultados.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      //alertaRendimientos();
      showAlert();
      obtenerIdHerramientasClickeadasDB();
      //ya estan disponibles el id de las herramientas clickeadas



     $("#imgMiniMenu").on("click", function(){

      $(".editarAnchoLargo").css("display", "block");
      $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
      $('#mask').fadeTo("fast", 1);
      $(".editarAnchoGeneral").on("click", editarAnchoGeneral);
      $(".editarLargoGeneral").on("click", editarLargoGeneral);

     });
    /*Ceramicas*/    
    $("#labelEditarCeramica").on("click", function(){
        
        $(".flotanteCeramicas").css("display", "block");
        //transition effect      
        $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
        $('#mask').fadeTo("fast", 1);
        
        $(".msgRendimientoCeramica").on("click", ingresarRendimientoCeramica);
        //$(".editarAnchoCeramica").on("click", modificarAnchoCeramica);
        //$(".editarLargoCeramica").on("click", modificarLargoCeramica);
        quitarCapa = true;
     

    });


    $("#imgGuardarDatos").on("click", ActualizarDatosCeramicaDB);
    $("#imgGuardarDatosPinturas").on("click", ActualizarDatosPinturasDB);
    $("#labelDetallesCeramica").on("click", detallesCeramica);

    /*Pinturas*/

    $("#labelEditarPintura").on("click", function(){

      $(".flotantePinturas").css("display", "block");
        //transition effect      
        $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
        $('#mask').fadeTo("fast", 1);
        quitarCapa = true;
        $(".msgRendimientoPintura").on("click", ingresarRendimientoPintura);

    });





}

function ingresarRendimientoCeramica(){
   
   $(".flotanteCeramicas").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptRendimientoCajaCeramica();






}

function ingresarRendimientoPintura(){

   $(".flotantePinturas").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptRendimientoPintura();

}

function editarAnchoGeneral(){
   $(".editarAnchoLargo").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEditarAnchoGeneral();

}

function editarLargoGeneral(){
   $(".editarAnchoLargo").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEditarLargoGeneral();

}

function modificarAnchoCeramica(){
    $(".flotanteCeramicas").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptAnchoCajaCeramica();

}

function modificarLargoCeramica(){

   $(".flotanteCeramicas").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptLargoCajaCeramica();

}


function RealizarCalculosCeramicas(rendimiento, ancho, largo){

       //capturamos los datos del usuario
     var superficie = ancho * largo;
     var superficieTotal = superficie * 1.05;
     $("#superficieTotalCeramicaResultado").text(Math.round(superficieTotal)+ " m2");
     $("#anchoCeramicaresultado").text(ancho+" m2");
     $("#largoCeramicaresultado").text(largo+" m2");
     $("#rendimientoCeramicaresultado").text(rendimiento+ " m2");

     var totalCajas = Math.round(superficieTotal / rendimiento);
     //totalCajas = Math.round(totalCajas * 100) / 100;
     $("#cajasCeramicaresultado").text(totalCajas+" caja(s)");
     var frague = Math.round(superficieTotal * 4);
     $("#fragueCeramicaresultado").text(frague+" kg");
     var pegamento = Math.round(superficieTotal * 3);
     $("#pegamentoCeramicaresultado").text(pegamento+ " kg");

}


 function calculoLitrosPintura(rendimiento, ancho, largo){
       //capturamos los datos del usuario




     var superficie = ancho * largo;
     var superficieTotal = Math.round(superficie * 1.05);
     var totalLitros = Math.round(superficieTotal / rendimiento);

     $("#anchoPinturaresultado").text(ancho+" m2");
     $("#largoPinturaresultado").text(largo+" m2");
     $("#superficieTotalPinturaResultado").text(superficieTotal+" m2");
     if(!rendimiento == 0){
      $("#RendimientoPinturaresultado").text(rendimiento+" m2");
      $("#totalPinturaresultado").text(totalLitros+" lt");
     }


 }   

function promptRendimientoCajaCeramica(){

       navigator.notification.prompt(
        'Ingrese rendimiento de caja ',  // message
        onPrompt,                  // callback to invoke
        'Rendimiento Caja',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );
   

}

function promptEditarAnchoGeneral(){

         navigator.notification.prompt(
        'Ingrese ancho superficie ',  // message
        onPromptAnchoGeneral,                  // callback to invoke
        'Ancho Superficie m2',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

}

function promptEditarLargoGeneral(){
    navigator.notification.prompt(
        'Ingrese ancho superficie ',  // message
        onPromptLargoGeneral,                  // callback to invoke
        'Ancho Superficie m2',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

}


function promptRendimientoPintura(){
       navigator.notification.prompt(
        'Ingrese rendimiento de pintura ',  // message
        onPromptPintura,                  // callback to invoke
        'Rendimiento Pintura',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );


}

function promptAnchoCajaCeramica(){

       navigator.notification.prompt(
        'Ingrese ancho superficie ',  // message
        onPromptAncho,                  // callback to invoke
        'Ancho Superficie m2',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );
   

}

function promptLargoCajaCeramica(){

       navigator.notification.prompt(
        'Ingrese largo superficie ',  // message
        onPromptLargo,                  // callback to invoke
        'Largo Superficie m2',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

}

  function onPrompt(results) {
    //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    
    //1 hizo click en ok
    

    if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          var widthh = $("#anchoCeramicaresultado").text();
          widthh = parseFloat(widthh);

          var heightt = $("#largoCeramicaresultado").text();
          heightt = parseFloat(heightt);


          
          RealizarCalculosCeramicas(parseFloat(results.input1), widthh, heightt);
          return true;
           



        }
        else{
           //alert("short");
          shortToast("Ingrese números correctos");
          return false;
        }
               
    }else{

      return false;

    }
}

function onPromptAnchoGeneral(results){
   if(results.buttonIndex == 1){
     if(!results.input1 == ""  && !isNaN(results.input1)){
       
         if(idCeramicaClickeada != 0){
          //var widthh = $("#anchoCeramicaresultado").text();
          //widthh = parseFloat(widthh);
          var ren = $("#rendimientoCeramicaresultado").text();
          ren = parseFloat(ren);

          var heightt = $("#largoCeramicaresultado").text();
          heightt = parseFloat(heightt);

         }
         else if(idColorCirculoClickeado != 0){

          //var widthh = $("#anchoPinturaresultado").text();
          //widthh = parseFloat(widthh);
          var ren = $("#rendimientoPinturaresultado").text();
          ren = parseFloat(ren);

          var heightt = $("#largoPinturaresultado").text();
          heightt = parseFloat(heightt);

         }
         else if(idLadrilloClickeado !=0){

         }
         else if(idAlfombraClickeada !=0){

         }


         if(idCeramicaClickeada != 0){

          RealizarCalculosCeramicas(ren, results.input1, heightt);

         }

         if(idColorCirculoClickeado !=0){
          calculoLitrosPintura(ren, results.input1, heightt);

         }
         if(idLadrilloClickeado !=0){

         }
         if(idAlfombraClickeada !=0){

         }

     }else{
      shortToast("Ingrese números correctos");
     }

   }else{
    return false;
   }

}

function onPromptLargoGeneral(results){
   if(results.buttonIndex == 1){
     if(!results.input1 == ""  && !isNaN(results.input1)){
       
         if(idCeramicaClickeada != 0){
          var widthh = $("#anchoCeramicaresultado").text();
          widthh = parseFloat(widthh);
          var ren = $("#rendimientoCeramicaresultado").text();
          ren = parseFloat(ren);

          //var heightt = $("#largoCeramicaresultado").text();
          //heightt = parseFloat(heightt);

         }
         else if(idColorCirculoClickeado != 0){

          var widthh = $("#anchoPinturaresultado").text();
          widthh = parseFloat(widthh);
          var ren = $("#rendimientoPinturaresultado").text();
          ren = parseFloat(ren);

          //var heightt = $("#largoPinturaresultado").text();
          //heightt = parseFloat(heightt);

         }
         else if(idLadrilloClickeado !=0){

         }
         else if(idAlfombraClickeada !=0){

         }


         if(idCeramicaClickeada != 0){

          RealizarCalculosCeramicas(ren, widthh, results.input1);

         }

         if(idColorCirculoClickeado !=0){
          calculoLitrosPintura(ren, widthh, results.input1);

         }
         if(idLadrilloClickeado !=0){

         }
         if(idAlfombraClickeada !=0){

         }

     }else{
      shortToast("Ingrese números correctos");
     }

   }else{
    return false;
   }

}


function onPromptPintura(results){
      if(results.buttonIndex == 1){

        if(!results.input1 == ""  && !isNaN(results.input1)){
          var widthh = $("#anchoPinturaresultado").text();
          widthh = parseFloat(widthh);

          var heightt = $("#largoPinturaresultado").text();
          heightt = parseFloat(heightt);
          calculoLitrosPintura(results.input1, widthh, heightt);
          return true;


            

        }else{
          shortToast("Ingrese números correctos");
          return false;
        }

      }else{
        return false;
      }


}


function onPromptAncho(results){

      if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          var ren = $("#rendimientoCeramicaresultado").text();
          ren = parseFloat(ren);

          var heightt = $("#largoCeramicaresultado").text();
          heightt = parseFloat(heightt);

          RealizarCalculosCeramicas(ren, parseFloat(results.input1), heightt);
          return true;
           



        }
        else{
           //alert("short");
          shortToast("Ingrese números correctos");
          return false;
        }
               
    }else{

      return false;

    }

}


function onPromptLargo(results){

        if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          var ren = $("#rendimientoCeramicaresultado").text();
          ren = parseFloat(ren);

          var widthh = $("#anchoCeramicaresultado").text();
          widthh = parseFloat(widthh);

          RealizarCalculosCeramicas(ren, widthh, parseFloat(results.input1));
          return true;
           



        }
        else{
           //alert("short");
          shortToast("Ingrese números correctos");
          return false;
        }
               
    }else{

      return false;

    }

}


        function alertDismissed() {
            // do something
        }

    // Show a custom alertDismissed
    //
    function showAlert() {
        navigator.notification.alert(
            'Ingresa el rendimiento de las herramientas faltantes.',  // message
            alertDismissed,         // callback
            'Importante',            // title
            'OK'                  // buttonName
        );
    }

    function detallesCeramica(){
      xhReq.open("GET", "tabla_ceramica/tabla_ceramica.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      verCeramicaBD();

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

function primeraLetraMayuscula(s) { 
  return s[0].toUpperCase() + s.slice(1);
   }


function presupuestoMaterial(){

        xhReq.open("GET", "presupuesto/presupuestos.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

}

function resetarEventos(){
   $(".editarAnchoCeramica").unbind("click", modificarAnchoCeramica);
   $(".msgRendimientoCeramica").unbind("click", ingresarRendimientoCeramica);
   $(".editarLargoCeramica").unbind("click", modificarLargoCeramica);
   $(".msgRendimientoPintura").unbind("click", ingresarRendimientoPintura);
   $(".editarAnchoGeneral").unbind("click", editarAnchoGeneral);
   $(".editarLargoGeneral").unbind("click", editarLargoGeneral);
   //$("#imgGuardarDatos").unbind("click", ActualizarDatosCeramicaDB);

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