// Import products scraped from a public products API into the local DB.
// Replace catalog: node src/scripts/import-products-from-k2paperliquid.mjs
// Merge category file: node src/scripts/import-products-from-k2paperliquid.mjs source-vapes-products.json --merge

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

const args = process.argv.slice(2);
const sourceFile = args.find((arg) => !arg.startsWith('--')) || 'source-products.json';
const merge = args.includes('--merge');
const sourcePath = path.resolve(__dirname, sourceFile);
const products = JSON.parse(readFileSync(sourcePath, 'utf8'));
console.log(`Source products: ${products.length}`);

const priceVariantSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    label: { type: String },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    priceVariants: [priceVariantSchema],
    countInStock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const mojibakeMap = new Map([
  ['Ã¢Â€Â”', '—'],
  ['Ã¢Â€Â“', '–'],
  ['Ã¢Â€Â™', '’'],
  ['Ã¢Â€Âœ', '“'],
  ['Ã¢Â€Â', '”'],
  ['Ã¢Â‰Â¥', '≥'],
  ['Ã¢Â„Â¢', '™'],
]);

function cleanText(text) {
  if (typeof text !== 'string') return text;
  let cleaned = text;
  for (const [bad, good] of mojibakeMap) {
    cleaned = cleaned.split(bad).join(good);
  }
  return cleaned;
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  if (!merge) {
    // Replace catalog entirely so the site mirrors the source store
    await Product.deleteMany({});
    console.log('Cleared existing products');
  }

  const docs = products.map((p) => {
    const variants = (p.priceVariants || []).map((v) => ({
      quantity: v.quantity,
      label: v.label,
      price: v.price,
    }));
    return {
      name: p.name.trim(),
      slug: p.slug,
      category: p.category,
      images: p.images || [],
      description: cleanText(p.description),
      price: typeof p.price === 'number' ? p.price : variants[0]?.price ?? 0,
      priceVariants: variants,
      countInStock: p.countInStock ?? 0,
      rating: p.rating ?? 0,
      numReviews: p.numReviews ?? 0,
      featured: !!p.featured,
    };
  });

  if (merge) {
    const result = await Product.bulkWrite(
      docs.map((doc) => ({
        updateOne: {
          filter: { slug: doc.slug },
          update: { $set: doc },
          upsert: true,
        },
      }))
    );
    console.log(`Merged ${result.upsertedCount} new and ${result.modifiedCount} existing products`);
  } else {
    const result = await Product.insertMany(docs);
    console.log(`Inserted ${result.length} products`);
  }

  const byCat = docs.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {});
  console.log('By category:', byCat);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
