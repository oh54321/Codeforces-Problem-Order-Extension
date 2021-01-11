document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("Z0").addEventListener('click',onclick, false)
    function onclick(){
        var current = document.getElementById("Z0").innerText;
        if (isNaN(parseInt(current))){
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse){
                    var solves = request.sol;
                    document.getElementById("Z0").innerText = solves[0];
                }

            );
            
        }
        else{
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse){
                    var solves = request.sol;
                    document.getElementById("Z0").innerText = problems[0];
                }

            );
        }
    }
})

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("Z1").addEventListener('click',onclick, false)
    function onclick(){
        var current = document.getElementById("Z1").innerText;
        if (isNaN(parseInt(current))){
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse){
                    var solves = request.sol;
                    document.getElementById("Z1").innerText = solves[1];
                }

            );
            
        }
        else{
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse){
                    var solves = request.sol;
                    document.getElementById("Z1").innerText = problems[1];
                }

            );
        }
    }
})