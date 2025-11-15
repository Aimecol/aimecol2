# Hyperspeed Theme - Quick Reference Guide

## 🎨 Color Palettes

### Dark Mode (Default)
| Element | Color Code | Hex Value | Use Case |
|---------|-----------|-----------|----------|
| Road | 0x1a1a1a | #1a1a1a | Main road surface |
| Island | 0x0c0c0c | #0c0c0c | Center island |
| Background | 0x000000 | #000000 | Canvas background |
| Shoulder Lines | 0xff6b35 | #ff6b35 | Road edge markings |
| Broken Lines | 0xff6b35 | #ff6b35 | Lane markings |
| Left Cars 1 | 0xff6b35 | #ff6b35 | Orange cars (primary) |
| Left Cars 2 | 0xd77b35 | #d77b35 | Orange cars (secondary) |
| Left Cars 3 | 0xc85a23 | #c85a23 | Orange cars (tertiary) |
| Right Cars 1 | 0x004cff | #004cff | Blue cars (primary) |
| Right Cars 2 | 0x1e4d9e | #1e4d9e | Blue cars (secondary) |
| Right Cars 3 | 0x3a6bc9 | #3a6bc9 | Blue cars (tertiary) |
| Light Sticks | 0xff6b35 | #ff6b35 | Road-side lights |

### Light Mode
| Element | Color Code | Hex Value | Use Case |
|---------|-----------|-----------|----------|
| Road | 0xe8e8e8 | #e8e8e8 | Main road surface |
| Island | 0xf5f5f5 | #f5f5f5 | Center island |
| Background | 0xfafafa | #fafafa | Canvas background |
| Shoulder Lines | 0xc85a23 | #c85a23 | Road edge markings |
| Broken Lines | 0xd77b35 | #d77b35 | Lane markings |
| Left Cars 1 | 0xd77b35 | #d77b35 | Dark orange cars |
| Left Cars 2 | 0xc85a23 | #c85a23 | Dark orange cars |
| Left Cars 3 | 0xb64928 | #b64928 | Dark orange cars |
| Right Cars 1 | 0x1e4d9e | #1e4d9e | Dark blue cars |
| Right Cars 2 | 0x0e5ea5 | #0e5ea5 | Dark blue cars |
| Right Cars 3 | 0x004cff | #004cff | Dark blue cars |
| Light Sticks | 0xd77b35 | #d77b35 | Road-side lights |

## 🔌 Usage

### Basic Usage (Automatic Theming)
```tsx
import Hyperspeed from '@/components/hyperspeed'

export function MyComponent() {
  return <Hyperspeed />
}
```

### Custom Colors
```tsx
<Hyperspeed
  effectOptions={{
    colors: {
      leftCars: [0xff0000, 0x00ff00, 0x0000ff]
    }
  }}
/>
```

### All Available Options
```tsx
<Hyperspeed
  effectOptions={{
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5]
  }}
/>
```

## 🎯 Distortion Types

```typescript
// Available distortion modes:
'turbulentDistortion'    // Wavy, dynamic (default)
'mountainDistortion'     // Smooth rolling hills
'xyDistortion'          // Side-to-side waves
'LongRaceDistortion'    // Gentle racing feel
'deepDistortion'        // Deep perspective
```

## 🎨 Converting Colors

### RGB to Hex
```typescript
// RGB to Hex conversion
// For example: RGB(255, 107, 53) = 0xFF6B35
const rgbToHex = (r: number, g: number, b: number) => {
  return ((r << 16) | (g << 8) | b).toString(16)
}

// Example: Orange
rgbToHex(255, 107, 53) // 'ff6b35'
```

### Using Online Converters
- Visit: https://www.rapidtables.com/convert/color/rgb-to-hex.html
- Enter RGB values
- Get hex code
- Prepend '0x' for Three.js format

## 🔄 Theme Switching

### Automatic Detection
The component automatically switches when:
- User toggles theme in your app
- System preference changes
- Page loads with user's preference

### Manual Theme Toggle
```tsx
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

## 📱 Responsive Behavior

The component automatically adapts to:
- Window resize
- Viewport changes
- Device rotation
- Container resize

## ⚡ Performance Tips

### Best Practices
```tsx
// ✅ Good: Let theme handle colors
<Hyperspeed />

// ✅ Good: Only override specific properties
<Hyperspeed effectOptions={{ speedUp: 3 }} />

// ⚠️ Avoid: Recreating options every render
const options = {
  colors: { leftCars: [...] }
}
<Hyperspeed effectOptions={options} />
// Better: Move to stable reference
```

### Memoization
```tsx
import { useMemo } from 'react'

export function MyComponent() {
  const options = useMemo(() => ({
    speedUp: 3
  }), [])
  
  return <Hyperspeed effectOptions={options} />
}
```

## 🐛 Troubleshooting

### Colors Look Wrong
**Solution**: Check if theme is applied
```tsx
// Check theme value
import { useTheme } from 'next-themes'

const { theme } = useTheme()
console.log('Current theme:', theme) // Should be 'light' or 'dark'
```

### Animation Not Playing
**Solution**: Ensure WebGL support
```typescript
// Check WebGL support
const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl')
if (!gl) console.error('WebGL not supported')
```

### Theme Not Updating
**Solution**: Verify next-themes is set up
```tsx
// In your layout or root component
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}
```

## 🎓 Learning Resources

### Three.js Colors
- Three.js Color class: https://threejs.org/docs/api/en/math/Color.html
- Hex color format: 0xRRGGBB

### next-themes
- Documentation: https://github.com/pacocoursey/next-themes
- Usage examples: https://github.com/pacocoursey/next-themes#usage

### Postprocessing
- Effects: https://github.com/pmndrs/postprocessing

## 📊 Browser Support Matrix

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | ✅ | Full support |
| Firefox 88+ | ✅ | Full support |
| Safari 15+ | ✅ | Full support |
| Edge 90+ | ✅ | Full support |
| Safari Mobile | ✅ | Full support |
| Android Chrome | ✅ | Full support |
| IE 11 | ❌ | No WebGL |
| Old Firefox | ⚠️ | Check WebGL |

## 🔗 File Locations

- **Component**: `src/components/hyperspeed.tsx`
- **Styles**: `src/components/hyperspeed.css`
- **Usage**: `src/components/footer.tsx`
- **Docs**: 
  - `HYPERSPEED_INTEGRATION.md`
  - `HYPERSPEED_THEME_IMPLEMENTATION.md`
  - `HYPERSPEED_THEME_CHECKLIST.md`
  - `HYPERSPEED_THEME_SUMMARY.md`

## 💬 Common Questions

### Q: Can I use different colors than the themes?
**A**: Yes! Pass custom colors via `effectOptions.colors`

### Q: Will theme switching cause performance issues?
**A**: No, it's optimized for smooth transitions

### Q: How do I disable auto-theme detection?
**A**: Pass all colors explicitly in `effectOptions`

### Q: What if user has system dark mode but app is light?
**A**: The component respects the app's theme setting, not system preference

### Q: Can I animate color transitions?
**A**: The CSS transition handles it (300ms smooth)

---

**Last Updated**: November 15, 2025
**Version**: 1.0
**Status**: Production Ready
