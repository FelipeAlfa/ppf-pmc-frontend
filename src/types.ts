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

export interface PhotoResults {
  photos: PhotoResult[];
  totalPages: number;
  totalRecords: number;
  currentPage: number;
};

export interface PhotoResult {
  code: number;
  eventName: string;
  locationName: string;
  date: number;
  thumbnailUrl: string;
  link: string;
};