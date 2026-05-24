export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  discount?: number;
  inStock: number;
  colors?: { name: string; hex: string }[];
  specs?: { label: string; value: string }[];
  isFeatured?: boolean;
  isOffer?: boolean;
  brand?: string;
}

export const products: Product[] = [
  {
    id: "prod-dslr-camera",
    slug: "dslr-camera",
    name: "DSLR Camera Premium Kit",
    category: "Camera",
    price: 8600.00,
    originalPrice: 12500.00,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1da500764c6e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Capture breathtaking details with our flagship DSLR Camera featuring a 45.7MP full-frame sensor, dual image processors, and premium 24-70mm lens kit. Perfect for both professional videography and cinematic photography.",
    discount: 31,
    inStock: 32,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Gray", hex: "#666666" },
      { name: "Silver", hex: "#CCCCCC" }
    ],
    specs: [
      { label: "Sensor", value: "45.7 Megapixel Full-Frame CMOS" },
      { label: "ISO Range", value: "64 - 25,600 (expands to 102,400)" },
      { label: "Video", value: "4K UHD at 60fps, 10-bit output" },
      { label: "Focus Points", value: "153-Point Autofocus System" }
    ],
    isFeatured: true
  },
  {
    id: "prod-mixer-grinder",
    slug: "mixer-grinder",
    name: "Heavy Duty Mixer Grinder",
    category: "Home Appliance",
    price: 2499.00,
    originalPrice: 3500.00,
    rating: 4.5,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Prepare delicious meals effortlessly with this 1000W robust motor mixer grinder. Featuring stainless steel leakproof jars, specialized blades for ultimate grinding efficiency, and elegant metallic design.",
    discount: 28,
    inStock: 15,
    colors: [
      { name: "Stainless Steel", hex: "#A8A9AD" },
      { name: "Midnight Black", hex: "#222222" }
    ],
    specs: [
      { label: "Motor", value: "1000 Watts Copper Motor" },
      { label: "Speed Controls", value: "3 Speed + Pulse Function" },
      { label: "Jars Included", value: "1.5L Liquidizing, 1.0L Dry, 0.4L Chutney Jar" },
      { label: "Safety", value: "Auto-cut overload protection" }
    ],
    isFeatured: true
  },
  {
    id: "prod-smart-watch",
    slug: "smart-watch",
    name: "Amoled Active Smartwatch",
    category: "Wearables",
    price: 599.00,
    originalPrice: 899.00,
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Track your health metrics and stay connected in style. Features an active Always-On AMOLED panel, 10-day battery life, continuous heart rate sensor, blood oxygen tracker, and 100+ professional sports modes.",
    discount: 33,
    inStock: 45,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Rose Gold", hex: "#E0B0FF" },
      { name: "Navy Blue", hex: "#1A2E40" }
    ],
    specs: [
      { label: "Display", value: "1.43\" AMOLED Always-On Touch Screen" },
      { label: "Battery", value: "Up to 10 days normal use" },
      { label: "Water Resistance", value: "5 ATM (up to 50 meters)" },
      { label: "Sensors", value: "Heart Rate, SpO2, Accelerometer, Gyroscope" }
    ],
    isFeatured: true
  },
  {
    id: "prod-air-buds",
    slug: "air-buds",
    name: "Air Buds Elite Pro",
    category: "Audio",
    price: 780.00,
    originalPrice: 999.00,
    rating: 4.6,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Experience silence like never before. With 42dB Hybrid Active Noise Cancellation, high-fidelity dynamic drivers, ultra-low latency gaming mode, and a combined 36-hour playback backup.",
    discount: 22,
    inStock: 50,
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Obsidian Black", hex: "#1A1A1A" }
    ],
    specs: [
      { label: "Drivers", value: "11mm Liquid Crystal Polymer Drivers" },
      { label: "ANC Level", value: "Up to 42dB Hybrid Active Noise Cancellation" },
      { label: "Bluetooth", value: "Version 5.3 (Dual Channel)" },
      { label: "Battery Life", value: "6h (buds) + 30h (charging case) with ANC off" }
    ],
    isFeatured: true
  },
  {
    id: "prod-play-game",
    slug: "play-game",
    name: "Next-Gen Play Game Console",
    category: "Gaming",
    price: 19500.00,
    originalPrice: 32500.00,
    rating: 4.9,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Immerse yourself in spectacular 4K gaming at up to 120fps. Driven by a custom AMD Zen 2 CPU and RDNA 2 GPU, ultra-fast 1TB NVMe SSD for near-zero loading screens, and a groundbreaking haptic wireless controller.",
    discount: 40,
    inStock: 18,
    colors: [
      { name: "Glacier White", hex: "#F3F4F6" },
      { name: "Jet Black", hex: "#000000" }
    ],
    specs: [
      { label: "Processor", value: "8-Core Custom AMD Zen 2 CPU @ 3.5GHz" },
      { label: "Graphics", value: "Custom RDNA 2 GPU, 10.28 TFLOPs, 36 CUs" },
      { label: "Storage", value: "Custom 1TB High-Speed PCIe Gen 4 SSD" },
      { label: "Media Support", value: "4K UHD Blu-ray drive (Optional)" }
    ],
    isFeatured: true
  },
  {
    id: "prod-notebook-horizon",
    slug: "notebook-horizon",
    name: "Notebook Horizon Ultra",
    category: "Laptops",
    price: 42300.00,
    originalPrice: 49000.00,
    rating: 4.8,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Designed for high-productivity creators and developers. Anchored by the latest Core i9 processor, 32GB RAM, 1TB SSD, and a bright 16-inch 120Hz IPS display with 100% sRGB accuracy.",
    discount: 14,
    inStock: 12,
    colors: [
      { name: "Space Gray", hex: "#3E424B" },
      { name: "Platinum Silver", hex: "#E5E7EB" }
    ],
    specs: [
      { label: "CPU", value: "Intel Core i9 14th Gen (14-Core)" },
      { label: "Memory", value: "32GB LPDDR5 Dual-Channel" },
      { label: "Display", value: "16\" Liquid Retina WQXGA, 120Hz Refresh" },
      { label: "OS", value: "Windows 11 Professional pre-installed" }
    ],
    isFeatured: true
  },
  {
    id: "prod-wireless-earbuds-blue",
    slug: "wireless-earbuds",
    name: "Pro Wireless Earbuds Blue Edition",
    category: "Audio",
    price: 560.00,
    originalPrice: 1250.00,
    rating: 4.4,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Specialized Deep Blue Matte finish earbuds. Features intelligent dynamic EQ tuning, instant pairing, dual beamforming microphones, and IPX7 sweat & rain proof certificate.",
    discount: 55,
    inStock: 24,
    colors: [
      { name: "Deep Blue", hex: "#1D2D44" },
      { name: "Classic Black", hex: "#111111" }
    ],
    specs: [
      { label: "Playtime", value: "Up to 8 hours on single charge" },
      { label: "Waterproof", value: "IPX7 certified" },
      { label: "Voice Assistant", value: "Siri, Google Assistant, Alexa integration" }
    ],
    isFeatured: true,
    isOffer: true
  },
  {
    id: "prod-party-speakers",
    slug: "party-speakers",
    name: "BassBlast 360 Party Speaker",
    category: "Audio",
    price: 80000.00,
    originalPrice: 90000.00,
    rating: 4.9,
    reviewsCount: 190,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Bring the concert home with massive 360-degree party sound, custom dynamic pulsing RGB party lights, dual wireless mic inputs, and a rugged all-weather build with 18 hours battery backup.",
    discount: 11,
    inStock: 8,
    colors: [
      { name: "Midnight Black", hex: "#111111" }
    ],
    specs: [
      { label: "Output Power", value: "240 Watts RMS Room-Filling Sound" },
      { label: "Battery", value: "Up to 18 Hours Playback" },
      { label: "RGB Modes", value: "Beat-sync pulse, flow, and wave gradients" }
    ],
    isFeatured: true
  },
  {
    id: "prod-playstation-5",
    slug: "playstation-5",
    name: "Play Station 5 Pro Console",
    category: "Gaming",
    price: 599.00,
    originalPrice: 699.00,
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop"
    ],
    description: "PlayStation 5 Console enables stunning new gaming opportunities. Experience lightning-fast load speeds with an ultra-high-speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
    inStock: 50,
    colors: [
      { name: "Glacier White", hex: "#FFFFFF" }
    ],
    specs: [
      { label: "SSD Speed", value: "5.5GB/s Read bandwidth" },
      { label: "HDR Output", value: "Supports 8K and 4K HDR displays" },
      { label: "Controller", value: "DualSense Wireless Controller with Haptics" }
    ]
  },
  {
    id: "prod-headphones-black",
    slug: "headphones",
    name: "Studio Pro ANC Headphones",
    category: "Audio",
    price: 249.00,
    originalPrice: 349.00,
    rating: 4.8,
    reviewsCount: 154,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
    ],
    description: "High-fidelity professional over-ear studio headphones. Blocks ambient background noise with custom dynamic ANC levels, spatial audio processing, and soft memory-foam cups for all-day long listening sessions.",
    inStock: 40,
    colors: [
      { name: "Matte Black", hex: "#111111" }
    ],
    specs: [
      { label: "Acoustic System", value: "Closed-back 40mm Dynamic Neodymium Drivers" },
      { label: "Playtime", value: "Up to 40 Hours" },
      { label: "Connectivity", value: "Bluetooth 5.2 / 3.5mm Aux input" }
    ]
  },
  {
    id: "prod-earbuds-purple",
    slug: "earbuds",
    name: "Active Sports Earbuds Purple Edition",
    category: "Audio",
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.5,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Charming Pearl Purple sports earbuds designed specifically for active fitness. Stays secure in the ear with ergonomic hook, sweatproof dynamic nano-coating, and crystal clear phone audio.",
    inStock: 30,
    colors: [
      { name: "Pearl Purple", hex: "#B19FFB" }
    ],
    specs: [
      { label: "Battery Life", value: "Up to 7 hours playback per charge" },
      { label: "Fit", value: "Secure sport-fit earhooks" },
      { label: "IP Rating", value: "IPX6 sweat and dust protection" }
    ]
  },
  {
    id: "prod-laptop-slim",
    slug: "laptop",
    name: "ZenBook Air Ultra Slim",
    category: "Laptops",
    price: 249.00,
    originalPrice: 399.00,
    rating: 4.6,
    reviewsCount: 72,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Sleek and lightweight aluminum body laptop. Boasts an 8-core CPU, ultra-slim bezel display, comfortable backlit keyboard, and dual high-speed Thunderbolt ports.",
    inStock: 25,
    colors: [
      { name: "Aluminium Silver", hex: "#E5E7EB" }
    ],
    specs: [
      { label: "Display", value: "13.3\" Thin-Bezel IPS FHD Screen" },
      { label: "Weight", value: "Just 1.1kg (2.4 lbs)" },
      { label: "Ports", value: "2x Thunderbolt 4 USB-C ports" }
    ]
  },
  {
    id: "prod-14-pro-max",
    slug: "14-pro-max",
    name: "Luxury Liquid 14 Pro Max Case",
    category: "Smartphones",
    price: 24.00,
    originalPrice: 49.00,
    rating: 4.7,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Premium liquid silicone phone bumper shield for 14 Pro Max. Equipped with military-grade drop shock absorbency, compatible with MagSafe wireless magnetic chargers, and soft suede inner protection.",
    inStock: 100,
    colors: [
      { name: "Alpine Green", hex: "#2E5A44" },
      { name: "Deep Purple", hex: "#3C2A4D" },
      { name: "Space Black", hex: "#222222" }
    ],
    specs: [
      { label: "Material", value: "Liquid Soft Silicone Shielding" },
      { label: "Compatibility", value: "Apple iPhone 14 Pro Max" },
      { label: "Wireless", value: "100% Compatible with MagSafe Accessories" }
    ]
  },
  {
    id: "prod-shaver-trimmer",
    slug: "trimmer",
    name: "TrimPro Multi-Grooming Trimmer",
    category: "Grooming",
    price: 4999.00,
    originalPrice: 7800.00,
    rating: 4.6,
    reviewsCount: 104,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Achieve the perfect trim, shave, or style at home. Armed with self-sharpening titanium blades, 12 professional snap-on guide attachments, and advanced lithium-ion battery delivering 120 minutes of runtime.",
    discount: 36,
    inStock: 28,
    colors: [
      { name: "Slate Dark Gray", hex: "#3A3D40" }
    ],
    specs: [
      { label: "Blade Material", value: "Self-Sharpening Premium Titanium Blades" },
      { label: "Battery Type", value: "Lithium-Ion Rechargeable Battery" },
      { label: "Charging Time", value: "1 Hour Quick-Charge, 120 min runtime" },
      { label: "Attachments", value: "12 precision snaps for hair, face, and body" }
    ],
    isFeatured: true,
    isOffer: true
  }
];
