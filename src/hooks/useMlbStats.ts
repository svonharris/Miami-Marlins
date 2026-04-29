import { useState, useEffect } from "react";

type TeamProps = {
  teamId: number;
  name: string;
};

const allTeams: TeamProps[] = [
  { teamId: 146, name: "Miami Marlins" },
  { teamId: 385, name: "Marlins Prospects" },
  { teamId: 467, name: "FCL Marlins" },
  { teamId: 564, name: "Jacksonville Jumbo Shrimp" },
  { teamId: 554, name: "Beloit Sky Carp" },
  { teamId: 619, name: "DSL Marlins" },
  { teamId: 3276, name: "Marlins Alt. Site" },
  { teamId: 4124, name: "Pensacola Blue Wahoos" },
  { teamId: 3277, name: "Marlins Organization" },
  { teamId: 479, name: "Jupiter Hammerheads" },
  { teamId: 2127, name: "DSL Miami" },
];

function useMlbStats(scheduleUrl: string) {
  const [gameDetails, setGameDetails] = useState<any[]>([]);
  const [teamsNotPlaying, setTeamsNotPlaying] = useState<TeamProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(scheduleUrl);
        const data = await res.json();
        const allGames = data.dates[0]?.games || [];

        const allTeamIds = new Set(allTeams.map((t) => t.teamId));
        const marlinsGames = allGames.filter((game: any) =>
          allTeamIds.has(game.teams.home.team.id) ||
          allTeamIds.has(game.teams.away.team.id),
        );

        const teamsPlaying = marlinsGames.flatMap((game: any) => [
          game.teams.home.team.id,
          game.teams.away.team.id,
        ]);

        setTeamsNotPlaying(
          allTeams.filter((team) => !teamsPlaying.includes(team.teamId)),
        );

        const gameDetailPromises = marlinsGames.map((game: any) =>
          fetch(
            `https://statsapi.mlb.com/api/v1.1/game/${game.gamePk}/feed/live`
            // `/Data/games/${game.gamePk}.json`, // for testing without rate limits
          ).then((res) => res.json()),
        );

        setGameDetails(await Promise.all(gameDetailPromises));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [scheduleUrl]);

  return { gameDetails, teamsNotPlaying, loading };
}

export default useMlbStats;
