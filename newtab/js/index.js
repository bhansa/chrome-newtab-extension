(function(){

            //generate clock animations
            var now       = new Date(),
                hourDeg   = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
                minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
                secondDeg = now.getSeconds() / 60 * 360,
                stylesDeg = [
                    "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                    "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                    "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
                ].join("");

            document.getElementById("clock-animations").innerHTML = stylesDeg;
            
            //loading JSON for background image
            mas_url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fwww.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1%26mkt%3Den-US%22&format=json&callback=";
            getVal = function (data) {
              
                img_url = "https://bing.com"+data.query.results.json.images.url;
                };
            $.getJSON(mas_url, function(data) {
              getVal(data);
              });
              
            
            //global var
            var name;
            
            
            //getting and setting name in chrome 
            //first check
            function getto(){
              name = chrome.storage.sync.get("name",function(result){
                  name = result.name;
                  //alert(name);      
                        
              });
              return name;
            }
            
            function setto(name){
              chrome.storage.sync.clear();
             chrome.storage.sync.set({'name': name}, function() {
            // Notify that we saved.
            console.log('Settings saved');
            });
          }
         
         if((x=getto())!==null){
              //do nothing
              //alert(name);
            }
            else{
                do{
                name = prompt("Your good name please?");
                }while(name.length>20 || name.length<=0 && !alert("Name should be less than 20 characters."));
                alert("Welcome "+name);
              setto(name);
            }
            document.getElementById("name").innerHTML = name;
            
            
            //working on autocomplete
            

        })();