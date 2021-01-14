var problems = [];
var solves = [];
 // ok for some reason it doesn't receive future messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   problems = request.pro;
   solves = request.sol;
})

    var button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'wait darn';
    button.className = 'btn-styled';
    document.addEventListener('DOMContentLoaded', function(){
        button.addEventListener('click', onclick, false)
        function onclick(){
            var current = button.innerText;
            if (isNaN(parseInt(current))){
                button.innerText = solves[0];               
            }
            else{
                button.innerText = problems[0];
                
            }
        }
    }, false);
    document.body.appendChild(button);

    var button1 = document.createElement('button');
    button1.type = 'button';
    button1.innerText = 'wait darn';
    button1.className = 'btn-styled';
    document.addEventListener('DOMContentLoaded', function(){
        button1.addEventListener('click', onclick, false)
        function onclick(){
            var current = button1.innerText;
            if (isNaN(parseInt(current))){
                button1.innerText = solves[1];               
            }
            else{
                button1.innerText = problems[1];
                
            }
        }
    }, false);
    document.body.appendChild(button1);

    var button2 = document.createElement('button');
    button2.type = 'button';
    button2.innerText = 'wait darn';
    button2.className = 'btn-styled';
    document.addEventListener('DOMContentLoaded', function(){
        button2.addEventListener('click', onclick, false)
        function onclick(){
            var current = button2.innerText;
            if (isNaN(parseInt(current))){
                button2.innerText = solves[2];               
            }
            else{
                button2.innerText = problems[2];
                
            }
        }
    }, false);
    document.body.appendChild(button2);
// }
