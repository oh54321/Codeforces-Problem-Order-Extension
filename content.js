var problems = [];
var solves = [];
var roundNum = -1;
var doc, arr1, arr2, st1, st2;
doc = "";
var re1 = /"id":\d+/g;
var re2 = /"phase":"\w+/g;
const Http1 = new XMLHttpRequest();
const url1='https://codeforces.com/api/contest.list';
Http1.open("GET", url1);
Http1.send();
const Http2 = new XMLHttpRequest();
var url2= '';
var ind = 0;
Http1.onreadystatechange = (e) => {
    if (Http1.readyState == 4 && Http1.status == 200){
      doc = Http1.responseText;
      actualList = JSON.parse(doc).result;
      var i = 0;
      for(i = 0;i<actualList.length;i++){
        if (actualList[i].phase == "FINISHED"){
          break;
        }
      }
      var desiredContest = actualList[i].id;
      url2 = 'https://codeforces.com/api/contest.status?contestId='.concat(desiredContest.toString());

      Http2.open("GET", url2);
      Http2.send();
      Http2.onreadystatechange = (e) => {
        if (Http2.readyState == 4 && Http2.status == 200){
          doc = Http2.responseText;
          actualList = JSON.parse(doc).result;
          var i = 0;
          var probs = [];
          var solveCount = [];
          for(i=0;i<actualList.length;i++){
            if (!probs.includes(actualList[i].problem.index)){
              probs.push(actualList[i].problem.index);
              solveCount.push(0);
            }
          }
          probs.sort();
          i = 0;
          for(i=0;i<actualList.length;i++){
            if (actualList[i].verdict == 'OK'){
              var j =0;
              for(j=0;j<probs.length;j++){
                if (probs[j] == actualList[i].problem.index){
                  break;
                }
              }
              solveCount[j] = solveCount[j]+1;
            }
          }
          for(i=0;i<probs.length;i++){
            alert(probs[i].concat(": ", solveCount[i].toString()));
          }

        }
        else if (Http2.readyState == 4){
          alert("Error");
        }

      }
    }
    else if (Http1.readyState == 4){
      alert("Error");
    }
    

    // while(roundNum == -1)
    //   {
    //       //alert(ind);
    //       try{
    //       arr1 = re1.exec(doc);
    //       arr2 = re2.exec(doc);
          
    //       st1 = arr1[0].substring(5);
    //       st2 = arr2[0].substring(9);
    //       if(!(st2 == "BEFORE"))
    //       {
    //           roundNum = parseInt(st1);
    //       }
    //       ind++;
    //     }
    //     catch{}
          
    //   }
    //   alert(roundNum);
  }
  
