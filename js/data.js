/**
 * MAISON ÉLÉGANCE - Product Catalog
 *
 * Contains all product data for the luxury fashion e-commerce store.
 * Products are organized into three categories: men, women, accessories.
 * Exported as window.PRODUCTS for global access.
 */

window.PRODUCTS = [

  // =========================================================================
  // MEN'S COLLECTION (8 products)
  // =========================================================================

  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 49,
    originalPrice: null,
    category: "men",
    subcategory: "Tops",
    description: "Crafted from premium Supima cotton, this essential white tee offers an impeccable fit and a luxuriously soft hand feel. The reinforced collar and double-stitched hems ensure lasting shape and durability wash after wash.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Ivory", hex: "#FFFFF0" }
    ],
    image: "https://picsum.photos/seed/white-tee/400/500",
    images: [
      "https://picsum.photos/seed/white-tee-1/400/500",
      "https://picsum.photos/seed/white-tee-2/400/500",
      "https://picsum.photos/seed/white-tee-3/400/500"
    ],
    badge: null,
    rating: 4.5,
    reviews: 187,
    material: "100% Supima Cotton",
    care: "Machine wash cold. Tumble dry low. Do not bleach."
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 89,
    originalPrice: 129,
    category: "men",
    subcategory: "Bottoms",
    description: "These slim-fit jeans are woven from Japanese selvedge denim with just the right amount of stretch for all-day comfort. The clean indigo wash and tailored silhouette make them equally suited for casual Fridays and weekend outings.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", hex: "#3F51B5" },
      { name: "Black", hex: "#212121" },
      { name: "Light Wash", hex: "#90CAF9" }
    ],
    image: "https://picsum.photos/seed/slim-jeans/400/500",
    images: [
      "https://picsum.photos/seed/slim-jeans-1/400/500",
      "https://picsum.photos/seed/slim-jeans-2/400/500",
      "https://picsum.photos/seed/slim-jeans-3/400/500"
    ],
    badge: "SALE",
    rating: 4.3,
    reviews: 142,
    material: "98% Cotton, 2% Elastane — Japanese Selvedge Denim",
    care: "Machine wash cold inside out. Hang dry. Do not bleach."
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 399,
    originalPrice: null,
    category: "men",
    subcategory: "Outerwear",
    description: "Hand-finished from buttery-soft Italian lambskin, this moto-inspired jacket exudes effortless sophistication. Antique brass hardware and a satin-lined interior complete the luxurious construction.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Dark Brown", hex: "#4E342E" }
    ],
    image: "https://picsum.photos/seed/leather-jacket/400/500",
    images: [
      "https://picsum.photos/seed/leather-jacket-1/400/500",
      "https://picsum.photos/seed/leather-jacket-2/400/500",
      "https://picsum.photos/seed/leather-jacket-3/400/500",
      "https://picsum.photos/seed/leather-jacket-4/400/500"
    ],
    badge: "NEW",
    rating: 4.8,
    reviews: 64,
    material: "100% Italian Lambskin Leather, Satin Lining",
    care: "Professional leather cleaning only. Store on a padded hanger."
  },
  {
    id: 4,
    name: "Wool Overcoat",
    price: 349,
    originalPrice: null,
    category: "men",
    subcategory: "Outerwear",
    description: "This double-breasted overcoat is tailored from a heavyweight Italian wool-cashmere blend for exceptional warmth without bulk. Its structured shoulders and knee-length cut create a commanding silhouette perfect for the colder months.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#424242" },
      { name: "Camel", hex: "#C8A96E" },
      { name: "Navy", hex: "#1A237E" }
    ],
    image: "https://picsum.photos/seed/wool-overcoat/400/500",
    images: [
      "https://picsum.photos/seed/wool-overcoat-1/400/500",
      "https://picsum.photos/seed/wool-overcoat-2/400/500",
      "https://picsum.photos/seed/wool-overcoat-3/400/500"
    ],
    badge: null,
    rating: 4.7,
    reviews: 53,
    material: "80% Virgin Wool, 20% Cashmere",
    care: "Dry clean only. Store with cedar blocks."
  },
  {
    id: 5,
    name: "Oxford Shirt",
    price: 79,
    originalPrice: null,
    category: "men",
    subcategory: "Tops",
    description: "A wardrobe staple elevated with fine Egyptian cotton oxford cloth and mother-of-pearl buttons. The slightly relaxed fit transitions seamlessly from boardroom presentations to after-work cocktails.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#BBDEFB" },
      { name: "Pink", hex: "#F8BBD0" }
    ],
    image: "https://picsum.photos/seed/oxford-shirt/400/500",
    images: [
      "https://picsum.photos/seed/oxford-shirt-1/400/500",
      "https://picsum.photos/seed/oxford-shirt-2/400/500",
      "https://picsum.photos/seed/oxford-shirt-3/400/500"
    ],
    badge: null,
    rating: 4.4,
    reviews: 119,
    material: "100% Egyptian Cotton Oxford Cloth",
    care: "Machine wash warm. Iron on medium heat. Hang dry recommended."
  },
  {
    id: 6,
    name: "Chino Pants",
    price: 69,
    originalPrice: 95,
    category: "men",
    subcategory: "Bottoms",
    description: "These tailored chinos feature a garment-dyed finish that gives each pair a unique, lived-in character. The mid-rise waist and tapered leg offer a modern slim profile without restricting movement.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Khaki", hex: "#C8B88A" },
      { name: "Navy", hex: "#1A237E" },
      { name: "Olive", hex: "#6B8E23" }
    ],
    image: "https://picsum.photos/seed/chino-pants/400/500",
    images: [
      "https://picsum.photos/seed/chino-pants-1/400/500",
      "https://picsum.photos/seed/chino-pants-2/400/500",
      "https://picsum.photos/seed/chino-pants-3/400/500"
    ],
    badge: "SALE",
    rating: 4.2,
    reviews: 98,
    material: "97% Cotton, 3% Elastane Twill",
    care: "Machine wash cold. Tumble dry low. Iron on low if needed."
  },
  {
    id: 7,
    name: "Cashmere Sweater",
    price: 189,
    originalPrice: null,
    category: "men",
    subcategory: "Tops",
    description: "Knitted from two-ply Mongolian cashmere, this crew-neck sweater provides cloud-like softness and exceptional insulation. The ribbed cuffs and hem retain their shape beautifully over time.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Heather Grey", hex: "#B0BEC5" },
      { name: "Burgundy", hex: "#7B1F3A" },
      { name: "Navy", hex: "#1A237E" }
    ],
    image: "https://picsum.photos/seed/cashmere-sweater/400/500",
    images: [
      "https://picsum.photos/seed/cashmere-sweater-1/400/500",
      "https://picsum.photos/seed/cashmere-sweater-2/400/500",
      "https://picsum.photos/seed/cashmere-sweater-3/400/500"
    ],
    badge: "NEW",
    rating: 4.9,
    reviews: 76,
    material: "100% Two-Ply Mongolian Cashmere",
    care: "Hand wash cold or dry clean. Lay flat to dry. Do not wring."
  },
  {
    id: 8,
    name: "Linen Blazer",
    price: 229,
    originalPrice: null,
    category: "men",
    subcategory: "Outerwear",
    description: "This unstructured blazer is crafted from premium Belgian linen, offering a relaxed yet refined aesthetic ideal for warm-weather occasions. Half-lined for breathability, it pairs effortlessly with both dress trousers and denim.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#D2C4A5" },
      { name: "Light Grey", hex: "#CFD8DC" },
      { name: "Powder Blue", hex: "#B3CDE0" }
    ],
    image: "https://picsum.photos/seed/linen-blazer/400/500",
    images: [
      "https://picsum.photos/seed/linen-blazer-1/400/500",
      "https://picsum.photos/seed/linen-blazer-2/400/500",
      "https://picsum.photos/seed/linen-blazer-3/400/500"
    ],
    badge: null,
    rating: 4.5,
    reviews: 41,
    material: "100% Belgian Linen, Half-Lined",
    care: "Dry clean recommended. Steam to remove wrinkles."
  },

  // =========================================================================
  // WOMEN'S COLLECTION (8 products)
  // =========================================================================

  {
    id: 9,
    name: "Silk Wrap Dress",
    price: 259,
    originalPrice: null,
    category: "women",
    subcategory: "Dresses",
    description: "This fluid wrap dress is cut from lustrous mulberry silk that drapes beautifully over every silhouette. The adjustable tie waist and midi length create a universally flattering shape for day-to-evening versatility.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Emerald", hex: "#2E7D32" },
      { name: "Midnight Black", hex: "#1B1B1B" },
      { name: "Dusty Rose", hex: "#D4A0A0" }
    ],
    image: "https://picsum.photos/seed/silk-dress/400/500",
    images: [
      "https://picsum.photos/seed/silk-dress-1/400/500",
      "https://picsum.photos/seed/silk-dress-2/400/500",
      "https://picsum.photos/seed/silk-dress-3/400/500",
      "https://picsum.photos/seed/silk-dress-4/400/500"
    ],
    badge: "NEW",
    rating: 4.7,
    reviews: 89,
    material: "100% Mulberry Silk",
    care: "Dry clean only. Store on a padded hanger away from direct sunlight."
  },
  {
    id: 10,
    name: "High-Waist Trousers",
    price: 119,
    originalPrice: null,
    category: "women",
    subcategory: "Bottoms",
    description: "These high-waisted trousers feature a wide-leg silhouette that elongates the figure with effortless grace. Crafted from a structured wool blend, they hold their crease perfectly throughout the day.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Camel", hex: "#C8A96E" },
      { name: "Cream", hex: "#FFFDD0" }
    ],
    image: "https://picsum.photos/seed/hw-trousers/400/500",
    images: [
      "https://picsum.photos/seed/hw-trousers-1/400/500",
      "https://picsum.photos/seed/hw-trousers-2/400/500",
      "https://picsum.photos/seed/hw-trousers-3/400/500"
    ],
    badge: null,
    rating: 4.6,
    reviews: 134,
    material: "70% Wool, 25% Polyester, 5% Elastane",
    care: "Dry clean recommended. Iron on low with press cloth."
  },
  {
    id: 11,
    name: "Cashmere Cardigan",
    price: 199,
    originalPrice: 279,
    category: "women",
    subcategory: "Tops",
    description: "Wrapped in the finest Mongolian cashmere, this relaxed-fit cardigan is the epitome of understated luxury. Oversized horn buttons and deep patch pockets add a touch of character to this cozy essential.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#D4C5A9" },
      { name: "Soft Pink", hex: "#F1C6D3" },
      { name: "Charcoal", hex: "#424242" }
    ],
    image: "https://picsum.photos/seed/cashmere-cardi/400/500",
    images: [
      "https://picsum.photos/seed/cashmere-cardi-1/400/500",
      "https://picsum.photos/seed/cashmere-cardi-2/400/500",
      "https://picsum.photos/seed/cashmere-cardi-3/400/500"
    ],
    badge: "SALE",
    rating: 4.8,
    reviews: 67,
    material: "100% Grade-A Mongolian Cashmere",
    care: "Hand wash cold. Lay flat to dry. Store folded with lavender sachets."
  },
  {
    id: 12,
    name: "Pleated Midi Skirt",
    price: 99,
    originalPrice: null,
    category: "women",
    subcategory: "Bottoms",
    description: "This accordion-pleated midi skirt moves with graceful fluidity, creating a mesmerizing silhouette with every step. The elasticized waistband ensures a comfortable fit while the satin-finish fabric catches the light beautifully.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Forest Green", hex: "#2E5A3E" },
      { name: "Navy", hex: "#1A237E" }
    ],
    image: "https://picsum.photos/seed/pleated-skirt/400/500",
    images: [
      "https://picsum.photos/seed/pleated-skirt-1/400/500",
      "https://picsum.photos/seed/pleated-skirt-2/400/500",
      "https://picsum.photos/seed/pleated-skirt-3/400/500"
    ],
    badge: null,
    rating: 4.4,
    reviews: 91,
    material: "100% Polyester Satin",
    care: "Hand wash cold. Hang dry. Do not iron pleats."
  },
  {
    id: 13,
    name: "Satin Blouse",
    price: 89,
    originalPrice: null,
    category: "women",
    subcategory: "Tops",
    description: "This elevated satin blouse features a subtle sheen and a relaxed, feminine drape. The concealed button placket and French seam finishing reflect the meticulous attention to detail that defines our house.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Blush", hex: "#F8C8C8" },
      { name: "Black", hex: "#212121" }
    ],
    image: "https://picsum.photos/seed/satin-blouse/400/500",
    images: [
      "https://picsum.photos/seed/satin-blouse-1/400/500",
      "https://picsum.photos/seed/satin-blouse-2/400/500",
      "https://picsum.photos/seed/satin-blouse-3/400/500"
    ],
    badge: null,
    rating: 4.3,
    reviews: 108,
    material: "95% Silk, 5% Elastane Satin",
    care: "Dry clean only. Cool iron on reverse side."
  },
  {
    id: 14,
    name: "Tailored Blazer",
    price: 239,
    originalPrice: null,
    category: "women",
    subcategory: "Outerwear",
    description: "Precision-tailored from Italian virgin wool, this single-breasted blazer features a nipped waist and peaked lapels for a powerful yet feminine silhouette. Fully lined in silk for a smooth, luxurious fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Red", hex: "#B71C1C" }
    ],
    image: "https://picsum.photos/seed/tailored-blazer/400/500",
    images: [
      "https://picsum.photos/seed/tailored-blazer-1/400/500",
      "https://picsum.photos/seed/tailored-blazer-2/400/500",
      "https://picsum.photos/seed/tailored-blazer-3/400/500",
      "https://picsum.photos/seed/tailored-blazer-4/400/500"
    ],
    badge: "NEW",
    rating: 4.9,
    reviews: 55,
    material: "100% Italian Virgin Wool, Silk Lining",
    care: "Dry clean only. Store on a shaped hanger."
  },
  {
    id: 15,
    name: "Knit Turtleneck",
    price: 79,
    originalPrice: 109,
    category: "women",
    subcategory: "Tops",
    description: "This fine-gauge merino turtleneck is impossibly soft against the skin and slim enough to layer under blazers and coats. The ribbed neck, cuffs, and hem add subtle textural interest to the clean design.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Camel", hex: "#C8A96E" },
      { name: "Burgundy", hex: "#7B1F3A" }
    ],
    image: "https://picsum.photos/seed/knit-turtle/400/500",
    images: [
      "https://picsum.photos/seed/knit-turtle-1/400/500",
      "https://picsum.photos/seed/knit-turtle-2/400/500",
      "https://picsum.photos/seed/knit-turtle-3/400/500"
    ],
    badge: "SALE",
    rating: 4.5,
    reviews: 153,
    material: "100% Extra-Fine Merino Wool",
    care: "Hand wash cold or machine wash on wool cycle. Lay flat to dry."
  },
  {
    id: 16,
    name: "Leather Pants",
    price: 329,
    originalPrice: null,
    category: "women",
    subcategory: "Bottoms",
    description: "These sleek leather pants are crafted from supple nappa lambskin with a slim, straight-leg fit that flatters every figure. Fully lined in cotton for comfort, they bring an edge of bold sophistication to any ensemble.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Cognac", hex: "#9A6233" }
    ],
    image: "https://picsum.photos/seed/leather-pants/400/500",
    images: [
      "https://picsum.photos/seed/leather-pants-1/400/500",
      "https://picsum.photos/seed/leather-pants-2/400/500",
      "https://picsum.photos/seed/leather-pants-3/400/500"
    ],
    badge: null,
    rating: 4.6,
    reviews: 37,
    material: "100% Nappa Lambskin, Cotton Lining",
    care: "Professional leather cleaning only. Condition annually."
  },

  // =========================================================================
  // ACCESSORIES (8 products)
  // =========================================================================

  {
    id: 17,
    name: "Leather Tote Bag",
    price: 289,
    originalPrice: null,
    category: "accessories",
    subcategory: "Bags",
    description: "This structured tote is handcrafted from full-grain vegetable-tanned leather that develops a rich patina over time. The spacious interior features a suede lining, zip pocket, and dual slip pockets for effortless organization.",
    sizes: ["One Size"],
    colors: [
      { name: "Tan", hex: "#D2A76A" },
      { name: "Black", hex: "#212121" },
      { name: "Burgundy", hex: "#7B1F3A" }
    ],
    image: "https://picsum.photos/seed/leather-tote/400/500",
    images: [
      "https://picsum.photos/seed/leather-tote-1/400/500",
      "https://picsum.photos/seed/leather-tote-2/400/500",
      "https://picsum.photos/seed/leather-tote-3/400/500",
      "https://picsum.photos/seed/leather-tote-4/400/500"
    ],
    badge: null,
    rating: 4.8,
    reviews: 72,
    material: "Full-Grain Vegetable-Tanned Leather, Suede Lining",
    care: "Wipe with damp cloth. Apply leather conditioner every 3 months."
  },
  {
    id: 18,
    name: "Minimalist Watch",
    price: 199,
    originalPrice: null,
    category: "accessories",
    subcategory: "Watches",
    description: "A timepiece of quiet refinement, this Swiss-movement watch features a sunray-brushed dial housed in a slim 38mm stainless steel case. The interchangeable Italian leather strap ensures it complements any wardrobe.",
    sizes: ["One Size"],
    colors: [
      { name: "Silver/Black", hex: "#9E9E9E" },
      { name: "Gold/Brown", hex: "#FFD700" },
      { name: "Rose Gold/Blush", hex: "#E8B4B8" }
    ],
    image: "https://picsum.photos/seed/min-watch/400/500",
    images: [
      "https://picsum.photos/seed/min-watch-1/400/500",
      "https://picsum.photos/seed/min-watch-2/400/500",
      "https://picsum.photos/seed/min-watch-3/400/500"
    ],
    badge: null,
    rating: 4.7,
    reviews: 128,
    material: "316L Stainless Steel, Sapphire Crystal, Italian Leather Strap",
    care: "Avoid water exposure. Wipe case with microfiber cloth."
  },
  {
    id: 19,
    name: "Silk Scarf",
    price: 79,
    originalPrice: null,
    category: "accessories",
    subcategory: "Scarves",
    description: "Printed on sumptuous twill silk using traditional screen-printing techniques, this versatile scarf can be worn around the neck, as a headband, or tied to a handbag. Each piece is finished with hand-rolled edges.",
    sizes: ["One Size"],
    colors: [
      { name: "Blue Paisley", hex: "#1565C0" },
      { name: "Red Floral", hex: "#C62828" },
      { name: "Neutral Abstract", hex: "#BCAAA4" }
    ],
    image: "https://picsum.photos/seed/silk-scarf/400/500",
    images: [
      "https://picsum.photos/seed/silk-scarf-1/400/500",
      "https://picsum.photos/seed/silk-scarf-2/400/500",
      "https://picsum.photos/seed/silk-scarf-3/400/500"
    ],
    badge: null,
    rating: 4.6,
    reviews: 84,
    material: "100% Silk Twill, Hand-Rolled Edges",
    care: "Dry clean only. Store rolled or folded in tissue paper."
  },
  {
    id: 20,
    name: "Aviator Sunglasses",
    price: 159,
    originalPrice: null,
    category: "accessories",
    subcategory: "Eyewear",
    description: "These classic aviator sunglasses feature polarized lenses with full UV400 protection set in lightweight titanium frames. The teardrop lens shape flatters a wide range of face shapes with timeless appeal.",
    sizes: ["One Size"],
    colors: [
      { name: "Gold/Green", hex: "#FFD700" },
      { name: "Silver/Blue", hex: "#90CAF9" },
      { name: "Black/Grey", hex: "#424242" }
    ],
    image: "https://picsum.photos/seed/aviator-sun/400/500",
    images: [
      "https://picsum.photos/seed/aviator-sun-1/400/500",
      "https://picsum.photos/seed/aviator-sun-2/400/500",
      "https://picsum.photos/seed/aviator-sun-3/400/500"
    ],
    badge: null,
    rating: 4.5,
    reviews: 196,
    material: "Titanium Frame, Polarized CR-39 Lenses",
    care: "Clean with provided microfiber cloth. Store in protective case."
  },
  {
    id: 21,
    name: "Leather Belt",
    price: 69,
    originalPrice: null,
    category: "accessories",
    subcategory: "Belts",
    description: "This reversible belt is handcrafted from full-grain Italian leather, offering black on one side and brown on the other. The brushed palladium buckle rotates with a satisfying click for effortless versatility.",
    sizes: ["One Size"],
    colors: [
      { name: "Black/Brown", hex: "#3E2723" },
      { name: "Navy/Tan", hex: "#1A237E" }
    ],
    image: "https://picsum.photos/seed/leather-belt/400/500",
    images: [
      "https://picsum.photos/seed/leather-belt-1/400/500",
      "https://picsum.photos/seed/leather-belt-2/400/500",
      "https://picsum.photos/seed/leather-belt-3/400/500"
    ],
    badge: null,
    rating: 4.4,
    reviews: 162,
    material: "Full-Grain Italian Leather, Palladium Buckle",
    care: "Condition with leather cream bi-annually. Avoid prolonged moisture."
  },
  {
    id: 22,
    name: "Wool Fedora Hat",
    price: 89,
    originalPrice: null,
    category: "accessories",
    subcategory: "Hats",
    description: "Shaped from fine Australian merino wool felt, this fedora features a classic pinch crown and a grosgrain ribbon band. Lightweight and packable, it's the perfect finishing touch for both casual and dressed-up looks.",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Camel", hex: "#C8A96E" },
      { name: "Grey", hex: "#757575" }
    ],
    image: "https://picsum.photos/seed/wool-fedora/400/500",
    images: [
      "https://picsum.photos/seed/wool-fedora-1/400/500",
      "https://picsum.photos/seed/wool-fedora-2/400/500",
      "https://picsum.photos/seed/wool-fedora-3/400/500"
    ],
    badge: null,
    rating: 4.3,
    reviews: 47,
    material: "100% Australian Merino Wool Felt",
    care: "Brush gently with a soft hat brush. Store on a hat stand."
  },
  {
    id: 23,
    name: "Gold Hoop Earrings",
    price: 129,
    originalPrice: null,
    category: "accessories",
    subcategory: "Jewelry",
    description: "These sculptural hoop earrings are cast in 18k gold vermeil over sterling silver, featuring a contemporary oval shape with a high-polish finish. Lightweight and hypoallergenic, they elevate any look with quiet luxury.",
    sizes: ["One Size"],
    colors: [
      { name: "Gold", hex: "#FFD700" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Rose Gold", hex: "#E8B4B8" }
    ],
    image: "https://picsum.photos/seed/gold-hoops/400/500",
    images: [
      "https://picsum.photos/seed/gold-hoops-1/400/500",
      "https://picsum.photos/seed/gold-hoops-2/400/500",
      "https://picsum.photos/seed/gold-hoops-3/400/500"
    ],
    badge: null,
    rating: 4.7,
    reviews: 93,
    material: "18K Gold Vermeil over 925 Sterling Silver",
    care: "Store in provided pouch. Avoid perfumes and water. Polish with jewelry cloth."
  },
  {
    id: 24,
    name: "Leather Wallet",
    price: 29,
    originalPrice: null,
    category: "accessories",
    subcategory: "Small Goods",
    description: "This slim bifold wallet is crafted from hand-burnished calfskin leather with a contrasting edge paint detail. Eight card slots, two bill compartments, and a hidden coin pocket offer ample storage in a sleek profile.",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#212121" },
      { name: "Tan", hex: "#D2A76A" },
      { name: "Navy", hex: "#1A237E" }
    ],
    image: "https://picsum.photos/seed/leather-wallet/400/500",
    images: [
      "https://picsum.photos/seed/leather-wallet-1/400/500",
      "https://picsum.photos/seed/leather-wallet-2/400/500",
      "https://picsum.photos/seed/leather-wallet-3/400/500"
    ],
    badge: null,
    rating: 4.5,
    reviews: 178,
    material: "Hand-Burnished Calfskin Leather",
    care: "Wipe with soft cloth. Apply leather balm as needed."
  }
];
