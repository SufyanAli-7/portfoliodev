export const SELECTED_WORK_SECTION = {
  sectionPrefix: "04 /",
  sectionTitle: "SELECTED WORK",
  id: "projects",
};

export const PROJECTS_DATA = [
  {
    id: "quickcart",
    index: "01",
    category: "Full-Stack",
    subCategory: "E-Commerce",
    duration: "3 Months",
    title: "QuickCart",
    description:
      "Full-stack e-commerce ecosystem — product catalog, cart & checkout, customer portal, and comprehensive admin management.",
    liveUrl: "https://github.com/sufyanali",
    detailUrl: "/projects/quickcart",
    caseStudy: {
      client: "QuickCart Commerce Inc.",
      role: "Lead Full-Stack Developer",
      timeline: "3 Months",
      deliverables: ["Storefront Web App", "Customer Portal", "Admin Analytics Dashboard", "REST API & Auth Engine"],
      overview:
        "QuickCart is a modern, high-performance e-commerce platform built from the ground up to solve slow page loads, complicated order fulfillment, and fragmented admin workflows. It provides a blistering-fast customer shopping experience combined with a real-time administrative command center.",
      architecture: [
        {
          title: "Frontend Experience",
          desc: "Responsive catalog with instant search, multi-category browsing, real-time stock badges, dynamic cart management, and streamlined checkout.",
        },
        {
          title: "Admin Intelligence",
          desc: "Comprehensive analytics tracking revenue (PKR 2.29M+), real-time order status pipelines, inventory control, and role-based user management.",
        },
        {
          title: "Customer Hub",
          desc: "Dedicated user portal with instant order tracking, delivery status updates, itemized invoice receipts, and personalized saved item wishlists.",
        },
      ],
      techStack: [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "JWT Auth",
        "RESTful API",
      ],
      metrics: [
        { label: "Active Products", value: "30+" },
        { label: "Total Registered Users", value: "16+" },
        { label: "Total Revenue Processed", value: "PKR 2.29M" },
        { label: "Lighthouse Performance", value: "98/100" },
      ],
    },
    screens: [
      {
        id: "01",
        num: "01",
        title: "Homepage Hero",
        caption: "Promotional hero deal banner with featured categories and quick navigation.",
        src: "/images/quickcart-mockups/01-homepage-hero.png",
      },
      {
        id: "02",
        num: "02",
        title: "Popular Products Grid",
        caption: "Real-time stock level indicators, category tags, and instant cart quick actions.",
        src: "/images/quickcart-mockups/02-products-grid.png",
      },
      {
        id: "03",
        num: "03",
        title: "Store Catalog",
        caption: "Full product catalogue with filter by category and instant pricing visibility.",
        src: "/images/quickcart-mockups/03-store-catalog.png",
      },
      {
        id: "04",
        num: "04",
        title: "Product Detail View",
        caption: "High-resolution product showcase, specifications, stock availability, and guarantee badges.",
        src: "/images/quickcart-mockups/04-product-detail.png",
      },
      {
        id: "05",
        num: "05",
        title: "Admin Dashboard",
        caption: "Centralized analytics hub tracking gross revenue, total orders, customers, and recent transactions.",
        src: "/images/quickcart-mockups/05-admin-dashboard.png",
      },
      {
        id: "06",
        num: "06",
        title: "Admin Products Manager",
        caption: "Full CRUD inventory management system with stock tracking and fast pricing controls.",
        src: "/images/quickcart-mockups/06-admin-products.png",
      },
      {
        id: "07",
        num: "07",
        title: "Admin Orders Pipeline",
        caption: "Order fulfillment control with status filtering for pending, completed, and cancelled transactions.",
        src: "/images/quickcart-mockups/07-admin-orders.png",
      },
      {
        id: "08",
        num: "08",
        title: "Admin User Management",
        caption: "Role-based access control (RBAC) governing customer and administrative privileges.",
        src: "/images/quickcart-mockups/08-admin-users.png",
      },
      {
        id: "09",
        num: "09",
        title: "Customer Dashboard",
        caption: "Personalized user account interface with order summaries and quick account settings.",
        src: "/images/quickcart-mockups/09-customer-dashboard.png",
      },
      {
        id: "10",
        num: "10",
        title: "Customer Order Tracking",
        caption: "Transparent order history with real-time delivery statuses and invoice receipts.",
        src: "/images/quickcart-mockups/10-customer-orders.png",
      },
      {
        id: "11",
        num: "11",
        title: "Customer Wishlist",
        caption: "Saved products collection with instant one-click transfer to shopping bag.",
        src: "/images/quickcart-mockups/11-customer-wishlist.png",
      },
    ],
  },
];
