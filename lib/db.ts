"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export type Track = {
  id: string;
  name: string;
  duration_ms: number;
  image_url: string;
  artists: string[];
  liked: boolean;
};

export async function getTracks(): Promise<Track[]> {
  const sqlResult = await sql`
  SELECT t.id, t.name, t.duration_ms, t.image_url, array_agg(a.name) as artists, utl.track_id IS NOT NULL as liked
  FROM tracks t
  LEFT OUTER JOIN track_artists ta ON t.id = ta.track_id
  LEFT OUTER JOIN artists a ON a.id = ta.artist_id
  LEFT OUTER JOIN user_track_likes utl on utl.track_id = t.id
  GROUP BY t.id, t.name, t.duration_ms, t.image_url, utl.track_id`;

  return sqlResult.rows as any;
}

export async function likeSong(track_id: string | undefined, liked: boolean) {
  if (!track_id) return;

  if (liked) {
    await sql`INSERT INTO user_track_likes (track_id, user_id) VALUES (${track_id}, '0');`;
  } else {
    await sql`DELETE FROM user_track_likes WHERE track_id=${track_id}`;
  }
  revalidatePath("/");
}
