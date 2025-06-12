import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

// env file name
config({ path: '.env.local' });

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
