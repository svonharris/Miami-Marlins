import { useState } from "react";
import MyDatePicker from "./components/DatePicker";
import UpcomingGame from "./components/UpcomingCard";
import LiveGame from "./components/LiveCard";
import FinalGame from "./components/FinalCard";
import useMlbStats from "./hooks/useMlbStats";
import "./App.css";

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const scheduleUrl = `https://statsapi.mlb.com/api/v1/schedule?teamId=146&teamId=385&teamId=467&teamId=564&teamId=554&teamId=619&teamId=3276&teamId=4124&teamId=3277&teamId=479&teamId=2127&teamId=136&sportId=1&sportId=21&sportId=16&sportId=11&sportId=13&sportId=12&sportId=14&date=${selectedDate}`;
  // "/Data/live-game.json"; // for testing without rate limits

  const { gameDetails, teamsNotPlaying, loading } = useMlbStats(scheduleUrl);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date.toISOString().split("T")[0]);
    }
  };

  if (loading) return <p>Loading...</p>;

  const liveCount = gameDetails.filter(
    (d) => d.gameData.status.abstractGameState === "Live",
  ).length;
  const finalCount = gameDetails.filter(
    (d) => d.gameData.status.abstractGameState === "Final",
  ).length;
  const totalGames = gameDetails.length;

  return (
    <div className="App">
      <h1>Schedule and Results</h1>
      <div className="date-picker-container">
        <MyDatePicker onDateChange={handleDateChange} />
      </div>
      <div className="summary-bar">
        <span>
          Games: <strong>{totalGames}</strong>
        </span>
        <span>
          Live: <strong>{liveCount}</strong>
        </span>
        <span>
          Final: <strong>{finalCount}</strong>
        </span>
      </div>
      {gameDetails.map((d) => {
        const gameData = d.gameData;
        const liveData = d.liveData;

        return (
          <div key={gameData.game.pk} className="game-card">
            {gameData.status.abstractGameState === "Preview" && (
              <UpcomingGame gameData={gameData} />
            )}
            {gameData.status.abstractGameState === "Final" && (
              <FinalGame gameData={gameData} liveData={liveData} />
            )}
            {gameData.status.abstractGameState === "Live" && (
              <LiveGame gameData={gameData} liveData={liveData} />
            )}
          </div>
        );
      })}
      {teamsNotPlaying.length > 0 && (
        <div className="teams-not-playing">
          {teamsNotPlaying.map((team) => (
            <div className="game-card" key={team.teamId}>
              <div className="no-game-card">
                <h2>{team.name}</h2>
                <p className="no-game-label uppercase">No Game Scheduled</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
