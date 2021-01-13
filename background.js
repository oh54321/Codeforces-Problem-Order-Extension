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
            tallyProblems(); 
        }
    }
    catch(err) {
        //Not contest URL
    }
})

function tallyProblems()
{
    const contestURL='https://codeforces.com/api/contest.standings?contestId='+roundNum;
    contestListRequest.open("GET", contestURL);
    contestListRequest.send();
}

function reset()
{
    currentlyTracking = false; //Stops tracking contest, forgets about problems
    prevproblems = [];
}

contestListRequest.onreadystatechange =function(){
    if(this.readyState == 4) //Waits until list of contests is recieved
    {
    var contestStandings = JSON.parse(contestListRequest.responseText).result; //Returns json object of contest standings
    if(contestStandings.contest.phase == "BEFORE") //Will change to "coding", right now just ends it if contest hasnt started
    {
        reset(); //Reset values
        return;
    }
    var solves = [];  //Number of solves of problems, problem problems[i] has solves[i] solves
    var problems = []; //Names of problems
    var i, j;
    for(i = 0; i < contestStandings.problems.length; i++) //Loops through problems, adding names of problems (e. g., A, B, C1, etc.)
    {
        problems.push(contestStandings.problems[i].index);
        solves.push(0);
    }
    for(i = 0; i < contestStandings.rows.length; i++) //Loops through contestants
    {
        for(j = 0; j < contestStandings.rows[i].problemResults.length; j++) //Loops through problem data of contestant
        {
            if(contestStandings.rows[i].problemResults[j].points != 0.0) //Checks if contestant solved each problem
            {
                solves[j] += 1;
            }
        }
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
        chrome.runtime.sendMessage({sol: solves, pro: problems});
        alert("Problem Order: " + problems); //Prints out new problem order
    }
    chrome.alarms.create("XMLAlarm", {delayInMinutes: 1}); //Waits for a minute, tallies problem results again
    }
}

chrome.alarms.onAlarm.addListener(function( alarm ) {
    chrome.alarms.clear("XMLAlarm"); //Alarm has already fired, sets it off
    tallyProblems(); //Tallies problem results again
  });

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