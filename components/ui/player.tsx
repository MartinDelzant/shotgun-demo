import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayerControls from "./playerControls";
import { Track } from "@/lib/db";

export interface PlayerProps {
  track?: Track;
  onLikeClicked: (liked: boolean) => void;
}

export default function Player({ track, onLikeClicked }: PlayerProps) {
  const trackName = track?.name || "Double click to play a song";
  const trackImageUrl =
    track?.image_url ||
    "https://www.creativefabrica.com/wp-content/uploads/2019/12/22/song-glyph-icon-vector-Graphics-1.jpg";

  return (
    <Box sx={{ display: "flex", alignItems: "center", maxHeight: 80 }}>
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
      <PlayerControls></PlayerControls>
    </Box>
  );
}
