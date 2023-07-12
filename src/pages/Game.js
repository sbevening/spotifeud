import axios from "axios";
import { useEffect, useState } from "react";

function Game() {
  const token = window.localStorage.getItem("token");
  const [topTracks, setTopTracks] = useState([]);

  console.log(token);

  useEffect(() => {
    const GetTopTracks = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(
          err => console.log(err)
      );
      setTopTracks(data.items);
    };
    GetTopTracks();
  }, [token]); // Get top tracks as soon as token is generated and assigned

  return (
    (topTracks.length > 0) ? <h1>Yay</h1> : <h1>Nay</h1> // Placeholders
  )
}

export default Game;
