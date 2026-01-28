# Troubleshooting Guide

## ✅ FIXED: Runtime Error in DevelopmentJourney.tsx

### What Was Wrong
The issue was with **conditional hook calls** in Framer Motion. React hooks must be called in the same order every render, but we were conditionally calling `useTransform` and `useSpring` based on `shouldReduceEffects`.

### The Fix
Changed from:
```typescript
// ❌ WRONG - Conditional hook calls
const y = shouldReduceEffects 
  ? useTransform(scrollYProgress, [0, 1], [0, 0])
  : useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]), springConfig);
```

To:
```typescript
// ✅ CORRECT - Conditional values, not conditional hooks
const yTransform = useTransform(
  scrollYProgress, 
  [0, 0.5, 1], 
  shouldReduceEffects ? [0, 0, 0] : [30, 0, -30]
);
const y = useSpring(yTransform, springConfig);
```

### Files Fixed
- ✅ `src/components/DevelopmentJourney.tsx`
- ✅ `src/components/Services.tsx`
- ✅ `src/components/WhyChooseUs.tsx`

### What Changed
Instead of conditionally calling hooks, we now:
1. Always call the same hooks in the same order
2. Pass conditional **values** to the hooks
3. This maintains React's rules of hooks while still achieving the performance optimization

---

## Other Common Issues

### Issue: Images Not Loading

**Symptoms:** Images show broken or don't load

**Solution:**
1. Verify `next.config.mjs` has correct remote patterns
2. Check internet connection
3. Clear browser cache
4. Restart dev server

### Issue: Heavy Effects Still Showing on Mobile

**Symptoms:** Ballpit, ColorBends, etc. still visible on mobile

**Solution:**
1. Clear browser cache
2. Check DevTools console for device detection
3. Verify screen width is < 768px
4. Try different mobile device in DevTools

### Issue: Build Fails

**Symptoms:** `npm run build` fails

**Solution:**
1. Install dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```
3. Try building again:
   ```bash
   npm run build
   ```

### Issue: TypeScript Errors

**Symptoms:** Red squiggly lines in editor

**Solution:**
1. Restart TypeScript server in VS Code:
   - Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
   - Type "TypeScript: Restart TS Server"
   - Press Enter
2. Check for missing dependencies:
   ```bash
   npm install
   ```

### Issue: Slow Performance Still

**Symptoms:** Website still lags on mobile

**Solution:**
1. Verify you're testing on a real mobile device or proper emulation
2. Check that heavy effects are actually disabled:
   - Open DevTools Console
   - Look for "Device detection" logs
3. Clear all caches:
   ```bash
   rm -rf .next
   npm run dev
   ```
4. Hard refresh browser (Ctrl+Shift+R)

---

## Quick Fixes Checklist

When you encounter any issue:

- [ ] Stop dev server (Ctrl+C)
- [ ] Clear Next.js cache: `rm -rf .next`
- [ ] Restart dev server: `npm run dev`
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check browser console for errors
- [ ] Verify TypeScript: `npx tsc --noEmit`

---

## Still Having Issues?

If problems persist after trying the above:

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be 18.x or higher

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Try production build:**
   ```bash
   npm run build
   npm run start
   ```
   If production works, it's a dev-mode issue only

4. **Check for conflicting packages:**
   ```bash
   npm list
   ```
   Look for duplicate versions of React, Framer Motion, etc.

---

## Development vs Production

Remember:
- **Development mode** (`npm run dev`) uses hot-reload and may have temporary glitches
- **Production mode** (`npm run build && npm run start`) is optimized and stable
- Always test production build before deploying

---

## Contact Support

If you've tried everything and still have issues:

1. Check the error message carefully
2. Search for the error on Stack Overflow
3. Check Next.js GitHub issues
4. Provide full error stack trace when asking for help

---

**Most issues are resolved by clearing cache and restarting the dev server! 🔄**
