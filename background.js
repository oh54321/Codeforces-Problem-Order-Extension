var problems = [];
var solves = [];
var roundNum = -1;
var doc, arr1, arr2, arr3, st1, st2, b;
doc = "";
var re1 = /"id":\d+/g;
var re2 = /"phase":"\w+/g;
var re3 = /"participantType":"\w+/g;
var re4 = /"verdict":"\w+/g;
var re5 = /"index":"\w+/g;
const Http1 = new XMLHttpRequest();
const url1='https://codeforces.com/api/contest.list';
Http1.open("GET", url1);
Http1.send();
var ind = 0;
const Http2 = new XMLHttpRequest();
Http1.onreadystatechange =function(){
    if(this.readyState == 4)
    {
    doc = Http1.responseText;
    while(roundNum == -1)
        {
            arr1 = re1.exec(doc);
            arr2 = re2.exec(doc);
            st1 = arr1[0].substring(5);
            st2 = arr2[0].substring(9);
            if(!(st2 == "BEFORE"))
            {
              roundNum = parseInt(st1);
            }
        }
        alert("Most Recent Contest:" + roundNum);
        const url2='https://codeforces.com/api/contest.status?contestId='+roundNum;
        Http2.open("GET", url2);
        Http2.send();
    }
}

Http2.onreadystatechange =function(){
    if(this.readyState == 4)
    {
        doc = Http2.responseText;
        alert(doc);
        arr1 = re3.exec(doc);
        arr2 = re4.exec(doc);
        arr3 = re5.exec(doc);
        while(arr1 != null)
        {
            st1 = arr1[0].substring(19);
            st2 = arr2[0].substring(11);
            st3 = arr3[0].substring(9);
            if(st1 == "CONTESTANT" && st2 == "OK")
            {
                b = true;
                for(i = 0; i < problems.length; i++)
                {
                    if(problems[i] == st3)
                    {
                        solves[i]++;
                        b = false;
                    }
                }
                if(b)
                {
                    problems.push(st3);
                    solves.push(1);
                }
            }
            arr1 = re3.exec(doc);
            arr2 = re4.exec(doc);
            arr3 = re5.exec(doc);
        }
        sort(solves, problems);
        alert("Problem Order:" + problems);
        alert("Solves:" + solves);
    }
}
function sort(arr1, arr2) { 
    let n = arr1.length;
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