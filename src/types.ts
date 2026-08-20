export interface EventResults {
  events: EventResult[];
  totalPages: number;
  totalRecords: number;
  currentPage: number;
};

export interface EventResult {
  name: string;
  location: string;
  date: number;
  imageCount: number;
  thumbnailUrl: string;
  link: string;
};
