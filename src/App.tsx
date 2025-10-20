import { useState, useEffect } from "react";
import MyDatePicker from "./components/DatePicker";
import "./App.css";

function GetRequestCalls() {
  // const [games, setGames] = useState<any[]>([]); // store all games

  const url =
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=146&sportId=1&date=2025-03-23";
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=136&sportId=1&date=2025-10-19";
    // "https://statsapi.mlb.com/api/v1/teams/3276";
    // "https://statsapi.mlb.com/api/v1/teams/138";
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
  // const [selectedDate, setSelectedDate] = useState("2025-04-12"); // default date
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Handler that will be passed to the DatePicker
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formatted = date.toISOString().split("T")[0];
      setSelectedDate(formatted); // updates date in state
    }
  };

  const scheduleUrl = `https://statsapi.mlb.com/api/v1/schedule?teamId=146&teamId=385&teamId=467&teamId=564&teamId=554&teamId=619&teamId=3276&teamId=4124&teamId=3277&teamId=479&teamId=2127&sportId=1&sportId=21&sportId=16&sportId=11&sportId=13&sportId=12&sportId=14&date=${selectedDate}`;
  // `https://statsapi.mlb.com/api/v1/schedule?teamId=136&sportId=1&date=${selectedDate}`;

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
        console.log(selectedDate);
      }
    }

    fetchGames();
  }, [scheduleUrl]); // refetch when date changes

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <h1>Schedule and Results</h1>
      <div className="date-picker-container">
        <MyDatePicker onDateChange={handleDateChange} />
      </div>
      {gameDetails.map((d) => {
        const gameData = d.gameData;
        const liveData = d.liveData;

        return (
          <div key={gameData.game.pk} className="game-card">
            {gameData.status.abstractGameState === "Preview" && (
              <>
                <div className="notstarted-game">
                  <div>
                    <h2>{gameData.teams.home.name}</h2>
                    {gameData.probablePitchers ? (
                      <p>
                        <span className="uppercase">pp: </span>
                        {gameData.probablePitchers.home.fullName}
                      </p>
                    ) : (
                      <p>
                        <span className="uppercase">pp: </span>n/a
                      </p>
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
                    <p>
                      {gameData.venue.name},{" "}
                      {gameData.venue.location.country === "USA"
                        ? `${gameData.venue.location.city}, `
                        : null}
                      {gameData.venue.location.stateAbbrev}
                    </p>
                  </div>
                </div>
              </>
            )}
            {gameData.status.abstractGameState === "Final" && (
              <>
                <div className="final-game">
                  <div className="teams-playing">
                    <div>
                      <h2>
                        {gameData.teams.home.name}{" "}
                        <span className="bold">
                          {liveData.linescore.teams.home.runs}
                        </span>
                      </h2>
                      {liveData.decisions ? (
                        <div>
                          {liveData.linescore.teams.home.runs >
                          liveData.linescore.teams.away.runs ? (
                            <div className="decisions-pitchers">
                              <p>
                                <span className="uppercase">wp: </span>
                                {liveData.decisions.winner?.fullName}
                              </p>
                              {liveData.decisions.save?.fullName && (
                                <p>
                                  <span className="uppercase">sp: </span>
                                  {liveData.decisions.save?.fullName}
                                </p>
                              )}
                            </div>
                          ) : (
                            liveData.decisions.loser?.fullName && (
                              <p>
                                <span className="uppercase">lp: </span>
                                {liveData.decisions.loser.fullName}
                              </p>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <h2>
                        vs {gameData.teams.away.name}{" "}
                        <span className="bold">
                          {liveData.linescore.teams.away.runs}
                        </span>
                      </h2>
                      {liveData.decisions ? (
                        <div>
                          {liveData.linescore.teams.home.runs <
                          liveData.linescore.teams.away.runs ? (
                            <div className="decisions-pitchers">
                              <p>
                                <span className="uppercase">wp: </span>
                                {liveData.decisions.winner?.fullName}
                              </p>
                              {liveData.decisions.save?.fullName && (
                                <p>
                                  <span className="uppercase">sp: </span>
                                  {liveData.decisions.save?.fullName}
                                </p>
                              )}
                            </div>
                          ) : (
                            liveData.decisions.loser?.fullName && (
                              <p>
                                <span className="uppercase">lp: </span>
                                {liveData.decisions.loser.fullName}
                              </p>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="game-info">
                    {gameData.status.abstractGameState}
                    <p>
                      {gameData.venue.name},{" "}
                      {gameData.venue.location.country === "USA"
                        ? `${gameData.venue.location.city}, `
                        : null}
                      {gameData.venue.location.stateAbbrev}
                    </p>
                  </div>
                </div>
              </>
            )}
            {gameData.status.abstractGameState === "In Progress" && (
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
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
// export default GetRequestCalls;
