import { useState } from "react";

const GetRequestCalls = () => {
  const [games, setGames] = useState<any[]>([]);
  // function GetRequestCalls() {}

  const url =
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=146&sportId=1&date=2025-03-23";
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=136&sportId=1&date=2025-10-20";
    // "https://statsapi.mlb.com/api/v1/teams/3276";
    // "https://statsapi.mlb.com/api/v1/teams/138";
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=146&teamId=385&teamId=467&teamId=564&teamId=554&teamId=619&teamId=3276&teamId=4124&teamId=3277&teamId=479&teamId=2127&sportId=1&sportId=21&sportId=16&sportId=11&sportId=13&sportId=16&sportId=21&sportId=12&sportId=21&sportId=14&sportId=16&date=2025-03-03";
    // "https://statsapi.mlb.com/api/v1.1/game/779076/feed/live";
    "https://statsapi.mlb.com/api/v1.1/game/813037/feed/live";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // const allGames = data.dates[0]?.games || [];
      // games?.map((gamePk: number) => gamePk);
      // setGames(data);
      console.log(data);
    })
    .catch((err) => console.error(err));

  return (
    <>
      {/* {games.map((d) => {
        const gameData = d.gameData;
        const liveData = d.liveData;
        return (
          <>
            <div className="inprogress-game">
              <div className="teams-playing">
                <h2>
                  {gameData.teams.home.name}{" "}
                  <span className="bold">
                    {liveData.linescore.teams.home.runs}
                  </span>
                </h2>
                <h2>
                  vs {gameData.teams.away.name}{" "}
                  <span className="bold">
                    {liveData.linescore.teams.away.runs}
                  </span>
                </h2>
              </div>
              <div className="game-info inprogress">
                <ul className="game-stats">
                  <li>
                    {liveData.linescore.inningState}{" "}
                    {liveData.linescore.currentInning}
                  </li>
                  <li>{liveData.linescore.outs} outs</li>
                </ul>
                <p>
                  {gameData.venue.name},{" "}
                  {gameData.venue.location.country === "USA"
                    ? `${gameData.venue.location.city}, `
                    : null}
                  {gameData.venue.location.stateAbbrev}
                </p>
              </div>
              <ul className="player-stats">
                {liveData.plays.currentPlay?.matchup.batter.fullName && (
                  <li>
                    At Bat:{" "}
                    {liveData.plays.currentPlay?.matchup.batter.fullName}
                  </li>
                )}
                {liveData.boxscore.pitchers && (
                  <li>Pitching: {liveData.boxscore.pitchers}</li>
                )}
                {liveData.linescore.offense && <li>Runners: [array]</li>}
              </ul>
            </div>
          </>
        );
      })} */}
    </>
  );
};

export default GetRequestCalls;
