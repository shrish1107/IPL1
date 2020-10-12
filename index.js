const fs=require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunsPerTeam = require("./ipl/extraRunsPerTeam");
const eco = require("./ipl/eco");
const tenEconomicalBowler2015 = require("./ipl/topTenEconomicalBowler2015");
const topTenMostUsedVenue=require("./ipl/topTenMostUsedVenue");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";



function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {

      let result = matchesPlayedPerYear(matches);
      
      let result2= matchesWonByEachTeam(matches);

      let result3=extraRunsPerTeam(matches,deliveries);
      let result4=tenEconomicalBowler2015(matches,deliveries);
      let result5=topTenMostUsedVenue(matches);
      let result6=eco(matches,deliveries);
      saveMatchesPlayedPerYear(result,result2,result3,result4,result5,result6);


      });
    });
}


function saveMatchesPlayedPerYear(result,result2,result3,result4,result5,result6) {
  var jsonData ={
    matchesPlayedPerYear: result,matchesWonByEachTeam: result2,extraRunsPerTeam:result3,topTenEconomicalBowlerData:result4,storyData:result5,dynamicEconomicalBowlersData:result6
  };
  console.log("working");
  jsonData = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonData, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();