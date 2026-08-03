import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default('5000'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/customer_support_crm'),
  REDIS_URL: z.string().default('redis://localhost:6379'),

  JWT_SECRET: z.string().default('super_secret_enterprise_jwt_key_32bytes_min'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  JWT_REFRESH_SECRET: z.string().default('super_secret_refresh_jwt_key_32bytes_min'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  DEFAULT_ADMIN_PASSWORD: z.string().default('AdminPass123!'),
  DEFAULT_AGENT_PASSWORD: z.string().default('AgentPass123!'),

  EXOTEL_ACCOUNT_SID: z.string().default('mock_exotel_sid'),
  EXOTEL_API_KEY: z.string().default('mock_exotel_key'),
  EXOTEL_API_TOKEN: z.string().default('mock_exotel_token'),
  EXOTEL_SUBDOMAIN: z.string().default('api.exotel.com'),
  EXOTEL_WEBHOOK_SECRET: z.string().default('mock_webhook_secret'),

  OPENAI_API_KEY: z.string().default('mock_openai_key'),
  OPENAI_REALTIME_MODEL: z.string().default('gpt-4o-realtime-preview-2024-10-01'),
  OPENAI_VOICE: z.string().default('alloy'),

  CLIENT_URL: z.string().default('http://localhost:5173'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment configuration');
}

export const env = parsedEnv.data;
