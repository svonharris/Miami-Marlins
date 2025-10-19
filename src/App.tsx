import { useState, useEffect } from "react";
import "./App.css";

function GetRequestCalls() {
  // const [games, setGames] = useState<any[]>([]); // store all games

  const url =
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=146&sportId=1&date=2025-03-23";
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=136&sportId=1&date=2025-10-19";
    // "https://statsapi.mlb.com/api/v1/teams/3276";
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=146&teamId=385&teamId=467&teamId=564&teamId=554&teamId=619&teamId=3276&teamId=4124&teamId=3277&teamId=479&teamId=2127&sportId=1&sportId=21&sportId=16&sportId=11&sportId=13&sportId=16&sportId=21&sportId=12&sportId=21&sportId=14&sportId=16&date=2025-03-03";
    "https://statsapi.mlb.com/api/v1.1/game/779076/feed/live";
  // "https://statsapi.mlb.com/api/v1.1/game/813038/feed/live";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // const allGames = data.dates[0]?.games || [];
      // setGames(allGames);
      // games?.map((gamePk: number) => gamePk);
      console.log(data);
    })
    .catch((err) => console.error(err));

  return <></>;
}

function App() {
  const [gameDetails, setGameDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const scheduleUrl =
    "https://statsapi.mlb.com/api/v1/schedule?teamId=146&teamId=385&teamId=467&teamId=564&teamId=554&teamId=619&teamId=3276&teamId=4124&teamId=3277&teamId=479&teamId=2127&sportId=1&sportId=21&sportId=16&sportId=11&sportId=13&sportId=12&sportId=14&date=2025-03-03";
  // "https://statsapi.mlb.com/api/v1/schedule?teamId=136&sportId=1&date=2025-10-19";

  useEffect(() => {
    async function fetchGames() {
      try {
        // First call: Get schedule data
        const res = await fetch(scheduleUrl);
        const data = await res.json();
        const allGames = data.dates[0]?.games || [];

        // Second call(s): Fetch each game’s data
        const gameDetailPromises = allGames.map((game: any) =>
          fetch(
            `https://statsapi.mlb.com/api/v1.1/game/${game.gamePk}/feed/live`
          ).then((res) => res.json())
        );

        // Wait for all requests to finish
        const allGameDetails = await Promise.all(gameDetailPromises);

        setGameDetails(allGameDetails);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      {gameDetails.map((d) => {
        const gameData = d.gameData;
        const liveData = d.liveData;

        return (
          <div key={gameData.game.pk} className="game-card">
            {gameData.status.abstractGameState === "Preview" && (
              <>
                <b>
                  Game Status:{" "}
                  {gameData.status.abstractGameState === "Preview"
                    ? "Not Started"
                    : gameData.status.abstractGameState}
                </b>
                <div className="notstarted-game">
                  <div>
                    <h2>{gameData.teams.home.name}</h2>
                    {gameData.probablePitchers ? (
                      <p>
                        <span className="uppercase">pp: </span>
                        {gameData.probablePitchers.home.fullName}
                      </p>
                    ) : (
                      <p>n/a</p>
                    )}
                  </div>
                  <div>
                    <h2>vs {gameData.teams.away.name}</h2>
                    {gameData.probablePitchers ? (
                      <div className="probable-pitchers">
                        <p>
                          <span className="uppercase">pp: </span>
                          {gameData.probablePitchers.away.fullName}
                        </p>
                      </div>
                    ) : (
                      <p>n/a</p>
                    )}
                  </div>
                  <div className="game-info">
                    <p>
                      {new Date(gameData.datetime.dateTime).toLocaleString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </p>
                    {gameData.venue.location.country == "USA" ? (
                      <p>
                        {gameData.venue.name}, {gameData.venue.location.city},{" "}
                        {gameData.venue.location.stateAbbrev}
                      </p>
                    ) : (
                      <p>
                        {gameData.venue.name},{" "}
                        {gameData.venue.location.stateAbbrev}
                      </p>
                    )}
                  </div>
                </div>
                <hr />
              </>
            )}
            <b>
              Game Status:{" "}
              {gameData.status.abstractGameState === "Preview"
                ? "Not Started"
                : gameData.status.abstractGameState}
            </b>
            <ul>
              {" "}
              {/* Not Started */}
              <li>
                Game time:{" "}
                {new Date(gameData.datetime.dateTime).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </li>
              <li>opponent: </li>
              <li>venue: {gameData.venue.name}</li>
              <li>
                probable pitchers (if available): Home team:{" "}
                {gameData.probablePitchers.home.fullName}, Away team:{" "}
                {gameData.probablePitchers.away.fullName}
              </li>
              <li>Opponent: </li>
              <li>
                current score: {gameData.teams.home.name}{" "}
                {liveData.linescore.teams.home.runs} vs{" "}
                {gameData.teams.away.name} {liveData.linescore.teams.away.runs}
              </li>
              <li>inning: {liveData.linescore.currentInning}</li>
              <li>outs: {liveData.linescore.outs}</li>
              <li>runners on base: </li>
              <li>current pitcher: </li>
              <li>
                batter up-to-bat:{" "}
                {liveData.plays.currentPlay?.matchup.batter.fullName}
              </li>
              <li>
                Final score: {gameData.teams.home.name}{" "}
                {liveData.linescore.teams.home.runs} vs{" "}
                {gameData.teams.away.name} {liveData.linescore.teams.away.runs}
              </li>
              <li>winning pitcher: {liveData.decisions?.winner?.fullName}</li>
              <li>losing pitcher: {liveData.decisions?.loser?.fullName}</li>
              <li>
                save pitcher (if applicable):{" "}
                {liveData.decisions?.save?.fullName}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
// export default GetRequestCalls;
