# Applied Data Visualization Course Website // Retro Terminal Edition

A web platform for presenting a 12-assignment applied data visualization research project, crafted in a retro VT100 / IBM 5151 monochrome green phosphor CRT aesthetic.

---

## 🖥️ Architecture & Features

- **Classic Black & Green Phosphor Palette**: Authentic monochrome CRT visual design (`#00ff66` / `#42ff92` on deep `#040805` surface).
- **Interactive CRT Overlays**:
  - **Raster Scanlines**: Toggle on or off anytime via `[SCANLINES: ON/OFF]` in the top status bar.
  - **Phosphor Bloom Glow**: Switch between high-glow and accessible high-contrast reading mode via `[GLOW: ON/OFF]`.
  - **8-Bit Audio Blips**: Optional synthesized mechanical keyboard & terminal keypress tones generated live with the HTML5 Web Audio API (zero audio file dependencies; toggleable via `[AUDIO: ON/OFF]`).
  - **Quick Jump Command Palette**: Press `Ctrl+K` (or click `[CMD JUMP ^K]`) from any page to rapidly jump to any assignment or the homepage.
  - **Embedded Mini-CLI**: Type interactive commands like `list`, `goto 1`, `goto 8`, `info`, or `clear` directly on the homepage.
- **Data Visualization Ready**: Pre-styled Chart.js canvas themes on every assignment page featuring phosphor glowing lines, dark gridlines, custom tooltips, and responsive sizing.
- **Zero-Build Static Architecture**: Standard HTML5, modern CSS3, and ES6 JavaScript. No npm build steps, webpack, or complex dependencies required to preview or edit.

---

## 📂 Project Directory Structure

```text
retro-dataviz-site/
├── index.html                   # Cover Page & 12-Assignment Project Matrix
├── README.md                    # This documentation file
├── assets/
│   ├── css/
│   │   └── terminal.css         # Retro CRT styling, variables, scanlines, responsive grid
│   └── js/
│       ├── terminal.js          # Clock, audio synth, scanline toggle, and Ctrl+K jump modal
│       └── retro-charts.js      # Chart.js green phosphor presets and helpers
└── assignments/
    ├── assignment-01.html       # A01: Dataset Selection & Problem Formulation
    ├── assignment-02.html       # A02: Data Acquisition & Schema Profiling
    ├── assignment-03.html       # A03: Exploratory Data Analysis & Statistics
    ├── assignment-04.html       # A04: Data Cleaning & Feature Transformation
    ├── assignment-05.html       # A05: Univariate Distributions & Outliers
    ├── assignment-06.html       # A06: Bivariate Relationships & Correlations
    ├── assignment-07.html       # A07: Multivariate Visualizations & Dimensionality
    ├── assignment-08.html       # A08: Time-Series & Temporal Analysis
    ├── assignment-09.html       # A09: Geospatial & Hierarchical Visualizations
    ├── assignment-10.html       # A10: Interactive Visualizations & Dynamic Filters
    ├── assignment-11.html       # A11: Data Storytelling & Dashboard Synthesis
    └── assignment-12.html       # A12: Final Capstone Report & Findings
```

---

## 🚀 How to Run & Preview

### Option 1: Direct Browser Launch
Simply double-click `index.html` (or any file in `assignments/`) to open it in your browser of choice (Chrome, Edge, Firefox, Safari).

### Option 2: Local Static Server (Recommended)
From your terminal:
```bash
# Using Python
python -m http.server 8080

# Or using npx
npx serve .
```
Then visit `http://localhost:8080` in your web browser.

---

## ✏️ How to Edit as You Progress Through the Course

Each file is clearly annotated with **`[STUDENT EDITABLE REGION]`** callout boxes so you know exactly where to make updates:

1. **Update Dataset Information**:
   - Open `index.html` and edit the **System Dossier** table to set your dataset name, data source, record count, and primary research questions.
   - Update your name and course details in the **Metadata Grid** near the top.

2. **Editing an Assignment (e.g., `assignments/assignment-01.html`)**:
   - **Research Questions & Context**: Edit the text in the `<article class="terminal-card">` section.
   - **Metrics Strip**: Change the numbers and labels in `<div class="stat-metric-strip">` to match your empirical findings.
   - **Charts**: In the `<script>` tag at the bottom of the file, update the `labels`, `data`, and `dataset` values to plot your real numbers.
   - **Code Snippets**: Paste your actual Python / R / SQL / Pandas code into the `<pre class="code-content"><code>` block.
   - **Status Badges**: Update `<span class="card-badge wip">` to `<span class="card-badge complete">` as you complete each assignment.

3. **Deploying to the Web (Free)**:
   - This site is 100% static and can be deployed in seconds to **GitHub Pages**, **Netlify**, or **Vercel** simply by uploading the folder or pushing to a git repository.

---

## 💡 Setting as Active Workspace
To work directly on this project in your editor or Antigravity, set the active workspace to:
`C:\Users\gcsan\.gemini\antigravity\scratch\retro-dataviz-site`
