export type CometMatchData = Array<{
  id: number;
  homeTeam: {
    id: number;
    name: string;
    picture: string;
    place: string;
    parent?: {
      id: number;
      name: string;
      picture: string;
      place: string;
    };
  };
  awayTeam: {
    id: number;
    name: string;
    picture: string;
    place: string;
    parent?: {
      id: number;
      name: string;
      picture: string;
      place: string;
    };
  };
  liveStatus: string;
  dateTimeUTC: number;
  round: string;
  roundOrder: number;
  matchNumber: number;
  currentMatchPhase: {};
  competition: {
    id: number;
    name: string;
    parentId?: number;
    parentName?: string;
    picture: string;
    showStandings: boolean;
    showStats: boolean;
  };
  facility: {
    id: number;
    address: string;
    place: string;
    latitude?: number;
    longitude?: number;
    name?: string;
  };
  showEvents: boolean;
}>;
