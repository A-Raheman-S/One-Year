export interface MemoryChapter {
  id: number;
  chapter: string;
  title: string;
  caption: string;
  date: string;
  image: string;
  rotation: string;
  accent: string;
}

export const memories: MemoryChapter[] = [
  {
    id: 1,
    chapter: "CHAPTER 01",
    title: "All it start with ",
    caption: "A birthday wish chat",
    date: "9th AUGUST 2025",
    image: "./images/memories/chapter1.png",
    rotation: "-rotate-2",
    accent: "#EF6389"
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    title: "The proposal that changed everything",
    caption: "Random talks turned into a lifetime promise",
    date: "3rd NOVEMBER 2025",
    image: "./images/memories/chapter2.jpg",
    rotation: "rotate-2",
    accent: "#E9BC91"
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    title: "The reply that changed everything",
    caption: "First time you said me this",
    date: "6th NOVEMBER 2025",
    image: "./images/memories/chapter3.jpg",
    rotation: "-rotate-1",
    accent: "#F2A16F"
  },
  {
    id: 4,
    chapter: "CHAPTER 04",
    title: "Our First Date",
    caption: "Holding hands till akhirah.",
    date: "29th DECEMBER 2025",
    image: "./images/memories/chapter5.jpg",
    rotation: "rotate-2",
    accent: "#EF6389"
  },
  {
    id: 5,
    chapter: "CHAPTER 05",
    title: "Unforgettable moments.",
    caption: "Beautiful memories",
    date: "13 MARCH 2026",
    image: "./images/memories/chapter7.jpg",
    rotation: "-rotate-2",
    accent: "#E9BC91"
  },
  {
    id: 6,
    chapter: "CHAPTER 06",
    title: "The Day When My Ruhi put step in the world",
    caption: "The unforgettable day when you came into this world and made it a better place for me.",
    date: "18th AUGUST 2026",
    image: "./images/memories/chapter4.jpg",
    rotation: "rotate-3",
    accent: "#F2A16F"
  },
  {
    id: 7,
    chapter: "CHAPTER 07",
    title: "Building Our Little Sanctuary",
    caption: "Always with you.",
    date: "PRESENT DAY",
    image: "./images/memories/chapter6.jpg",
    rotation: "-rotate-1",
    accent: "#EF6389"
  }
];
