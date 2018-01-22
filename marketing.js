    $(document).ready(function () {
        if(localStorage.getItem('user'))
        {
             var Userdb3=openDatabase("UserDatabase","1.0","My user Login DataBase",2*1024*1024);
             $( "#products h2" ).text( "Welcome back "+localStorage.getItem('user') );
          /*  
           
    Userdb3.transaction(function(tx){
						tx.executeSql('SELECT * FROM Products where vendorid="1"',[], function(tx, results){
                                                    var len = results.rows.length;
    					for( var i=0;i<len;i++){
                                             li = $('<li id='+results.rows.item(i).id+' data-icon="false" onclick="dynamic(this)">');
                li.append("<a href='#poper' data-rel='popup'><img src="+results.rows.item(i).imgurl+"> "+results.rows.item(i).name+"<br>&nbsp&nbsp&nbsp<input type='button' id="+results.rows.item(i).id+" data-icon='plus' value='Add To Cart'></a>");
                $('#lstviews').append(li);
    						}
                                                $('#lstviews').listview('refresh');
                   });
               }); */
         Userdb3.transaction(function(tx){
						tx.executeSql('SELECT productid FROM cart where userid="'+localStorage.getItem("userid")+'"',[], function(tx, results){
  
                                                    var len = results.rows.length;
    					for( var i=0;i<len;i++){
                                            tx.executeSql('SELECT * FROM Products where id="'+results.rows.item(i).productid+'"',[], function(tx, results1){
                                                    var len2 = results1.rows.length;
                                                    var li;
    					for( var i=0;i<len2;i++){
                                            li = $('<li id='+results1.rows.item(i).id+' data-icon="false" onclick="dynamic(this)">');
            li.append("<a href='#poper' data-rel='popup'><img src="+results1.rows.item(i).imgurl+"> "+results1.rows.item(i).name+"<br>Price:"+results1.rows.item(i).cost+"<br>Remaining:"
                    +results1.rows.item(i).remaining+"&nbsp&nbsp&nbsp<button id="+results1.rows.item(i).id+">Delete</button></a>");
                                             $('#lstcart').append(li);
    						}
                                                $('#lstcart').listview('refresh');
                   });
    						}
                                                $('#lstcart').listview('refresh');
                   });
               });
        }else{
            window.location.href="login.html";
        }
        //location.reload();
});

$(document).on('click', '#lstcart button', function(e){
           
           deleteitem(this.id);
          location.reload();
           
                });
function deleteitem(id) {
    var Userdb3=openDatabase("UserDatabase","1.0","My user Login DataBase",2*1024*1024);
    Userdb3.transaction(function(tx){
						tx.executeSql('delete from Cart where rowid in(select max(rowid) from Cart where userid="'+localStorage.getItem("userid")+'" and productid="'+id+'" group by productid,userid)');
                                                tx.executeSql('update Products set remaining=remaining+1 where id="'+id+'"');
						});
    $('#lstcart').listview('refresh');
}

$(document).on('click', '#lstviews input[type=button]', function(e){    
           addToCart(this.id)
                });
function addToCart(id) {
    var Userdb3=openDatabase("UserDatabase","1.0","My user Login DataBase",2*1024*1024);
    Userdb3.transaction(function(tx){
						tx.executeSql('INSERT INTO Cart(productid,userid) values("'+id+'","'+localStorage.getItem("userid")+'")');
						});
    
    Userdb3.transaction(function(tx){
						tx.executeSql('update Products set remaining=remaining-1 where id="'+id+'"');
						});
}

function shirts(obj)
{
    $('#lstviews').empty();
     var Userdb3=openDatabase("UserDatabase","1.0","My user Login DataBase",2*1024*1024);
    Userdb3.transaction(function(tx){
						tx.executeSql('SELECT * FROM Products where vendorid="1"',[], function(tx, results){
                                                    var len = results.rows.length;
    					for( var i=0;i<len;i++){
                                             li = $('<li id='+results.rows.item(i).id+' data-icon="false" onclick="dynamic(this)">');
                li.append("<a href='#poper' data-rel='popup'><img src="+results.rows.item(i).imgurl+"> "+results.rows.item(i).name+"<br>&nbsp&nbsp&nbsp<input type='button' id="+results.rows.item(i).id+" data-icon='plus' value='Add To Cart'></a>");
                $('#lstviews').append(li);
    						}
                                                $('#lstviews').listview('refresh');
                   });
               });
}

function pants(obj)
{
    $('#lstviews').empty();
     var Userdb3=openDatabase("UserDatabase","1.0","My user Login DataBase",2*1024*1024);
    Userdb3.transaction(function(tx){
        
						tx.executeSql('SELECT * FROM Products where vendorid="2"',[], function(tx, results){
                                                    var len = results.rows.length;
    					for( var i=0;i<len;i++){
                                             li = $('<li id='+results.rows.item(i).id+' data-icon="false" onclick="dynamic(this)">');
                li.append("<a href='#poper' data-rel='popup'><img src="+results.rows.item(i).imgurl+"> "+results.rows.item(i).name+"<br>&nbsp&nbsp&nbsp<input type='button' id="+results.rows.item(i).id+" data-icon='plus' value='Add To Cart'></a>");
                $('#lstviews').append(li);
    						}
                                                $('#lstviews').listview('refresh');
                   });
               });
}

function logout()
    {
       localStorage.clear(); 
       window.location.href="login.html";

    }