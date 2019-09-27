var request = require("request");
const throttledQueue = require('throttled-queue')
let throttle = throttledQueue(15, 2000) // 15 times per second

for(var i=0;i<10000;i++){
   throttle(function(){
    var authenticate = {method: 'POST',
                        url: 'http://localhost:8080/DialogoSOA-1.0/DialogoApi/security/authenticate',
                        headers:{ 
                        'username':'andrea.lugo',
                        'password':'test',    
                        'Content-Type': 'application/json'}
                        };
    request(authenticate, function (error, response, body) {
        if (error) throw new Error(error); 
        var token = response.headers["authorization"];
        var valid = {method: 'POST',
                    url: 'http://localhost:8080/DialogoSOA-1.0/DialogoApi/security/valid',
                    headers:{
                    'Authorization':'Bearer ' + token,
                    'Content-Type': 'application/json'}
                    };                    
        request(valid, function (error, response, body) {
            if (error) throw new Error(error);   
                            
            var token = response.headers.authorization;            
            var modulos = { method: 'GET',
                            url: 'http://localhost:8080/DialogoSOA-1.0/DialogoApi/Administracion/DiasFestivos',
                            headers:{ 
                            'Authorization':'Bearer ' + token,
                            'Content-Type': 'application/json'}
                            };                            
            request(modulos, function (error, response, body) {
                if (error) throw new Error(error);                
  
                console.log(Date());
            });
        });
    });
    })
}
console.log(Date());