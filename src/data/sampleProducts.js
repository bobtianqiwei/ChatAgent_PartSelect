const sampleProducts = [
  {
    id: 1,
    partNumber: "PS11752778",
    name: "Whirlpool Refrigerator Door Bin",
    category: "Refrigerator",
    price: 41.23,
    stockQuantity: 15,
    compatibility: ["WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1", "ED5FVGXWS01", "WSF26C3EXW01", "WSF26C3EXF01", "ED2KHAXVL00"],
    installation: "Tool-free installation. Simply align the new bin with the door shelf and snap it into place. The installation takes less than 15 minutes and is rated as 'Really Easy' by customers.",
    troubleshooting: "If the bin doesn't fit properly, check for cracks or broken clips. Ensure the door shelf is clean and free of debris. This part fixes symptoms like door won't open or close, ice maker won't dispense ice, and leaking issues.",
    description: "Genuine OEM replacement refrigerator door bin designed to fit many side-by-side refrigerator models. Compatible with brands like KitchenAid, Maytag, and Amana. Features a clear design with white trim, providing storage for jars and bottles. Installation is tool-free—simply align and snap into place.",
    image: "/images/products/PS11752778-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS11752778-Whirlpool-WPW10321304-Refrigerator-Door-Bin.htm?SourceCode=3&SearchTerm=PS11752778",
    installationVideo: "https://youtu.be/zSCNN6KpDE8",
    installationImages: [
      "/images/products/PS11752778-install-1.gif"
    ],
    manufacturerPartNumber: "WPW10321304",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "Kenmore", "Maytag", "KitchenAid", "Amana"],
    customerRating: 4.9,
    reviewCount: 347,
    difficultyLevel: "Really Easy",
    installationTime: "Less than 15 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "Approximately 14 1/4\" wide and 6\" from front to back",
    symptoms: ["Door won't open or close", "Ice maker won't dispense ice", "Leaking"],
    replacementParts: ["AP6019471", "2171046", "2171047", "2179574", "2179575", "2179607", "2179607K", "2198449", "2198449K", "2304235", "2304235K", "W10321302", "W10321303", "W10321304", "W10549739", "WPW10321304VP"]
  },
  {
    id: 2,
    partNumber: "PS11752779",
    name: "Whirlpool Refrigerator Ice Maker Assembly",
    category: "Refrigerator",
    price: 89.99,
    stockQuantity: 8,
    compatibility: ["WDT780SAEM1", "WDT750SAEM1"],
    installation: "Professional installation recommended. Requires disconnecting power, removing old ice maker, and connecting new assembly.",
    troubleshooting: "If ice maker is not working, check water supply, temperature settings, and electrical connections. Clean ice maker regularly.",
    description: "Complete ice maker assembly for Whirlpool refrigerators. Includes all necessary components for ice production.",
    image: "/images/products/PS11752779-main.svg",
    partSelectUrl: "https://www.partselect.com/PS11752779-Whirlpool-Ice-Maker-Assembly.htm",
    installationVideo: "https://www.youtube.com/watch?v=example2",
    installationImages: [
      "/images/products/PS11752779-install-1.svg",
      "/images/products/PS11752779-install-2.svg",
      "/images/products/PS11752779-install-3.svg"
    ]
  },
  {
    id: 3,
    partNumber: "PS11752780",
    name: "Whirlpool Dishwasher Door Latch",
    category: "Dishwasher",
    price: 34.99,
    stockQuantity: 22,
    compatibility: ["WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1"],
    installation: "Remove old latch, install new one with provided screws. Ensure proper alignment for door closure.",
    troubleshooting: "If door won't close properly, check latch alignment and spring tension. Clean latch mechanism.",
    description: "Replacement door latch for Whirlpool dishwashers. Ensures proper door sealing and safety.",
    image: "/images/products/PS11752780-main.svg",
    partSelectUrl: "https://www.partselect.com/PS11752780-Whirlpool-Dishwasher-Door-Latch.htm",
    installationVideo: "https://www.youtube.com/watch?v=example3",
    installationImages: [
      "/images/products/PS11752780-install-1.svg",
      "/images/products/PS11752780-install-2.svg",
      "/images/products/PS11752780-install-3.svg"
    ]
  },
  {
    id: 4,
    partNumber: "PS11752781",
    name: "Whirlpool Dishwasher Pump Motor",
    category: "Dishwasher",
    price: 129.99,
    stockQuantity: 5,
    compatibility: ["WDT780SAEM1", "WDT750SAEM1"],
    installation: "Complex installation requiring professional service. Involves electrical connections and plumbing.",
    troubleshooting: "If dishwasher won't drain, check pump for clogs. Listen for unusual noises during operation.",
    description: "High-quality pump motor for Whirlpool dishwashers. Ensures proper water circulation and drainage.",
    image: "/images/products/PS11752781-main.svg",
    partSelectUrl: "https://www.partselect.com/PS11752781-Whirlpool-Dishwasher-Pump-Motor.htm",
    installationVideo: "https://www.youtube.com/watch?v=example4",
    installationImages: [
      "/images/products/PS11752781-install-1.svg",
      "/images/products/PS11752781-install-2.svg",
      "/images/products/PS11752781-install-3.svg"
    ]
  },
  {
    id: 5,
    partNumber: "PS11752782",
    name: "Whirlpool Refrigerator Water Filter",
    category: "Refrigerator",
    price: 19.99,
    stockQuantity: 45,
    compatibility: ["WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1"],
    installation: "Turn off water supply, remove old filter, install new filter. Run water for 2-3 minutes to flush.",
    troubleshooting: "Replace filter every 6 months or when water flow decreases. Check for leaks after installation.",
    description: "Genuine Whirlpool water filter. Removes impurities and improves water taste.",
    image: "/images/products/PS11752782-main.svg",
    partSelectUrl: "https://www.partselect.com/PS11752782-Whirlpool-Refrigerator-Water-Filter.htm",
    installationVideo: "https://www.youtube.com/watch?v=example5",
    installationImages: [
      "/images/products/PS11752782-install-1.svg",
      "/images/products/PS11752782-install-2.svg",
      "/images/products/PS11752782-install-3.svg"
    ]
  }
];

const compatibilityMatrix = {
  "WDT780SAEM1": {
    refrigerator: ["PS11752778", "PS11752779", "PS11752782"],
    dishwasher: ["PS11752780", "PS11752781"]
  },
  "WDT750SAEM1": {
    refrigerator: ["PS11752778", "PS11752779", "PS11752782"],
    dishwasher: ["PS11752780", "PS11752781"]
  },
  "WDT720SAEM1": {
    refrigerator: ["PS11752778", "PS11752782"],
    dishwasher: ["PS11752780"]
  }
};

const installationGuides = {
  "PS11752778": {
    title: "Door Shelf Bin Installation",
    steps: [
      "Remove old bin by pressing release tabs",
      "Clean door shelf surface",
      "Align new bin with shelf guides",
      "Press down firmly until it clicks into place",
      "Test bin stability"
    ],
    tools: ["None required"],
    difficulty: "Easy",
    time: "5 minutes"
  },
  "PS11752779": {
    title: "Ice Maker Assembly Installation",
    steps: [
      "Disconnect refrigerator power",
      "Remove old ice maker assembly",
      "Disconnect water line",
      "Install new assembly",
      "Reconnect water line",
      "Restore power and test"
    ],
    tools: ["Screwdriver", "Pliers", "Water line connector"],
    difficulty: "Professional",
    time: "1-2 hours"
  }
};

const troubleshootingGuides = {
  "ice maker not working": {
    title: "Ice Maker Troubleshooting",
    steps: [
      "Check if ice maker is turned on",
      "Verify water supply is connected",
      "Check freezer temperature (should be 0°F or below)",
      "Clean ice maker and water line",
      "Reset ice maker by turning off for 1 hour",
      "If problem persists, replace ice maker assembly"
    ],
    commonCauses: [
      "Low freezer temperature",
      "Clogged water line",
      "Faulty water inlet valve",
      "Defective ice maker assembly"
    ]
  },
  "dishwasher not draining": {
    title: "Dishwasher Drainage Issues",
    steps: [
      "Check drain hose for kinks",
      "Clean drain filter",
      "Check garbage disposal connection",
      "Inspect pump for clogs",
      "Test drain pump operation",
      "Replace pump if necessary"
    ],
    commonCauses: [
      "Clogged drain filter",
      "Kinked drain hose",
      "Faulty drain pump",
      "Blocked garbage disposal"
    ]
  }
};

module.exports = {
  sampleProducts,
  compatibilityMatrix,
  installationGuides,
  troubleshootingGuides
}; 