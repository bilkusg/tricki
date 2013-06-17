/*  Tricki minimal wiki with encryption  version 1.1.0
 *  Copyright (c) 2013 Gary Bilkus
 *  This program is distributed under the terms of the Gnu General Public License
 *  You use this program at your own risk. 
 *
 *--------------------------------------------------------------------------*/
   var webdav_dir;
   var node;
   var currentPage = "empty";
   var password = "";
   var fs; 
   function initall(proto,site,port,directory) {
      fs = new davlib.DavFS();
      fs.initialize(site,port,proto);
       $("header1").hide();
       $("secondDiv").hide();
       webdav_dir = directory;
   }

   function errorsonly(error) {
      if (error) {
        alert('error: ' + error);
      };
   };
   function errorsorcontent(error, content) {
      if ( error ) { 
         alert('new page: ' + currentPage);
         content = "";
         plaincontent = "New Page please update"

      } else {
        try {
        plaincontent = sjcl.decrypt(password,content);
        } catch(err) {
          alert("Invalid password - try again");
          return;
        }
      } 

       node = $("firstDiv");
       node.update(plaincontent);
       fixmarkup();
       $("pageText").value = plaincontent;
       $("header1").show();
   };
   function movetopage(v){
      currentPage = v;
      fs.read(webdav_dir + currentPage + ".w", errorsorcontent);
   }
   function gotopage() {
      movetopage($("gotoPage").value);
   }
   function getstarted() {
      password = $("password").value;
      movetopage('main');
   }
   function fixmarkup() {
      ws = $$('w');
      for(var i = 0;i< ws.length;i++) {
        var welem = ws[i];
        var welemcontent = welem.readAttribute('to');
        var welemtext = welem.innerHTML;
        if ( welemtext === "" ) {
          welemtext = welemcontent;
        }
        welem.replace('<a href="javascript:movetopage(' + "'" + welemcontent + "'" + ');">' + welemtext + '</a>');
      }
   }
   function enc(){
     plaincontent =  $("pageText").value;
     enccontent = sjcl.encrypt(password,plaincontent);
     fs.write(webdav_dir + currentPage + ".w",enccontent,errorsonly);
     node = $("firstDiv");
     node.update(plaincontent);
     fixmarkup();
     $("secondDiv").hide();
   }
   function showSource() {
     $("secondDiv").show();
   }
   function hideSource() {
     $("secondDiv").hide();
   }
