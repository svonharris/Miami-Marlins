type UpcomingGameProps = {
  gameData: any;
};

function UpcomingGame({ gameData }: UpcomingGameProps) {
  return (
    <div className="notstarted-game">
      <div>
        <h2>{gameData.teams.home.name}</h2>
        {gameData.probablePitchers ? (
          <p>
            <span className="uppercase">pp: </span>
            {gameData.probablePitchers.home?.fullName}
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
              {gameData.probablePitchers.away?.fullName}
            </p>
          </div>
        ) : (
          <p>n/a</p>
        )}
      </div>
      <div className="game-info">
        <p>
          {new Date(gameData.datetime.dateTime).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
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
  );
}

export default UpcomingGame;
