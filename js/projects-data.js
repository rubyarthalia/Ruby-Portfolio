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
    id: 1, featured: true,
    type: "analyst", langs: ["sql", "python"],
    title: "sales-performance-dashboard",
    desc: "End-to-end Power BI dashboard tracking KPIs across 5 regions. Reduced manual reporting time by 80% and improved decision-making speed for stakeholders.",
    bullets: [
      "Automated data refresh pipeline connecting SQL Server → Power BI",
      "DAX measures for YoY growth, rolling averages, and forecast variance"
    ],
    tags: ["Power BI", "SQL", "Python", "DAX", "Pandas"],
    repo: "yourusername/sales-performance-dashboard",
    demo: null,
    ghUrl: "https://github.com/yourusername/sales-performance-dashboard"
  },
  {
    id: 2, featured: true,
    type: "develop", langs: ["python"],
    title: "customer-churn-prediction",
    desc: "Random Forest + Logistic Regression model predicting customer churn with 89% accuracy. Deployed as an interactive Streamlit app for non-technical users.",
    bullets: [
      "Feature engineering on 20+ customer behavioral variables",
      "SHAP explainability dashboard showing top churn drivers"
    ],
    tags: ["Python", "Scikit-learn", "Streamlit", "Pandas", "SHAP"],
    repo: "yourusername/customer-churn-prediction",
    demo: null,
    ghUrl: "https://github.com/yourusername/customer-churn-prediction"
  },
  {
    id: 3, featured: false,
    type: "analyst", langs: ["python", "sql"],
    title: "ecommerce-rfm-segmentation",
    desc: "Customer segmentation using Recency-Frequency-Monetary analysis on 100k+ transactions, visualized in an interactive Tableau dashboard.",
    bullets: [
      "RFM scoring pipeline processing 100k+ transaction records",
      "Tableau dashboard with dynamic segment drilldowns"
    ],
    tags: ["Python", "SQL", "Tableau", "NumPy", "Pandas"],
    repo: "yourusername/ecommerce-rfm-segmentation",
    demo: null,
    ghUrl: "https://github.com/yourusername/ecommerce-rfm-segmentation"
  },
  {
    id: 4, featured: false,
    type: "develop", langs: ["python", "sql"],
    title: "job-listings-scraper",
    desc: "Automated web scraping pipeline collecting job listing data from 3 platforms, storing to PostgreSQL and sending daily digest emails.",
    bullets: [
      "Scrapers for 3 Indonesian job platforms with deduplication logic",
      "Airflow DAG scheduling with failure alerts via email"
    ],
    tags: ["Python", "BeautifulSoup", "PostgreSQL", "Airflow"],
    repo: "yourusername/job-listings-scraper",
    demo: null,
    ghUrl: "https://github.com/yourusername/job-listings-scraper"
  },
  {
    id: 5, featured: false,
    type: "analyst", langs: ["python", "r"],
    title: "idx-stock-eda",
    desc: "Exploratory analysis on Indonesian Stock Exchange (IDX) data including correlation heatmaps, rolling averages, and sector volatility comparisons.",
    bullets: [
      "Cleaned and processed 5 years of IDX OHLCV data",
      "Interactive Plotly charts with Bollinger Bands and rolling correlation"
    ],
    tags: ["Python", "R", "Plotly", "Pandas", "Statsmodels"],
    repo: "yourusername/idx-stock-eda",
    demo: null,
    ghUrl: "https://github.com/yourusername/idx-stock-eda"
  },
  {
    id: 6, featured: false,
    type: "analyst", langs: ["sql"],
    title: "hospital-wait-time-analytics",
    desc: "SQL-based patient flow analysis identifying operational bottlenecks. Findings contributed to a 22% reduction in average patient wait times.",
    bullets: [
      "Window functions to calculate queue build-up by hour of day",
      "Power BI report highlighting peak bottleneck windows for management"
    ],
    tags: ["SQL", "Power BI", "Excel"],
    repo: "yourusername/hospital-wait-time-analytics",
    demo: null,
    ghUrl: "https://github.com/yourusername/hospital-wait-time-analytics"
  },
  {
    id: 7, featured: false,
    type: "develop", langs: ["python"],
    title: "sentiment-analysis-reviews",
    desc: "NLP pipeline classifying Indonesian-language product reviews using fine-tuned IndoBERT, achieving 91% F1-score on the held-out test set.",
    bullets: [
      "Fine-tuned IndoBERT on 15k labeled Indonesian reviews",
      "FastAPI inference endpoint for real-time classification"
    ],
    tags: ["Python", "HuggingFace", "PyTorch", "FastAPI", "BERT"],
    repo: "yourusername/sentiment-analysis-reviews",
    demo: null,
    ghUrl: "https://github.com/yourusername/sentiment-analysis-reviews"
  },
  {
    id: 8, featured: false,
    type: "analyst", langs: ["python", "sql"],
    title: "geospatial-retail-heatmap",
    desc: "Folium + GeoPandas visualization of retail foot-traffic patterns in Surabaya. Used by management to identify optimal expansion locations.",
    bullets: [
      "Processed GPS check-in data with GeoPandas spatial joins",
      "Folium choropleth heatmap with district-level density overlays"
    ],
    tags: ["Python", "GeoPandas", "Folium", "SQL", "Plotly"],
    repo: "yourusername/geospatial-retail-heatmap",
    demo: null,
    ghUrl: "https://github.com/yourusername/geospatial-retail-heatmap"
  },
];
