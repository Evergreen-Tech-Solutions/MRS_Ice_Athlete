export type MedalType = "Gold" | "Silver" | "Bronze";

export type MedalResult = {
  medal: MedalType;
  title: string;
  location?: string;
  discipline?: string;
};

export type MedalGroup = {
  category: string;
  results: MedalResult[];
};

export type TimelineYear = {
  year: string;
  shortLabel: string;
  image?: string;
  groups: MedalGroup[];
};