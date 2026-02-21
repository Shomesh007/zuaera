import { Product } from '../App';

const STORAGE_KEY = 'zuaera-products';

// Default products (fallback when localStorage is empty)
export const DEFAULT_PRODUCTS: Product[] = [
    {
        id: "01",
        series: "01",
        name: "CRISP",
        navLabel: "Male",
        tags: ["Fresh", "Green", "Clean", "Uplifting"],
        description: "CRISP is sharp and refreshing, opening with bright citrus and herbs, then settling into a clean, green calm. It feels modern, clear-headed, and effortlessly fresh.",
        tagline: "The architecture of morning light.",
        highlights: [
            { label: "Family", value: "Citrus Green", icon: "eco" },
            { label: "Sillage", value: "Fresh / Airy", icon: "air" }
        ],
        price: 999,
        volume: "30ML",
        image: "/crispy3.png",
        glowColor: "rgba(100, 255, 218, 0.2)",
        targetAudience: "Male",
        ingredients: [
            { name: "Mint", url: "/mint.png" },
            { name: "Lemon", url: "" },
            { name: "Basil", url: "" },
            { name: "Lavender", url: "/lavender.png" },
            { name: "Rosemary", url: "" },
            { name: "Black Currant", url: "" },
            { name: "Musk", url: "/musk.png" },
            { name: "Vervain", url: "" }
        ]
    },
    {
        id: "03",
        series: "03",
        name: "EYES",
        navLabel: "Female",
        tags: ["Warm", "Sweet", "Intimate", "Sensual"],
        description: "EYES is soft and inviting, built around warmth and sweetness. It sits close to the skin, comforting yet seductive, designed for quiet confidence rather than attention.",
        tagline: "The silence between heartbeats.",
        highlights: [
            { label: "Character", value: "Skin Scent", icon: "fingerprint" },
            { label: "Texture", value: "Velvet / Warm", icon: "texture" }
        ],
        price: 999,
        volume: "30ML",
        image: "/Eyes%20(female).jpeg",
        glowColor: "rgba(236, 72, 153, 0.25)",
        targetAudience: "Female",
        ingredients: [
            { name: "Vanilla", url: "/vanilla.png" },
            { name: "Jasmine", url: "/jasmine.png" },
            { name: "Tonka Bean", url: "" },
            { name: "Sugar", url: "" },
            { name: "Amber", url: "" },
            { name: "Musk", url: "/musk.png" },
            { name: "Patchouli", url: "" }
        ]
    },
    {
        id: "04",
        series: "04",
        name: "VIBE",
        navLabel: "Unisex",
        tags: ["Deep", "Woody", "Luxurious", "Gold"],
        description: "VIBE is rich and immersive, opening with spice and citrus before revealing a dark floral heart. It feels bold, grounded, and memorable.",
        tagline: "The molecular architecture of liquid sun.",
        highlights: [
            { label: "Longevity", value: "12+ Hours", icon: "history" },
            { label: "Molecular", value: "ISO E Super+", icon: "science" }
        ],
        price: 999,
        volume: "30ML",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
        glowColor: "rgba(242,208,13,0.3)",
        targetAudience: "Unisex",
        ingredients: [
            { name: "Saffron", url: "/saffron.png" },
            { name: "Bergamot", url: "" },
            { name: "Bulgarian Rose", url: "" },
            { name: "Oud", url: "" },
            { name: "Tonka Bean", url: "" },
            { name: "Oakmoss", url: "" },
            { name: "Amber", url: "" },
            { name: "Musk", url: "/musk.png" }
        ]
    }
];

export function loadProducts(): Product[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw) as Product[];
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch {
        // ignore
    }
    return DEFAULT_PRODUCTS;
}

export function saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function resetProducts(): void {
    localStorage.removeItem(STORAGE_KEY);
}
