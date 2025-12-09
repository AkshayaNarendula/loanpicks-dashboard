LoanPicks Dashboard

Live Demo (Vercel Deployment)
https://loanpicks-dashboard-axv8-git-main-akshaya-narendulas-projects.vercel.app

A personalized loan-recommendation platform built using Next.js 14 (App Router), TypeScript, Supabase, shadcn/ui, and OpenRouter AI. Users can explore curated loan products, view details, compare loans, and chat with an AI assistant grounded in real product data.

Overview
LoanPicks Dashboard provides:
Top 5 personalized loan recommendations
AI-powered Q&A about individual loans
Filtering and exploration of all available products
Product details with dynamic badges
Authentication-protected dashboard
Persistent chat history stored in the database
The system is designed for strong type safety, clean architecture, and a modern responsive UI.

Architecture Diagram
               ┌──────────────────────────┐
               │        Frontend          │
               │  Next.js 14 (App Router) │
               └──────────────┬───────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │   API Route Handlers   │
                 │   /app/api/* (RSC)     │
                 └──────────────┬─────────┘
                                │
               ┌────────────────▼────────────────┐
               │           Supabase              │
               │  PostgreSQL  |  Auth  |  Storage│
               └────────────────┬────────────────┘
                                │
                                ▼
                     ┌──────────────────┐
                     │   OpenRouter AI  │ 
                     └──────────────────┘

Tech Stack
Frontend:
Next.js 14+ (App Router)
React Server Components (RSC)
TypeScript (strict mode)
TailwindCSS + shadcn/ui

Backend:
Next.js API Route Handlers (app/api/**)
Supabase PostgreSQL Database
Supabase Auth (secure cookies, RLS)
Zod for validation
AI: OpenRouter API (Gemini / OpenAI compatible)
Product-aware system instruction (AI grounding)

Features
1. Dashboard – Top 5 Personalized Products
Fetches all loan products from Supabase
Sorts using ascending APR
Highlights the Best Match
Displays dynamic Badges based on product attributes


Offers:
Ask AI button → opens chat sheet
View Details button
Loan summary preview

2. All Products Page
Explore all loans with filters:
Search by bank
Filter by APR range
Filter by minimum income
Filter by credit score
Products are rendered in a clean grid layout using shadcn/ui components.

3. AI-Powered Product Chat
Each product tile includes an Ask About Product button that opens a chat window.
API Route:
POST /api/ai/ask
Request Body Example:
{
  "productId": "uuid",
  "message": "What is the minimum credit score?",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}

Chat Features
Context-aware AI (loan-specific answers)
Rejects questions outside available product data
Persistent chat history stored in ai_chat_messages
Displays:
Product header
Chat history
Loading states
Error feedback

4. Product Details Page
/products/[id] displays:
Bank
Loan type
APR
Income and credit requirements
Tenure
Summary
FAQ (auto-rendered)
Badges
“Ask About Product” integration

AI Grounding Strategy
To prevent hallucinations and ensure accuracy:
System Prompt Enforces:
AI can only answer using the product object passed to it

If the user asks about:
A different loan
Bank history
Irrelevant topics
→ The AI must respond:
“I can only answer questions about this specific loan product.”


Model
Configured via OpenRouter:
{
  "model": "google/gemma-2-9b-it"
}
Database Schema
Full SQL schema is available inside:
supabase/migrations/01_schema.sql
Contains:
Tables:
products
users
ai_chat_messages

Seed Data:
Located at:
supabase/seed/seed.sql
Includes 10+ loan products with FAQ entries.

🏷️ Badge Generation Logic
Condition   Badge
APR < 10%   Low APR
prepayment_allowed = true   Prepayment Allowed
tenure_max_months > 60  Flexible Tenure
min_income < 30,000 Salary ≥ X Eligible
min_credit_score < 700  Credit Score ≥ Y
disbursal_speed = "fast" or "instant"   Fast Disbursal
docs_level = "low"  Low Docs


Badges appear on:
Dashboard cards
Product detail pages
Authentication
Implemented using Supabase Auth
Cookies stored securely via RSC + Supabase SSR client

Protected routes:
/dashboard
/products/*
/compare

Middleware Handles:
Session validation
Redirect to /login if unauthenticated
Automatic persistence of session cookies

Setup Instructions
1. Clone Repository
git clone YOUR_REPO_URL
cd loanpicks-dashboard

2. Install Dependencies
npm install

3. Configure Environment Variables
Create .env.local:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENROUTER_API_KEY=
A complete .env.example is included.

4. Run Development Server
npm run dev

Visit:
http://localhost:3000

Deployment (Vercel)
Follow these steps to deploy the application:

1. Push the repository to GitHub  
2. Import the project into Vercel  
3. Add required environment variables in Vercel  
4. Click Deploy
   
Live Production App:
The application is deployed on Vercel and can be accessed here:
https://loanpicks-dashboard-axv8-git-main-akshaya-narendulas-projects.vercel.app

Vercel Automatically Handles:
- Building the Next.js App Router  
- Serverless Route Handlers (`/app/api/*`)  
- Optimized Rendering (RSC + ISR)  
- Environment variable injection  
- Zero-config deployments  

Demo Video  

