import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../UIComponents/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import shuffle from "just-shuffle";

function Game() {
  const token = window.localStorage.getItem("token");
  const [topTracks, setTopTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) return;
    const GetTopTracks = async () => {
      const { data } = await axios
        .get("https://api.spotify.com/v1/me/top/tracks?limit=50", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => {
          if (err.response) {
          window.localStorage.clear();
          window.location.reload();
          }
        });
      
      const tracks = data.items;
      const shuffledTracks = shuffle(tracks);
      setTopTracks(shuffledTracks);
    };
    GetTopTracks();
  }, []);

  if (token == null) return <Navigate to="/auth" />;

  if (topTracks.length < 1) {
    return <Loading />;
  } else {
    return (
      <div>
        <ul>
          {topTracks.map((track, i) => <li key={i}>{track.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default Game;
