import LeftNav from "@/components/ui/leftNavigation";
import DrawerElement from "@/components/ui/drawerElement";
import { getTracks } from "@/lib/db";
import TracksAndPlayer from "./tracksAndPlayer";
import { QueryStringParams, TabTarget } from "@/lib/searchParams";

export default async function Home({ searchParams }: QueryStringParams) {
  const likedSongsOnly = searchParams?.selectedTab === TabTarget.Liked;
  const allTracks = await getTracks();
  const tracks = likedSongsOnly ? allTracks.filter((t) => t.liked) : allTracks;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LeftNav
        title="Tracks"
        drawerTitle="My Music App"
        drawerContent={
          <>
            <DrawerElement
              text={`Tracks (${allTracks.length})`}
              target={TabTarget.All}
              selected={!likedSongsOnly}
            ></DrawerElement>
            <DrawerElement
              text={`Likes (${allTracks.filter((t) => t.liked).length})`}
              target={TabTarget.Liked}
              selected={!!likedSongsOnly}
            ></DrawerElement>
          </>
        }
      >
        <TracksAndPlayer tracks={tracks}></TracksAndPlayer>
      </LeftNav>
    </main>
  );
}
