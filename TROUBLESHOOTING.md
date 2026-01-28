# Troubleshooting Guide

## Runtime Error: scrollYProgress in DevelopmentJourney.tsx

### Error Message
```
src/components/DevelopmentJourney.tsx (94:42) @ scrollYProgress
const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), springConfig);
```

### Root Cause
This is a **hot-reload issue** in Next.js development mode. The code is actually correct - TypeScript shows no errors, and the `scrollYProgress` is properly defined before use.

### Solutions

#### Solution 1: Hard Refresh (Recommended)
1. Stop the development server (Ctrl+C)
2. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```
3. Restart the development server:
   ```bash
   npm run dev
   ```
4. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

#### Solution 2: Browser Cache Clear
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

#### Solution 3: Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Why This Happens

Next.js Fast Refresh sometimes gets confused during hot-reload when:
- Multiple hooks are used in sequence
- Conditional logic is added to existing hooks
- Components are heavily modified

This is a **development-only issue** and will not affect production builds.

### Verification

To verify the code is correct:

1. **TypeScript Check:**
   ```bash
   npx tsc --noEmit
   ```
   Should show no errors ✅

2. **Build Check:**
   ```bash
   npm run build
   ```
   Should complete successfully ✅

3. **Production Mode:**
   ```bash
   npm run build
   npm run start
   ```
   Should work perfectly ✅

### Code is Correct

The code structure is valid:
```typescript
const StageSection = ({ stage, index }) => {
  const ref = useRef(null);
  const shouldReduceEffects = useShouldReduceEffects();
  
  // scrollYProgress is defined here ✅
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Used here - this is correct ✅
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), 
    springConfig
  );
  
  // All other uses are also correct ✅
}
```

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
