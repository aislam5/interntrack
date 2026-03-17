# InternTrack

A fullstack internship and job application tracker built with React and Supabase. Browse real tech internship listings, track your applications end-to-end, and never lose track of where you stand in the hiring process.

## Live Demo
[interntrack.vercel.app](https://interntrack-sigma.vercel.app/)

## Features
- 🔐 Secure user authentication with Supabase Auth
- 📋 Browse 4,000+ real tech internship listings sourced from SimplifyJobs
- ⚡ One-click apply that automatically saves the application to your tracker
- 📊 Dashboard with stats and charts showing your application progress
- 🔄 Full application lifecycle tracking — In Progress, Applied, Interview, Offer, Rejected
- 👥 Multi-user support with Row Level Security — every user only sees their own data

## Tech Stack
- **Frontend:** React, Vite, Recharts
- **Backend:** Supabase (PostgreSQL + Auth)
- **Routing:** React Router
- **Deployment:** Vercel

## How It Works
1. Sign up for an account
2. Browse real internship listings updated daily from SimplifyJobs
3. Click Apply — InternTrack opens the job posting and saves it to your tracker automatically
4. Update your application status as you progress through the hiring process
5. View your Dashboard for a real-time overview of your job search

## Running Locally

1. Clone the repo
```bash
   git clone https://github.com/YOURUSERNAME/interntrack.git
   cd interntrack
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory
```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the dev server
```bash
   npm run dev
```

## Database Setup
Run the following SQL in your Supabase SQL editor to create the required tables:
```sql
create table applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  company text not null,
  role text not null,
  status text default 'Applied',
  applied_date date,
  link text,
  notes text,
  created_at timestamp with time zone default now()
);

alter table applications enable row level security;

create policy "Users can manage their own applications"
  on applications for all
  using (auth.uid() = user_id);
```

## Author
Built by Abdullah Islam (https://github.com/aislam5)