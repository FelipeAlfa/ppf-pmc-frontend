import { createDummyList } from "./dummyUtils";

// SLIDESHOW

export const dummySlideList = createDummyList((index) => ({
    title: `Slide ${index + 1}`,
    subTitle: `Subtitle ${index + 1}`,
    imageSrc: index % 2 === 0 ? "https://picsum.photos/1600/1200" : "https://picsum.photos/1920/1080",
    link: "/events"
}));

// SEARCH BAR

export const dummyAutocompleteResultList = createDummyList((index, origin) => ({
    label: `${origin.name} ${index + 1}`,
    group: origin.group,
    data: {
        id: `ac-${index + 1}`,
    }
}), [
    {name: "Person", group: "People"},
    {name: "Event", group: "Events"},
    {name: "Location", group: "Locations"},
    {name: "Photographer", group: "Photographers"}
]);

// SIDEBAR

export const dummySeachFilterPersonList = createDummyList((index) => ({
    id: `id-person-${index + 1}`,
    name: `Person Name ${index + 1}`,
}))

export const dummySeachFilterEventList = createDummyList((index) => ({
    id: `id-event-${index + 1}`,
    name: `Event Name ${index + 1}`,
}));

export const dummySeachFilterLocationList = createDummyList((index) => ({
    id: `id-location-${index + 1}`,
    name: `Location Name ${index + 1}`,
}));

export const dummySeachFilterPhotographerList = createDummyList((index) => ({
    id: `id-photographer-${index + 1}`,
    name: `Photographer Name ${index + 1}`,
}));

// RESULT LIST: PHOTOS

export const dummyPhotoResultList = createDummyList((index) => ({
    code: index + 1000000,
    name: `Photo Name ${index + 1}`,
    eventName: `Event Name ${index + 1}`,
    locationName: `Event Location ${index + 1}`,
    date: (new Date()).getTime(),
    thumbnailUrl: index % 2 === 0 ? "https://picsum.photos/800/600" : "https://picsum.photos/600/800",
    link: `/photos/${index + 1000000}`
}));

// RESULT LIST: EVENTS

export const dummyEventResultList = createDummyList((index) => ({
    id: `id-event-${index + 1}`,
    name: `Event Name ${index + 1}`,
    location: `Event Location ${index + 1}`,
    date: (new Date()).getTime(),
    imageCount: 10,
    thumbnailUrl: index % 2 === 0 ? "https://picsum.photos/800/600" : "https://picsum.photos/600/800",
    link: `/events/${index + 1}`
}));

// PAGE: PUBLISHING

export const dummyPublishingList = createDummyList((index) => ({
    id: `id-publishing-${index + 1}`,
    name: `Publishing Name ${index + 1}`,
    excerpt: `Publishing Excerpt ${index + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    price: 2500,
    imageSrc: index % 2 === 0 ? "https://picsum.photos/1600/1200" : "https://picsum.photos/1920/1080",
}));

// PAGE: SERVICES

export const servicesDummyData = createDummyList((_, origin) => origin, [
    {
        title: "Event Photography",
        imageSrc: "/images/service-event-photography.jpg",
        description: "Editorial-style photography for galas, openings, benefits, launches, and private events.",
    },
    {
        title: "Portraits",
        imageSrc: "/images/service-portrait.jpg",
        description: "Portrait sessions for individuals, teams, press moments, and branded editorial features.",
    },
    {
        title: "Social Media Package",
        imageSrc: "/images/service-social-media-2.jpg",
        description: "Fast-turnaround event imagery prepared for digital coverage and social distribution.",
    },
    {
        title: "Weddings",
        imageSrc: "/images/service-wedding.jpg",
        description: "Documentary coverage for weddings, rehearsal dinners, and private celebrations.",
    },
    {
        title: "Video",
        imageSrc: "/images/service-video.jpg",
        description: "Video capture for event recaps, interviews, and campaign-ready media.",
    },
    {
        title: "PMC Corporate",
        imageSrc: "/images/service-corporate.jpg",
        description: "Photography support for corporate events, conferences, brand moments, and internal media.",
    },
]);

// PAGE: ARCHIVE

export const archiveDummyData = createDummyList((_, origin) => origin, [
    {
        title: "Archive Image 1",
        imageSrc: "/images/archive-image-1.jpg",
    },
    {
        title: "Archive Image 2",
        imageSrc: "/images/archive-image-2.jpg",
    },
    {
        title: "Glamor Girls",
        imageSrc: "/images/glamor_girls_collage.jpg",
    },
    {
        title: "In Tents",
        imageSrc: "/images/in_tents_collage.jpg",
    },
    {
        title: "Secrets",
        imageSrc: "/images/secrets_collage.jpg",
    },
]);

export const photographersDummyData = createDummyList((_, origin) => origin, [
    {
        name: "Patrick McMullan",
        imageSrc: "/images/patrick-profile-pic.jpg",
        role: "Founder and Photographer",
    },
    {
        name: "PMC Photographer",
        imageSrc: "/images/about-image-1.jpg",
        role: "Event Photographer",
    },
    {
        name: "Studio Team",
        imageSrc: "/images/team-member.jpg",
        role: "Production",
    },
]);

// PAGE: PUBLISHING

export const publishingDummyData = createDummyList((_, origin) => origin, [
    {
        id: "glamor-girls",
        name: "Glamor Girls",
        excerpt: "A photographic look at style, nightlife, and familiar faces through the PMC archive.",
        price: 6500,
        imageSrc: "/images/book-slide.jpg",
    },
    {
        id: "in-tents",
        name: "In Tents",
        excerpt: "A collection shaped by parties, fashion, personalities, and the culture around them.",
        price: 7500,
        imageSrc: "/images/book-slide-2.jpg",
    },
    {
        id: "archive-selection",
        name: "Archive Selection",
        excerpt: "Limited selections from the Patrick McMullan Company publishing catalog.",
        price: 5500,
        imageSrc: "/images/glamor_girls_collage.jpg",
    },
]);
