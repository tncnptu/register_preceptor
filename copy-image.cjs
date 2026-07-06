const fs = require('fs');
const src = fs.readFileSync('C:/Users/oil_p/.gemini/antigravity-ide/brain/c36c2d90-e88c-4501-9e17-aad8e7135f98/media__1783327342583.png');
fs.writeFileSync('c:/Users/oil_p/Documents/RegisterPreceptor/public/hero-banner.png', src);
console.log('Copied', src.length, 'bytes');
