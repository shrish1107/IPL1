let utilsfile = require("./functions");
let reduce = utilsfile.Reduce;
let map = utilsfile.Map;
let filter = utilsfile.Filter;
function tenEconomicalBowler2015(match, deliveries) {
  let economyOfBowler = {};
  let matches2015 = filter(match, a => a["season"] == 2015);
  let matchId2015 = map(matches2015, x => x["id"]);

  economyOfBowler = reduce(
    deliveries,
    (matchdetail, delivery) => {
      if (matchId2015.includes(delivery["match_id"])) {
        if (delivery["bowler"] in matchdetail) {
          if (delivery["wide_runs"] != 0 || delivery["noball_runs"] != 0) {
          } else {
            matchdetail[delivery["bowler"]]["balls"]++;
          }
          matchdetail[delivery["bowler"]]["run"] =
            parseFloat(matchdetail[delivery["bowler"]]["run"]) +
            parseFloat(delivery["noball_runs"]) +
            parseFloat(delivery["wide_runs"]) +
            parseFloat(delivery["batsman_runs"]);
        } else {
          matchdetail[delivery["bowler"]] = {
            run:
              parseFloat(delivery["noball_runs"]) +
              parseFloat(delivery["wide_runs"]) +
              parseFloat(delivery["batsman_runs"]),
            balls: 1
          };
        }
      }
      return matchdetail;
    },
    economyOfBowler
  );
 

  let bowlerEconomy = [];
  for (let bowler in economyOfBowler) {
    economyOfBowler[bowler]["economy"] =
      (6 * parseFloat(economyOfBowler[bowler]["run"])) /
      parseFloat(economyOfBowler[bowler]["balls"]);

    bowlerEconomy.push([bowler, economyOfBowler[bowler]["economy"]]);
  }
  bowlerEconomy.sort(function(a, b) {
    return a[1] - b[1];
  });
  topTenLeastEconomyBowler2015 = bowlerEconomy.slice(0, 10);
  let economyResult = {};
  for (let a in topTenLeastEconomyBowler2015) {
    economyResult[topTenLeastEconomyBowler2015[a][0]] =
    parseFloat(topTenLeastEconomyBowler2015[a][1].toFixed(2));
  }

  return economyResult;
  
}
module.exports = tenEconomicalBowler2015;
