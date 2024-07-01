"use client";

import { DRAWER_WIDTH } from "@/components/ui/leftNavigation";
import MusicCard from "@/components/ui/musicCard";
import Player from "@/components/ui/player";
import { Track } from "@/lib/db";
import { QueryStringParamNames, QueryStringParams } from "@/lib/searchParams";
import { Box } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export interface TracksAndPlayerInterface {
  tracks: Track[];
}

export default function TracksAndPlayer({ tracks }: TracksAndPlayerInterface) {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const playingTrackIdStr = searchParams.get(
    QueryStringParamNames.PlayingTrackId
  );
  const playingTrackId = playingTrackIdStr ? parseInt(playingTrackIdStr) : null;
  const [isPending, startTransition] = useTransition();

  const onDblClick = (trackId: number) => {
    if (playingTrackId && playingTrackId === trackId) return;
    console.log("dblClick", trackId);
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("playingTrackId", trackId + "");

    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  const playingTrack = tracks?.find((t) => t.id === playingTrackId);
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
        {tracks.map((t, i) => (
          <MusicCard
            trackName={t.name}
            artistNames={t.artists.map((a) => a.name)}
            trackImageUrl={t.image_url}
            liked={false}
            key={i}
            selected={t.id === selectedTrack}
            handleClick={() => {
              setSelectedTrack(t.id);
            }}
            handleDblClick={() => {
              onDblClick(t.id);
            }}
          ></MusicCard>
        ))}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          bgcolor: "white",
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          pl: 2,
          pr: 2,
          zIndex: "appBar",
          boxShadow: "0px -5px 7px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Player track={playingTrack} liked={false}></Player>
      </Box>
    </>
  );
}
