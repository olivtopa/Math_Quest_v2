-- Schema SQL Supabase pour Math Quest v2

-- 1. Table Profils Élèves
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  cycle TEXT DEFAULT '3eme' CHECK (cycle IN ('3eme', 'lycee', 'terminale')),
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  energy_vials INTEGER DEFAULT 5,
  max_energy_vials INTEGER DEFAULT 5,
  badges TEXT[] DEFAULT ARRAY['Bienvenue']::TEXT[]
);

-- 2. Table Progression des Exercices
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  exercise_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  score INTEGER DEFAULT 100,
  UNIQUE(user_id, exercise_id)
);

-- 3. Table Grimoire des Faiblesses (Répétition Espacée)
CREATE TABLE IF NOT EXISTS public.grimoire_weaknesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  notion_key TEXT NOT NULL,
  error_count INTEGER DEFAULT 1,
  next_review_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now() + interval '2 days') NOT NULL,
  interval_days INTEGER DEFAULT 2
);

-- Active RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grimoire_weaknesses ENABLE ROW LEVEL SECURITY;
