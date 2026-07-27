export const slideshowDummyData = Array.from({ length: 25 }, (_, i) => ({
    title: `Slide ${i + 1}`,
    subTitle: `Subtitle ${i + 1}`,
    imageSrc: i % 2 === 0 ? "https://picsum.photos/1600/1200" : "https://picsum.photos/1920/1080",
    link: "/events"
}));

export const eventsDummyData = Array.from({ length: 16 }, (_, i) => ({
    date: (new Date()).getTime(),
    name: `Event Name ${i + 1}`,
    location: `Event Location ${i + 1}`,
    imageCount: 10,
    thumbnailUrl: i % 2 === 0 ? "https://picsum.photos/800/600" : "https://picsum.photos/600/800",
    link: "/events"
}));
