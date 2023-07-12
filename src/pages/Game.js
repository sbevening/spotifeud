import axios from "axios";
import { useEffect, useState } from "react";

function Game() {
  const token = window.localStorage.getItem("token");
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const GetTopTracks = async () => { // must be declared inside useEffect for async to work
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=50",
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

  const SelectRandomTrack = () => {
    if (topTracks.length > 0) {
      const randIndex = Math.floor(Math.random() * topTracks.length);
      const randTrack = topTracks[randIndex];
      return randTrack;
    }
  }

  if (topTracks.length < 1) {
    return <h1>Hold up.</h1>
  }
  else return (
    <div>
      {
        SelectRandomTrack().name
      }
    </div>
  )
}

export default Game;
