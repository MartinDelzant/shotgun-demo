import LeftNav from "@/components/ui/leftNavigation";
import DrawerElement from "@/components/ui/drawerElement";
import { getTracks } from "@/lib/db";
import TracksAndPlayer from "./tracksAndPlayer";
import { QueryStringParams, TabTarget } from "@/lib/searchParams";

export default async function Home({ searchParams }: QueryStringParams) {
  const likedSongsOnly = searchParams?.selectedTab === TabTarget.Liked;
  const tracks = await getTracks(likedSongsOnly);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LeftNav
        title="Tracks"
        drawerTitle="My Music App"
        drawerContent={
          <>
            <DrawerElement
              text={`Tracks (${tracks.length})`}
              target={TabTarget.All}
              selected={!likedSongsOnly}
            ></DrawerElement>
            <DrawerElement
              text={`Likes (TODO)`}
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
