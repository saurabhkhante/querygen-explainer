# Querygen A4 Explainer - Print Instructions

## Quick Start

The development server is already running at: **http://localhost:5174/**

## How to Use

### Viewing the Pages

1. Open your browser and go to: `http://localhost:5174/`
2. You'll see two options:
   - **Front Side** - The main explainer page
   - **Back Side** - The Charu Construction case study

### Printing for Lamination

#### Method 1: Browser Print (Recommended)

1. Navigate to `/front` or `/back` in your browser
2. Click the **"Print Current Page"** button in the navigation bar
3. In the print dialog:
   - **Paper size**: A4
   - **Orientation**: Portrait
   - **Margins**: None (or Minimum)
   - **Scale**: 100%
   - **Background graphics**: ON (important for colors)
4. Save as PDF or print directly

#### Method 2: Screenshot (Alternative)

1. Navigate to the desired page
2. Take a full-page screenshot
3. The page is designed to be exactly A4 dimensions (210mm × 297mm)

### Print Settings for Shop

When you take this to the print shop, request:

- **Paper Size**: A4 (210mm × 297mm)
- **Orientation**: Portrait (vertical)
- **Print Quality**: High quality / Photo quality
- **Color**: Full color
- **Lamination**: 300 micron lamination recommended for durability

## Pages Overview

### Front Side (`/front`)
- Headline: "You built a business on WhatsApp. You have zero visibility into it."
- Three key outcomes with benefits
- Dashboard visualization showing:
  - Metrics: 11,647 messages, 127 conversations, 182 alerts
  - Conversation list with auto-labels
- Green differentiator strip
- QR code with UTM parameters

### Back Side (`/back`)
- Charu Construction case study
- Three-panel flow:
  1. WhatsApp messages (dispatch data)
  2. Google Sheets (extracted data)
  3. Live Dashboard (PWA with metrics)
- Before/After/Result sections
- QR code with UTM parameters

## QR Code Details

Both pages include a QR code that points to:
```
https://querygen.ai/?utm_source=print&utm_medium=explainer&utm_campaign=india_ai_summit_2026
```

This allows you to track conversions from the printed material.

## Design Notes

- **Font**: DM Sans (loaded from Google Fonts)
- **Primary Color**: Querygen Green (#1a8a4a)
- **Layout**: Optimized for A4 print with proper spacing and readability
- **Navigation**: Hidden when printing (marked with `no-print` class)

## Troubleshooting

### Colors look washed out in print
- Make sure "Background graphics" is enabled in print settings
- Try "Save as PDF" first, then print the PDF

### Page doesn't fit A4
- Check that scale is set to 100%
- Margins should be set to "None" or "Minimum"

### QR code not scanning
- Ensure print quality is high
- QR code has error correction level "H" (high) for durability

## Development Commands

If you need to restart or make changes:

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## File Structure

```
src/
├── components/
│   ├── FrontSide.jsx    # Front page component
│   └── BackSide.jsx     # Back page component
├── App.jsx              # Main app with routing
├── index.css            # Global styles + Tailwind
└── main.jsx             # Entry point
```

---

**Created for**: India AI Summit, Delhi, February 2026
**Contact**: querygen.ai
