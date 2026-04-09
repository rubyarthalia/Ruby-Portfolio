/**
 * js/projects-data.js
 * ─────────────────────────────────────────────
 * Single source of truth for ALL your projects.
 * Loaded by both index.html (preview) and projects.html (full gallery).
 *
 * HOW TO ADD A PROJECT:
 *  1. Copy an existing object below
 *  2. Fill in your details
 *  3. Set repo: "yourusername/your-repo-name" for live GitHub stats
 *     (or null to skip stats)
 *
 * FIELDS:
 *  id        — unique number
 *  featured  — true shows "Featured" badge
 *  type      — "analyst" | "develop"
 *  langs     — array of: "python" | "sql" | "r"
 *  title     — repo-style title (shown as clickable link)
 *  desc      — one paragraph description
 *  bullets   — 2 short highlights shown in card
 *  tags      — tech stack chips
 *  repo      — "owner/reponame" for GitHub API (or null)
 *  demo      — live demo URL (or null)
 *  ghUrl     — full GitHub URL for the Open button
 */

const PROJECTS = [
  {
    id: 1,
    featured: true,
    type: "Development",
    langs: ["C#", ".NET Framework", "Windows Forms", "MySQL"],
    title: "Order Management System for MSMEs",
    desc: "A dual-application system built for a small business (MSME), with a customer-facing app for browsing catalogs and placing orders, and a staff-facing app for managing products, pre-orders, and generating reports.",
    bullets: [
      "Built two separate C# WinForms apps: one for customers and one for staff",
      "Staff app supports catalog management, pre-order handling, and batch/monthly/yearly reporting",
      "MySQL database integration for persistent order and product data",
      "Secure authentication flow with dedicated login and signup pages"
    ],
    tags: ["C#", ".NET", "Windows Forms", "MySQL", "Desktop App"],
    repo: "rubyarthalia/Order-Management-System-for-MSMEs",
    demo: null,
    ghUrl: "https://github.com/rubyarthalia/Order-Management-System-for-MSMEs",
  },

  {
    id: 2,
    featured: true,
    type: "Development",
    langs: ["PHP", "Laravel", "Blade", "MySQL", "HTML", "CSS"],
    title: "BersihIn — On-Demand Cleaning Service Platform",
    desc: "A Laravel-based web platform providing on-demand professional cleaning services, featuring a multi-role architecture for customers and administrators to manage service catalogs, bookings, and secure transactions.",
    bullets: [
      "Multi-role system supporting both customer and admin workflows",
      "Admin panel for managing service catalog and incoming bookings",
      "Secure authentication and authorization with Laravel",
      "Responsive web interface built with Blade templating"
    ],
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Web App"],
    repo: "rubyarthalia/BersihIn",
    demo: null,
    ghUrl: "https://github.com/rubyarthalia/BersihIn",
    demo: "https://bersihin.sift-uc.id/",
  },

  {
    id: 3,
    featured: false,
    type: "Development",
    langs: ["C#", ".NET", "Windows Forms"],
    title: "Simple Cashier App",
    desc: "A desktop cashier system for restaurants, handling table selection, food and drink ordering by category, payment processing, and receipt generation.",
    bullets: [
      "Categorized menu interface with separate modules for food and drinks",
      "Table management system for dine-in order tracking",
      "Integrated payment module with automatic total calculation",
      "Receipt (Nota) generation after successful transaction"
    ],
    tags: ["C#", ".NET", "Windows Forms", "Desktop App"],
    repo: "rubyarthalia/Simple-Cashier-App",
    demo: null,
    ghUrl: "https://github.com/rubyarthalia/Simple-Cashier-App",
  },

  {
    id: 4,
    featured: false,
    type: "Analytics",
    langs: ["Python", "Jupyter Notebook", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    title: "Data Mining Collection",
    desc: "A semester-long collection of Jupyter Notebooks covering the full data mining workflow — from data cleaning and EDA to machine learning techniques including clustering and classification.",
    bullets: [
      "Hands-on data cleaning and preprocessing across multiple real datasets",
      "Exploratory data analysis (EDA) with Matplotlib and Pandas",
      "Applied ML models including clustering (K-Means) and classification algorithms",
      "Structured weekly progression documenting growth across the semester"
    ],
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "EDA", "Machine Learning"],
    repo: "rubyarthalia/DataMining_Ruby",
    demo: null,
    ghUrl: "https://github.com/rubyarthalia/DataMining_Ruby",

  },

  {
    id: 5,
    featured: false,
    type: "Development",
    langs: ["HTML", "CSS", "JavaScript"],
    title: "Flora Calculator",
    desc: "A responsive, nature-themed web calculator with keyboard support, light/dark mode toggle, calculation history display, and a clean UI — built entirely with vanilla HTML, CSS, and JavaScript.",
    bullets: [
      "Full keyboard support for fast arithmetic input",
      "Light/dark mode toggle with nature-inspired icons",
      "Calculation history display for tracking previous operations",
      "Responsive layout that works across screen sizes"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "Frontend"],
    repo: "rubyarthalia/Flora-Calculator",
    demo: "https://rubyarthalia.github.io/Flora-Calculator",
    ghUrl: "https://github.com/rubyarthalia/Flora-Calculator",
  },
  
  {
    id: 6,
    featured: true,
    type: "Analytics",
    langs: ["Looker Studio", "Google Sheets"],
    title: "Student Lifestyle & Academic Performance Dashboard",
    desc: "A Business Intelligence dashboard analyzing how 2,000 students' daily habits — study hours, sleep, social activity, and extracurriculars — impact their GPA and stress levels, built using the DIA (Data, Insight, Action) framework.",
    bullets: [
      "Visualized GPA distribution across 2,000 students with histogram and donut charts",
      "Identified positive correlation between study hours and GPA via scatter plot trendlines",
      "Analyzed stress level breakdown — 51.4% high stress — across lifestyle activity segments",
      "Applied DIA framework to translate each chart into actionable recommendations"
    ],
    tags: ["Looker Studio", "Data Visualization", "Business Intelligence", "EDA"],
    repo: null,
    demo: "https://lookerstudio.google.com/reporting/4636341d-dd38-4b8e-8ec5-eb55537626cd",
  },

  {
    id: 7,
    featured: true,
    type: "Analytics",
    langs: ["Python", "Pandas", "NumPy", "Looker Studio", "Google BigQuery", "SQL"],
    title: "Telco Customer Churn Data Warehouse & Dashboard",
    desc: "An end-to-end data warehousing project on a 7,044-customer telco dataset — from ETL pipeline and star schema design in BigQuery, to a 2-page Looker Studio dashboard tracking churn behavior, revenue, and at-risk customer segments.",
    bullets: [
      "Built full ETL pipeline in Python: cleaned null values, converted data types, encoded categorical columns, and grouped churn reasons into 5 categories",
      "Designed a star schema with 1 fact table and 7 dimension tables (Customer, Location, Services, Addons, Streaming, Payment, Churn), loaded into Google BigQuery",
      "Dashboard Page 1: tracked 26.7% churn rate, 1,870 at-risk customers, churn by gender/senior/partner/dependents, tenure distribution, and top-paying customers",
      "Dashboard Page 2: visualized add-on adoption, bundle usage (68.6%), churn by city/contract/payment method, churn reasons, and high-risk customer list"
    ],
    tags: ["Python", "Pandas", "ETL", "BigQuery", "SQL", "Looker Studio", "Data Warehouse", "Star Schema"],
    repo: null,
    demo: "https://lookerstudio.google.com/reporting/f1a12446-bcbe-4757-bf82-92fb503929af",
  },

  {
    id: 8,
    featured: false,
    type: "Development",
    langs: ["HTML", "CSS", "JavaScript"],
    title: "Simple Photobooth",
    desc: "A browser-based photobooth application with a guided multi-step workflow for creating print-ready photo strips. Features smart image cropping, customizable borders and filters, and accurate physical dimensions for real photo booth frames.",
    bullets: [
      "Built a 5-step guided workflow: frame selection → input method → capture/upload → customization → download",
      "Supports 3 frame layouts — Normal Strip (5.08×15.24cm), 2×2 Grid (10×10cm), and Vintage (3.8×15.24cm) — all print-ready at 300 DPI",
      "Implemented real-time camera access via getUserMedia API with countdown capture, shutter sound, and slot-by-slot refill",
      "Added filter effects (Normal, B&W, Sepia, Vivid), border color picker, and adaptive timestamp text color based on border brightness",
      "Zero external dependencies — built entirely with vanilla JavaScript, Canvas API, and FileReader API"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Canvas API", "getUserMedia", "Vanilla JS", "Frontend"],
    repo: "rubyarthalia/Simple-Photobooth",
    demo: "https://rubyarthalia.github.io/Simple-Photobooth",
    ghUrl: "https://github.com/rubyarthalia/Simple-Photobooth",
  },
];
