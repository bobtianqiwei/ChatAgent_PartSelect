const sampleProducts = [
  {
    id: 1,
    partNumber: "PS11752778",
    name: "Whirlpool Refrigerator Door Bin",
    category: "Refrigerator",
    price: 41.23,
    stockQuantity: 15,
    compatibility: ["ED5FVGXWS01", "WSF26C3EXW01", "WSF26C3EXF01", "ED2KHAXVL00"],
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
    compatibility: ["ED5FVGXWS01", "WSF26C3EXW01", "WSF26C3EXF01", "ED2KHAXVL00"],
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
    compatibility: ["ED5FVGXWS01", "WSF26C3EXW01", "WSF26C3EXF01", "ED2KHAXVL00"],
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
  },
  {
    id: 6,
    partNumber: "PS3406971",
    name: "Lower Dishrack Wheel",
    category: "Dishwasher",
    price: 46.00,
    stockQuantity: 30,
    compatibility: [
      "WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1",
      "2213222N414", "2213223N414", "2213229N414", "2214523N611", "2214545N711",
      "66213292K112", "66213299K112", "66513222N410", "66513222N411", "66513222N412", "66513222N413", "66513223N410", "66513223N411", "66513223N412", "66513223N413", "66513223N414", "66513229N410", "66513229N411", "66513229N412", "66513229N413", "66513229N414", "66513252K110", "66513252K111", "66513252K112", "66513252K113", "66513252K114", "66513252K115", "66513253K110", "66513255K110", "66513255K111"
    ],
    installation: "Open the dishwasher door and pull out the lower dishrack. Push the tab from both sides of the old wheel assembly to pop it out. Place the new wheel assembly on the rack, make sure the caps overlap the wire from the inside, then clip it in place by pushing the wheel. No tools required. Installation takes less than 15 minutes.",
    troubleshooting: "If the rack does not roll smoothly, check for debris or damage to the axle. Replace any broken wheels. This part fixes symptoms like not cleaning dishes properly, door won't close, noisy operation, or door latch failure.",
    description: "This OEM gray Dishwasher Lower Dishrack Wheel Assembly (W10195416) is a plastic kit that allows the rack to slide in and out of the dishwasher easily. If it breaks or becomes damaged, sliding will feel difficult. It attaches directly to the dishrack and measures roughly 3x6 inches. Compatible with many Whirlpool, KitchenAid, Maytag, and Kenmore dishwashers.",
    image: "/images/products/PS3406971-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS3406971-Whirlpool-W10195416-Lower-Dishrack-Wheel.htm?SourceCode=19&SearchTerm=WDT780SAEM1&ModelNum=WDT780SAEM1",
    installationVideo: "https://youtu.be/fz1YHu782Wk",
    installationImages: [
      "/images/products/PS3406971-install-1.gif"
    ],
    manufacturerPartNumber: "W10195416",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "KitchenAid", "Maytag", "Kenmore"],
    customerRating: 4.8,
    reviewCount: 394,
    difficultyLevel: "Very Easy",
    installationTime: "15 - 30 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "Approximately 3 x 6 inches",
    symptoms: ["Not cleaning dishes properly", "Door won't close", "Noisy", "Door latch failure"],
    replacementParts: ["W10195416V", "W10195416VP"]
  },
  {
    id: 7,
    partNumber: "PS10065979",
    name: "Upper Rack Adjuster Kit",
    category: "Dishwasher",
    price: 49.86,
    stockQuantity: 18,
    compatibility: [
      "WDT780SAEM1", "WDT750SAEM1",
      "2213222N414", "2213223N414", "2213229N414", "2214523N611", "2214545N711",
      "66512762K312", "66512762K314", "66512763K312", "66512763K313", "66512763K314",
      "66512769K312", "66512769K313", "66512769K314", "66512772K312", "66512772K313", "66512772K314",
      "66512773K313", "66512773K314", "66512774K312", "66512774K313", "66512774K314",
      "66512776K312", "66512776K314", "66512776K315", "66512779K312", "66512779K313", "66512779K314",
      "66512813K313", "66513202N410", "66513202N411"
    ],
    installation: "Remove the old adjuster assembly from the upper rack using a screwdriver. Attach the new kit using included hardware. Refer to the installation video for step-by-step guidance. Installation takes 30-60 minutes and is rated as 'Really Easy' by customers.",
    troubleshooting: "If the upper rack is not adjusting, is unstable, or the wheels are broken, inspect the adjuster arms and wheels for damage. Replace the entire kit if necessary. This part fixes symptoms like door won't close, door latch failure, not cleaning dishes properly, and noisy operation.",
    description: "This authentic Dishwasher Upper Rack Adjuster Kit (W10712395) with white wheels is a kit made up of primarily plastic and metal components. It fits onto the dishwasher rack and connects it to the track, allowing it to slide in and out. If broken, the rack will no longer slide properly. The kit comes with all necessary parts for a dishwasher rack adjuster and is not generally sold individually. Compatible with many Whirlpool, Kenmore, and KitchenAid dishwashers.",
    image: "/images/products/PS10065979-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS10065979-Whirlpool-W10712395-Upper-Rack-Adjuster-Kit.htm?SourceCode=19&SearchTerm=WDT780SAEM1&ModelNum=WDT780SAEM1",
    installationVideo: "https://youtu.be/pZO1rcMwKBc",
    installationImages: [
      "/images/products/PS10065979-install-1.gif"
    ],
    manufacturerPartNumber: "W10712395",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "Kenmore", "KitchenAid"],
    customerRating: 4.7,
    reviewCount: 705,
    difficultyLevel: "Really Easy",
    installationTime: "30 - 60 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "N/A (kit includes multiple components)",
    symptoms: ["Door won't close", "Door latch failure", "Not cleaning dishes properly", "Noisy"],
    replacementParts: ["AP5957560", "W10250159", "W10350375", "W10712395VP"]
  },
  {
    id: 8,
    partNumber: "PS972325",
    name: "Dishwasher Door Balance Link Kit",
    category: "Dishwasher",
    price: 26.83,
    stockQuantity: 25,
    compatibility: [
      "WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1",
      "2213222N414", "2213223N414", "2213229N414", "2214523N611", "2214545N711",
      "66213292K112", "66213299K112", "66513222N410", "66513222N411", "66513222N412", "66513222N413", "66513223N410", "66513223N411", "66513223N412", "66513223N413", "66513223N414", "66513229N410", "66513229N411", "66513229N412", "66513229N413", "66513229N414", "66513252K110", "66513252K111", "66513252K112", "66513252K113", "66513252K114", "66513252K115", "66513253K110", "66513255K110", "66513255K111"
    ],
    installation: "Remove the old door balance link by disconnecting it from the door hinges. Install the new kit by connecting it to the dishwasher door hinges. This helps support the door as it opens and closes.",
    troubleshooting: "If the door is difficult to open or close, or if it doesn't stay open, check the door balance link for damage or wear. Replace if necessary.",
    description: "This part is a door balance link kit, also sometimes known as door cable or door spring cable kit, that helps support the door as it opens and closes by connecting to the dishwasher door hinges.",
    image: "/images/products/PS972325-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS972325-Whirlpool-8194001-Dishwasher-Door-Balance-Link-Kit.htm?SourceCode=19&SearchTerm=WDT780SAEM1&ModelNum=WDT780SAEM1",
    installationVideo: "https://youtu.be/X02l3pHeOUI",
    installationImages: [
      "/images/products/PS972325-install-1.gif"
    ],
    manufacturerPartNumber: "8194001",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "KitchenAid", "Maytag", "Kenmore"],
    customerRating: 4.9,
    reviewCount: 223,
    difficultyLevel: "Easy",
    installationTime: "15 - 30 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "N/A",
    symptoms: ["Door difficult to open/close", "Door doesn't stay open", "Door slams shut"],
    replacementParts: ["8194001", "8194001VP"]
  },
  {
    id: 9,
    partNumber: "PS11746591",
    name: "Dishwasher Rack Track Stop",
    category: "Dishwasher",
    price: 9.65,
    stockQuantity: 40,
    compatibility: [
      "WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1",
      "2213222N414", "2213223N414", "2213229N414", "2214523N611", "2214545N711",
      "66213292K112", "66213299K112", "66513222N410", "66513222N411", "66513222N412", "66513222N413", "66513223N410", "66513223N411", "66513223N412", "66513223N413", "66513223N414", "66513229N410", "66513229N411", "66513229N412", "66513229N413", "66513229N414", "66513252K110", "66513252K111", "66513252K112", "66513252K113", "66513252K114", "66513252K115", "66513253K110", "66513255K110", "66513255K111"
    ],
    installation: "Remove the old rack track stop and install the new one in the same position. This part stops the dish rack at the appropriate place when opening and closing the rack.",
    troubleshooting: "If your dishwasher is not cleaning your dishes properly, the rack stop may be damaged or missing. Check for proper alignment and replace if necessary.",
    description: "The rack track stop on your dishwasher is designed to stop the dish rack at the appropriate place when opening and closing the rack. If your dishwasher is not cleaning your dishes properly, the rack stop may need replacement.",
    image: "/images/products/PS11746591-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS11746591-Whirlpool-WP8565925-Dishwasher-Rack-Track-Stop.htm?SourceCode=19&SearchTerm=WDT780SAEM1&ModelNum=WDT780SAEM1",
    installationVideo: "https://youtu.be/siE-8HethWg",
    installationImages: [
      "/images/products/PS11746591-install-1.gif"
    ],
    manufacturerPartNumber: "WP8565925",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "KitchenAid", "Maytag", "Kenmore"],
    customerRating: 4.9,
    reviewCount: 107,
    difficultyLevel: "Very Easy",
    installationTime: "5 - 10 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "Small plastic component",
    symptoms: ["Not cleaning dishes properly", "Rack doesn't stop properly", "Rack slides too far"],
    replacementParts: ["WP8565925", "WP8565925VP"]
  },
  {
    id: 10,
    partNumber: "PS11745496",
    name: "Dishwasher Mounting Bracket",
    category: "Dishwasher",
    price: 13.53,
    stockQuantity: 35,
    compatibility: [
      "WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1",
      "2213222N414", "2213223N414", "2213229N414", "2214523N611", "2214545N711",
      "66213292K112", "66213299K112", "66513222N410", "66513222N411", "66513222N412", "66513222N413", "66513223N410", "66513223N411", "66513223N412", "66513223N413", "66513223N414", "66513229N410", "66513229N411", "66513229N412", "66513229N413", "66513229N414", "66513252K110", "66513252K111", "66513252K112", "66513252K113", "66513252K114", "66513252K115", "66513253K110", "66513255K110", "66513255K111"
    ],
    installation: "The mounting bracket is sold individually, without screws. This part secures the upper side of the dishwasher to the underside of the counter or cabinet to prevent the dishwasher from moving, shaking, or vibrating during operation.",
    troubleshooting: "If the dishwasher is moving, shaking, or vibrating excessively during operation, check the mounting brackets for damage or loose connections. Replace if necessary.",
    description: "The mounting bracket is sold individually, without screws. This part secures the upper side of the dishwasher to the underside of the counter or cabinet to prevent the dishwasher from moving, shaking, or vibrating during operation.",
    image: "/images/products/PS11745496-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS11745496-Whirlpool-WP8269145-Dishwasher-Mounting-Bracket.htm?SourceCode=19&SearchTerm=WDT780SAEM1&ModelNum=WDT780SAEM1",
    installationVideo: "https://youtu.be/X7SLvFAiTkw",
    installationImages: [
      "/images/products/PS11745496-install-1.gif"
    ],
    manufacturerPartNumber: "WP8269145",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "KitchenAid", "Maytag", "Kenmore"],
    customerRating: 4.9,
    reviewCount: 14,
    difficultyLevel: "Easy",
    installationTime: "15 - 30 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "Metal bracket component",
    symptoms: ["Dishwasher moving/shaking", "Excessive vibration", "Loose dishwasher"],
    replacementParts: ["WP8269145", "WP8269145VP"]
  },
  {
    id: 11,
    partNumber: "PS11750093",
    name: "Dishwasher Positioner",
    category: "Dishwasher",
    price: 44.11,
    stockQuantity: 12,
    compatibility: [
      "WDT780SAEM1", "WDT750SAEM1", "WDT720SAEM1",
      "2213222N414", "2213223N414", "2213229N414", "2214523N611", "2214545N711",
      "66213292K112", "66213299K112", "66513222N410", "66513222N411", "66513222N412", "66513222N413", "66513223N410", "66513223N411", "66513223N412", "66513223N413", "66513223N414", "66513229N410", "66513229N411", "66513229N412", "66513229N413", "66513229N414", "66513252K110", "66513252K111", "66513252K112", "66513252K113", "66513252K114", "66513252K115", "66513253K110", "66513255K110", "66513255K111"
    ],
    installation: "Also known as rack adjuster. Sold individually. This is an original part from KitchenAid, Kenmore, Whirlpool, Jenn-Air, and Maytag for use with Dishwashers. The dishrack adjuster arm positioner clip helps maintain proper rack positioning.",
    troubleshooting: "If the rack is not positioning correctly or is unstable, check the positioner for damage or wear. Replace if necessary to ensure proper rack alignment.",
    description: "Also known as rack adjuster. Sold individually. This is an original part from KitchenAid, Kenmore, Whirlpool, Jenn-Air, and Maytag for use with Dishwashers. The dishrack adjuster arm positioner clip helps maintain proper rack positioning.",
    image: "/images/products/PS11750093-main.jpg",
    partSelectUrl: "https://www.partselect.com/PS11750093-Whirlpool-WPW10195840-Dishwasher-Positioner.htm?SourceCode=19&SearchTerm=WDT780SAEM1&ModelNum=WDT780SAEM1",
    installationVideo: "https://youtu.be/3no3S5XCunU",
    installationImages: [
      "/images/products/PS11750093-install-1.gif"
    ],
    manufacturerPartNumber: "WPW10195840",
    manufacturer: "Whirlpool",
    compatibleBrands: ["Whirlpool", "KitchenAid", "Maytag", "Kenmore", "Jenn-Air"],
    customerRating: 4.9,
    reviewCount: 6,
    difficultyLevel: "Easy",
    installationTime: "15 - 30 mins",
    warranty: "1 Year Warranty",
    shipping: "Same-day Shipping",
    dimensions: "Small plastic component",
    symptoms: ["Rack not positioning correctly", "Unstable rack", "Poor rack alignment"],
    replacementParts: ["WPW10195840", "WPW10195840VP"]
  }
];

const compatibilityMatrix = {
  "WDT780SAEM1": {
    refrigerator: [],
    dishwasher: [
      "PS3406971",
      "PS10065979",
      "PS972325",
      "PS11746591",
      "PS11745496",
      "PS11750093"
    ]
  },
  "WDT750SAEM1": {
    refrigerator: [],
    dishwasher: ["PS11752780", "PS11752781"]
  },
  "WDT720SAEM1": {
    refrigerator: [],
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