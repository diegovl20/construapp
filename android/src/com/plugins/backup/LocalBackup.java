package com.plugins.backup;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
import android.widget.Toast;
           
public class LocalBackup extends CordovaPlugin {

	
  public PluginResult execute(String action, JSONArray args, String callbackId) {
	        Log.e("ATENCION", action);


             try {
                     JSONObject jo   = args.getJSONObject(0);
                     String pkg              = jo.getString("com.proyecto.construApp");
                     String dest             = jo.getString("files/respaldo.txt");
            	     Log.d("ATENCION", action);
            	     Log.d("ATENCION", pkg);
            	     Log.d("ATENCION", dest);
                     //Log.e("Web Console", action);
                     try {
                             if( action.equals("backup")){
                                     goBackup(pkg, dest);
                             } else {
                                     goRestore(pkg, dest);
                             }
                     } catch (FileNotFoundException e) {
                             // TODO Auto-generated catch block
                             e.printStackTrace();
                             Log.d("filenotfound",e.getMessage());
                             
                     }
                     return new PluginResult(PluginResult.Status.OK);
             } catch (JSONException e) {
                     return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
             }
     }

     private boolean goBackup(String strPkg, String strOut) throws FileNotFoundException{
             String DBPATH   = "/data/data/"  + strPkg + "/app_database/file__0/";
             String DBNAME   = "0000000000000001.db";
             String myPath   = DBPATH + DBNAME;
             Boolean result  = false;
             //Open your local db as the input stream
    
             InputStream myInput = new FileInputStream(myPath);
    
             // Path to the just created empty db
             String outFileName      = strOut;
    
             //Open the empty db as the output stream
             OutputStream myOut;
             try {
                 myOut = new FileOutputStream(outFileName);
                 //transfer bytes from the inputfile to the outputfile
                 byte[] buffer       = new byte[1024];
                 int length;
                 while ((length      = myInput.read(buffer))>0){
                         myOut.write(buffer, 0, length);
                 }
                 //Close the streams
                 myOut.flush();
                 myOut.close();
                 myInput.close();
                 result = true;
         } catch (FileNotFoundException e) {
             // Auto-generated catch block
             e.printStackTrace();
             result  = false;
         } catch (IOException e) {
             // Auto-generated catch block
             e.printStackTrace();
             result  = false;
         }
             return result;
     }
     private boolean goRestore(String strPkg, String strIn) throws FileNotFoundException{
             String DBPATH   = "/data/data/"  + strPkg + "/app_database/file__0/";
             String DBNAME   = "0000000000000001.db";
             String myPath   = DBPATH + DBNAME;
             Boolean result  = false;
             //Open your local db as the input stream
            
             InputStream myInput = new FileInputStream(strIn); //myPath);
    
             // Path to the just created empty db
             String outFileName      = myPath; //strIn;
    
             //Open the empty db as the output stream
             OutputStream myOut;
             try {
                 myOut = new FileOutputStream(outFileName);
                 //transfer bytes from the inputfile to the outputfile
                 byte[] buffer       = new byte[1024];
                 int length;
                 while ((length      = myInput.read(buffer))>0){
                         myOut.write(buffer, 0, length);
                 }
                 //Close the streams
                 myOut.flush();
                 myOut.close();
                 myInput.close();
                 result = true;
         } catch (FileNotFoundException e) {
             // Auto-generated catch block
             e.printStackTrace();
             result  = false;
         } catch (IOException e) {
             // Auto-generated catch block
             e.printStackTrace();
             result  = false;
         }
             return result;
     }
	

}
