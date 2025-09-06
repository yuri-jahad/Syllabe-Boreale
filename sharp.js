import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync } from "fs";

const imagesInputDir = "./frontend/src/assets/images";
const imagesOutputDir = "./frontend/public/images";

if (!existsSync(imagesOutputDir)) {
  mkdirSync(imagesOutputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize({ width: 1920 }) // max 1920px (utile pour les photos énormes)
      .toFormat("webp", { quality: 80 }) // compresse en WebP
      .toFile(outputPath);

    console.log(`✅ ${inputPath} → ${outputPath}`);
  } catch (err) {
    console.error(`❌ Erreur avec ${inputPath}:`, err.message);
  }
}

async function processImages() {
  console.log("📁 Optimisation des images...");

  const files = readdirSync(imagesInputDir);

  for (const file of files) {
    if (!file.match(/\.(jpe?g|png)$/i)) continue;

    const inputPath = `${imagesInputDir}/${file}`;
    const outputPath = `${imagesOutputDir}/${file.replace(/\.(jpe?g|png)$/i, ".webp")}`;

    await optimizeImage(inputPath, outputPath);
  }
}

processImages();
