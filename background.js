var prevproblems = [];
var roundNum;
var currentlyTracking = false;
const contestListRequest = new XMLHttpRequest();
const submissionListRequest = new XMLHttpRequest();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var url = request.url; //Checks if codeforces URL is a URL for a contest
    try{
        if(!currentlyTracking)
        {
            roundNum = parseInt(url.substring(31)); //Checks if url end in /contests/[number]
            currentlyTracking = true;
            checkOngoing(); 
        }
    }
    catch(err) {
        //Not contest URL
    }
})

function checkOngoing()
{
    const listURL='https://codeforces.com/api/contest.list'; //Sends request for list of contests
    contestListRequest.open("GET", listURL);
    contestListRequest.send();
}

function tallyProblems()
{
    const contestURL='https://codeforces.com/api/contest.status?contestId='+roundNum; //Retrieves contest submissions
    submissionListRequest.open("GET", contestURL);
    submissionListRequest.send();
}

function reset()
{
    currentlyTracking = false; //Stops tracking contest, forgets about problems
    prevproblems = [];
}

contestListRequest.onreadystatechange =function(){
    if(this.readyState == 4) //Waits until list of contests is recieved
    {
    doc = contestListRequest.responseText.substring(1);
    var keepChecking = true;
    var contestRE = /{.*?}/gs; //Regexs used for codeforces contest objects
    var idRE = /"id":\d+/s;
    var phaseRE = /"phase":"\w+/s;
    while(keepChecking)
        {
            var contestItem = contestRE.exec(doc)[0];
            id = idRE.exec(contestItem)[0].substring(5);
            phase = parseInt(phaseRE.exec(contestItem)[0].substring(9));
            if(id == roundNum)
            {
                keepChecking = false;
                if(!(phase == "BEFORE")) //Will change to "coding" to check if contest is ongoing
                {
                    tallyProblems();
                }
                else
                {
                    reset(); //Contest is not ongoing, stops tracking if currently tracking problem order
                }
            }
        }
    }
}

submissionListRequest.onreadystatechange =function(){
    if(this.readyState == 4) //Waits until list of submissions is recieved
    {
        doc = submissionListRequest.responseText;
        var solves = [];
        var problems = [];

        var partTypeRE = /"participantType":"\w+/gs; //Regexes for codeforces submission objects
        var verdictRE = /"verdict":"\w+/gs;
        var problemRE = /"index":"\w+/gs;
        arr1 = partTypeRE.exec(doc);
        arr2 = verdictRE.exec(doc);
        arr3 = problemRE.exec(doc);
        while(arr1 != null) //Runs until there are no more submissions to check
        {
            partType = arr1[0].substring(19);
            verdict = arr2[0].substring(11);
            problem = arr3[0].substring(9);
            if(partType == "CONTESTANT" && verdict == "OK")
            {
                var notAdded = true; 
                for(i = 0; i < problems.length; i++) //Goes through list of problems, checking if equal to current problem
                {
                    if(problems[i] == problem) //Problem has been added to list
                    {
                        solves[i]++;
                        notAdded = false;
                    }
                }
                if(notAdded) //Problem has not been added to list, so adds it to list
                {
                    problems.push(problem);
                    solves.push(1);
                }
            }
            arr1 = partTypeRE.exec(doc); //Iterates to next submission
            arr2 = verdictRE.exec(doc);
            arr3 = problemRE.exec(doc);
        }
        sort(solves, problems); //Sorts based on number of solves
        var alerted = false;//Boolean for whether we will print out order
        if(prevproblems.length == 0) //If this is the first time order of problems is checked
        {
            alerted = true; //We will print out order
            for(i = 0; i < problems.length; i++)
            {
                prevproblems.push(problems[i]); //Adds each problem to list of previous problems
            }
        }
        else
        {
            for(i = 0; i < problems.length; i++)
            {
                if(!(problems[i] == prevproblems[i])) //If the previous and current problem orders are different
                {
                    alerted = true; //We will print out order
                }
                prevproblems[i] = problems[i]; //Stores current order in previous problem orders
            }
        }
        if(alerted)
        {
            alert("Problem Order: " + problems); //Prints out new problem order
        }
        setTimeout(function(){}, 10000); //Waits 10 seconds to not constantly be making requests
        checkOngoing(); //Checks if contest has finished, if not does same thing
    }
}
function sort(arr1, arr2) { 
    let n = arr1.length; //Selection sort
    let max;
    let tmp;
    for(let i = 0; i < n; i++) {
        max = i;
        for(let j = i+1; j < n; j++){
            if(arr1[j] > arr1[max]) {
                max=j; 
            }
         }
         if (max != i) {
             tmp = arr1[i]; 
             arr1[i] = arr1[max];
             arr1[max] = tmp;
             tmp = arr2[i]; 
             arr2[i] = arr2[max];
             arr2[max] = tmp;        
        }
    }
}