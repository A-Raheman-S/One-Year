export interface ReasonCard {
  id: number;
  number: string;
  frontTitle: string;
  backMessage: string;
  pastelBg: string; // Tailwind background or hex
  textColor: string;
  rotationClass: string;
  tapeColor: string;
}

export const reasons: ReasonCard[] = [
  {
    id: 1,
    number: "01",
    frontTitle: "Pehla.",
    backMessage: "Bewajah.",
    pastelBg: "bg-[#FDE2E4]",
    textColor: "text-[#501C29]",
    rotationClass: "-rotate-2",
    tapeColor: "rgba(239, 99, 137, 0.4)"
  },
  {
    id: 2,
    number: "02",
    frontTitle: "Dusra..",
    backMessage: "Apki baate..",
    pastelBg: "bg-[#FFF1E6]",
    textColor: "text-[#4A2818]",
    rotationClass: "rotate-2",
    tapeColor: "rgba(242, 161, 111, 0.4)"
  },
  {
    id: 3,
    number: "03",
    frontTitle: "Teesra...",
    backMessage: "Apka befikr bartao.",
    pastelBg: "bg-[#E2ECE9]",
    textColor: "text-[#1C332A]",
    rotationClass: "-rotate-1",
    tapeColor: "rgba(120, 160, 150, 0.4)"
  },
  {
    id: 4,
    number: "04",
    frontTitle: "Chautha....",
    backMessage: "Apka Rehem dili nazariya...",
    pastelBg: "bg-[#FDF2F4]",
    textColor: "text-[#501C29]",
    rotationClass: "rotate-3",
    tapeColor: "rgba(239, 99, 137, 0.4)"
  },
  {
    id: 5,
    number: "05",
    frontTitle: "Panchwa.....",
    backMessage: "Apka pyaar.",
    pastelBg: "bg-[#F0E6EF]",
    textColor: "text-[#3D1E3A]",
    rotationClass: "-rotate-2",
    tapeColor: "rgba(180, 140, 180, 0.4)"
  },
  {
    id: 6,
    number: "06",
    frontTitle: "Chhata......",
    backMessage: "Aap.",
    pastelBg: "bg-[#FDE2E4]",
    textColor: "text-[#501C29]",
    rotationClass: "rotate-1",
    tapeColor: "rgba(239, 99, 137, 0.4)"
  }
];
