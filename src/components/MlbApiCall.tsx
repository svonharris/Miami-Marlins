const GetRequestCalls = () => {
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
      // setGames(allGames);
      // games?.map((gamePk: number) => gamePk);
      console.log(data);
    })
    .catch((err) => console.error(err));

  return <></>;
};

export default GetRequestCalls;
