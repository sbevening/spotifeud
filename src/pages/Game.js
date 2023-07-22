import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../UIComponents/Loading";
import { Navigate } from "react-router-dom";
import shuffle from "just-shuffle";

function Game() {
  const token = window.localStorage.getItem("token");
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const GetTopTracks = async () => {
      const { data } = await axios
        .get("https://api.spotify.com/v1/me/top/tracks?limit=50", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => console.log(err));

      setTopTracks(data.items);
    };
    GetTopTracks();
  }, []);

  if (token == null) {
    return <Navigate to="/auth" />;
  }

  if (topTracks.length < 1) {
    return <Loading />;
  } else {
    const shuffledTracks = shuffle(topTracks); // randomizes order of topTracks
    const selectedTracks = shuffledTracks.slice(-5); // gets last 5 tracks of randomized order
    console.log(selectedTracks)

    return (
      <div>
        <ul>
          {selectedTracks.map((track, i) => <li key={i}>{track.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default Game;
