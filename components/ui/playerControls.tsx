import { Box, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";

export interface PlayerControlsProps {
  handlePlay: (play: boolean) => void;
  disabled: boolean;
  playing: boolean;
}

export default function PlayerControls({
  handlePlay,
  disabled,
  playing,
}: PlayerControlsProps) {
  const color = disabled ? "disabled" : "primary";
  const onClick = (play: boolean) => {
    if (disabled) return;
    handlePlay(play);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton aria-label="previous">
        <SkipPreviousIcon color={color} />
      </IconButton>
      {playing ? (
        <IconButton onClick={() => onClick(false)} aria-label="play/pause">
          <PauseIcon color={color} sx={{ height: 38, width: 38 }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => onClick(true)} aria-label="play/pause">
          <PlayArrowIcon color={color} sx={{ height: 38, width: 38 }} />
        </IconButton>
      )}
      <IconButton aria-label="next">
        <SkipNextIcon color={color} />
      </IconButton>
    </Box>
  );
}
