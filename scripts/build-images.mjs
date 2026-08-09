/**
 * Turns the master photographs into the web sizes the site actually uses.
 * Run it again whenever a master file changes: node scripts/build-images.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("assets/photographs");
const OUT = path.resolve("public/photographs");

const jobs = [
  { name: "room-wide", width: 2000 },
  { name: "room-table", width: 1400 },
  { name: "linens", width: 1400 },
  { name: "oil-bowl", width: 1200 },
  { name: "corridor", width: 1400 },
  { name: "curtain-light", width: 1800 },
  { name: "stones", width: 1200 },
  { name: "branch", width: 2000 },
  // The ledger page sits on the left. Frame it out and keep the bell and cup.
  { name: "reception", width: 1600, crop: { left: 0.28, top: 0.05, width: 0.72, height: 0.9 } },
  { name: "linen-still", width: 1600 },
];

/** A little tooth so flat areas like plaster and linen do not band. */
async function grain(width, height) {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#808080",
      noise: { type: "gaussian", mean: 128, sigma: 9 },
    },
  })
    .png()
    .toBuffer();
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const available = new Set(await readdir(SRC));

  for (const job of jobs) {
    const file = [`${job.name}.png`, `${job.name}.jpg`].find((f) => available.has(f));
    if (!file) {
      console.log(`skip ${job.name}, no master file`);
      continue;
    }

    let pipeline = sharp(path.join(SRC, file));
    if (job.crop) {
      const { width: w, height: h } = await pipeline.metadata();
      pipeline = pipeline.extract({
        left: Math.round(w * job.crop.left),
        top: Math.round(h * job.crop.top),
        width: Math.round(w * job.crop.width),
        height: Math.round(h * job.crop.height),
      });
    }

    const resized = pipeline.resize({ width: job.width, withoutEnlargement: true });
    const { data, info } = await resized.raw().toBuffer({ resolveWithObject: true });

    const out = path.join(OUT, `${job.name}.webp`);
    await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .composite([{ input: await grain(info.width, info.height), blend: "soft-light" }])
      .webp({ quality: 80, effort: 6 })
      .toFile(out);

    console.log(`${job.name.padEnd(14)} ${info.width}x${info.height}`);
  }

  // Open Graph card at the size crawlers expect.
  if (available.has("og.png")) {
    await sharp(path.join(SRC, "og.png"))
      .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(OUT, "og.jpg"));
    console.log("og             1200x630");
  }
}

run();
