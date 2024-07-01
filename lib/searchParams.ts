export enum TabTarget {
  All = "all",
  Liked = "liked",
}

export enum QueryStringParamNames {
  SelectedTab = "selectedTab",
  PlayingTrackId = "playingTrackId",
}

export interface QueryStringParams {
  searchParams: {
    selectedTab?: TabTarget;
    playingTrackId: number;
  };
}
