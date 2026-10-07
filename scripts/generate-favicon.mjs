import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "assets", "bunker-source.png");
const app = path.join(root, "src", "app");

const meta = await sharp(src).metadata();
const size = Math.min(meta.width, meta.height);
const left = Math.floor((meta.width - size) / 2);
const top = Math.min(
  Math.floor((meta.height - size) * 0.38),
  meta.height - size,
);

const square = sharp(src).extract({
  left,
  top,
  width: size,
  height: size,
});

await square.clone().resize(512, 512).png().toFile(path.join(app, "icon.png"));
await square
  .clone()
  .resize(180, 180)
  .png()
  .toFile(path.join(app, "apple-icon.png"));
await square.clone().resize(32, 32).toFile(path.join(app, "favicon.ico"));

console.log("Generated icon.png, apple-icon.png, favicon.ico");
