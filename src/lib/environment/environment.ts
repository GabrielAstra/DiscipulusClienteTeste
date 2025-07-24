// lib/env.ts
import { z } from "zod";


const envSchema = z.object({
  DISCIPULUS_API_URL: z.url(),
});

const parsed = envSchema.safeParse({
  DISCIPULUS_API_URL: process.env.DISCIPULUS_API_URL,
});

if (!parsed.success) {
  const tree = z.treeifyError(parsed.error);

  console.error("❌ Invalid environment variables:");
  console.dir(tree, { depth: null });

  throw new Error("Invalid environment variables. See logs for details.");
}

export const environment = parsed.data;
