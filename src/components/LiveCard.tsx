type GameProps = {
  gameData: {
    teams: {
      home: { name: string };
      away: { name: string };
    };
    venue: {
      name: string;
      location: {
        country: string;
        city?: string;
        stateAbbrev?: string;
      };
    };
  };
  liveData: {
    linescore: {
      teams: {
        home: { runs: number };
        away: { runs: number };
      };
      inningState?: string;
      currentInning?: number | string;
      outs?: number;
      offense?: any;
    };
    boxscore?: {
      pitchers?: any;
    };
    plays?: {
      currentPlay?: {
        matchup?: {
          batter?: {
            fullName?: string;
          };
        };
      };
    };
  };
};
// liveData.boxscore.pitchers;
const InProgressCard = ({ gameData, liveData }: GameProps) => {
  return (
    <div className="inprogress-game">
      <div className="teams-playing">
        <h2>
          {gameData.teams.home.name}{" "}
          <span className="bold">{liveData.linescore.teams.home.runs}</span>
        </h2>
        <h2>
          vs {gameData.teams.away.name}{" "}
          <span className="bold">{liveData.linescore.teams.away.runs}</span>
        </h2>
      </div>
      <div className="game-info inprogress">
        <ul className="game-stats">
          <li>
            {liveData.linescore.inningState} {liveData.linescore.currentInning}
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
          <li>At Bat: {liveData.plays.currentPlay?.matchup.batter.fullName}</li>
        )}
        {liveData.boxscore.pitchers && (
          <li>Pitching: {liveData.boxscore.pitchers}</li>
        )}
        {liveData.linescore.offense && <li>Runners: [array]</li>}
      </ul>
    </div>
  );
};

export default InProgressCard;
