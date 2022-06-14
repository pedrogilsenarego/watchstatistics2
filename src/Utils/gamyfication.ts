export interface Rank {
  rank: string;
  color: string;
  progress: number
}

export const rank = ( experience: number): Rank | undefined => {
  switch (true) {
    case experience < 20: {
      return { rank: "Noob", color: "#ffffff66", progress: (experience / 20) * 100 };
    }
    case experience < 100:
      return { rank: "Beginner", color: "white", progress: ((experience - 20) / 80) * 100 };
    case experience < 200:
      return { rank: "Enthusiast", color: "green", progress: ((experience - 100) / 100) * 100 };
    case experience < 500:
      return { rank: "Mature", color: "blue", progress: ((experience - 200) / 300) * 100 };
    case experience < 1500:
      return { rank: "Connoisseour", color: "purple", progress: ((experience - 500) / 1000) * 100 };
    case experience < 5000:
      return { rank: "Geek Legend", color: "orange", progress:((experience - 1500) / 3500) * 100 };
    case experience >= 5000:
      return { rank: "God", color: "red", progress: 100 };
    default:
      return;
  }
};