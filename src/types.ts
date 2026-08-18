export interface EventResults {
  events: EventResult[];
  total: number;
  page: number;
  limit: number;
};

export interface EventResult {
  name: string;
  location: string;
  date: number;
  imageCount: number;
  thumbnailUrl: string;
  link: string;
};
