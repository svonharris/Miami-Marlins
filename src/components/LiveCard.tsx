type LiveGameProps = {
  gameData: any;
  liveData: any;
};

function LiveGame({ gameData, liveData }: LiveGameProps) {
  return (
    <>
      <div className="live-indicator">
        <span className="live-dot"></span>
        Live
      </div>
      <div className="inprogress-game">
        <div className="teams-playing">
          <h2>
            {gameData.teams.away.name}{" "}
            <span className="bold">{liveData.linescore.teams.away.runs}</span>
          </h2>
          <h2>
            @ {gameData.teams.home.name}{" "}
            <span className="bold">{liveData.linescore.teams.home.runs}</span>
          </h2>
        </div>
        <div className="game-info inprogress">
          <ul className="game-stats">
            <li>
              {liveData.linescore.inningHalf} {liveData.linescore.currentInning}
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
              At Bat: {liveData.plays.currentPlay.matchup.batter.fullName}
            </li>
          )}
          {liveData.plays.currentPlay?.matchup.pitcher.fullName && (
            <li>
              Pitching: {liveData.plays.currentPlay.matchup.pitcher.fullName}
            </li>
          )}
          <li>
            Runner(s):{" "}
            {Array.isArray(liveData.plays.currentPlay?.runners) &&
              liveData.plays.currentPlay.runners.map((runner: any, index: number) => (
                <span key={runner.details?.runner?.id ?? index}>
                  {runner.details.runner.fullName},{" "}
                </span>
              ))}
          </li>
        </ul>
      </div>
    </>
  );
}

export default LiveGame;
