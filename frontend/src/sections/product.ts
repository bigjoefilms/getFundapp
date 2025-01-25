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
  // {
  //   id: 1,
  //   name: "Airibill niager",
  //   description: "Description of project 1",
  //   raised: "$1000",
  //   creator: "0x12345",
  //   daysAgo: 5,
  //   image: "image_url",
  //   category: "Infrastructure",
  // },
  // {
  //   id: 2,
  //   name: "Anchor project",
  //   description: "Description of project 2",
  //   raised: "$2000",
  //   creator: "0x67890",
  //   daysAgo: 10,
  //   image: "image_url",
  //   category: "DAO",
  // },
  // More products...
];
