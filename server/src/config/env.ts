import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/icscsd2026?schema=public'),
  JWT_SECRET: z.string().default('icscsd_2026_super_secret_jwt_key_vit_pune'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.string().default('admin@vit.edu'),
  ADMIN_PASSWORD: z.string().default('Admin@ICSCSD2026'),
  RAZORPAY_KEY_ID: z.string().default('rzp_test_dummyKey12345'),
  RAZORPAY_KEY_SECRET: z.string().default('dummySecret67890')
});

export const env = envSchema.parse(process.env);
