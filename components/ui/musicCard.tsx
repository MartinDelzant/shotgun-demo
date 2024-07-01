"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export interface MusicCardProps {
  trackName: string;
  artistNames: string[];
  trackImageUrl: string;
  liked: boolean;
  selected: boolean;
  handleClick: () => void;
  handleDblClick: () => void;
  handleLikedSong: (liked: boolean) => void;
}

export default function MusicCard({
  trackName,
  artistNames,
  trackImageUrl,
  liked,
  selected,
  handleClick,
  handleDblClick,
  handleLikedSong,
}: MusicCardProps) {
  const onFavoriteClick = (e: React.MouseEvent, liked: boolean) => {
    handleLikedSong(liked);
    e.stopPropagation();
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        maxHeight: 80,
        bgcolor: selected ? "primary.light" : null,
        cursor: "pointer",
      }}
      onClick={handleClick}
      onDoubleClick={handleDblClick}
    >
      <CardMedia
        component="img"
        sx={{ width: 50, pl: 2 }}
        image={trackImageUrl}
        alt={trackName}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div">{trackName}</Typography>
          <Typography color="text.secondary" component="div">
            {artistNames?.join(", ")}
          </Typography>
        </CardContent>
      </Box>
      {liked ? (
        <FavoriteIcon
          onClick={(e) => onFavoriteClick(e, false)}
          sx={{ mr: 2, width: 28, height: 28 }}
        />
      ) : (
        <FavoriteBorderIcon
          onClick={(e) => onFavoriteClick(e, true)}
          sx={{ mr: 2, width: 28, height: 28 }}
        />
      )}
    </Card>
  );
}
