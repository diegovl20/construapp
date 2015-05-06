// change to your database
var db = window.openDatabase("ConstruApp", "1.0", "DB ConstruApp", 200000); // 5*1024 is size in bytes
var fs;
var dir;
 var l;
// file fail function
function failFile(error) {
 console.log("PhoneGap Plugin: FileSystem: Message: file does not exists, isn't writeable or isn't readable. Error code: " + error.code);
 alert('No backup is found, or backup is corrupt.');
}
 
// start backup (trigger this function with a button or a page load or something)
function startBackup() {
 navigator.notification.confirm('¿Desea realizar una copia de seguridad de su información en la memoria interna del teléfono?', onConfirmBackup, 'Backup', ['Si','Cancel']);
}
 
// backup confirmed
function onConfirmBackup(button) {

 if(button==1) {
  backupContent();
 }
}

//var tabla_proyecto = "CREATE TABLE IF NOT EXISTS proyecto( id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT, id_tipo_proyecto INTEGER, fecha DATE, fotografia TEXT, largo FLOAT, ancho FLOAT, superficie_total FLOAT, total_cajas FLOAT, precio_total INTEGER,id_ceramicas INTEGER, id_pinturas INTEGER, id_alfombras, total_litros INTEGER, id_ladrillos INTEGER, total_ladrillos INTEGER, pintura_bool BOOLEAN, ladrillo_bool BOOLEAN, alfombra_bool BOOLEAN, ceramica_bool BOOLEAN, nombre_proyecto TEXT, tipo_proyecto TEXT, precio_frague INTEGER, precio_pegamento INTEGER, total_frague INTEGER, total_pegamento INTEGER, rendimiento_caja FLOAT, rendimiento_pintura FLOAT, anchoLadrillo FLOAT, largoLadrillo FLOAT, espesorLadrillo FLOAT, ladrillosEnUnM2 INTEGER, total_cajas_pisos INTEGER, rendimiento_caja_pisos FLOAT, cal_ladrillo FLOAT, arena_ladrillo FLOAT, cemento_ladrillo FLOAT, espuma_niveladora FLOAT, FOREIGN KEY(id_tipo_proyecto) references tipo_proyecto(id_tipo_proyecto))";
 
// backup content



function backupContent() {
 db.transaction(
  function(transaction) {
   transaction.executeSql(
    // change this according to your table name
    'SELECT * FROM proyecto;', null,
    function (transaction, result) {
     if (result.rows.length > 0) {
      var tag = '{"items":[';
      for (var i=0; i < result.rows.length; i++) {
       var row = result.rows.item(i);
       // expand and change this according to your table attributes
       tag = tag + '{"id_proyecto":"' + row.id_proyecto + '","id_tipo_proyecto":"' + row.id_tipo_proyecto + '","fecha":"' + row.fecha + '", "fotografia":"'+row.fotografia+'", "largo":"'+row.largo+'", "ancho":"'+row.ancho+'", "superficie_total":"'+row.superficie_total+'", "total_cajas":"'+row.total_cajas+'", "precio_total":"'+row.precio_total+'", "id_ceramicas":"'+row.id_ceramicas+'", "id_pinturas":"'+row.id_pinturas+'", "id_alfombras":"'+row.id_alfombras+'", "total_litros":"'+row.total_litros+'", "id_ladrillos":"'+row.id_ladrillos+'", "total_ladrillos":"'+row.total_ladrillos+'", "pintura_bool":"'+row.pintura_bool+'", "ladrillo_bool":"'+row.ladrillo_bool+'", "alfombra_bool":"'+row.alfombra_bool+'", "ceramica_bool":"'+row.ceramica_bool+'", "nombre_proyecto":"'+row.nombre_proyecto+'", "tipo_proyecto":"'+row.tipo_proyecto+'", "precio_frague":"'+row.precio_frague+'", "precio_pegamento":"'+row.precio_pegamento+'", "total_frague":"'+row.total_frague+'", "total_pegamento":"'+row.total_pegamento+'", "rendimiento_caja":"'+row.rendimiento_caja+'", "rendimiento_pintura":"'+row.rendimiento_pintura+'", "anchoLadrillo":"'+row.anchoLadrillo+'", "largoLadrillo":"'+row.largoLadrillo+'", "espesorLadrillo":"'+row.espesorLadrillo+'","ladrillosEnUnM2":"'+row.ladrillosEnUnM2+'", "total_cajas_pisos":"'+row.total_cajas_pisos+'", "rendimiento_caja_pisos":"'+row.rendimiento_caja_pisos+'", "cal_ladrillo":"'+row.cal_ladrillo+'", "arena_ladrillo":"'+row.arena_ladrillo+'", "cemento_ladrillo":"'+row.cemento_ladrillo+'", "espuma_niveladora":"'+row.espuma_niveladora+'"}';
       if (i+1 < result.rows.length) {
        tag = tag + ',';
       }
      }
      tag = tag + ']}';
      
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        //window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(fileSystem) {
        
       // Change the place where your backup will be written
            
       fileSystem.root.getFile("backup.txt", {create: true, exclusive: false}, function(fileEntry) {
         

        fileEntry.createWriter(function(writer) {

         writer.write(tag);
        }, failFile);
       }, failFile);
      }, failFile);
      shortToast("Copia realizado correctamente");
     } else {
      alert("No content to backup.");
     }
    },
    errorHandlerSqlTransaction
   );
  }
 );
}

function respaldarProyectoEliminado(id) {
 db.transaction(
  function(transaction) {
   transaction.executeSql(
    // change this according to your table name
    'SELECT * FROM proyecto where id_proyecto = "'+id+'";', null,
    function (transaction, result) {
     if (result.rows.length > 0) {
        l = storage[key2];
        if(typeof l === 'undefined'){
          var tag = '{"items":[';
        }else{
          tag = ","
        }
      for (var i=0; i < result.rows.length; i++) {
       var row = result.rows.item(i);
       // expand and change this according to your table attributes
       tag = tag + '{"id_proyecto":"' + row.id_proyecto + '","id_tipo_proyecto":"' + row.id_tipo_proyecto + '","fecha":"' + row.fecha + '", "fotografia":"'+row.fotografia+'", "largo":"'+row.largo+'", "ancho":"'+row.ancho+'", "superficie_total":"'+row.superficie_total+'", "total_cajas":"'+row.total_cajas+'", "precio_total":"'+row.precio_total+'", "id_ceramicas":"'+row.id_ceramicas+'", "id_pinturas":"'+row.id_pinturas+'", "id_alfombras":"'+row.id_alfombras+'", "total_litros":"'+row.total_litros+'", "id_ladrillos":"'+row.id_ladrillos+'", "total_ladrillos":"'+row.total_ladrillos+'", "pintura_bool":"'+row.pintura_bool+'", "ladrillo_bool":"'+row.ladrillo_bool+'", "alfombra_bool":"'+row.alfombra_bool+'", "ceramica_bool":"'+row.ceramica_bool+'", "nombre_proyecto":"'+row.nombre_proyecto+'", "tipo_proyecto":"'+row.tipo_proyecto+'", "precio_frague":"'+row.precio_frague+'", "precio_pegamento":"'+row.precio_pegamento+'", "total_frague":"'+row.total_frague+'", "total_pegamento":"'+row.total_pegamento+'", "rendimiento_caja":"'+row.rendimiento_caja+'", "rendimiento_pintura":"'+row.rendimiento_pintura+'", "anchoLadrillo":"'+row.anchoLadrillo+'", "largoLadrillo":"'+row.largoLadrillo+'", "espesorLadrillo":"'+row.espesorLadrillo+'","ladrillosEnUnM2":"'+row.ladrillosEnUnM2+'", "total_cajas_pisos":"'+row.total_cajas_pisos+'", "rendimiento_caja_pisos":"'+row.rendimiento_caja_pisos+'", "cal_ladrillo":"'+row.cal_ladrillo+'", "arena_ladrillo":"'+row.arena_ladrillo+'", "cemento_ladrillo":"'+row.cemento_ladrillo+'", "espuma_niveladora":"'+row.espuma_niveladora+'"}';
       if (i+1 < result.rows.length) {
        tag = tag + ',';
       }
      }
      //tag = tag + ']}';
      



      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        //window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(fileSystem) {
        
       // Change the place where your backup will be written
            
       fileSystem.root.getFile("respaldoEliminados.txt", {create: true, exclusive: false}, function(fileEntry) {
         

        fileEntry.createWriter(function(writer) {

          if(typeof l === 'undefined'){
                writer.write(tag);
                storage[key2] = "listo";
          }else{

              writer.seek(writer.length);
              writer.write(tag);

          }
        }, failFile);
       }, failFile);
      }, failFile);
     } else {
      alert("No content to backup.");
     }
    },
    errorHandlerSqlTransaction
   );
  }
 );
}



function terminarJSON(){
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        //window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(fileSystem) {
        
       // Change the place where your backup will be written
            
       fileSystem.root.getFile("respaldoEliminados.txt", {create: true, exclusive: false}, function(fileEntry) {
         

        fileEntry.createWriter(function(writer) {


              var tag = "]}";
              writer.seek(writer.length);
              writer.write(tag);

        
        }, failFile);
       }, failFile);
      }, failFile);


}


 
// start restore (trigger this function with a button or a page load or something)
function startRestore() {
 navigator.notification.confirm('¿Desea restaurar todos los datos?', onConfirmRestore, 'Restaurar', ['Si','Cancel']);
}
 
// restore confirmed
function onConfirmRestore(button) {
 if(button==1) {
  restoreContent();
 }
}
 
// restore content
function restoreContent() {

  startRestoreContent();

}
 
// actually start restore content
function startRestoreContentEliminados() {
 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

  fileSystem.root.getFile("respaldoEliminados.txt", null, function(fileEntry) {
   fileEntry.file(function(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
     var data = JSON.parse(evt.target.result);
     var items = data.items;
     count = items.length;
     db.transaction(
      function(transaction) {
       $.each(items, function(index, item) {
        transaction.executeSql(
        // change and expand this according to your table name and attributes
        'INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, largo, ancho, superficie_total, total_cajas, precio_total, id_ceramicas, id_pinturas, id_alfombras, total_litros, id_ladrillos, total_ladrillos, pintura_bool, ladrillo_bool, alfombra_bool, ceramica_bool, nombre_proyecto, tipo_proyecto, precio_frague, precio_pegamento, total_frague, total_pegamento, rendimiento_caja, rendimiento_pintura, anchoLadrillo, largoLadrillo, espesorLadrillo, ladrillosEnUnM2, total_cajas_pisos, rendimiento_caja_pisos, cal_ladrillo, arena_ladrillo, cemento_ladrillo, espuma_niveladora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [item.id_proyecto, item.id_tipo_proyecto, item.fecha, item.fotografia, item.largo, item.ancho, item.superficie_total, item.total_cajas, item.precio_total, item.id_ceramicas, item.id_pinturas, item.id_alfombras, item.total_litros, item.id_ladrillos, item.total_ladrillos, item.pintura_bool, item.ladrillo_bool, item.alfombra_bool, item.ceramica_bool, item.nombre_proyecto, item.tipo_proyecto, item.precio_frague, item.precio_pegamento, item.total_frague, item.total_pegamento, item.rendimiento_caja, item.rendimiento_pintura, item.anchoLadrillo, item.largoLadrillo, item.espesorLadrillo, item.ladrillosEnUnM2, item.total_cajas_pisos, item.rendimiento_caja_pisos, item.cal_ladrillo, item.arena_ladrillo, item.cemento_ladrillo, item.espuma_niveladora],
        null
       );
      });
     });
    };
    reader.readAsText(file);
    shortToast("Proyectos recuperados");
   }, failFile);
  }, failFile);
 }, failFile);
}


function startRestoreContent() {
 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
  // Change the place where your backup is placed
  fileSystem.root.getFile("backup.txt", null, function(fileEntry) {
   fileEntry.file(function(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
     var data = JSON.parse(evt.target.result);
     var items = data.items;
     count = items.length;
     db.transaction(
      function(transaction) {
        var numero=1000;
       $.each(items, function(index, item) {
        transaction.executeSql(
        // change and expand this according to your table name and attributes
        'INSERT INTO proyecto (id_proyecto, id_tipo_proyecto, fecha, fotografia, largo, ancho, superficie_total, total_cajas, precio_total, id_ceramicas, id_pinturas, id_alfombras, total_litros, id_ladrillos, total_ladrillos, pintura_bool, ladrillo_bool, alfombra_bool, ceramica_bool, nombre_proyecto, tipo_proyecto, precio_frague, precio_pegamento, total_frague, total_pegamento, rendimiento_caja, rendimiento_pintura, anchoLadrillo, largoLadrillo, espesorLadrillo, ladrillosEnUnM2, total_cajas_pisos, rendimiento_caja_pisos, cal_ladrillo, arena_ladrillo, cemento_ladrillo, espuma_niveladora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [numero, item.id_tipo_proyecto, item.fecha, item.fotografia, item.largo, item.ancho, item.superficie_total, item.total_cajas, item.precio_total, item.id_ceramicas, item.id_pinturas, item.id_alfombras, item.total_litros, item.id_ladrillos, item.total_ladrillos, item.pintura_bool, item.ladrillo_bool, item.alfombra_bool, item.ceramica_bool, item.nombre_proyecto, item.tipo_proyecto, item.precio_frague, item.precio_pegamento, item.total_frague, item.total_pegamento, item.rendimiento_caja, item.rendimiento_pintura, item.anchoLadrillo, item.largoLadrillo, item.espesorLadrillo, item.ladrillosEnUnM2, item.total_cajas_pisos, item.rendimiento_caja_pisos, item.cal_ladrillo, item.arena_ladrillo, item.cemento_ladrillo, item.espuma_niveladora],
        null
       );
        numero++;
      });
     });
    };
    reader.readAsText(file);
    shortToast("Restauracion se ha realizado con éxito.");
   }, failFile);
  }, failFile);
 }, failFile);
}
 
// database sql transaction error message
function errorHandlerSqlTransaction(error) {
  console.error('SQLite - Error code: ' + error.code + ' - Error message: ' + error.message);
  return true;
}
