# ERICODE Design System — Agent Handoff

## Instructions for the implementation agent
Use this document as the source of truth for the existing Framer style library. Reuse the exact named styles and theme values; do not replace them with approximate defaults. This is a complete export of the Text and Brand folders, plus other styles currently present. It is not a full export of page content, components, assets or interactions.

## Visual direction
Dark brutalist developer portfolio: near-black backgrounds, restrained surfaces, lime accent, uppercase geometric headings and technical monospace labels.

## Responsive ranges
- Desktop: 1200px and above.
- Tablet: 810px–1199.98px.
- Phone: below 810px.
- Text presets with only a default size retain that size across all ranges.
- Relative line heights and tracking must remain relative units.

## Brand folder — all 10 color tokens

| Name | Light | Dark effective value | Dark explicitly configured |
|---|---|---|---|
| Brand/Background | rgb(10, 10, 10) | rgb(10, 10, 10) | Yes |
| Brand/Surface | rgb(20, 20, 20) | rgb(20, 20, 20) | Yes |
| Brand/Border | rgb(36, 36, 36) | rgb(36, 36, 36) | Yes |
| Brand/Accent | rgb(200, 255, 0) | rgb(200, 255, 0) | Yes |
| Brand/Text Primary | rgb(245, 245, 245) | rgb(245, 245, 245) | Yes |
| Brand/Text Secondary | rgb(136, 136, 136) | rgb(148, 148, 148) | Yes |
| Brand/Text Muted | rgb(68, 68, 68) | rgb(107, 107, 107) | Yes |
| Brand/Error | rgb(255, 34, 68) | rgb(255, 34, 68) | No — falls back to light |
| Brand/Error 20% | rgba(255, 34, 68, 0.2) | rgba(255, 34, 68, 0.2) | No — falls back to light |
| Brand/bg 0% | rgba(10, 10, 10, 0) | rgba(10, 10, 10, 0) | No — falls back to light |

### CSS theme variables
```css
:root {
  --brand-background: rgb(10, 10, 10);
  --brand-surface: rgb(20, 20, 20);
  --brand-border: rgb(36, 36, 36);
  --brand-accent: rgb(200, 255, 0);
  --brand-text-primary: rgb(245, 245, 245);
  --brand-text-secondary: rgb(136, 136, 136);
  --brand-text-muted: rgb(68, 68, 68);
  --brand-error: rgb(255, 34, 68);
  --brand-error-20: rgba(255, 34, 68, 0.2);
  --brand-bg-0: rgba(10, 10, 10, 0);
}
[data-theme="dark"] {
  --brand-background: rgb(10, 10, 10);
  --brand-surface: rgb(20, 20, 20);
  --brand-border: rgb(36, 36, 36);
  --brand-accent: rgb(200, 255, 0);
  --brand-text-primary: rgb(245, 245, 245);
  --brand-text-secondary: rgb(148, 148, 148);
  --brand-text-muted: rgb(107, 107, 107);
  --brand-error: rgb(255, 34, 68);
  --brand-error-20: rgba(255, 34, 68, 0.2);
  --brand-bg-0: rgba(10, 10, 10, 0);
}
```

The light theme is also visually dark by design. Only Secondary and Muted text differ between the explicitly configured themes. Do not invent a white-background light theme.

## Text folder — all 9 presets
Each entry below records every exported setting. An omitted setting is unspecified in the source; do not treat it as a confirmed value. Font feature flags are recorded as configured, not a guarantee that every font supports each flag.

### Text/Display
```json
{
  "fontName": "Space Grotesk",
  "fontStyle": "normal",
  "fontWeight": 700,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textTransform": "uppercase",
  "textColor": "var(--brand-text-primary)",
  "breakpoint": {
    "default": {
      "minWidth": "1200px",
      "fontSize": "120px",
      "letterSpacing": "-0.05em",
      "lineHeight": "0.98em",
      "paragraphSpacing": "0px"
    },
    "medium": {
      "minWidth": "810px",
      "fontSize": "96px",
      "letterSpacing": "-0.05em",
      "lineHeight": "0.98em",
      "paragraphSpacing": "0px"
    },
    "small": {
      "minWidth": "0px",
      "fontSize": "64px",
      "letterSpacing": "-0.05em",
      "lineHeight": "0.98em",
      "paragraphSpacing": "0px"
    }
  },
  "tag": "h1"
}
```

### Text/Heading
```json
{
  "fontName": "Space Grotesk",
  "fontStyle": "normal",
  "fontWeight": 700,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textTransform": "uppercase",
  "textColor": "var(--brand-text-primary)",
  "breakpoint": {
    "default": {
      "minWidth": "1200px",
      "fontSize": "32px",
      "letterSpacing": "-0.02em",
      "lineHeight": "1.2em",
      "paragraphSpacing": "0px"
    },
    "medium": {
      "minWidth": "810px",
      "fontSize": "26px",
      "letterSpacing": "-0.02em",
      "lineHeight": "1.2em",
      "paragraphSpacing": "0px"
    },
    "small": {
      "minWidth": "0px",
      "fontSize": "20px",
      "letterSpacing": "-0.02em",
      "lineHeight": "1.2em",
      "paragraphSpacing": "0px"
    }
  },
  "tag": "h2"
}
```

### Text/Heading L
```json
{
  "paragraphSpacing": 40,
  "fontName": "Space Grotesk",
  "fontStyle": "normal",
  "fontWeight": 700,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textTransform": "uppercase",
  "textColor": "var(--brand-text-primary)",
  "breakpoint": {
    "default": {
      "minWidth": "1200px",
      "fontSize": "48px",
      "letterSpacing": "-0.02em",
      "lineHeight": "1.2em",
      "paragraphSpacing": "40px"
    },
    "medium": {
      "minWidth": "810px",
      "fontSize": "38px",
      "letterSpacing": "-0.02em",
      "lineHeight": "1.2em",
      "paragraphSpacing": "40px"
    },
    "small": {
      "minWidth": "0px",
      "fontSize": "31px",
      "letterSpacing": "-0.02em",
      "lineHeight": "1.2em",
      "paragraphSpacing": "40px"
    }
  },
  "tag": "h2"
}
```

### Text/Heading SM
```json
{
  "fontName": "Space Grotesk",
  "fontStyle": "normal",
  "fontWeight": 700,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textTransform": "uppercase",
  "textColor": "var(--brand-text-primary)",
  "breakpoint": {
    "default": {
      "minWidth": "0px",
      "fontSize": "20px",
      "letterSpacing": "-0.01em",
      "lineHeight": "1.3em",
      "paragraphSpacing": "0px"
    }
  },
  "tag": "h3"
}
```

### Text/Display SM
```json
{
  "fontName": "Space Grotesk",
  "fontStyle": "normal",
  "fontWeight": 700,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textColor": "var(--brand-text-primary)",
  "breakpoint": {
    "default": {
      "minWidth": "1200px",
      "fontSize": "64px",
      "letterSpacing": "-0.03em",
      "lineHeight": "1em",
      "paragraphSpacing": "0px"
    },
    "medium": {
      "minWidth": "810px",
      "fontSize": "51px",
      "letterSpacing": "-0.03em",
      "lineHeight": "1em",
      "paragraphSpacing": "0px"
    },
    "small": {
      "minWidth": "0px",
      "fontSize": "41px",
      "letterSpacing": "-0.03em",
      "lineHeight": "1em",
      "paragraphSpacing": "0px"
    }
  }
}
```

### Text/Body
```json
{
  "fontName": "Inter",
  "fontStyle": "normal",
  "fontWeight": 400,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textColor": "var(--brand-text-secondary)",
  "breakpoint": {
    "default": {
      "minWidth": "0px",
      "fontSize": "16px",
      "letterSpacing": "-0.01em",
      "lineHeight": "1.65em",
      "paragraphSpacing": "0px"
    }
  }
}
```

### Text/Mono
```json
{
  "fontName": "JetBrains Mono",
  "fontStyle": "normal",
  "fontWeight": 400,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textColor": "var(--brand-text-secondary)",
  "breakpoint": {
    "default": {
      "minWidth": "0px",
      "fontSize": "12px",
      "letterSpacing": "0.02em",
      "lineHeight": "1.5em",
      "paragraphSpacing": "0px"
    }
  }
}
```

### Text/Mono Caps
```json
{
  "fontName": "JetBrains Mono",
  "fontStyle": "normal",
  "fontWeight": 500,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textTransform": "uppercase",
  "textColor": "var(--brand-text-secondary)",
  "breakpoint": {
    "default": {
      "minWidth": "0px",
      "fontSize": "11px",
      "letterSpacing": "0.12em",
      "lineHeight": "1.45em",
      "paragraphSpacing": "0px"
    }
  }
}
```

### Text/Mono Caps Bold
```json
{
  "fontName": "JetBrains Mono",
  "fontStyle": "normal",
  "fontWeight": 700,
  "openTypeFontFeatures": {
    "blwf": "on",
    "cv03": "on",
    "cv04": "on",
    "cv09": "on",
    "cv11": "on"
  },
  "textAlignment": "left",
  "textTransform": "uppercase",
  "textColor": "var(--brand-text-primary)",
  "breakpoint": {
    "default": {
      "minWidth": "0px",
      "fontSize": "11px",
      "letterSpacing": "0.1em",
      "lineHeight": "1.45em",
      "paragraphSpacing": "0px"
    }
  }
}
```

## Ready-to-use typography CSS
Use the named classes below on matching text roles. Load Space Grotesk, Inter, and JetBrains Mono before rendering. Paragraph spacing is listed in the source entries and must be applied between paragraphs, not as line height.
```css
.text-display {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  color: var(--brand-text-primary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 120px;
  letter-spacing: -0.05em;
  line-height: 0.98em;
}
@media (min-width: 810px) and (max-width: 1199.98px) {
.text-display {
  font-size: 96px;
  letter-spacing: -0.05em;
  line-height: 0.98em;
}
}
@media (max-width: 809.98px) {
.text-display {
  font-size: 64px;
  letter-spacing: -0.05em;
  line-height: 0.98em;
}
}
.text-heading {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  color: var(--brand-text-primary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 32px;
  letter-spacing: -0.02em;
  line-height: 1.2em;
}
@media (min-width: 810px) and (max-width: 1199.98px) {
.text-heading {
  font-size: 26px;
  letter-spacing: -0.02em;
  line-height: 1.2em;
}
}
@media (max-width: 809.98px) {
.text-heading {
  font-size: 20px;
  letter-spacing: -0.02em;
  line-height: 1.2em;
}
}
.text-heading-l {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  color: var(--brand-text-primary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 48px;
  letter-spacing: -0.02em;
  line-height: 1.2em;
}
@media (min-width: 810px) and (max-width: 1199.98px) {
.text-heading-l {
  font-size: 38px;
  letter-spacing: -0.02em;
  line-height: 1.2em;
}
}
@media (max-width: 809.98px) {
.text-heading-l {
  font-size: 31px;
  letter-spacing: -0.02em;
  line-height: 1.2em;
}
}
.text-heading-sm {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  color: var(--brand-text-primary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 20px;
  letter-spacing: -0.01em;
  line-height: 1.3em;
}
.text-display-sm {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  color: var(--brand-text-primary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 64px;
  letter-spacing: -0.03em;
  line-height: 1em;
}
@media (min-width: 810px) and (max-width: 1199.98px) {
.text-display-sm {
  font-size: 51px;
  letter-spacing: -0.03em;
  line-height: 1em;
}
}
@media (max-width: 809.98px) {
.text-display-sm {
  font-size: 41px;
  letter-spacing: -0.03em;
  line-height: 1em;
}
}
.text-body {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  color: var(--brand-text-secondary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 1.65em;
}
.text-mono {
  font-family: "JetBrains Mono", monospace;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  color: var(--brand-text-secondary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 12px;
  letter-spacing: 0.02em;
  line-height: 1.5em;
}
.text-mono-caps {
  font-family: "JetBrains Mono", monospace;
  font-weight: 500;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  color: var(--brand-text-secondary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 11px;
  letter-spacing: 0.12em;
  line-height: 1.45em;
}
.text-mono-caps-bold {
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  color: var(--brand-text-primary);
  font-feature-settings: "blwf" 1, "cv03" 1, "cv04" 1, "cv09" 1, "cv11" 1;
  font-size: 11px;
  letter-spacing: 0.1em;
  line-height: 1.45em;
}
```

### Paragraph spacing
- Text/Heading L: 40px between paragraphs at all sizes.
- All other Text presets: 0px paragraph spacing.
- Do not infer uppercase for Text/Display SM, Text/Body or Text/Mono: it is not explicitly configured.
- Explicit semantic tags: Display = h1; Heading and Heading L = h2; Heading SM = h3. Other presets do not specify a tag.

## Other styles in the library
These are outside the Text and Brand folders, included for completeness.

### Link
```json
{
  "link": {
    "textDecorationColor": "rgba(0, 0, 0, 0.1)",
    "textColor": "var(--brand-text-primary)",
    "hover": {
      "textColor": "var(--brand-accent)"
    },
    "current": {
      "textColor": "var(--brand-accent)"
    }
  }
}
```

### Link 2
```json
{
  "link": {
    "textColor": "var(--brand-accent)"
  }
}
```

### Inline Code
```json
{
  "fontSizeScale": "0.95em",
  "paddingXScale": "0.3em",
  "radius": "5px",
  "fontName": "Geist Mono",
  "fontStyle": "normal",
  "fontWeight": 500,
  "textBackgroundColor": "rgba(0, 0, 0, 0.05)",
  "textColor": "rgb(102, 102, 102)"
}
```

## Implementation notes
- Link: primary text normally, accent on hover and current-page state.
- Link 2: accent text; no additional state settings exported.
- Inline Code references Geist Mono even though the reported project-font list contains Inter, Space Grotesk and JetBrains Mono. Verify availability/load Geist Mono if reproducing that existing style; do not silently substitute it.
- Preserve transparent background tokens: bg 0% is transparent near-black, not an opaque surface.
- Error 20% retains alpha 0.2.
- No additional image, table or blockquote styles were found in this style-library read.
- CSS variable names in this document are portable aliases derived from the visible style names.
- Font feature settings are carried over exactly as configured; unsupported flags may have no visual effect.
- Reset browser default heading/paragraph margins separately; Framer paragraph spacing is not a default browser margin.

## Completion checklist
- [ ] All 10 Brand colors mapped to reusable theme variables.
- [ ] All 9 Text presets implemented with correct font, weight, color, tracking and line height.
- [ ] Responsive sizes checked at desktop, tablet and phone widths.
- [ ] Secondary and Muted text use the correct theme values.
- [ ] Link hover/current styles preserved.
- [ ] Paragraph spacing preserved.
- [ ] No invented styles presented as source values.