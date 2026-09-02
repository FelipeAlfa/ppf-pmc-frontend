export interface Results {
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}

export interface EventResults extends Results {
  events: EventResult[];
};

export interface PhotoResults extends Results {
  photos: PhotoResult[];
};

export interface EventResult {
  id: string;
  name: string;
  location: string;
  date: number;
  imageCount: number;
  thumbnailUrl: string;
  link: string;
};

export interface PhotoResult {
  code: number;
  name: string;
  eventName: string;
  locationName: string;
  date: number;
  thumbnailUrl: string;
  link: string;
};

export const viewTypes = ["grid", "editorial", "carousel"] as const;

export type ViewType = typeof viewTypes[number];

export function isViewType(value: unknown): value is ViewType {
  return typeof value === "string" && viewTypes.includes(value as ViewType);
}
