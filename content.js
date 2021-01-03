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
var ind = 0;
Http1.onreadystatechange = (e) => {
    doc = Http1.responseText;
    alert(doc);

    while(roundNum == -1)
      {
          //alert(ind);
          try{
          arr1 = re1.exec(doc);
          arr2 = re2.exec(doc);
          
          st1 = arr1[0].substring(5);
          st2 = arr2[0].substring(9);
          if(!(st2 == "BEFORE"))
          {
              roundNum = parseInt(st1);
          }
          ind++;
        }
        catch{}
          
      }
      alert(roundNum);
  }