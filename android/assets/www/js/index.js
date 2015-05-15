// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;
var ceramica = false;
var ladrillo = false;
var pintura = false;
var alfombra = false;
var toolstip = false;
var ceramica_bool = false;
var pintura_bool = false;
var id_eliminar_py = 0; 
var alfombra_bool = false;
var ladrillo_bool = false;
var OpcionesMenu = false;
var zindex= true;
var accederProyecto_bool = false;
var contador= 0;
var ancho_py, largo_py;
var imagenALaBD = "jiji";
var idCeramicaClickeada = 0;
var idColorCirculoClickeado = 0;
var idAlfombraClickeada = 0;
var idLadrilloClickeado = 0;
var tipo_proyecto;
var tipo_superficie;
var nombreProyecto;
var xhReq = new XMLHttpRequest();
var pictureSource,destinationType;
var imagen = null;
var imagenCeramicaEscogida;
var key = "estado";
var key2 = "guardado";
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
var total_cajas_presupuesto = 0;
var total_litros_presupuesto = 0;
var total_cajas_pisos_presupuesto = 0;
var total_ladrillos_presupuesto = 0;
var total_frague_presupuesto = 0;
var total_pegamento_presupuesto = 0;
var total_cal_ladrillo_presupuesto = 0;
var total_cemento_ladrillo_presupuesto = 0;
var total_arena_ladrillo_presupuesto = 0;
var total_espuma_niveladora_presupuesto = 0;
var total_super_total = 0;
var sacosCal = 0;
var sacosArena = 0;
var sacosCemento = 0;
var precioLadrillo = 0;
var labelDetallesPresupuesto = false;
var sacosPegamentoPres = 0;
var kgDeFraguePres = 0;
var precioCajaCeramicaPres = 0
var totalCajasCeramicaPres = 0;
var precioPisosPress = 0;
var galonesPress = 0;
var totalPresupuesto = 0;
var totalPresupuestoCeramica = 0;
var totalPresupuestoLadrillos = 0;
var totalPresupuestoPisos = 0;
var totalPresupuestoPinturas = 0;
//EN DUDA

var fotografiaComplementar = ""; 
var superficieTotalComplementar, totalCajasComplementar;

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos

$(document).on('ready', main);


function loaded(){
  myScroll = new IScroll('contenidoCuerpo',{checkDOMChanges:true});
}

//document.addEventListener("DOMContentLoaded",loaded);
// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    document.addEventListener("deviceready",onDeviceReady,false);
    //storage = window.localStorage;
  }


  function onBackKeyDown(){

    
       salirApp = false;
       if(salirApp){
        navigator.app.exitApp();
       }
       else if(quitarCapa){
         $(".flotante").hide("slow");
         $("#mask").css("display", "none");
         quitarCapa = false;
            
       }
       else if(accederProyecto_bool){

       }
       else if(labelDetallesPresupuesto){
        labelDetallesPresupuestoLadrillos = false;
        presupuestoMaterial();

       }
       else if(sacarPresupuestaGrande){
        verPresupuestoTotalGrande();
        sacarPresupuestaGrande = false;
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
    document.addEventListener("backbutton", onBackKeyDown, false);
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
           var tabla_ceramicas = "CREATE TABLE IF NOT EXISTS ceramicas( id_ceramicas INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rendimiento_caja FLOAT, modelo TEXT, marca TEXT, color TEXT, uso TEXT, formato TEXT, precio INTEGER, lugar TEXT)";                                                                                                                                                                                                                                                                                                                                                                                                                                         //anchoLadrillo, largoLadrillo, espesor, ladrillosEnUnM2, total_ladrillos;;;                             
           var tabla_proyecto = "CREATE TABLE IF NOT EXISTS proyecto( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo FLOAT, ancho FLOAT, superficie_total FLOAT, total_cajas FLOAT, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, id_alfombras, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, nombre_proyecto TEXT, tipo_proyecto TEXT, precio_frague INTEGER, precio_pegamento INTEGER, total_frague INTEGER, total_pegamento INTEGER, rendimiento_caja FLOAT, rendimiento_pintura FLOAT, anchoLadrillo FLOAT, largoLadrillo FLOAT, espesorLadrillo FLOAT, ladrillosEnUnM2 INTEGER, total_cajas_pisos INTEGER, rendimiento_caja_pisos FLOAT, cal_ladrillo FLOAT, arena_ladrillo FLOAT, cemento_ladrillo FLOAT, espuma_niveladora FLOAT, precio_total_ceramica INTEGER, precio_total_pintura INTEGER, precio_total_ladrillo INTEGER, precio_total_pisos INTEGER, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
           var tabla_pinturas = "CREATE TABLE IF NOT EXISTS pintura (id_pintura INTEGER PRIMARY KEY AUTOINCREMENT, nombre_color TEXT, codigo TEXT, rgba_color TEXT)";
           var tabla_ladrillos = "CREATE TABLE IF NOT EXISTS ladrillo(id_ladrillos INTEGER PRIMARY KEY, imagen TEXT, modelo TEXT, observacion TEXT, caracteristica TEXT, precio INTEGER, lugar TEXT, color TEXT)";
           var tabla_pisos = "CREATE TABLE IF NOT EXISTS pisos(id_pisos INTEGER PRIMARY KEY, imagen TEXT, precio INTEGER, rendimiento_caja FLOAT, lugar TEXT, espesor INTEGER, marca TEXT, modelo TEXT)";
           tx.executeSql(tabla_tipo_proyecto);
           tx.executeSql(tabla_ceramicas);
           tx.executeSql(tabla_proyecto);
           tx.executeSql(tabla_pinturas);
           tx.executeSql(tabla_ladrillos);
           tx.executeSql(tabla_pisos);


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

              /*Ladrillos*/

              var execute = "INSERT INTO ladrillo VALUES(1, 'img/fiscal.jpg', 'Fiscal', 'Debe instalarse muy mojados', 'Gran resistencia', 134, 'Sodimac', 'Arcilla')";
              tx.executeSql(execute);
              var execute = "INSERT INTO ladrillo VALUES(2, 'img/princesa.jpg', 'Princesa', '#NA', '#NA', 300, 'Sodimac', 'Arcilla')";
              tx.executeSql(execute);
              var execute = "INSERT INTO ladrillo VALUES(3, 'img/lunge.jpg', 'Lunge', 'Para instalar se debe usar Mortero Refractario', 'Refracta el calor sin quebrarse', 5490, 'Sodimac', 'Arcilla')";
              tx.executeSql(execute);

              /*Pisos*/

              var execute = "INSERT INTO pisos VALUES(1, 'img/pisos/1.jpg', 4490, 2.397, 'Sodimac', 7, 'Holztek', 'Roble Claro')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(2, 'img/pisos/2.jpg', 7990, 1.985, 'Sodimac', 8, 'Holztek', 'Cerezo Doussier')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(3, 'img/pisos/3.jpg', 3690, 2.921, 'Sodimac', 6, 'Holztek', 'Promo Nogal')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(4, 'img/pisos/4.jpg', 7990, 2.13, 'Sodimac', 8, 'Holztek', 'Promo Cerezo')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(5, 'img/pisos/5.jpg', 8092, 1.77, 'Sodimac', 8, 'Decotec', 'Grapefruit')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(6, 'img/pisos/6.jpg', 4290, 2.527, 'Sodimac', 8, 'Holztek', 'Verdon')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(7, 'img/pisos/7.jpg', 5990, 2.48, 'Sodimac', 7, 'Holztek', 'Kempas')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(8, 'img/pisos/8.jpg', 8990, 1.984, 'Sodimac', 8, 'Holztek', 'Garrison')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(9, 'img/pisos/9.jpg', 7990, 2.405, 'Sodimac', 8, 'Holztek', 'Oak Crowne Sincroniz')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(10, 'img/pisos/10.jpg', 5990, 1.996, 'Sodimac', 8, 'Holztek', 'Raw Steel')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(11, 'img/pisos/11.jpg', 9990, 2.131, 'Sodimac', 8, 'Holztek', 'Veranda')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(12, 'img/pisos/12.jpg', 11990, 2.405, 'Sodimac', 8, 'Holztek', 'Oak River')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(13, 'img/pisos/13.jpg', 6990, 1.996, 'Sodimac', 8, 'Classen', 'Cerezo')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(14, 'img/pisos/14.jpg', 8990, 2.13, 'Sodimac', 8, 'Etersol', 'Munchen Rustik Castaño')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(15, 'img/pisos/15.jpg', 9990, 2.034, 'Sodimac', 8, 'Klipen', 'Frankfurt Oak XL')";
              tx.executeSql(execute);
              var execute = "INSERT INTO pisos VALUES(16, 'img/pisos/16.jpg', 8092, 1.77, 'Sodimac', 8, 'Decotec', 'Black Walnut')";
              tx.executeSql(execute);





            





              storage.setItem(key,"ingresado");

           }
        
           
           //var execute2 = "INSERT INTO proyecto VALUES(null,1,'29-10-2014','foto')";
           
           //tx.executeSql(execute2);


         }

         function obtenerModeloLadrillo(id){

              if(id == 1){
                 return "Fiscal";

              }
              else if(id ==2){
                return "Princesa";

              }
              else if(id == 3){

                return "Lunge";

              }
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

         function ActualizarDatosPisosDB(){
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(queryActualizarDatosPisosDB, errorQueryDB);

         }

         function ActualizarDatosPinturasDB(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(queryActualizarDatosPinturasDB, errorQueryDB);

         }

         function ActualizarDatosLadrillosDB(){
          //queryActualizarDatosLadrillosDB
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              
              db.transaction(queryActualizarDatosLadrillosDB, errorQueryDB);
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

         function obtenerIdHerramientasClickeadasParaPresupuestoDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryObtenerIdHerramientasClickeadasPresupuesto, errorComplementarDBQueryDB);



         }

         function realizarCalculoCeramicasDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryRealizarCalculosCeramicasDB, errorComplementarDBQueryDB);


         }


         function realizarCalculoPrecioCeramicasDB(){

          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryRealizarCalculosPreciosCeramicasDB, errorComplementarDBQueryDB);

         }

         function realizarCalculoPrecioPisoDB(){

          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryRealizarCalculosPreciosPisoDB, errorComplementarDBQueryDB);

         }

         function realizarCalculoPrecioLadrilloDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryRealizarCalculosPreciosLadrillosDB, errorComplementarDBQueryDB);

         }

         function realizarCalculoPisosDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
           db.transaction(queryRealizarCalculosPisosDB, errorComplementarDBQueryDB);

         }

         function seleccionarTodosLosProyectosDB(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta para listar proyectos en la opcion presupuestos
           db.transaction(querySeleccionarTodosLosProyectosDB, errorComplementarDBQueryDB);

         }

         function querySeleccionarTodosLosProyectosDB(tx){

          var consulta = "SELECT * FROM proyecto";
          tx.executeSql(consulta,[],SuccesQuerySeleccionarTodosLosProyectosDB, consultaComplementarError);

         }

         function queryObtenerIdHerramientasClickeadas(tx){
          var consulta = "SELECT id_ceramicas, id_pinturas, id_alfombras, id_ladrillos, ancho, largo, rendimiento_pintura, anchoLadrillo, largoLadrillo, espesorLadrillo, total_ladrillos, ladrillosEnUnM2 FROM proyecto WHERE id_proyecto ="+idComplementar;
          tx.executeSql(consulta,[],SuccesQueryObtenerIdHerramientasClickeadas, consultaComplementarError);

         }

         function queryObtenerIdHerramientasClickeadasPresupuesto(tx){
           //"(id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo FLOAT, ancho FLOAT, superficie_total FLOAT, total_cajas FLOAT, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, id_alfombras, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, nombre_proyecto TEXT, tipo_proyecto TEXT, precio_frague INTEGER, precio_pegamento INTEGER, total_frague INTEGER, total_pegamento INTEGER, rendimiento_caja FLOAT, rendimiento_pintura FLOAT, anchoLadrillo FLOAT, largoLadrillo FLOAT, espesorLadrillo FLOAT, ladrillosEnUnM2 INTEGER, total_cajas_pisos INTEGER, rendimiento_caja_pisos FLOAT, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";

          var consulta = "SELECT id_ceramicas, id_pinturas, id_alfombras, id_ladrillos, total_cajas, total_litros, total_ladrillos, total_pegamento, total_frague, total_cajas_pisos, cal_ladrillo, arena_ladrillo, cemento_ladrillo, superficie_total, espuma_niveladora FROM proyecto WHERE id_proyecto ="+idComplementar;
          tx.executeSql(consulta,[],SuccesQueryObtenerIdHerramientasClickeadasPresupuesto, consultaComplementarError);

         }

         function queryRealizarCalculosCeramicasDB(tx){
            

             var consulta = "SELECT rendimiento_caja, precio FROM ceramicas WHERE id_ceramicas ="+idCeramicaClickeada;
             tx.executeSql(consulta,[],SuccesQueryRealizarCalulos, consultaComplementarError);

         }

         function queryRealizarCalculosPreciosPisoDB(tx){

             var consulta = "SELECT precio FROM pisos WHERE id_pisos ="+idAlfombraClickeada;
             tx.executeSql(consulta,[],SuccesQueryRealizarCalulosPrecioPisos, consultaComplementarError);

         }

         function queryRealizarCalculosPreciosCeramicasDB(tx){
             
             var consulta = "SELECT precio FROM ceramicas WHERE id_ceramicas ="+idCeramicaClickeada;
             tx.executeSql(consulta,[],SuccesQueryRealizarCalulosPrecio, consultaComplementarError);

         }

         function queryRealizarCalculosPreciosLadrillosDB(tx){

             var consulta = "SELECT precio, modelo FROM ladrillo WHERE id_ladrillos ="+idLadrilloClickeado;
             tx.executeSql(consulta,[],SuccesQueryRealizarCalulosPrecioLadrillo, consultaComplementarError);

         }

         function queryRealizarCalculosPisosDB(tx){
             var consulta = "SELECT rendimiento_caja, precio FROM pisos WHERE id_pisos ="+idAlfombraClickeada;
             tx.executeSql(consulta,[],SuccesQueryRealizarCalulosPisos, consultaComplementarError);

         }


         function SuccesQueryObtenerIdHerramientasClickeadasPresupuesto(tx, results){
               navigator.notification.activityStart("Please Wait", "Its loading.....");
               for (var i = 0; i < results.rows.length ; i++) {
                

                 var item = results.rows.item(i);
                 //total_cajas, total_litros, total_ladrillos, total_pegamento, total_frague, total_cajas_pisos
                 total_cajas_presupuesto = item.total_cajas;
                 total_cajas_pisos_presupuesto = item.total_cajas_pisos;
                 total_litros_presupuesto = item.total_litros;
                 total_ladrillos_presupuesto = item.total_ladrillos;
                 total_frague_presupuesto = item.total_frague;
                 total_pegamento_presupuesto = item.total_pegamento;
                 total_cal_ladrillo_presupuesto = item.cal_ladrillo;
                 total_cemento_ladrillo_presupuesto = item.cemento_ladrillo;
                 total_arena_ladrillo_presupuesto = item.arena_ladrillo;
                 total_super_total = item.superficie_total;
                 total_espuma_niveladora_presupuesto = item.espuma_niveladora;



                 idCeramicaClickeada = item.id_ceramicas;
                 idColorCirculoClickeado = item.id_pinturas;
                 idLadrilloClickeado = item.id_ladrillos;
                 idAlfombraClickeada = item.id_alfombras;
               }

               if(idCeramicaClickeada  == 0){
                  //No mostrar el cuadro de ceramicas
                  $("#simple").css("display", "none");


               }
               else{
                realizarCalculoPrecioCeramicasDB();

               }

               if(idColorCirculoClickeado  == 0){
                  //no mostrar el cuadro de pinturas
                  $("#simple2Resultados").css("display", "none");
                  
               }else{
                  //calculoLitrosPintura(rendimiento_pintura, ancho_py, largo_py);
                  //Resetear IdColorCirculoClickeado
                  realizarCalculoPrecioPintura();
               }

               if(idLadrilloClickeado == 0){
                  //no mostrar el cuadro de ladrillo
                  $("#simple3Resultados").css("display", "none");
               }
               else{
                   realizarCalculoPrecioLadrilloDB();

               }

               if(idAlfombraClickeada == 0){
                  //no mostrar el cuadro de alfombra
                  $("#simple4Resultados").css("display", "none");
               }
               else{
                realizarCalculoPrecioPisoDB()
                //realizarCalculoPisosDB();
                //Resetear IdAlfombraClickeada

               }

               navigator.notification.activityStop();

         }

         function SuccesQueryObtenerIdHerramientasClickeadas(tx, results){

               for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var rendimiento_pintura = item.rendimiento_pintura;
                 var anchoLadrillo = item.anchoLadrillo;
                 var largoLadrillo = item.largoLadrillo;
                 var espesor = item.espesorLadrillo;
                 var totalLadrillos = item.total_ladrillos;
                 var ladrillosEnUnM2 = item.ladrillosEnUnM2

                 idCeramicaClickeada = item.id_ceramicas;
                 idColorCirculoClickeado = item.id_pinturas;
                 idLadrilloClickeado = item.id_ladrillos;
                 idAlfombraClickeada = item.id_alfombras;
                 ancho_py = item.ancho;
                 largo_py = item.largo;
               }
               
               

               if(idCeramicaClickeada  == 0){
                  //No mostrar el cuadro de ceramicas
                  $("#simple").css("display", "none");

               }
               else{
                realizarCalculoCeramicasDB();

               }

               if(idColorCirculoClickeado  == 0){
                  //no mostrar el cuadro de pinturas
                  $("#simple2Resultados").css("display", "none");
                  
               }else{
                  calculoLitrosPintura(rendimiento_pintura, ancho_py, largo_py);
               }

               if(idLadrilloClickeado == 0){
                  //no mostrar el cuadro de ladrillo
                  $("#simple3Resultados").css("display", "none");
               }
               else{
                $("#largoLadrilloresultado").text(largo_py+ " m2");
                $("#anchoLadrilloresultado").text(ancho_py+" m2");
                $("#superficieTotalLadrilloResultado").text(Math.round(largo_py * ancho_py)+ " m2");
                var title = obtenerModeloLadrillo(idLadrilloClickeado);
                $(".tituloResultadoLadrillo").text("Ladrillo "+title);
                anchoLadrillo = parseFloat(anchoLadrillo);
                largoLadrillo = parseFloat(largoLadrillo);
                if(anchoLadrillo != 0 || largoLadrillo != 0){
                realizarCalculosLadrillos(anchoLadrillo,largoLadrillo,espesor);//ancho, largo, espesor
                }


               }

               if(idAlfombraClickeada == 0){
                  //no mostrar el cuadro de alfombra
                  $("#simple4Resultados").css("display", "none");
               }
               else{
                realizarCalculoPisosDB();

               }



         }

         

         function SuccesQueryRealizarCalulos(tx,results){
          for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var rendimiento = item.rendimiento_caja;
                 var precio = item.precio;
                 
               }

               //idCeramicaClickeada = 0;
               RealizarCalculosCeramicas(rendimiento, ancho_py, largo_py);

         }


         function SuccesQueryRealizarCalulosPrecioPisos(tx, results){

          for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 var precio = item.precio;
                 
               }

               //idCeramicaClickeada = 0;
               RealizarCalculosPrecioPisos(precio);

         }


         function SuccesQueryRealizarCalulosPrecio(tx, results){

          for (var i = 0; i < results.rows.length ; i++) {
                 var item = results.rows.item(i);
                 var precio = item.precio;
                 
               }

               //idCeramicaClickeada = 0;
               RealizarCalculosPrecioCeramicas(precio);

         }


         function SuccesQueryRealizarCalulosPrecioLadrillo(tx, results){

          for (var i = 0; i < results.rows.length ; i++) {
                 var item = results.rows.item(i);
                 var precio = item.precio;
                 var modelo = item.modelo;
                 
               }

               //idLadrilloClickeado = 0;
               RealizarCalculosPrecioLadrillos(precio,modelo);

         }

         function SuccesQueryRealizarCalulosPisos(tx, results){
          for (var i = 0; i < results.rows.length ; i++) {
                 var item = results.rows.item(i);
                 var rendimiento = item.rendimiento_caja;
                 var precio = item.precio;
                 
               }

                //idAlfombraClickeada = 0;
               RealizarCalculosPisos(rendimiento, ancho_py, largo_py);

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
                                 $("#btn_lugar_de_compra2").on("click", function(){
                                  shortToast("Debes decorar la imagén primero.");

                                 });



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


         function SuccesQuerySeleccionarTodosLosProyectosDB(tx, results){
            var filas = results.rows.length;
            if(filas <=0){

            }else{
               var total = 0;
                    for (var i = 0; i < results.rows.length ; i++) {
                           
                          var item = results.rows.item(i);
                          total += total + item.precio_total;
//"id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo FLOAT, ancho FLOAT, superficie_total FLOAT, total_cajas FLOAT, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, id_alfombras, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, nombre_proyecto TEXT, tipo_proyecto TEXT, precio_frague INTEGER, precio_pegamento INTEGER, total_frague INTEGER, total_pegamento INTEGER, rendimiento_caja FLOAT, rendimiento_pintura FLOAT, anchoLadrillo FLOAT, largoLadrillo FLOAT, espesorLadrillo FLOAT, ladrillosEnUnM2 INTEGER, total_cajas_pisos INTEGER, rendimiento_caja_pisos FLOAT, cal_ladrillo FLOAT, arena_ladrillo FLOAT, cemento_ladrillo FLOAT, espuma_niveladora FLOAT, precio_total_ceramica INTEGER, precio_total_pintura INTEGER, precio_total_ladrillo INTEGER, precio_total_pisos INTEGER, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";

                          
                          $(".dl").append('<dt><a href="#accordion'+item.id_proyecto+'" aria-expanded="false" aria-controls="accordion1" class="accordion-title accordionTitle js-accordionTrigger"><span class="nombrePy">| '+retornarLasDiesPrimerasLetras(primeraLetraMayuscula(item.nombre_proyecto))+' | </span> <span class="tipoPy"> '+primeraLetraMayuscula(item.tipo_proyecto)+'  </span> <span class="fechaPy">| '+item.fecha+' |</span></a></dt><dd class="accordion-content accordionItem is-collapsed" id="accordion'+item.id_proyecto+'" aria-hidden="true"><p class="headerP">Este proyecto incluye:</p><p class="ceramicasP">Ceramicas:</p> <span class="precioC">$'+format(item.precio_total_ceramica)+'</span><br/><p class="pinturasP">Pintura:  </p> <span class="precioPP">$'+format(item.precio_total_pintura)+'</span><br/><p class="ladrillosP">Ladrillos:</p> <span class="precioL">$'+format(item.precio_total_ladrillo)+'</span><br/><p class="pisosP">Pisos:    </p> <span class="precioPi">$'+format(item.precio_total_pisos)+'</span><br/><p class="totalPy">El total de este proyecto es: </p> <span class="totalP">$'+format(item.precio_total)+'</span><br/></dd>');
                     }
                     eventoAcordeon();


                    $("#count-number").attr('data-to', total);
                    sacarPresupuestaGrande = true;


                     $("#verPresupuestoTotal").on("click", verPresupuestoTotalGrande);

            }

         }

         function verPresupuestoTotalGrande(){

                 /*if(zindex){
                  $(".accordion").css("z-index", "-1");
                  zindex = false;
                 }
                 else{
                  $(".accordion").css("z-index", "1");
                  zindex = true;

                 }*/
                  $("#mask2").toggle("fast");
                  $("#containerNumero").toggle("slow");
                  $(".accordion").toggle("slow");
                  numberEfecto();
            
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
                                 $("#lista").append('<div class="item" id="'+item.id_proyecto+'" data-tipo="'+item.tipo_proyecto+'"><div id="titulo-proyecto">'+item.nombre_proyecto+'</div><div id="descripcion-proyecto">Click para ver más detalles</div><div id="fecha-proyecto">'+item.fecha+'</div><div id="imagen-proyecto"><img src="img/ic_entrar.png"/></div></div><div class="eliminar-proyecto" data-id="'+item.id_proyecto+'"> <img src="img/img_eliminar.png"></div>');

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
                      $(".eliminar-proyecto").on("click", eliminarProyecto)

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
            //tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, superficie_total, total_cajas, precio_total, id_ceramicas) values (?,?,?,?,?,?,?,?)",[null,tipo,fecha,superficieTotal,totalCajas,0,0]);                                                                                                                                                                                                                   anchoLadrillo FLOAT, largoLadrillo FLOAT, espesorLadrillo FLOAT
            tx.executeSql("INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, largo, ancho, superficie_total, total_cajas, precio_total, id_ceramicas, id_pinturas, id_alfombras, total_litros, id_ladrillos, total_ladrillos, pintura_bool, ladrillo_bool, alfombra_bool, ceramica_bool, nombre_proyecto, tipo_proyecto, precio_frague, precio_pegamento, total_frague, total_pegamento, rendimiento_caja, rendimiento_pintura, anchoLadrillo, largoLadrillo, espesorLadrillo, ladrillosEnUnM2, total_cajas_pisos, rendimiento_caja_pisos, cal_ladrillo, arena_ladrillo, cemento_ladrillo, espuma_niveladora, precio_total_ceramica, precio_total_pintura, precio_total_ladrillo, precio_total_pisos) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[null,tipo,fecha,"#NA", largo,ancho,0,0,0,0,0,0,0,0,0,pintura, ladrillo, alfombra, ceramica, nombreProyecto, tipo_superficie,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            //var tabla_proyecto = "CREATE TABLE ( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo float, ancho float, superficie_total float, total_cajas float, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";


         }

         function eliminarProyectoDB(){
              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);
              //consulta principar para listar proyectos
              db.transaction(queryEliminarProyectoDB, errorQueryDB);

         }


         function queryEliminarProyectoDB(tx){
           var consulta = "delete from proyecto where id_proyecto ="+id_eliminar_py;
           tx.executeSql(consulta, [], consultaEliminarSucces, consultaError);

         }


         function consultaEliminarSucces(){
           pantallaPrincipal();
           verificarProyectos();

           shortToast("Eliminado correctamente");

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
            resetarBoolTipos();
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

        function guardarTotalesPresupuestoDB(){

              var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryGuardarTotalesPresupuesto, errorQueryDB);

        }




        function errorActualizarPrecioQueryDB(err){

          alert("errorActualizarPrecioQueryDB"+err.code)
        }


        function queryActualizarPrecioDB(tx){

             var consulta = "update proyecto set precio_total ="+precio+" where id_proyecto ="+idComplementar;
             tx.executeSql(consulta,[],consultaSuccesActualizarPrecioDB, errorQueryDB);


        }

        function queryGuardarTotalesPresupuesto(tx){
             var consulta = "update proyecto set precio_total ="+totalPresupuesto+", precio_total_ceramica = "+totalPresupuestoCeramica+", precio_total_pisos = "+totalPresupuestoPisos+", precio_total_ladrillo = "+totalPresupuestoLadrillos+", precio_total_pintura = "+totalPresupuestoPinturas+" where id_proyecto ="+idComplementar;
             tx.executeSql(consulta,[],consultaSuccesGuardarTotalesPresupuesto, errorQueryDB);

        }

        function consultaSuccesGuardarTotalesPresupuesto(tx, results){
          shortToast("Guardado Correctamente");
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

        function queryActualizarDatosPisosDB(tx){

          var largo_db = $("#largoPisoResultado").text();
          var largo_db_ok = largo_db.split(" ");
          largo_db = largo_db_ok[0]; 
          largo_db = parseFloat(largo_db);


          var ancho_db = $("#anchoPisoResultado").text();
          var ancho_db_ok = ancho_db.split(" ");
          ancho_db = ancho_db_ok[0];
          ancho_db = parseFloat(ancho_db);

          var superficie_db = $("#superficieTotalPisoResultado").text();
          var superficie_db_ok = superficie_db.split(" ");
          superficie_db = superficie_db_ok[0];
          superficie_db = parseFloat(superficie_db);

          var cajas_db = $("#cajasPisoResultado").text();
          var cajas_db_ok = cajas_db.split(" ");
          cajas_db = cajas_db_ok[0];
          cajas_db = parseFloat(cajas_db);

          var rendimiento_db = $("#rendimientoPisoResultado").text();
          var rendimiento_db_ok = rendimiento_db.split(" ");
          rendimiento_db = rendimiento_db_ok[0];
          rendimiento_db = parseFloat(rendimiento_db);

          var espuma_db = $("#espumaNiveladoraResultado").text();
          var espuma_db_ok = espuma_db.split(" ");
          espuma_db = espuma_db_ok[0];
          espuma_db = parseFloat(espuma_db);


          var consulta = "update proyecto set largo = "+largo_db+", ancho = "+ancho_db+", superficie_total = "+superficie_db+", total_cajas_pisos = "+cajas_db+", rendimiento_caja_pisos = "+rendimiento_db+", espuma_niveladora = "+espuma_db+" where id_proyecto ="+idComplementar;
          tx.executeSql(consulta,[],consultaSuccessActualizarPisosCeramicaDB, errorQueryDB);

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


      function queryActualizarDatosLadrillosDB(tx){

          var largo_db = $("#largoLadrilloresultado").text();
          var largo_db_ok = largo_db.split(" ");
          largo_db = largo_db_ok[0]; 
          largo_db = parseFloat(largo_db);
          


          var ancho_db = $("#anchoLadrilloresultado").text();
          var ancho_db_ok = ancho_db.split(" ");
          ancho_db = ancho_db_ok[0];
          ancho_db = parseFloat(ancho_db);

        

          var superficie_db = $("#superficieTotalLadrilloResultado").text();
          var superficie_db_ok = superficie_db.split(" ");
          superficie_db = superficie_db_ok[0];
          superficie_db = parseFloat(superficie_db);
          

          var anchoLadrillo_db = $("#anchoLadrilloLadrilloResultado").text();
          var anchoLadrillo_db_ok = anchoLadrillo_db.split(" ");
          anchoLadrillo_db = anchoLadrillo_db_ok[0];
          anchoLadrillo_db = parseFloat(anchoLadrillo_db);
          

          var largoLadrillo_db = $("#largoLadrilloLadrilloResultado").text();
          var largoLadrillo_db_ok = largoLadrillo_db.split(" ");
          largoLadrillo_db = largoLadrillo_db_ok[0];
          largoLadrillo_db = parseInt(largoLadrillo_db);

          var espesor_db = $("#espesorLadrilloResultado").text();
          var espesor_db_ok = espesor_db.split(" ");
          espesor_db = espesor_db_ok[0];
          espesor_db = parseInt(espesor_db);

          var ladrillosEnUnM2_db = $("#ladrilloEn1M2Resultado").text();
          var ladrillosEnUnM2_db_ok = ladrillosEnUnM2_db.split(" ");
          ladrillosEnUnM2_db = ladrillosEnUnM2_db_ok[0];
          ladrillosEnUnM2_db = parseInt(ladrillosEnUnM2_db);

          var totalLadrillos_db = $("#totalLadrilloResultado").text();
          var totalLadrillos_db_ok = totalLadrillos_db.split(" ");
          totalLadrillos_db = totalLadrillos_db_ok[0];
          totalLadrillos_db = parseInt(totalLadrillos_db);

                                /*<label id="totalCal">Total Cal:</label><label id="totalCalResultado">0</label>
                                <label id="totalArena">Total Arena:</label><label id="totalArenaResultado">0</label>
                                <label id="totalCemento">Total Cemento:</label><label id="totalCementoResultado">0</label>*/
          var totalCal_db = $("#totalCalResultado").text();
          var totalCal_db_ok = totalCal_db.split(" ");
          totalCal_db = totalCal_db_ok[0];
          totalCal_db = parseFloat(totalCal_db);

          var totalArena_db = $("#totalArenaResultado").text();
          var totalArena_db_ok = totalArena_db.split(" ");
          totalArena_db = totalArena_db_ok[0];
          totalArena_db = parseFloat(totalArena_db);

          var totalCemento_db = $("#totalCementoResultado").text();
          var totalCemento_db_ok = totalCemento_db.split(" ");
          totalCemento_db = totalCemento_db_ok[0];
          totalCemento_db = parseFloat(totalCemento_db);


          /*cal_ladrillo FLOAT, arena_ladrillo FLOAT, cemento_ladrillo FLOAT*/

          

                                                                                                                                //anchoLadrillo, largoLadrillo, espesor, ladrillosEnUnM2, total_ladrillos                                     
          var consulta = "update proyecto set largo = "+largo_db+", ancho = "+ancho_db+", superficie_total = "+superficie_db+", anchoLadrillo = "+anchoLadrillo_db+", largoLadrillo = "+largoLadrillo_db+", espesorLadrillo = "+espesor_db+", ladrillosEnUnM2 = "+ladrillosEnUnM2_db+", total_ladrillos = "+totalLadrillos_db+", cal_ladrillo = "+totalCal_db+", arena_ladrillo = "+totalArena_db+", cemento_ladrillo = "+totalCemento_db+" where id_proyecto ="+idComplementar;
          
          tx.executeSql(consulta,[],consultaSuccessActualizarDatosLadrillosDB, errorQueryDB);

        }

        function consultaSuccessActualizarPisosCeramicaDB(){
          shortToast("Guardado Correctamente");

        }

        function consultaSuccessActualizarDatosCeramicaDB(){
          shortToast("Guardado Correctamente");
        }

        function consultaSuccessActualizarDatosPinturaDB(){
          shortToast("Guardado Correctamente");

        }

        function consultaSuccessActualizarDatosLadrillosDB(){
          shortToast("Guardado Correctamente");

        }


        function consultaSuccesActualizarPrecioDB(){


        }

        function consultaErrorActualizarPrecio(err){

          alert("error actualizar precio: "+err.code);
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

         function consultaSuccesIngresarHerramientasAlProyecto(){
           //resetearId();
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
              resetearId();

                     
                  if(ceramica_bool == "true"){
                        if (minimenu == false){//Para que solo se active un solo scroll, el primero en true

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
                            $("#scrollDecorarPisos").css("display" , "block");
                            minimenu = true;
                        }

                        $("#herramientaAlfombra").on("click", herramientaPisosFlotantesClick);

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
                            $("#scrollLadrillos").css("display" , "block");
                            minimenu = true;
                        }

                        $("#herramientaLadrillo").on("click", herramientaLadrillosClick);

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

                  if(ladrillo_bool == "true"){
                    cargarLadrillos();

                  }

                  if(alfombra_bool == "true"){
                    cargarPisosFlotantes();
                  }

        }


        function cargarPisosFlotantes(){
             var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

              db.transaction(queryCargarPisosFlotantes, errorDB); 
        }

        function queryCargarPisosFlotantes(tx){
            var consulta = "SELECT * FROM pisos";
             //pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN
            tx.executeSql(consulta,[],consultaCargarPisosFlotantesSuccess, errorQueryDB);

        }

        function consultaCargarPisosFlotantesSuccess(tx, results){
              for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 
                 $("#scrollDecorarPisos").append('<div class="imagenHerramienta2" > <img src="'+item.imagen+'" id="'+item.id_pisos+'"/> </div>');
                  //ceramicas( id_ceramicas INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rendimiento_caja FLOAT, modelo TEXT, marca TEXT, color TEXT, uso TEXT, formato TEXT, precio INTEGER, lugar TEXT)";




             }
             $(".imagenHerramienta2 img").on("click", subrayarImagen2);

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

        function cargarLadrillos(){
          var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 20000);

          db.transaction(queryCargarLadrillos, errorDB);

        }

        function queryCargarLadrillos(tx){
              var consulta = "SELECT * FROM ladrillo";
             //pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN
             tx.executeSql(consulta,[],consultaCargarLadrilloSuccess, errorQueryDB);


        }

        function consultaCargarLadrilloSuccess(tx,results){

            for (var i = 0; i < results.rows.length ; i++) {

                 var item = results.rows.item(i);
                 
                 $("#scrollLadrillos").append('<div class="ladrillo"> <span id="'+item.id_ladrillos+'" data-tipo="'+item.modelo+'" data-url="'+item.imagen+'"> Ladrillo '+item.modelo+'</span></div>');




             }

             $(".ladrillo span").on("click", clickNombreLadrillo);



        }



        function clickNombreLadrillo(){

          $(".ladrillo span").removeClass("cuadroLadrillo");
          $(this).addClass("cuadroLadrillo");
          var ladri = $(this).attr("data-url");
          $("#imagenDecorar").attr("src", ladri);
          idLadrilloClickeado = $(this).attr("id");
          

        }

        function herramientaCeramicaClick(){
           $("#herramientaCeramica").css("border", "3px solid rgb(161, 39, 39)");
           $("#herramientaAlfombra").css("border", "none");
           $("#herramientaLadrillo").css("border" , "none");
           $("#herramientaPintura").css("border", "none");

           $("#scrollColores").css("display" , "none");
           $("#scrollLadrillos").css("display", "none");
           $("#scrollDecorarPisos").css("display", "none");
           $("#scrollDecorarCeramica").css("display" , "block");
           $("#imagenDecorar").attr("src", imagenALaBD);

        }

        function herramientaColoresClick(){
           $("#herramientaPintura").css("border", "3px solid rgb(161, 39, 39)");
           $("#herramientaCeramica").css("border", "none");
           $("#herramientaLadrillo").css("border" , "none");
           $("#herramientaAlfombra").css("border", "none");

           $("#scrollDecorarCeramica").css("display" , "none");
           $("#scrollLadrillos").css("display", "none");
           $("#scrollDecorarPisos").css("display", "none");
           $("#scrollColores").css("display" , "block");
           $("#imagenDecorar").attr("src", imagenALaBD);

        }

        function herramientaPisosFlotantesClick(){
           $("#herramientaAlfombra").css("border", "3px solid rgb(161, 39, 39)");
           $("#herramientaCeramica").css("border", "none");
           $("#herramientaLadrillo").css("border" , "none");
           $("#herramientaPintura").css("border", "none");

           $("#scrollDecorarCeramica").css("display" , "none");
           $("#scrollLadrillos").css("display", "none");
           $("#scrollColores").css("display" , "none");
           $("#scrollDecorarPisos").css("display", "block");
           $("#imagenDecorar").attr("src", imagenALaBD);

        }


        function herramientaLadrillosClick(){

           $("#herramientaLadrillo").css("border", "3px solid rgb(161, 39, 39)");
           $("#herramientaCeramica").css("border", "none");
           $("#herramientaPintura").css("border" , "none");
           $("#herramientaAlfombra").css("border", "none");

           $("#scrollDecorarCeramica").css("display" , "none");
           $("#scrollColores").css("display" , "none");
           $("#scrollLadrillos").css("display", "block");
           $("#scrollDecorarPisos").css("display", "none");
           $("#imagenDecorar").attr("src", imagenALaBD);

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

   function eliminarProyecto(){
    id_eliminar_py = $(this).attr('data-id');
    navigator.notification.confirm('¿Eliminar proyecto?.', onConfirmDelete, 'Confirmar la eliminación', ['Si','No']);
    
    

   }

   function onConfirmDelete(button){
    
    if(button == 1){
    respaldarProyectoEliminado(id_eliminar_py);
    eliminarProyectoDB();
  }


   }




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
                    pintura = true;
                    
              }

              if($("#myonoffswitch2:checked").is(':checked'))
              {
                    //Ceramica
                    ceramica = true;
                    
              }

              if($("#myonoffswitch3:checked").is(':checked'))
              {
                    //Ladrillo
                    ladrillo = true;
                    
              }

              if($("#myonoffswitch4:checked").is(':checked'))
              {
                    //Alfombra
                    alfombra = true;
                    
              }

              if(pintura != false || alfombra != false || ceramica != false || ladrillo != false){
                xhReq.open("GET", "proyectos/opcion1_continuacion.html", false);
                xhReq.send(null);
                document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

                $("#btn_guardar_proyecto").on("click", guardarProyectoOriginal);
              }else{

                shortToast("Debe seleccionar aunque sea una herramienta a su proyecto");
              }
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

        if(opcion == 3){
              xhReq.open("GET", "videos/videos.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
              $('.episode_list-2 a').on("click", irAVideo);
              $(".linkVideo").on("click", linkClickeado);

        }
        /*if(opcion == 4){

          $("#btn_ayudaPintura").css({"display": "inline-block", "width": "40%"});
          $("#btn_guardar").css({"display": "inline-block", "width": "40%", "margin-left": "22px"});
          $("#btn_guardar").on("click", calculoLitrosPintura);
        }
        $("#ic_camara").on("click", capturarFotografiaEditable);
        $("#btn_ayudaPintura").on("click", ayudaPintura);
        //$("#imgLugar").css("background","url(img/logo.png)");*/
        if(opcion == 4){
              xhReq.open("GET", "copia_datos/copia_seguridad_datos.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

              $(".copiaDeDatos").on("click",function(){
                startBackup();
                //backupDatabase();


              });
          
        }

        if(opcion == 5){
              xhReq.open("GET", "copia_datos/restaurar_datos.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

              $(".restaurarDatos").on("click", function(){

                
                startRestore();
                //restoreDatabase("respaldo/respaldo.txt");
                     

              });

              $(".restaurarDatosEliminados").on("click", function(){

                terminarJSON();
                startRestoreContentEliminados();

              });

        }

        if(opcion == 6){

              xhReq.open("GET", "presupuesto/presupuesto_totales.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
              seleccionarTodosLosProyectosDB();
              



        }

        if(opcion == 2){
              xhReq.open("GET", "calculador/calculador.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
              var lugar = $("#slcLugarDeVenta").val();
              $(".calcSelect").on("change",actualizarHtml);
              calculosCalculador();

              //calculosCalculador();



        }

        if(opcion == 7){
              xhReq.open("GET", "ayuda/ayuda.html", false);
              xhReq.send(null);
              document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

        }
        
        // Refrescamos el elemento iscroll segœn el contenido ya a–adido mediante ajax, y hacemos que se desplace al top
        //myScroll.refresh();
        //myScroll.scrollTo(0,0);
        

        
        // Quitamos la clase a–adida al li que hemos presionado
        setTimeout(function() {
          removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
        }, 300);
         
       }

}

function linkClickeado(){
  $(".linkVideo").css("cssText", "background-color: #202529 !important")
  $(this).css("cssText", "background-color: #181c1f !important");


}

function irAVideo(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('.video-player').html('<iframe width="100%" height="315" src="' + target + '" frameborder="0" allowfullscreen></iframe>');

}


function actualizarHtml(){
 var tipo = $(".calcSelect").val();
 if(tipo == "ceramica"){
   
   $("#simple2Resultados").css("display", "none");
   $("#simple3Resultados").css("display", "none");
   $("#simple4Resultados").css("display", "none");
   $("#simple").toggle("slow");
 }
 else if(tipo == "pintura"){
   $("#simple").css("display", "none");
   $("#simple3Resultados").css("display", "none");
   $("#simple4Resultados").css("display", "none");
   $("#simple2Resultados").toggle("slow");
 }
 else if(tipo == "ladrillo"){

   $("#simple").css("display", "none");
   $("#simple2Resultados").css("display", "none");
   $("#simple4Resultados").css("display", "none");
   $("#simple3Resultados").toggle("slow");

 }
 else if(tipo == "piso"){
   $("#simple").css("display", "none");
   $("#simple3Resultados").css("display", "none");
   $("#simple2Resultados").css("display", "none");
   $("#simple4Resultados").toggle("slow");
 }
 else{
   $("#simple").css("display", "none");
   $("#simple3Resultados").css("display", "none");
   $("#simple2Resultados").css("display", "none");
   $("#simple4Resultados").css("display", "none");

 }


}

function eventoAcordeon(){
  (function(){
  var d = document,
  accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
  setAria,
  setAccordionAria,
  switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

    setAriaAttr = function(el, ariaType, newProperty){
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function(el1, el2, expanded){
    switch(expanded) {
      case "true":
        setAriaAttr(el1, 'aria-expanded', 'true');
        setAriaAttr(el2, 'aria-hidden', 'false');
        break;
      case "false":
        setAriaAttr(el1, 'aria-expanded', 'false');
        setAriaAttr(el2, 'aria-hidden', 'true');
        break;
      default:
        break;
    }
  };
//function
switchAccordion = function(e) {
  e.preventDefault();
  var thisAnswer = e.target.parentNode.nextElementSibling;
  var thisQuestion = e.target;
  if(thisAnswer.classList.contains('is-collapsed')) {
    setAccordionAria(thisQuestion, thisAnswer, 'true');
  } else {
    setAccordionAria(thisQuestion, thisAnswer, 'false');
  }
    thisQuestion.classList.toggle('is-collapsed');
    thisQuestion.classList.toggle('is-expanded');
    thisAnswer.classList.toggle('is-collapsed');
    thisAnswer.classList.toggle('is-expanded');
  
    thisAnswer.classList.toggle('animateIn');
  };
  for (var i=0,len=accordionToggles.length; i<len; i++) {
    if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();
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
    

  }

}

function subrayarImagen(){
  
  $(".imagenHerramienta img").css("border-bottom", "none");
  $(this).css("border-bottom", "6px solid #197D9B");
  idCeramicaClickeada = $(this).attr("id");

}

function subrayarImagen2(){
  
  $(".imagenHerramienta2 img").css("border-bottom", "none");
  $(this).css("border-bottom", "6px solid #197D9B");
  idAlfombraClickeada = $(this).attr("id");

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
            $("#btn_lugar_de_compra3").on("click", mostrarMapa);
            //$("#simple").css("margin-top", "0%");
            //$("h1.complementaProyecto").css("top", "88%");
            //$("#imgEscogidaAnt").attr("src", imagenALaBD);
            //$(".tituloProyecto").text(primeraLetraMayuscula(nombreProyecto));
            //$(".tituloProyecto").css("margin-top", "14%");

    }
    else{
          

      var contadorBool = 0;
      var contadorId = 0;
           if(ceramica_bool == "true"){
              contadorBool = contadorBool + 1;
           }

           if (pintura_bool == "true"){
             contadorBool = contadorBool + 1;
           }

           if(ladrillo_bool == "true"){
            contadorBool = contadorBool + 1;
           }

           if(alfombra_bool == "true"){
            contadorBool = contadorBool + 1;
           }

           if(idCeramicaClickeada != 0){
              contadorId = contadorId + 1;
              
           }

           if(idColorCirculoClickeado != 0){
              contadorId = contadorId + 1;
              
           }

           if(idLadrilloClickeado != 0){
             contadorId = contadorId + 1;
             
           }

           if(idAlfombraClickeada != 0){
             contadorId = contadorId + 1;
            
           }

           

          if((contadorBool == contadorId) && (contadorId != 0)){


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
            $("#btn_lugar_de_compra3").on("click", mostrarMapa);
            
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


function mostrarMapa(){
  lugar = "Sodimac";
  verMapa();


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
      $(".editarAnchoGeneral").on("click", function(){editarAnchoGeneral(false)});
      $(".editarLargoGeneral").on("click", function(){editarLargoGeneral(false)});

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
    $("#imgGuardarDatosLadrillos").on("click", function(){
      
      var espesor = $("#espesorLadrilloResultado").text();
      var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
      var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();

      if(espesor != "0" && anchoLadrillo != "0" && largoLadrillo != "0"){
        ActualizarDatosLadrillosDB();

      }
      else{
        shortToast("Debes llenar los valores restantes");
      }

      
    });
    $("#imgGuardarDatosPisos").on("click", ActualizarDatosPisosDB);
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

    $("#labelEditarMedidasLadrillo").on("click", function(){

       $(".flotanteLadrillos").css("display", "block");
       $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
       $('#mask').fadeTo("fast", 1);
        quitarCapa = true;
       $(".msgAnchoLadrillo").on("click", ingresarAnchoLadrillo);
       $(".msgLargoLadrillo").on("click", ingresarLargoLadrillo);
       $(".msgEspesor").on("click", ingresarEspesorLadrillo);


    });


    $("#labelEditarPisoFlotante").on("click", function(){

       $(".flotantePisos").css("display", "block");
       $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
       $('#mask').fadeTo("fast", 1);
        quitarCapa = true;

      $(".msgRendimientoPiso").on("click", ingresarRendimientoPisos);


    });





}

function ingresarAnchoLadrillo(){

   $(".flotanteLadrillos").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptAnchoLadrillo();

}

function ingresarLargoLadrillo(){

   $(".flotanteLadrillos").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptLargoLadrillo();

}

function ingresarEspesorLadrillo(){

   $(".flotanteLadrillos").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEspesorLadrillo();

}

function ingresarRendimientoCeramica(){
   
   $(".flotanteCeramicas").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptRendimientoCajaCeramica();

}

function ingresarRendimientoPisos(){

   $(".flotantePisos").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptRendimientoCajaPisos();

}

function ingresarRendimientoPintura(){

   $(".flotantePinturas").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptRendimientoPintura();

}

function editarAnchoGeneral(calculador){
  if(!calculador){
   $(".editarAnchoLargo").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEditarAnchoGeneral();
   }
   else{
   $(".editarAnchoLargo").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEditarAnchoGeneralCalculador();

   }

}

function editarLargoGeneral(calculador){
  if(!calculador){
   $(".editarAnchoLargo").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEditarLargoGeneral();
   }else{
   $(".editarAnchoLargo").hide("slow");
   $("#mask").css("display", "none");
   resetarEventos();
   promptEditarLargoGeneralCalculador();

   }

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
     var frague = Math.round(superficieTotal / 5);
     $("#fragueCeramicaresultado").text(frague+" kg");
     var pegamento = Math.round(superficieTotal / 4);
     $("#pegamentoCeramicaresultado").text(pegamento+ " kg");

}

function RealizarCalculosPrecioCeramicas(precio){


 var precioFrague = 1600; // el frague lo venden por kilo
 var total = 0;
 var sacos = total_pegamento_presupuesto / 25;
 sacos = Math.round(sacos);
 saco = (sacos == 0) ? sacos=1:sacos = sacos;

 sacosPegamentoPres = sacos;
 kgDeFraguePres = total_frague_presupuesto;
 precioCajaCeramicaPres = precio;
 totalCajasCeramicaPres = total_cajas_presupuesto;
  total = total + Math.round(precio * total_cajas_presupuesto);
  total = total + Math.round(precioFrague * total_frague_presupuesto);
  total = total + Math.round(sacos * 2300);
  $("#precioCeramicaresultado").text("$"+format(Math.round(precio * total_cajas_presupuesto)));
  $("#precioFragueresultado").text("$"+ format(Math.round(precioFrague * total_frague_presupuesto)));
  $("#precioPegamentoresultado").text(format(Math.round(sacos* 2300)));
  totalPresupuesto = parseInt(total + totalPresupuesto);
  totalPresupuestoCeramica = total; 
  $(".odometer").html("$"+format(totalPresupuesto));
  $("#precioTotalCeramicasResultado").text("$"+format(total));




}


function format(input)
{
var num = input;
if(!isNaN(num)){
num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
num = num.split('').reverse().join('').replace(/^[\.]/,'');
return num;

}

}


function RealizarCalculosPisos(rendimiento, ancho, largo){

       //capturamos los datos del usuario
     var superficie = ancho * largo;
     var superficieTotal = superficie * 1.05;
     var espuma = Math.round(superficieTotal / 10);
     $("#superficieTotalPisoResultado").text(Math.round(superficieTotal)+ " m2");
     $("#anchoPisoResultado").text(ancho+" m2");
     $("#largoPisoResultado").text(largo+" m2");
     $("#rendimientoPisoResultado").text(rendimiento+ " m2");
     $("#espumaNiveladoraResultado").text(espuma + " de 10m2 c/u");

     var totalCajas = Math.round(superficieTotal / rendimiento);
     //totalCajas = Math.round(totalCajas * 100) / 100;
     $("#cajasPisoResultado").text(totalCajas+" caja(s)");
     /*var frague = Math.round(superficieTotal * 4);
     $("#fragueCeramicaresultado").text(frague+" kg");
     var pegamento = Math.round(superficieTotal * 3);
     $("#pegamentoCeramicaresultado").text(pegamento+ " kg");*/

}

function RealizarCalculosPrecioPisos(precio){

  var precioEspuma = 8250;
  var totalCajasPiso = total_cajas_pisos_presupuesto;
  var totalEspuma = total_espuma_niveladora_presupuesto;
  precioPisosPress = precio;
  var total = 0;
  $("#totalPrecioCajasPisosResultado").text("$"+format(totalCajasPiso * precio));
  $("#totalPrecioEspumaResultado").text("$"+format(Math.round(totalEspuma * precioEspuma)));
  total = total + totalCajasPiso * precio;
  total = total + totalEspuma * precioEspuma;
  total = Math.round(total);
  totalPresupuesto = parseInt(total + totalPresupuesto);
  totalPresupuestoPisos = total; 
  $(".odometer").html("$"+format(totalPresupuesto));
  $("#precioTotalPisoResultado").text("$"+format(total));
}

function realizarCalculosLadrillos(anchoLadrillo, largoLadrillo, espesor){

  var anchoSuperficie = $("#anchoLadrilloresultado").text();
  var largoSuperficie = $("#largoLadrilloresultado").text();


  if(anchoSuperficie != "0m2" && largoSuperficie != "0m2"){

     //(anchoM + espesorcm) * (largoM + espesorCM)

      var anchoMasEspesor = (anchoLadrillo/100) + (espesor/100);
      //alert("ancho mas espesor: "+ anchoMasEspesor);
      var largoMasEspesor = (largoLadrillo / 100) + (espesor/100);
      var cal = 3;
      var arena = 0.0015;
      var cemento = 0.78;
      //alert("Largo mas espesor: "+largoMasEspesor )

      var ladrillosEnUnMetroCuadrado = 1 / (anchoMasEspesor * largoMasEspesor);
      ladrillosEnUnMetroCuadrado = Math.round(ladrillosEnUnMetroCuadrado);
      $("#ladrilloEn1M2Resultado").text(ladrillosEnUnMetroCuadrado+" ladrillos")
      //alert("ladrillosEnUnMetroCuadrado: "+ladrillosEnUnMetroCuadrado);
      /*1 -----------------------> ladrillosEnUnMetroCuadrado
        superficieTotal----------> x*/
        var anchoSuperficie_ok = anchoSuperficie.split(" ");
        anchoSuperficie = anchoSuperficie_ok[0];
        anchoSuperficie = parseFloat(anchoSuperficie);

        var largoSuperficie_ok = largoSuperficie.split(" ");
        largoSuperficie = largoSuperficie_ok[0];
        largoSuperficie = parseFloat(largoSuperficie);

      var superficieTotal  = Math.round(anchoSuperficie * largoSuperficie);
      var ladrillosTotal = superficieTotal * ladrillosEnUnMetroCuadrado;
      $("#superficieTotalLadrilloResultado").text(superficieTotal+ " m2");
      $("#anchoLadrilloLadrilloResultado").text(anchoLadrillo+ " cm");
      $("#largoLadrilloLadrilloResultado").text(largoLadrillo+ " cm");
      $("#espesorLadrilloResultado").text(espesor+" cm");
      
      $("#totalLadrilloResultado").text(ladrillosTotal+ " ladrillos");
      $("#totalCalResultado").text(Math.round(superficieTotal * cal)+ " kg");
      $("#totalArenaResultado").text((parseFloat(superficieTotal * arena).toFixed(2)) + " cm3");
      $("#totalCementoResultado").text(Math.round(superficieTotal * cemento)+ " kg")
                                /*<label id="totalCal">Total Cal:</label><label id="totalCalResultado">0</label>
                                <label id="totalArena">Total Arena:</label><label id="totalArenaResultado">0</label>
                                <label id="totalCemento">Total Cemento:</label><label id="totalCementoResultado">0</label>*/

      $("#toolstipLadrillos").css("visibility", "hidden");




  }else{

      if(anchoLadrillo == 0 && largoLadrillo == 0 && espesor == 0){ //Viene de la base de datos

        $("#anchoLadrilloresultado").text(ancho_py+" m2");
        
        $("#largoLadrilloresultado").text(largo_py+" m2");
        
        var superficieLadrillos = Math.round(ancho_py * largo_py);
        $("#superficieTotalLadrilloResultado").text(superficieLadrillos+" m2");

      }
      else{

      }

    //tooltips
  }


}

function RealizarCalculosPrecioLadrillos(precio,modelo){

  var precioCal = 2980;
  var precioCemento = 5400;
  var precioArena = 860;
  var totalArena = total_arena_ladrillo_presupuesto / 1;
  var totalCemento = total_cemento_ladrillo_presupuesto;
  var totalLtArena;
  var totalCal = total_cal_ladrillo_presupuesto;
  var presupuesto = 0;

  totalArena = (totalArena <= 25) ? totalArena = 25 : totalArena = totalArena;
  totalCemento = (totalCemento <= 42.5) ? totalCemento = 1 : totalCemento = Math.round(totalCemento / 42.5);
  totalCal = (totalCal <= 25) ? totalCal = 1 : totalCal = Math.round(totalCal/25);

  if (totalArena > 25){
      totalLtArena = totalArena / 25;
      totalLtArena = Math.round(totalLtArena);
  }
  else{

    totalLtArena = 1;
  }

   sacosCemento = totalCemento;
  sacosCal = totalCal;
  sacosArena = totalLtArena;
  precioLadrillo = precio;

  presupuesto = presupuesto + Math.round(precioCal * totalCal);
  presupuesto = presupuesto + Math.round(totalLtArena * precioArena);
  presupuesto = presupuesto + Math.round(totalCemento * 5400);
  presupuesto = presupuesto + Math.round(total_ladrillos_presupuesto * precio);


  $("#totalCalResultado").text("$"+format(Math.round(precioCal * totalCal)));
  $("#precioArenaResultado").text("$"+format(Math.round(totalLtArena * precioArena)));
  $("#precioCementoResultado").text("$"+format(totalCemento * 5400));
  $("#precioLadrilloResultado").text("$"+format(Math.round(total_ladrillos_presupuesto * precio)));
    totalPresupuesto = parseInt(presupuesto + totalPresupuesto);
    totalPresupuestoLadrillos = presupuesto; 
  $(".odometer").html("$"+format(totalPresupuesto));
  $("#precioTotalLadrillosResultado").text("$"+format(presupuesto));

  /*1000cm3 es -> 1litro*/
 
 

}


 function calculoLitrosPintura(rendimiento, ancho, largo){
       //capturamos los datos del usuario


      //idColorCirculoClickeado = 0;

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


 function realizarCalculoPrecioPintura(){
  //idColorCirculoClickeado = 0;
  
  var litros_pintura = total_litros_presupuesto;
  var mililitros = litros_pintura * 1000;
  var galones = 0;
  var precio = 6290;

  galones = (mililitros < 1000) ? galones = 1 :  galones = Math.round(mililitros / 250);
  galonesPress = galones;
  $("#totalGalonesResultado").text(galones);
  $("#precioPinturaresultado").text("$"+format(Math.round(galones * precio)));
  $("#precioTotalPinturaResultado").text("$"+format(Math.round(galones * precio)));
  totalPresupuesto = parseInt((galones * precio) + totalPresupuesto);
  totalPresupuestoPinturas = (galones * precio);
  $(".odometer").html("$"+format(totalPresupuesto));


  

 }

 function promptAnchoLadrillo(){

       navigator.notification.prompt(
        'Ingrese ancho de ladrillo en cm ',  // message
        onPromptAnchoLadrillo,                  // callback to invoke
        'Ancho Ladrillo',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

 }

function promptLargoLadrillo(){

       navigator.notification.prompt(
        'Ingrese largo de ladrillo en cm ',  // message
        onPromptLargoLadrillo,                  // callback to invoke
        'Largo Ladrillo',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

 }

function promptEspesorLadrillo(){

       navigator.notification.prompt(
        'Ingrese espesor de ladrillo en cm ',  // message
        onPromptEspesorLadrillo,                  // callback to invoke
        'Espesor Ladrillo',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

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

function promptRendimientoCajaPisos(){

       navigator.notification.prompt(
        'Ingrese rendimiento de caja ',  // message
        onPromptRendimientoPiso,                  // callback to invoke
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


function promptEditarAnchoGeneralCalculador(){

         navigator.notification.prompt(
        'Ingrese ancho superficie ',  // message
        onPromptAnchoGeneralCalculador,                  // callback to invoke
        'Ancho Superficie m2',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

}

function promptEditarLargoGeneralCalculador(){
    navigator.notification.prompt(
        'Ingrese largo superficie ',  // message
        onPromptLargoGeneralCalculador,                  // callback to invoke
        'Ancho Superficie m2',            // title
        ['Ok','Cancel'],             // buttonLabels
        ''                 // defaultText
    );

}

function promptEditarLargoGeneral(){
    navigator.notification.prompt(
        'Ingrese largo superficie ',  // message
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


function onPromptRendimientoPiso(results){
    if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          var widthh = $("#anchoPisoResultado").text();
          widthh = parseFloat(widthh);

          var heightt = $("#largoPisoResultado").text();
          heightt = parseFloat(heightt);


          
          RealizarCalculosPisos(parseFloat(results.input1), widthh, heightt);
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

          RealizarCalculosCeramicas(ren, results.input1, heightt);

         }
         if(idColorCirculoClickeado != 0){

          //var widthh = $("#anchoPinturaresultado").text();
          //widthh = parseFloat(widthh);
          var ren2 = $("#RendimientoPinturaresultado").text();

          ren2 = parseFloat(ren2);

          var heightt2 = $("#largoPinturaresultado").text();

          heightt2 = parseFloat(heightt2);

          calculoLitrosPintura(ren2, results.input1, heightt2);

         }
         if(idLadrilloClickeado !=0){

           var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
           //var anchoLadrillo_ok = anchoLadrillo.split(" ");
           //anchoLadrillo = anchoLadrillo_ok[0];
           anchoLadrillo = parseFloat(anchoLadrillo);

           var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
           largoLadrillo = parseFloat(largoLadrillo);

           var espesor = $("#espesorLadrilloResultado").text();
           espesor = parseFloat(espesor);
           $("#anchoLadrilloresultado").text(results.input1+" m2");

           if(anchoLadrillo != 0 && largoLadrillo != 0){

             realizarCalculosLadrillos(anchoLadrillo, largoLadrillo, espesor);
           }
           else{
            ponerSuperficieTotalLadrillos();



           }



         }
         if(idAlfombraClickeada !=0){
          var ren3 = $("#rendimientoPisoResultado").text();
          ren3 = parseFloat(ren3);

          var heightt3 = $("#largoPisoResultado").text();
          heightt3 = parseFloat(heightt3);

          RealizarCalculosPisos(ren3, results.input1, heightt3);

         }


         /*if(idCeramicaClickeada != 0){

          RealizarCalculosCeramicas(ren, results.input1, heightt);

         }

         if(idColorCirculoClickeado !=0){
          calculoLitrosPintura(ren, results.input1, heightt);

         }
         if(idLadrilloClickeado !=0){

         }
         if(idAlfombraClickeada !=0){

         }*/

     }else{
      shortToast("Ingrese números correctos");
     }

   }else{
    return false;
   }

}

function onPromptAnchoGeneralCalculador(results){
   if(results.buttonIndex == 1){
     if(!results.input1 == ""  && !isNaN(results.input1)){
       
         
          //var widthh = $("#anchoCeramicaresultado").text();
          //widthh = parseFloat(widthh);
          //var ancho = $("#anchoCeramicaresultado").text();
          //var largo = $("#largoCeramicaresultado").text();
          
               $("#anchoCeramicaresultado").text(results.input1+" m2");

               $("#anchoPinturaresultado").text(results.input1+" m2");
               $("#anchoLadrilloresultado").text(results.input1+" m2");

               
              
                //ponerSuperficieTotalLadrillos();
                $("#anchoPisoResultado").text(results.input1+" m2");

         
            //ponerSuperficieTotalLadrillos();




     }else{
      shortToast("Ingrese números correctos");
     }

   }else{
    return false;
   }

}

function onPromptLargoGeneralCalculador(results){
   if(results.buttonIndex == 1){
     if(!results.input1 == ""  && !isNaN(results.input1)){
       
         
          $("#largoCeramicaresultado").text(results.input1+" m2");

           $("#largoPinturaresultado").text(results.input1+" m2");
           $("#largoLadrilloresultado").text(results.input1+" m2");

           
          
            //ponerSuperficieTotalLadrillos();
            $("#largoPisoResultado").text(results.input1+" m2");


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

          RealizarCalculosCeramicas(ren, widthh, results.input1);

          //var heightt = $("#largoCeramicaresultado").text();
          //heightt = parseFloat(heightt);

         }
         if(idColorCirculoClickeado != 0){

          var widthh2 = $("#anchoPinturaresultado").text();
          widthh2 = parseFloat(widthh2);
          var ren2 = $("#RendimientoPinturaresultado").text();
          ren2 = parseFloat(ren2);

          calculoLitrosPintura(ren2, widthh2, results.input1);

          //var heightt = $("#largoPinturaresultado").text();
          //heightt = parseFloat(heightt);

         }
         if(idLadrilloClickeado !=0){
           var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
           //var anchoLadrillo_ok = anchoLadrillo.split(" ");
           //anchoLadrillo = anchoLadrillo_ok[0];
           anchoLadrillo = parseFloat(anchoLadrillo);

           var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
           largoLadrillo = parseFloat(largoLadrillo);

           var espesor = $("#espesorLadrilloResultado").text();
           espesor = parseFloat(espesor);
           $("#largoLadrilloresultado").text(results.input1+" m2");
           if(anchoLadrillo != 0 && largoLadrillo != 0){

             realizarCalculosLadrillos(anchoLadrillo, largoLadrillo, espesor);
           }
           else{
            ponerSuperficieTotalLadrillos();
           }
         }
         if(idAlfombraClickeada !=0){

          var widthh3 = $("#anchoPisoResultado").text();
          widthh3 = parseFloat(widthh3);
          var ren3 = $("#rendimientoPisoResultado").text();
          ren3 = parseFloat(ren3);

          RealizarCalculosPisos(ren3, widthh3, results.input1);

         }


         /*
         if(idCeramicaClickeada != 0){

          RealizarCalculosCeramicas(ren, widthh, results.input1);

         }

         if(idColorCirculoClickeado !=0){
          calculoLitrosPintura(ren, widthh, results.input1);

         }
         if(idLadrilloClickeado !=0){

         }
         if(idAlfombraClickeada !=0){

         }*/

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

function onPromptAnchoLadrillo(results){
       //toolstip
      if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          //var ren = $("#rendimientoCeramicaresultado").text();
          //ren = parseFloat(ren);

          //var heightt = $("#largoCeramicaresultado").text();
          //heightt = parseFloat(heightt);

          //RealizarCalculosCeramicas(ren, parseFloat(results.input1), heightt);

          if(verificarValoresFaltantesLadrillos()){
                //var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
                //anchoLadrillo = parseFloat(anchoLadrillo);

                var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
                var largoLadrillo_ok = largoLadrillo.split(" ");
                largoLadrillo = largoLadrillo_ok[0];
                largoLadrillo = parseFloat(largoLadrillo);

                var espesor = $("#espesorLadrilloResultado").text();
                var espesor_ok = espesor.split(" ");
                espesor = espesor_ok[0];
                espesor = parseFloat(espesor);

               realizarCalculosLadrillos(parseFloat(results.input1),largoLadrillo,espesor);

          }else{

              $("#anchoLadrilloLadrilloResultado").text(results.input1+ " cm");
               if(verificarValoresFaltantesLadrillos()){
                var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
                var largoLadrillo_ok = largoLadrillo.split(" ");
                largoLadrillo = largoLadrillo_ok[0];
                largoLadrillo = parseFloat(largoLadrillo);

                var espesor = $("#espesorLadrilloResultado").text();
                var espesor_ok = espesor.split(" ");
                espesor = espesor_ok[0];
                espesor = parseFloat(espesor);

               realizarCalculosLadrillos(parseFloat(results.input1),largoLadrillo,espesor);
               }

              //$("#largoLadrilloLadrilloResultado").text(largoLadrillo+ " m2");
              //$("#espesorLadrilloResultado").text(espesor+" cm");

            return true;
          }
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

function onPromptLargoLadrillo(results){
       //toolstip
      if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          //var ren = $("#rendimientoCeramicaresultado").text();
          //ren = parseFloat(ren);

          //var heightt = $("#largoCeramicaresultado").text();
          //heightt = parseFloat(heightt);

          //RealizarCalculosCeramicas(ren, parseFloat(results.input1), heightt);

          if(verificarValoresFaltantesLadrillos()){
                var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
                var anchoLadrillo_ok = anchoLadrillo.split(" ");
                anchoLadrillo = anchoLadrillo_ok[0];
                anchoLadrillo = parseFloat(anchoLadrillo);

                //var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
                //var largoLadrillo_ok = largoLadrillo.split(" ");
                //largoLadrillo = largoLadrillo_ok[0];
                //largoLadrillo = parseFloat(largoLadrillo);

                var espesor = $("#espesorLadrilloResultado").text();
                var espesor_ok = espesor.split(" ");
                espesor = espesor_ok[0];
                espesor = parseFloat(espesor);

               realizarCalculosLadrillos(anchoLadrillo, parseFloat(results.input1),espesor);

          }else{

              //$("#anchoLadrilloLadrilloResultado").text(anchoLadrillo+ " m2");
              $("#largoLadrilloLadrilloResultado").text(results.input1+ " cm");
              if(verificarValoresFaltantesLadrillos()){

                var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
                var anchoLadrillo_ok = anchoLadrillo.split(" ");
                anchoLadrillo = anchoLadrillo_ok[0];
                anchoLadrillo = parseFloat(anchoLadrillo);

                //var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
                //var largoLadrillo_ok = largoLadrillo.split(" ");
                //largoLadrillo = largoLadrillo_ok[0];
                //largoLadrillo = parseFloat(largoLadrillo);

                var espesor = $("#espesorLadrilloResultado").text();
                var espesor_ok = espesor.split(" ");
                espesor = espesor_ok[0];
                espesor = parseFloat(espesor);

               realizarCalculosLadrillos(anchoLadrillo, parseFloat(results.input1),espesor);



              }
              //$("#espesorLadrilloResultado").text(espesor+" cm");

            return true;
          }
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

function onPromptEspesorLadrillo(results){
       //toolstip
      if(results.buttonIndex == 1){

          
        if(!results.input1 == ""  && !isNaN(results.input1)){

          //var ren = $("#rendimientoCeramicaresultado").text();
          //ren = parseFloat(ren);

          //var heightt = $("#largoCeramicaresultado").text();
          //heightt = parseFloat(heightt);

          //RealizarCalculosCeramicas(ren, parseFloat(results.input1), heightt);

          if(verificarValoresFaltantesLadrillos()){
                var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
                var anchoLadrillo_ok = anchoLadrillo.split(" ");
                anchoLadrillo = anchoLadrillo_ok[0];
                anchoLadrillo = parseFloat(anchoLadrillo);

                var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
                var largoLadrillo_ok = largoLadrillo.split(" ");
                largoLadrillo = largoLadrillo_ok[0];
                largoLadrillo = parseFloat(largoLadrillo);

                //var espesor = $("#espesorLadrilloResultado").text();
                //var espesor_ok = espesor.split(" ");
                //espesor = espesor_ok[0];
                //espesor = parseFloat(espesor);

               realizarCalculosLadrillos(anchoLadrillo, largoLadrillo, parseFloat(results.input1));

          }else{

              //$("#anchoLadrilloLadrilloResultado").text(anchoLadrillo+ " m2");
              //$("#largoLadrilloLadrilloResultado").text(results.input1+ " m2");
              $("#espesorLadrilloResultado").text(results.input1+" cm");
              if(verificarValoresFaltantesLadrillos()){
                var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
                var anchoLadrillo_ok = anchoLadrillo.split(" ");
                anchoLadrillo = anchoLadrillo_ok[0];
                anchoLadrillo = parseFloat(anchoLadrillo);

                var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
                var largoLadrillo_ok = largoLadrillo.split(" ");
                largoLadrillo = largoLadrillo_ok[0];
                largoLadrillo = parseFloat(largoLadrillo);

                //var espesor = $("#espesorLadrilloResultado").text();
                //var espesor_ok = espesor.split(" ");
                //espesor = espesor_ok[0];
                //espesor = parseFloat(espesor);

               realizarCalculosLadrillos(anchoLadrillo, largoLadrillo, parseFloat(results.input1));

              }

            return true;
          }
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

function verificarValoresFaltantesLadrillos(){

  var anchoLadrillo = $("#anchoLadrilloLadrilloResultado").text();
  var largoLadrillo = $("#largoLadrilloLadrilloResultado").text();
  var espesor = $("#espesorLadrilloResultado").text();

  if (anchoLadrillo == "0" || largoLadrillo == "0" || espesor == "0"){

    return false; //Si algun valor es igual a 0, no puede realizar calculos

  }else{
    return true;
  }

}

function ponerSuperficieTotalLadrillos(){

  var anchoSuperficie = $("#anchoLadrilloresultado").text();
  var largoSuperficie = $("#largoLadrilloresultado").text();

        var anchoSuperficie_ok = anchoSuperficie.split(" ");
        anchoSuperficie = anchoSuperficie_ok[0];
        anchoSuperficie = parseFloat(anchoSuperficie);

        var largoSuperficie_ok = largoSuperficie.split(" ");
        largoSuperficie = largoSuperficie_ok[0];
        largoSuperficie = parseFloat(largoSuperficie);
      var superficieTotal  = Math.round(anchoSuperficie * largoSuperficie);
      $("#superficieTotalLadrilloResultado").text(superficieTotal+ " m2");
  
  
  }

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
        totalPresupuesto = 0;
        totalPresupuestoCeramica = 0;
        totalPresupuestoPisos = 0;
        totalPresupuestoLadrillos = 0;
        totalPresupuestoPinturas = 0;
        xhReq.open("GET", "presupuesto/presupuestos.html", false);
      xhReq.send(null);
      document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
      obtenerIdHerramientasClickeadasParaPresupuestoDB();
      labelDetallesPresupuesto = false;

      $("#labelDetallesPresupuestoLadrillos").on("click", function(){

        xhReq.open("GET", "detalles_presupuesto/detalles_presupuesto_ladrillos.html", false);
        xhReq.send(null);
        document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

        $("#cantidadCal").text(sacosCal);
        $("#cantidadArena").text(sacosArena);
        $("#cantidadCemento").text(sacosCemento);
        $("#cantidadLadrillos").text(total_ladrillos_presupuesto);
        $("#precioLadrillo").text(precioLadrillo);
        labelDetallesPresupuesto = true;


      });

      $("#labelDetallesCeramica").on("click", function(){
        xhReq.open("GET", "detalles_presupuesto/detalles_presupuesto_ceramicas.html", false);
        xhReq.send(null);
        document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
        $("#cantidadFrague").text(kgDeFraguePres);
        $("#cantidadPegamento").text(sacosPegamentoPres);
        $("#precioCajaCeramica").text(precioCajaCeramicaPres);
        $("#cajasCeramicaPres").text(totalCajasCeramicaPres);

        labelDetallesPresupuesto = true;

      });

      $("#labelDetallesPintura").on("click", function(){
        xhReq.open("GET", "detalles_presupuesto/detalles_presupuesto_pinturas.html", false);
        xhReq.send(null);
        document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

        $("#galonesPres").text(galonesPress);
        labelDetallesPresupuesto = true;

      });

      $("#labelDetallesPisos").on("click", function(){
        xhReq.open("GET", "detalles_presupuesto/detalles_presupuesto_pisos_flotantes.html", false);
        xhReq.send(null);
        document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

        $("#CajasPisosPres").text(total_cajas_pisos_presupuesto);
        $("#cantidadEspuma").text(total_espuma_niveladora_presupuesto);
        $("#precioCajaPisosPres").text(precioPisosPress);
        labelDetallesPresupuesto = true;


      });


      $("#imgGuardarTotalesPresupuesto").on("click", function(){

        guardarTotalesPresupuestoDB();

      });

      

      
}

function resetarEventos(){
   $(".editarAnchoCeramica").unbind("click", modificarAnchoCeramica);
   $(".msgRendimientoCeramica").unbind("click", ingresarRendimientoCeramica);
   $(".editarLargoCeramica").unbind("click", modificarLargoCeramica);
   $(".msgRendimientoPintura").unbind("click", ingresarRendimientoPintura);
   $(".editarAnchoGeneral").unbind("click");
   $(".editarLargoGeneral").unbind("click");
   $(".msgAnchoLadrillo").unbind("click", ingresarAnchoLadrillo);
   //$("#imgGuardarDatos").unbind("click", ActualizarDatosCeramicaDB);
   $(".msgLargoLadrillo").unbind("click", ingresarLargoLadrillo);
   $(".msgEspesor").unbind("click", ingresarEspesorLadrillo);
   $(".msgRendimientoPiso").unbind("click", ingresarRendimientoPisos);

}

function resetearId(){

  idCeramicaClickeada = 0;
  idLadrilloClickeado = 0;
  idColorCirculoClickeado = 0;
  idAlfombraClickeada = 0;
}

function resetarBoolTipos(){
    pintura = false;
    ceramica = false;
    ladrillo = false;
    alfombra = false;
}


function failFiles(error) {        
  if (error.code == FileError.NOT_FOUND_ERR) alert("Message : NOT_FOUND_ERR" )
  else if (error.code == FileError.SECURITY_ERR) alert("Message : SECURITY_ERR" )
  else if (error.code == FileError.ABORT_ERR) alert("Message : ABORT_ERR" )
  else if (error.code == FileError.NOT_READABLE_ERR) alert("Message : NOT_READABLE_ERR" )
  else if (error.code ==   FileError.ENCODING_ERR) alert("Message : ENCODING_ERR" )
  else if (error.code == FileError.NO_MODIFICATION_ALLOWED_ERR) alert("Message : NO_MODIFICATION_ALLOWED_ERR" )
  else if (error.code == FileError.INVALID_STATE_ERR) alert("Message : INVALID_STATE_ERR" )
  else if (error.code == FileError.SYNTAX_ERR) alert("Message : SYNTAX_ERR" )
  else if (error.code == FileError.INVALID_MODIFICATION_ERR) alert("Message :  INVALID_MODIFICATION_ERR" )
  else if (error.code == FileError.QUOTA_EXCEEDED_ERR) alert("Message : QUOTA_EXCEEDED_ERR" )
  else if (error.code == FileError.PATH_EXISTS_ERR) alert("Message : PATH_EXISTS_ERR" )  
}  



function altoDelBody(){

  return document.body.clientHeight;
}
         function retornarLasDiesPrimerasLetras(palabra){

          var array = new Array();
          array = palabra;
          var oracion = "";
        if(array.length >=10){
            for(var i=0; i<10;i++){
              oracion+= array[i];
            }
            return oracion;

           }
         else{
        return palabra;
       }
      }

function numberEfecto(){
(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('#count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '.');

  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
});
}


function calculosCalculador(){

$("#imgMiniMenu").on("click", function(){

      $(".editarAnchoLargo").css("display", "block");
      $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
      $('#mask').fadeTo("fast", 1);
      $(".editarAnchoGeneral").on("click", function(){editarAnchoGeneral(true)});
      $(".editarLargoGeneral").on("click", function(){editarLargoGeneral(true)});
      $(".limpiarDatos").on("click", function(){menu(2)});

     });
    /*Ceramicas*/    
    $("#labelEditarCeramica").on("click", function(){
      var ancho = $("#anchoCeramicaresultado").text();
      var largo = $("#largoCeramicaresultado").text();

      if(ancho != 0 && largo !=0){


        
        $(".flotanteCeramicas").css("display", "block");
        //transition effect      
        $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
        $('#mask').fadeTo("fast", 1);
        
        $(".msgRendimientoCeramica").on("click", ingresarRendimientoCeramica);
        //$(".editarAnchoCeramica").on("click", modificarAnchoCeramica);
        //$(".editarLargoCeramica").on("click", modificarLargoCeramica);
        quitarCapa = true;
      }else{
        shortToast("Primero Debe Ingresar Ancho y Alto");
      }
     

    });




    /*Pinturas*/

    $("#labelEditarPintura").on("click", function(){
    var ancho1 = $("#anchoCeramicaresultado").text();
    var largo1 = $("#largoCeramicaresultado").text();
    if(ancho1 != 0 && largo1 !=0){

      $(".flotantePinturas").css("display", "block");

        //transition effect      
        $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
        $('#mask').fadeTo("fast", 1);
        quitarCapa = true;
        $(".msgRendimientoPintura").on("click", ingresarRendimientoPintura);
      }else{
        shortToast("Primero Debe Ingresar Ancho y Alto");
      }
     

    });

    $("#labelEditarMedidasLadrillo").on("click", function(){
    var ancho2 = $("#anchoCeramicaresultado").text();
    var largo2 = $("#largoCeramicaresultado").text();
    if(ancho2 != 0 && largo2 !=0){

       $(".flotanteLadrillos").css("display", "block");
       $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
       $('#mask').fadeTo("fast", 1);
        quitarCapa = true;
       $(".msgAnchoLadrillo").on("click", ingresarAnchoLadrillo);
       $(".msgLargoLadrillo").on("click", ingresarLargoLadrillo);
       $(".msgEspesor").on("click", ingresarEspesorLadrillo);
      }else{
        shortToast("Primero Debe Ingresar Ancho y Alto");
      }

    });


    $("#labelEditarPisoFlotante").on("click", function(){
    var ancho3 = $("#anchoCeramicaresultado").text();
    var largo3 = $("#largoCeramicaresultado").text();
    if(ancho3 != 0 && largo3 !=0){

       $(".flotantePisos").css("display", "block");
       $('#mask').fadeIn(500);
        //$("#mask").css("opacity", "0.6");      
       $('#mask').fadeTo("fast", 1);
        quitarCapa = true;

      $(".msgRendimientoPiso").on("click", ingresarRendimientoPisos);
      }else{
        shortToast("Primero Debe Ingresar Ancho y Alto");
      }


    });
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



