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
