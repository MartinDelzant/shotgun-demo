"use client";

import { DRAWER_WIDTH } from "@/components/ui/leftNavigation";
import MusicCard from "@/components/ui/musicCard";
import Player from "@/components/ui/player";
import { Track, likeSong } from "@/lib/db";
import { QueryStringParamNames, QueryStringParams } from "@/lib/searchParams";
import { Box } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export interface TracksAndPlayerInterface {
  allTracks: Track[];
  likedTracksOnly: boolean;
}

export default function TracksAndPlayer({
  allTracks,
  likedTracksOnly,
}: TracksAndPlayerInterface) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const playingTrackId = searchParams.get(QueryStringParamNames.PlayingTrackId);
  const [isPending, startTransition] = useTransition();

  const onDblClick = (trackId: string) => {
    if (playingTrackId && playingTrackId === trackId) return;
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("playingTrackId", trackId + "");

    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  const playingTrack = allTracks?.find((t) => t.id === playingTrackId);
  const tracks = likedTracksOnly ? allTracks.filter((t) => t.liked) : allTracks;
  // TODO: don't use hardcoded fixed height below.
  // 80px = bottom player
  // 64px = top app bar
  return (
    <>
      <Box
        sx={{
          pl: 3,
          pr: 3,
          pt: 1,
          pb: 1,
          overflowY: "scroll",
          height: "calc(100vh - 80px - 64px)",
        }}
      >
        {tracks.map((t) => (
          <MusicCard
            trackName={t.name}
            artistNames={t.artists}
            trackImageUrl={t.image_url}
            liked={t.liked}
            key={t.id}
            selected={t.id === selectedTrack}
            handleClick={() => {
              setSelectedTrack(t.id);
            }}
            handleDblClick={() => {
              onDblClick(t.id);
            }}
            handleLikedSong={(liked) => likeSong(t.id, liked)}
          ></MusicCard>
        ))}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          bgcolor: "white",
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          zIndex: "appBar",
          boxShadow: "0px -5px 7px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Player
          track={playingTrack}
          onLikeClicked={(liked) => likeSong(playingTrack?.id, liked)}
        ></Player>
      </Box>
    </>
  );
}
