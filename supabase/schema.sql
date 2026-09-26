-- ==============================================================================
-- CHOTAPLAY MASTER DATABASE SCHEMA & ROW LEVEL SECURITY POLICIES
-- Target: Supabase PostgreSQL (Standard SQL)
-- Version: Teacher-Led Architecture (Complete 35-Topic Curriculum)
-- Note: Execute this file directly in the Supabase SQL Editor.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TEACHERS TABLE (Teacher profiles linked directly to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    teacher_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT DEFAULT '/assets/teacher.png',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLASSES TABLE (Reference table for LKG, UKG, 1st Class, Explore)
CREATE TABLE IF NOT EXISTS public.classes (
    id TEXT PRIMARY KEY, -- 'lkg', 'ukg', '1st-class', 'explore'
    name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    icon_image TEXT NOT NULL,
    display_order INT NOT NULL
);

-- 4. SECTIONS TABLE (Reference table for Little Stars, Bright Minds)
CREATE TABLE IF NOT EXISTS public.sections (
    id TEXT PRIMARY KEY, -- 'little-stars', 'bright-minds'
    name TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT,
    icon_image TEXT NOT NULL,
    display_order INT NOT NULL
);

-- 5. TOPICS TABLE (Curriculum Source of Truth)
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY, -- e.g. 'rainbow-world'
    class_id TEXT NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    section_id TEXT REFERENCES public.sections(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumb_url TEXT NOT NULL,
    note_url TEXT NOT NULL,
    has_game BOOLEAN DEFAULT FALSE,
    game_url TEXT,
    display_order INT NOT NULL DEFAULT 1
);

-- 6. ACTIVITIES TABLE (4 activities per topic)
CREATE TABLE IF NOT EXISTS public.activities (
    id SERIAL PRIMARY KEY,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    activity_number INT NOT NULL, -- 1 to 4
    name TEXT NOT NULL,
    instruction TEXT NOT NULL,
    how_to_play JSONB NOT NULL DEFAULT '[]'::jsonb,
    wow_moment TEXT,
    UNIQUE(topic_id, activity_number)
);

-- 7. PROGRESS TABLE (Real Teacher/Classroom Progress Engine)
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    note_completed BOOLEAN NOT NULL DEFAULT FALSE,
    video_completed BOOLEAN NOT NULL DEFAULT FALSE,
    game_completed BOOLEAN NOT NULL DEFAULT FALSE,
    activity_completed BOOLEAN NOT NULL DEFAULT FALSE,
    topic_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_activities INT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT progress_teacher_topic_key UNIQUE (teacher_id, topic_id)
);

-- 8. FEEDBACK TABLE (Teacher feedback records)
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    class_section TEXT NOT NULL,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    topic_name TEXT NOT NULL,
    class_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Understood', 'Support Needed', 'Developing', 'Not Understood')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_teachers_teacher_id ON public.teachers(teacher_id);
CREATE INDEX IF NOT EXISTS idx_topics_class_section ON public.topics(class_id, section_id);
CREATE INDEX IF NOT EXISTS idx_activities_topic_id ON public.activities(topic_id);
CREATE INDEX IF NOT EXISTS idx_progress_teacher_id ON public.progress(teacher_id);
CREATE INDEX IF NOT EXISTS idx_progress_topic_id ON public.progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_feedback_teacher_id ON public.feedback(teacher_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- 1. Reference Data Policies
DROP POLICY IF EXISTS "Allow read access to classes" ON public.classes;
CREATE POLICY "Allow read access to classes" ON public.classes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow read access to sections" ON public.sections;
CREATE POLICY "Allow read access to sections" ON public.sections FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow read access to topics" ON public.topics;
CREATE POLICY "Allow read access to topics" ON public.topics FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow read access to activities" ON public.activities;
CREATE POLICY "Allow read access to activities" ON public.activities FOR SELECT TO authenticated USING (true);

-- 2. Teachers Profile Policies
DROP POLICY IF EXISTS "Teachers can view their own profile" ON public.teachers;
CREATE POLICY "Teachers can view their own profile" ON public.teachers FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Teachers can insert their own profile" ON public.teachers;
CREATE POLICY "Teachers can insert their own profile" ON public.teachers FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Teachers can update their own profile" ON public.teachers;
CREATE POLICY "Teachers can update their own profile" ON public.teachers FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 3. Progress Policies
DROP POLICY IF EXISTS "Teachers view their own progress" ON public.progress;
CREATE POLICY "Teachers view their own progress" ON public.progress FOR SELECT TO authenticated USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers insert their own progress" ON public.progress;
CREATE POLICY "Teachers insert their own progress" ON public.progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers update their own progress" ON public.progress;
CREATE POLICY "Teachers update their own progress" ON public.progress FOR UPDATE TO authenticated USING (auth.uid() = teacher_id);

-- 4. Feedback Policies
DROP POLICY IF EXISTS "Teachers view their own feedback" ON public.feedback;
CREATE POLICY "Teachers view their own feedback" ON public.feedback FOR SELECT TO authenticated USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers insert feedback" ON public.feedback;
CREATE POLICY "Teachers insert feedback" ON public.feedback FOR INSERT TO authenticated WITH CHECK (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers delete their feedback" ON public.feedback;
CREATE POLICY "Teachers delete their feedback" ON public.feedback FOR DELETE TO authenticated USING (auth.uid() = teacher_id);

-- ==============================================================================
-- AUTOMATIC PROFILE TRIGGER ON USER SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.teachers (id, teacher_id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'teacher_id', 'TCH-' || UPPER(SUBSTRING(NEW.id::text, 1, 6))),
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Teacher'),
        '/assets/teacher.png'
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- SEED DATA: CLASSES & SECTIONS
-- ==============================================================================
INSERT INTO public.classes (id, name, full_name, icon_image, display_order) VALUES
('lkg', 'LKG', 'Lower Kindergarten', '/assets/LKG%20ICON.jpeg', 1),
('ukg', 'UKG', 'Upper Kindergarten', '/assets/UKG%20ICON.jpeg', 2),
('1st-class', '1st Class', 'Class 1 / Grade 1', '/assets/1ST%20Class%20ICON.jpeg', 3),
('explore', 'Explore', 'Free Play & Exploration', '/assets/Explore%20icon.jpeg', 4)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    full_name = EXCLUDED.full_name,
    icon_image = EXCLUDED.icon_image,
    display_order = EXCLUDED.display_order;

INSERT INTO public.sections (id, name, subtitle, description, icon_image, display_order) VALUES
('little-stars', 'Little Stars', 'Foundation Exploration & Discovery', 'Foundational concepts, sensory adventures and early discovery.', '/assets/Little%20stars%20%20picture.png', 1),
('bright-minds', 'Bright Minds', 'Advanced Concepts & Cognitive Skills', 'Higher-order thinking, expressive skills, and creative problem-solving.', '/assets/Brightminds%20picture.png', 2)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    icon_image = EXCLUDED.icon_image,
    display_order = EXCLUDED.display_order;

-- ==============================================================================
-- SEED DATA: COMPLETE 35 TOPICS
-- ==============================================================================
INSERT INTO public.topics (id, class_id, section_id, name, video_url, thumb_url, note_url, has_game, game_url, display_order) VALUES
('rainbow-world', 'lkg', 'little-stars', 'Rainbow World', '/assets/videos/Rain%20bow%20world.mp4', '/assets/topics/Rainbow%20World.png', '/assets/notes/rainbow%20world.png', true, '/games/rainbow-world/index.html', 1),
('number-adventure', 'lkg', 'little-stars', 'Number Adventure', '/assets/videos/Number%20Adventure.mp4', '/assets/topics/Number%20Adventure.png', '/assets/notes/Number%20Adventure.png', true, '/games/number-adventure/index.html', 2),
('mystery-sense-world', 'lkg', 'little-stars', 'Mystery Sense World', '/assets/videos/Mystery%20Sense%20World.mp4', '/assets/topics/Mystery%20Sense%20World.png', '/assets/notes/Mystery%20Sense%20World.png', true, '/games/mystery-sense-world/index.html', 3),
('magic-road-world', 'lkg', 'little-stars', 'Magic Road World', '/assets/videos/Magic%20Road%20World.mp4', '/assets/topics/Magic%20Road%20World.png', '/assets/notes/Magic%20Road%20World.png', true, '/games/magic-road-world/index.html', 4),
('little-detective-world', 'lkg', 'little-stars', 'Little Detective World', '/assets/videos/Little%20Detective%20world.mp4', '/assets/topics/Little%20detective%20World.png', '/assets/notes/Little%20Detective%20World.png', true, '/games/little-detective-world/index.html', 5),
('alphabet-garden-a-m', 'lkg', 'bright-minds', 'Alphabet Garden (A-M)', '/assets/videos/Rain%20bow%20world.mp4', '/assets/topics/Rainbow%20World.png', '/assets/notes/rainbow%20world.png', true, '/games/rainbow-world/index.html', 6),
('animal-safari', 'lkg', 'bright-minds', 'Animal Safari', '/assets/videos/Number%20Adventure.mp4', '/assets/topics/Number%20Adventure.png', '/assets/notes/Number%20Adventure.png', true, '/games/number-adventure/index.html', 7),
('seasons-weather', 'lkg', 'bright-minds', 'Seasons & Weather', '/assets/videos/Mystery%20Sense%20World.mp4', '/assets/topics/Mystery%20Sense%20World.png', '/assets/notes/Mystery%20Sense%20World.png', false, NULL, 8),
('good-habits', 'lkg', 'bright-minds', 'Good Habits', '/assets/videos/Magic%20Road%20World.mp4', '/assets/topics/Magic%20Road%20World.png', '/assets/notes/Magic%20Road%20World.png', false, NULL, 9),
('shapes-all-around', 'lkg', 'bright-minds', 'Shapes All Around', '/assets/videos/Little%20Detective%20world.mp4', '/assets/topics/Little%20detective%20World.png', '/assets/notes/Little%20Detective%20World.png', true, '/games/little-detective-world/index.html', 10),
('alphabets-treasure-world', 'ukg', 'little-stars', 'Alphabets Treasure World', '/assets/videos/Alphabets%20Treasure%20World.mp4', '/assets/topics/Alphabets%20Treasure%20World.png', '/assets/notes/Alphabet%20Treasure%20World.png', true, '/games/alphabets-treasure-world/index.html', 11),
('number-treasure-quest', 'ukg', 'little-stars', 'Number Treasure Quest', '/assets/videos/Number%20Treasure%20Quest.mp4', '/assets/topics/Number%20Treasure%20Quest.png', '/assets/notes/Number%20Treasure%20Quest.png', true, '/games/number-treasure-quest/index.html', 12),
('rainbow-factory', 'ukg', 'little-stars', 'Rainbow Factory', '/assets/videos/Rainbow%20Factory.mp4', '/assets/topics/Rainbow%20Factory.png', '/assets/notes/Rainbow%20Factory.png', true, '/games/rainbow-factory/index.html', 13),
('shape-detective-world', 'ukg', 'little-stars', 'Shape Detective World', '/assets/videos/Shape%20Detective%20World.mp4', '/assets/topics/Shape%20Detective%20World.png', '/assets/notes/Shape%20Detective%20World.png', true, '/games/shape-detective-world/index.html', 14),
('super-market-challenge', 'ukg', 'little-stars', 'Super Market Challenge', '/assets/videos/Super%20Market%20Challenge.mp4', '/assets/topics/Supermarket%20Challenge.png', '/assets/notes/Supermarket%20Challenge.png', true, '/games/super-market-challenge/index.html', 15),
('simple-addition-1-10', 'ukg', 'bright-minds', 'Simple Addition (1-10)', '/assets/videos/Number%20Treasure%20Quest.mp4', '/assets/topics/Number%20Treasure%20Quest.png', '/assets/notes/Number%20Treasure%20Quest.png', true, '/games/number-treasure-quest/index.html', 16),
('sight-words-starter', 'ukg', 'bright-minds', 'Sight Words Starter', '/assets/videos/Alphabets%20Treasure%20World.mp4', '/assets/topics/Alphabets%20Treasure%20World.png', '/assets/notes/Alphabet%20Treasure%20World.png', true, '/games/alphabets-treasure-world/index.html', 17),
('our-solar-system', 'ukg', 'bright-minds', 'Our Solar System', '/assets/videos/Rainbow%20Factory.mp4', '/assets/topics/Rainbow%20Factory.png', '/assets/notes/Rainbow%20Factory.png', false, NULL, 18),
('healthy-eating', 'ukg', 'bright-minds', 'Healthy Eating & Nutrition', '/assets/videos/Super%20Market%20Challenge.mp4', '/assets/topics/Supermarket%20Challenge.png', '/assets/notes/Supermarket%20Challenge.png', true, '/games/super-market-challenge/index.html', 19),
('phonics-fun-a-z', 'ukg', 'bright-minds', 'Phonics Fun (A-Z)', '/assets/videos/Alphabets%20Treasure%20World.mp4', '/assets/topics/Alphabets%20Treasure%20World.png', '/assets/notes/Alphabet%20Treasure%20World.png', true, '/games/alphabets-treasure-world/index.html', 20),
('counting-detective-quest', '1st-class', 'little-stars', 'Counting Detective Quest', '/assets/videos/Counting%20Detective%20Quest.mp4', '/assets/topics/Counting%20Detective%20Quest.png', '/assets/notes/Counting%20Detective%20Quest.png', true, '/games/counting-detective-quest/index.html', 21),
('decision-makers', '1st-class', 'little-stars', 'Decision Makers', '/assets/videos/Decision%20Makers.mp4', '/assets/topics/Decision%20Makers.png', '/assets/notes/Decision%20Maker.png', true, '/games/decsion-makers/index.html', 22),
('safety-hero-mission', '1st-class', 'little-stars', 'Safety Hero Mission', '/assets/videos/Safety%20Hero%20Mission.mp4', '/assets/topics/Safety%20Hero%20Mission.png', '/assets/notes/Safety%20Hero%20Mission.png', true, '/games/safety-hero-mission/index.html', 23),
('secret-colour-mission', '1st-class', 'little-stars', 'Secret Colour Mission', '/assets/videos/Secret%20Colour%20Mission.mp4', '/assets/topics/Secret%20Colour%20Mission.png', '/assets/notes/Secret%20Colour%20Mission.png', true, '/games/secret-colour-mission/index.html', 24),
('wildlife-explorer-quest', '1st-class', 'little-stars', 'Wildlife Explorer Quest', '/assets/videos/Wildlife%20Explorer%20Quest.mp4', '/assets/topics/Wildlife%20Explorer%20Quest.png', '/assets/notes/Wildlife%20Explorer%20Quest.png', true, '/games/wildlife-explore-quest/index.html', 25),
('time-clock-reading', '1st-class', 'bright-minds', 'Time & Clock Reading', '/assets/videos/Counting%20Detective%20Quest.mp4', '/assets/topics/Counting%20Detective%20Quest.png', '/assets/notes/Counting%20Detective%20Quest.png', true, '/games/counting-detective-quest/index.html', 26),
('money-basics', '1st-class', 'bright-minds', 'Money & Currency Basics', '/assets/videos/Decision%20Makers.mp4', '/assets/topics/Decision%20Makers.png', '/assets/notes/Decision%20Maker.png', true, '/games/decsion-makers/index.html', 27),
('magnets-forces', '1st-class', 'bright-minds', 'Magnets & Simple Forces', '/assets/videos/Safety%20Hero%20Mission.mp4', '/assets/topics/Safety%20Hero%20Mission.png', '/assets/notes/Safety%20Hero%20Mission.png', false, NULL, 28),
('world-continents-maps', '1st-class', 'bright-minds', 'World Continents & Oceans', '/assets/videos/Wildlife%20Explorer%20Quest.mp4', '/assets/topics/Wildlife%20Explorer%20Quest.png', '/assets/notes/Wildlife%20Explorer%20Quest.png', true, '/games/wildlife-explore-quest/index.html', 29),
('addition-subtraction-20', '1st-class', 'bright-minds', 'Addition & Subtraction to 20', '/assets/videos/Counting%20Detective%20Quest.mp4', '/assets/topics/Counting%20Detective%20Quest.png', '/assets/notes/Counting%20Detective%20Quest.png', true, '/games/counting-detective-quest/index.html', 30),
('champion-zone', 'explore', NULL, 'Champion Zone', '/assets/videos/Champian%20Zone.mp4', '/assets/topics/Champion%20Zone.jpeg', '/assets/notes/Champion%20Zone.png', false, NULL, 31),
('cosmic-quest', 'explore', NULL, 'Cosmic Quest', '/assets/videos/Cosomic%20Quest.mp4', '/assets/topics/Cosomic%20Quest.jpeg', '/assets/notes/Cosmic%20Quest.png', false, NULL, 32),
('digital-detectives', 'explore', NULL, 'Digital Detectives', '/assets/videos/Digital%20Detectives.mp4', '/assets/topics/Digital%20Detectives.jpeg', '/assets/notes/Digital%20Detectives.png', false, NULL, 33),
('kindness-magic', 'explore', NULL, 'Kindness Magic', '/assets/videos/Kindness%20Magic.mp4', '/assets/topics/Kindness%20Magic.jpeg', '/assets/notes/Kindness%20Magic.png', false, NULL, 34),
('little-leaders', 'explore', NULL, 'Little Leaders: Values & Kindness', '/assets/videos/Little%20Leaders.mp4', '/assets/topics/Little%20Leaders.jpeg', '/assets/notes/Little%20Leaders.png', false, NULL, 35)
ON CONFLICT (id) DO UPDATE SET
    class_id = EXCLUDED.class_id,
    section_id = EXCLUDED.section_id,
    name = EXCLUDED.name,
    video_url = EXCLUDED.video_url,
    thumb_url = EXCLUDED.thumb_url,
    note_url = EXCLUDED.note_url,
    has_game = EXCLUDED.has_game,
    game_url = EXCLUDED.game_url,
    display_order = EXCLUDED.display_order;
