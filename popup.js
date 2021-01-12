var problems = [];
var solves = [];
// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById("Z0").addEventListener('click',onclick, false)
//     function onclick(){
//         var current = document.getElementById("Z0").innerText;
//         if (isNaN(parseInt(current))){
//             chrome.runtime.onMessage.addListener(
//                 function(request, sender, sendResponse){
//                     var solves = request.sol;
//                     document.getElementById("Z0").innerText = solves[0];
//                 }

//             );
            
//         }
//         else{
//             chrome.runtime.onMessage.addListener(
//                 function(request, sender, sendResponse){
//                     var solves = request.sol;
//                     document.getElementById("Z0").innerText = problems[0];
//                 }

//             );
//         }
//     }
// })

// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById("Z1").addEventListener('click',onclick, false)
//     function onclick(){
//         var current = document.getElementById("Z1").innerText;
//         if (isNaN(parseInt(current))){
//             chrome.runtime.onMessage.addListener(
//                 function(request, sender, sendResponse){
//                     var solves = request.sol;
//                     document.getElementById("Z1").innerText = solves[1];
//                 }

//             );
            
//         }
//         else{
//             chrome.runtime.onMessage.addListener(
//                 function(request, sender, sendResponse){
//                     var solves = request.sol;
//                     document.getElementById("Z1").innerText = problems[1];
//                 }

//             );
//         }
//     }
// })
 // WHY IS IT NOT RECEIVING MESSAGE


// for(var j = 0;j<problems.length;j++){
    var button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'wait darn';
    button.className = 'btn-styled';
    document.addEventListener('DOMContentLoaded', function(){
        button.addEventListener('click', onclick, false)
        function onclick(){
            var current = button.innerText;
            if (isNaN(parseInt(current))){
                
                // chrome.runtime.onMessage.addListener(
                //     function(request, sender, sendResponse){
                //         var solves = request.sol;
                //         document.getElementById("Z0").innerText = solves[0];
                //     }

                // );        
                chrome.runtime.onMessage.addListener(
                    function(request, sender, sendResponse){
                        solves = request.sol;
                        problems = request.pro;
                        button.innerText = solves[0];
                    }
                
                );
                
            }
            else{
                chrome.runtime.onMessage.addListener(
                    function(request, sender, sendResponse){
                        solves = request.sol;
                        problems = request.pro;
                        button.innerText = problems[0];
                    }
                
                );
                // chrome.runtime.onMessage.addListener(
                //     function(request, sender, sendResponse){
                //         var solves = request.sol;
                //         document.getElementById("Z0").innerText = problems[0];
                //     }

                // );
                
            }
        }
    }, false);
    document.body.appendChild(button);
// }