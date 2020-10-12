function eco(matches,deliveries)
{
    var result={};
    //var ids=[];
    for(let match of matches)
    {
        // if(match.season==2015)
        // {
        //     ids.push(match.id);
        // }
   // }
   // console.log(ids);
    for(let delivery of deliveries)
    {
        if(match.id==delivery.match_id)
        {
           // console.log(delivery.match_id);
           if(result[match.season])
           {
            if(result[match.season][delivery.bowler])
            {
                if(delivery.wide_runs==0&&delivery.noball_runs==0)
                {
                    result[match.season][delivery.bowler]["balls"]++;   
                }
                result[match.season][delivery.bowler]["runs"]+=parseInt(delivery.wide_runs)+parseInt(delivery.noball_runs)+parseInt(delivery.batsman_runs);
            }
            else
            {
                result[match.season][delivery.bowler]={};
                result[match.season][delivery.bowler]["runs"]=parseInt(delivery.wide_runs)+parseInt(delivery.noball_runs)+parseInt(delivery.batsman_runs);
                if(delivery.wide_runs==0&&delivery.noball_runs==0)
                {
                    result[match.season][delivery.bowler]["balls"]=1;   
                }
                else
                {
                    result[match.season][delivery.bowler]["balls"]=0; 
                }
            }
        }
        else
        {
            result[match.season]={};
        }
        }
    }

}
// for(let item in result)
// {
//     for(let items in result[item])
//     {
//     console.log(result[item][items]["runs"]);
//     }
   
// }
//console.log(result["2019"]['DL Chahar']);
var economyRate={};
var arr=[];
var newResult={};
for(let item in result)
{
  //  newResult[item]={};
   // {
for(let items in result[item])
{
    //newResult[item]={};
    economyRate[items]=parseFloat(result[item][items]["runs"]/(result[item][items]["balls"]/6)).toFixed(2);
    arr.push([item,items,economyRate[items]]);
   // newResult[item]=arr;
}
//newResult[item]=arr;
    //}
//     else
//     {
//         newResult[item]={};
//         for(let items in result[item])
// {
//     economyRate[items]=parseFloat(result[item][items]["runs"]/(result[item][items]["balls"]/6)).toFixed(2);
//     arr.push([items,economyRate[items]]);
// }
// newResult[item]=arr;
//     }
}
//console.log(arr);
arr.sort(function(a, b) {
    return a[2] - b[2];
  });
//console.log(arr);
// var finalResult={};
// for (let index = 0; index < 10; index++) {
//     finalResult[arr[index][0]]=parseFloat(arr[index][1]);
    
// }
// console.log(finalResult);
for(let data of arr)
{
    if(newResult[data[0]])
    {
     if(Object.keys(newResult[data[0]]).length<10)   
        newResult[data[0]][data[1]]=parseFloat(data[2]);
    }

    else
    {
        newResult[data[0]]={};
        newResult[data[0]][data[1]]=parseFloat(data[2]);
    }
}
return newResult;
}
module.exports = eco;