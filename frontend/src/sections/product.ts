export interface Product {
  id: number;
  name: string;
  description: string;
  raised: string;
  creator: string;
  daysAgo: number;
  image: string;
  category: "Infrastructure" | "DAO" | "Dev Tool" | "DeFi"; // Add categories
}

export const products : Product[] = [
  {
    id: 1,
    name: "SolarTech Community Charger",
    description: "Description: The SolarTech Community Charger is a solar-powered charging station designed to provide free charging services for mobile devices in public spaces. It's an eco-friendly solution that promotes renewable energy use and ensures that everyone has access to power for their essential devices.",
    raised: "$0",
    creator: "EFzmBNRFz8cDpUrN8vMjh7jQexiWQr5E7LTzH9vokLMN",
    daysAgo: 5,
    image: "/assets/product.1.png",
    category: "Infrastructure",
  },
  {
    id: 2,
    name: "CleanWater Initiative",
    description: "Description: The CleanWater Initiative focuses on providing clean and safe drinking water to underserved communities. This project includes the installation of water purification systems in public areas, ensuring that everyone has access to potable water, reducing waterborne diseases, and improving overall public health.",
    raised: "0",
    creator: "AEW5QNAY3HUGzQUpoprWRWy9ozUtdkqNLJfcok1gKJzn",
    daysAgo: 3,
    image: "/assets/product.png",
    category: "DAO",
  },
  {
    id: 3,
    name: "Spaces Urban Gardens",
    description: "Description: GreenSpaces Urban Gardens is a project aimed at converting unused urban spaces into community gardens. These gardens provide fresh produce to local residents, promote sustainable urban agriculture, and create green oases that enhance the quality of life in densely populated areas.",
    raised: "$0",
    creator: "6trZQ2U1oWzLmcqRT98ba7JtMZsdnrzNEzN7svH11VCy",
    daysAgo: 10,
    image: "/assets/product2.png",
    category: "Dev Tool",
  },

];
