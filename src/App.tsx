import { useState } from "react";
import CompletedStatus from "./components/CompletedStatus";
import "./App.css";

function App() {
  const [games, setGames] = useState<any[]>([]); // store all games

  // type gameProps = {
  //   gamePk: number;
  // };

  const url =
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=146&sportId=1&date=2025-03-23";
    // "https://statsapi.mlb.com/api/v1/schedule?teamId=136&sportId=1&date=2025-10-19";
    // "https://statsapi.mlb.com/api/v1/teams/3276";
    "https://statsapi.mlb.com/api/v1/schedule?teamId=146&teamId=385&teamId=467&teamId=564&teamId=554&teamId=619&teamId=3276&teamId=4124&teamId=3277&teamId=479&teamId=2127&sportId=1&sportId=21&sportId=16&sportId=11&sportId=13&sportId=16&sportId=21&sportId=12&sportId=21&sportId=14&sportId=16&date=2025-03-03";
  // "https://statsapi.mlb.com/api/v1.1/game/779076/feed/live";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allGames = data.dates[0]?.games || [];
      setGames(allGames);
      games?.map((gamePk: number) => gamePk);
    })
    .catch((err) => console.error(err));

  // let gameUrl = "";
  // const gameIds = games?.map((gamePk: number) => gamePk);
  // gameIds.map(
  //   (n: number) =>
  //     (gameUrl = `https://statsapi.mlb.com/api/v1.1/game/${n}/feed/live`)
  // );

  // fetch(gameUrl)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => console.error(err));

  return (
    <>
      <h1>Date: 2025-03-18</h1>

      <div>
        {" "}
        {/* If the team has a game on the selecte date.*/}
        <ul>
          <li>The team name: (eg. “Jupiter Hammerheads”)</li>
          <li>The level of the game: (eg. “1A”)</li>
          <li>The opponent team: (eg. “St. Lucie Mets”)</li>
          <li>
            The opponent team MLB parent club, if not an MLB team itself: (eg.
            “Mets”)
          </li>
          {/* State of the game */}
        </ul>
      </div>

      <div>
        {" "}
        {/* Game State: Not Started, In Progress, Completed */}
        <b>Not Started</b>
        <ul>
          {" "}
          {/* Not Started */}
          <li>Game time</li>
          <li>opponent</li>
          <li>venue</li>
          <li>probable pitchers (if available)</li>
        </ul>
        <b>In Progress</b>
        <ul>
          {" "}
          {/* In Progress */}
          <li>Opponent</li>
          <li>venue</li>
          <li>current score</li>
          <li>inning</li>
          <li>outs</li>
          <li>runners on base</li>
          <li>current pitcher</li>
          <li>batter up-to-bat</li>
        </ul>
        <CompletedStatus />
      </div>
    </>
  );
}

export default App;
