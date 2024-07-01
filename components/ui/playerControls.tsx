import { Box, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function PlayerControls() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton aria-label="previous">
        <SkipPreviousIcon />
      </IconButton>
      <IconButton aria-label="play/pause">
        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
      </IconButton>
      <IconButton aria-label="next">
        <SkipNextIcon />
      </IconButton>
    </Box>
  );
}
