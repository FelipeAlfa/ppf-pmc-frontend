import { createDummyListData } from "./dummyDataUtils";

export const dummySlideList = createDummyListData((index) => ({
    title: `Slide ${index + 1}`,
    subTitle: `Subtitle ${index + 1}`,
    imageSrc: index % 2 === 0 ? "https://picsum.photos/1600/1200" : "https://picsum.photos/1920/1080",
    link: "/events"
}));

export const dummyPhotoResultList = createDummyListData((index) => ({
    code: index + 1000000,
    name: `Photo Name ${index + 1}`,
    eventName: `Event Name ${index + 1}`,
    locationName: `Event Location ${index + 1}`,
    date: (new Date()).getTime(),
    thumbnailUrl: index % 2 === 0 ? "https://picsum.photos/800/600" : "https://picsum.photos/600/800",
    link: `/photos/${index + 1000000}`
}));

export const dummyEventResultList = createDummyListData((index) => ({
    name: `Event Name ${index + 1}`,
    location: `Event Location ${index + 1}`,
    date: (new Date()).getTime(),
    imageCount: 10,
    thumbnailUrl: index % 2 === 0 ? "https://picsum.photos/800/600" : "https://picsum.photos/600/800",
    link: `/events/${index + 1}`
}));

export const dummyAutocompleteResultList = createDummyListData((index, origin) => ({
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


// old



export const slideshowDummyData = Array.from({ length: 25 }, (_, i) => ({
    title: `Slide ${i + 1}`,
    subTitle: `Subtitle ${i + 1}`,
    imageSrc: i % 2 === 0 ? "https://picsum.photos/1600/1200" : "https://picsum.photos/1920/1080",
    link: "/events"
}));

export const eventsDummyData = Array.from({ length: 16 }, (_, i) => ({
    name: `Event Name ${i + 1}`,
    location: `Event Location ${i + 1}`,
    date: (new Date()).getTime(),
    imageCount: 10,
    thumbnailUrl: i % 2 === 0 ? "https://picsum.photos/800/600" : "https://picsum.photos/600/800",
    link: `/events/${i + 1}`
}));

export const servicesDummyData = [
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
];

export const archiveDummyData = [
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
];

export const photographersDummyData = [
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
];

export const publishingDummyData = [
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
];

export const filterGroupsDummyData = [
    {
        title: "People",
        items: ["Patrick McMullan", "Gala Guests", "Designers", "Artists"],
    },
    {
        title: "Locations",
        items: ["New York", "Hamptons", "Los Angeles", "Miami"],
    },
    {
        title: "Photographers",
        items: ["PMC Staff", "Patrick McMullan", "Guest Photographer"],
    },
];

export const photosDummyData = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    title: `Photo ${i + 1}`,
    alt: `Event photo ${i + 1}`,
    imageSrc: i % 2 === 0 ? "https://picsum.photos/900/1200" : "https://picsum.photos/1200/900",
}));
