/**
 * Extract dominant colors from an image using Canvas
 * Works with CORS-enabled images from Supabase storage
 */

/**
 * Extract dominant colors from an image
 * @param {string} imageUrl - URL of the image
 * @returns {Promise<{primary_color: string, secondary_color: string, accent_color: string, background_color: string, text_color: string}>}
 */
export const extractColorsFromImage = async (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Scale down for performance
        const scale = Math.min(1, 100 / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        // Sample colors
        const colorCounts = {};
        const step = 4; // Sample every 4th pixel for performance
        
        for (let i = 0; i < pixels.length; i += 4 * step) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          
          // Skip transparent pixels
          if (a < 128) continue;
          
          // Quantize colors to reduce variations
          const qr = Math.round(r / 32) * 32;
          const qg = Math.round(g / 32) * 32;
          const qb = Math.round(b / 32) * 32;
          
          const key = `${qr},${qg},${qb}`;
          colorCounts[key] = (colorCounts[key] || 0) + 1;
        }
        
        // Sort by frequency
        const sortedColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([key]) => {
            const [r, g, b] = key.split(',').map(Number);
            return { r, g, b, hex: rgbToHex(r, g, b) };
          });
        
        if (sortedColors.length < 3) {
          resolve(getDefaultColors());
          return;
        }
        
        // Analyze for best color assignment
        const analyzed = sortedColors.map(c => ({
          ...c,
          ...rgbToHsl(c.r, c.g, c.b)
        }));
        
        // Most saturated = primary/secondary
        const bySaturation = [...analyzed].sort((a, b) => b.s - a.s);
        
        // Darkest = background
        const byLightness = [...analyzed].sort((a, b) => a.l - b.l);
        
        resolve({
          primary_color: bySaturation[0]?.hex || '#10B981',
          secondary_color: bySaturation[1]?.hex || '#34D399',
          accent_color: bySaturation[2]?.hex || '#F59E0B',
          background_color: byLightness[0]?.hex || '#000000',
          text_color: byLightness[byLightness.length - 1]?.l > 50 ? '#000000' : '#FFFFFF',
        });
      } catch (err) {
        console.error('Color extraction error:', err);
        resolve(getDefaultColors());
      }
    };

    img.onerror = (err) => {
      console.error('Failed to load image for color extraction:', err);
      resolve(getDefaultColors());
    };

    // Add timestamp to bypass cache
    const separator = imageUrl.includes('?') ? '&' : '?';
    img.src = `${imageUrl}${separator}t=${Date.now()}`;
  });
};

const getDefaultColors = () => ({
  primary_color: '#10B981',
  secondary_color: '#34D399',
  accent_color: '#F59E0B',
  background_color: '#000000',
  text_color: '#FFFFFF',
});

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.min(255, Math.max(0, x)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};
