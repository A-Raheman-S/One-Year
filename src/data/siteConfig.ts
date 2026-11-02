export interface SiteConfig {
  personOne: string;
  personTwo: string;
  relationshipStartDate: string; // ISO 8601 string
  anniversaryYearsBadge: string;
  heroSubtitle: string;
  scrollIndicatorText: string;
  
  heroImage: string;
  beforeImage: string;
  afterImage: string;
  
  youtubeVideoId: string;
  songTitle: string;
  songArtist: string;
  songDedication: string;
  
  voiceNoteAudioUrl: string;
  voiceNoteSender: string;
  voiceNoteDurationSec: number;
  
  stats: {
    label: string;
    value: string;
    sublabel: string;
    icon: string;
  }[];
  
  loveLetter: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    date: string;
  };
  
  finalSection: {
    heading: string;
    subheading: string;
    body: string;
    footerText: string;
  };
}

export const siteConfig: SiteConfig = {
  personOne: "Abdi",
  personTwo: "Aafu",
  // 1 year ago from 2026: 2025-11-03
  relationshipStartDate: "2025-11-03T18:49:00",
  anniversaryYearsBadge: "1 YEARS TOGETHER",
  heroSubtitle: "Still my favourite hello and my hardest goodbye.",
  scrollIndicatorText: "SCROLL TO RELIVE IT ALL",

  // Curated high aesthetic romantic photographs with sunset & warm burgundy palette
  heroImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop",
  beforeImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop",
  afterImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1400&auto=format&fit=crop",

  // Music Section: Humsafar - Badrinath Ki Dulhania
  youtubeVideoId: "8v-TWxPWIWc",
  songTitle: "Humsafar",
  songArtist: "Akhil Sachdeva • Badrinath Ki Dulhania",
  songDedication: "Sun zalima mere sanu koi darr na... The melody that will always belong to our journey.",

  // Voice note
  voiceNoteAudioUrl: "/audio/voice-note.m4a",
  voiceNoteSender: "Your Abdi",
  voiceNoteDurationSec: 42,

  // Stats cards below counter
  stats: [
  ],

  loveLetter: {
    greeting: "My Dearest Aafu,",
    paragraphs: [
      "Sabse pehle, As-salamu alaikum wa rahmatullahi wa barkatuhu, Happy 1st Anniversary, my love! Aaj Ek bohot hi special din hai aur mai chahta hu hum aise bohot anniversaries celebrate kare haa bhale hum abhi saath to nahi hai but fir bhi aap mere dil humesha saath rehte ho....",
      "Tumhe pata hai meri zindagi me maine pehli baar aapke saath wo khushi mehsus ki jo shayad maine kabhi expect hi nahi ki thi and you know kismat ki ek khubsoorat aadat hai wo chupke se aati hai aur sab badal deti hai, haa manta hu mai aapko chahta tha but aap mujhe mil jaoge ye nahi socha tha.",
      "And I think I love you more than yesterday.....❤️🌸✨🌷 and I will love you more than today, forever and ever and ever....🌸💯🌷"
    ],
    closing: "Forever & Always Yours,",
    signature: "Abdul Raheman",
    date: "November 3, 2026"
  },

  finalSection: {
    heading: "Here's to us —",
    subheading: "and to forever.",
    body: "1 year down, a lifetime of sunsets, shared dreams, and quiet morning embraces to go. Thank you for being my person and my favorite adventure.",
    footerText: "Crafted with endless love for our 1st Anniversary • 2026 — Forever"
  }
};
