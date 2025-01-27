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
    raised: "$1000",
    creator: "6trZQ2U1oWzLmcqRT98ba7JtMZsdnrzNEzN7svH11VCy",
    daysAgo: 5,
    image: "/assets/solartech_community_charger.png",
    category: "Infrastructure",
  },
  {
    id: 2,
    name: "CleanWater Initiative",
    description: "Description: The CleanWater Initiative focuses on providing clean and safe drinking water to underserved communities. This project includes the installation of water purification systems in public areas, ensuring that everyone has access to potable water, reducing waterborne diseases, and improving overall public health.",
    raised: "$2000",
    creator: "AEW5QNAY3HUGzQUpoprWRWy9ozUtdkqNLJfcok1gKJzn",
    daysAgo: 3,
    image: "/assets/cleanwater_initiative.png",
    category: "DAO",
  },
  {
    id: 3,
    name: "GreenSpaces Urban Gardens",
    description: "Description: GreenSpaces Urban Gardens is a project aimed at converting unused urban spaces into community gardens. These gardens provide fresh produce to local residents, promote sustainable urban agriculture, and create green oases that enhance the quality of life in densely populated areas.",
    raised: "$2000",
    creator: "AEW5QNAY3HUGzQUpoprWRWy9ozUtdkqNLJfcok1gKJzn",
    daysAgo: 10,
    image: "/assets/greenspaces_urban_gardens.png",
    category: "Dev Tool",
  },
  // {
  //   id: 4,
  //   name: "EduConnect Free Wi-Fi",
  //   description: "Description: EduConnect Free Wi-Fi aims to bridge the digital divide by providing free, high-speed internet access in public areas such as parks, libraries, and community centers. This initiative supports education, economic development, and social connectivity by ensuring that everyone has access to the internet, regardless of their financial situation.",
  //   raised: "$2000",
  //   creator: "AEW5QNAY3HUGzQUpoprWRWy9ozUtdkqNLJfcok1gKJzn",
  //   daysAgo: 10,
  //   image: "../assets/greenspaces_urban_gardens.png",
  //   category: "Infrastructure",
  // },
  // More products...
];
