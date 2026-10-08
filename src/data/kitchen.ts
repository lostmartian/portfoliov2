// Add dishes here. Drop photos in /public/kitchen and set `image: "/kitchen/name.jpg"`.
export interface Dish {
  slug: string;
  title: string;
  cuisine: string;
  time: string;
  note: string;
  tags: string[];
  image?: string;
  size?: "tall" | "wide" | "square";
}

export const dishes: Dish[] = [
  { slug: "dish-01", title: "Your signature dish", cuisine: "Maharashtrian", time: "45 min", note: "Replace with the story: where it comes from, what makes your version yours.", tags: ["comfort", "spicy"], size: "wide" },
  { slug: "dish-02", title: "Weeknight pasta", cuisine: "Italian", time: "20 min", note: "The 9pm 'I need to eat now' special.", tags: ["quick", "veg"], size: "square" },
  { slug: "dish-03", title: "Slow-cooked something", cuisine: "Any", time: "3 hr", note: "Low heat, lots of patience.", tags: ["weekend"], size: "tall" },
  { slug: "dish-04", title: "Street-food experiment", cuisine: "Indian", time: "30 min", note: "Chaat, but make it overcomplicated.", tags: ["street", "crunchy"], size: "square" },
  { slug: "dish-05", title: "Something sweet", cuisine: "Dessert", time: "1 hr", note: "Baking is just chemistry with a payoff.", tags: ["sweet"], size: "square" },
  { slug: "dish-06", title: "Sunday brunch", cuisine: "Fusion", time: "40 min", note: "Eggs, obviously.", tags: ["brunch"], size: "wide" },
];
