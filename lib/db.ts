import "server-only";

export type Artist = {
  id: number;
  name: string;
};

export type Track = {
  id: number;
  name: string;
  duration_ms: number;
  image_url: string;
  artists: Artist[];
};

export async function getTracks(
  likedSongsOnly: boolean = false
): Promise<Track[]> {
  const result = [
    {
      id: 0,
      name: "Coucou",
      image_url: "https://mui.com/static/images/cards/live-from-space.jpg",
      artists: [
        {
          id: 0,
          name: "Artist1",
        },
      ],
      duration_ms: 120,
    },
    {
      id: 1,
      name: "Coucou",
      image_url: "https://mui.com/static/images/cards/live-from-space.jpg",
      artists: [
        {
          id: 1,
          name: "Artist2",
        },
        {
          id: 0,
          name: "Artist1",
        },
      ],
      duration_ms: 240,
    },
  ];
  if (likedSongsOnly) return [result[1], result[0]];
  for (let i = 0; i < 20; i++) {
    result.push(result[i % 2]);
  }
  return result;
}
