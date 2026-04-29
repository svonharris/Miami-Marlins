type FinalGameProps = {
  gameData: any;
  liveData: any;
};

function FinalGame({ gameData, liveData }: FinalGameProps) {
  return (
    <div className="final-game">
      <div className="teams-playing">
        <div>
          <h2>
            {gameData.teams.home.name}{" "}
            <span className="bold">{liveData.linescore.teams.home.runs}</span>
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
            <span className="bold">{liveData.linescore.teams.away.runs}</span>
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
  );
}

export default FinalGame;
