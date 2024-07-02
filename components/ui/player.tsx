import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayerControls from "./playerControls";
import { Track } from "@/lib/db";
import { LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export interface PlayerProps {
  track?: Track;
  onLikeClicked: (liked: boolean) => void;
}

export default function Player({ track, onLikeClicked }: PlayerProps) {
  const trackName = track?.name || "Double click to play a song";
  const trackImageUrl =
    track?.image_url ||
    "https://www.creativefabrica.com/wp-content/uploads/2019/12/22/song-glyph-icon-vector-Graphics-1.jpg";
  const [playing, setPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLMediaElement>(null);
  const audioProgressIntervalId = useRef(0);

  const setIntervalAudioProgress = () => {
    if (!audioRef?.current) return;
    const audioProgress =
      audioRef.current.currentTime / audioRef.current.duration;
    setAudioProgress(100.0 * audioProgress);
  };

  const onPlayPause = (play: boolean) => {
    if (play) {
      audioRef.current?.play();
      audioProgressIntervalId.current = setInterval(
        setIntervalAudioProgress,
        200
      ) as any;
    } else {
      if (audioProgressIntervalId?.current > 0) {
        clearInterval(audioProgressIntervalId.current);
        audioProgressIntervalId.current = 0;
      }
      audioRef.current?.pause();
    }
    setPlaying(play);
  };

  const onEnded = () => {
    setPlaying(false);
    setAudioProgress(0);
  };

  useEffect(() => {
    setAudioProgress(0);
    setPlaying(false);
    if (audioRef?.current) audioRef?.current.pause();
  }, [track?.id]);

  return (
    <>
      {track?.preview_url ? (
        <LinearProgress variant="determinate" value={audioProgress} />
      ) : null}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxHeight: 80,
          pl: 2,
          pr: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 50 }}
          image={trackImageUrl}
          alt={trackName}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div">
              {trackName || "Double click to play a song"}
            </Typography>
            <Typography color="text.secondary" component="div">
              {track?.artists?.join(", ")}
            </Typography>
          </CardContent>
        </Box>
        {track ? (
          track.liked ? (
            <FavoriteIcon
              onClick={() => onLikeClicked(false)}
              sx={{ mr: 2, width: 28, height: 28 }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => onLikeClicked(true)}
              sx={{ mr: 2, width: 28, height: 28 }}
            />
          )
        ) : (
          <></>
        )}
        <PlayerControls
          disabled={!track?.preview_url}
          playing={playing}
          handlePlay={onPlayPause}
        ></PlayerControls>
      </Box>
      {track?.preview_url ? (
        <audio
          ref={audioRef}
          src={track?.preview_url}
          onEnded={onEnded}
        ></audio>
      ) : null}
    </>
  );
}
