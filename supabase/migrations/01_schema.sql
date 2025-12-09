CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bank text NOT NULL,
  type text NOT NULL,
  rate_apr numeric NOT NULL,
  min_income integer NOT NULL,
  min_credit_score integer NOT NULL,
  tenure_min_months integer NOT NULL,
  tenure_max_months integer NOT NULL,
  processing_fee_pct numeric NOT NULL,
  prepayment_allowed boolean NOT NULL,
  disbursal_speed text NOT NULL,
  docs_level text NOT NULL,
  summary text,
  faq jsonb DEFAULT '[]'
);

CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  display_name text
);

CREATE TABLE public.ai_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
