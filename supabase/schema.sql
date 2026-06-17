-- =============================================================
-- IncentIQ — Supabase / PostgreSQL Schema
-- =============================================================
-- Run this entire file in the Supabase SQL Editor (or psql).
-- Order matters: extensions → types → tables → indexes →
-- triggers → RLS policies → views → seed data.
-- =============================================================

-- ----------------------------------------------------------------
-- 0. EXTENSIONS
-- ----------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- fast ILIKE search


-- ----------------------------------------------------------------
-- 1. HELPER — auto-update updated_at on every row change
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ----------------------------------------------------------------
-- 2. USERS  (admin accounts — NextAuth + bcrypt, NOT Supabase Auth)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT,
  email       TEXT        NOT NULL UNIQUE,
  password    TEXT        NOT NULL,         -- bcrypt hash
  role        TEXT        NOT NULL DEFAULT 'ADMIN',
  avatar      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);


-- ----------------------------------------------------------------
-- 3. CATEGORIES
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL UNIQUE,
  slug        TEXT        NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);


-- ----------------------------------------------------------------
-- 4. TAGS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tags (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL UNIQUE,
  slug       TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags (slug);


-- ----------------------------------------------------------------
-- 5. POSTS  (blog)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT        NOT NULL,
  slug             TEXT        NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT        NOT NULL DEFAULT '',
  featured_image   TEXT,

  -- workflow
  status           TEXT        NOT NULL DEFAULT 'DRAFT',
    -- allowed values: DRAFT | PUBLISHED | ARCHIVED
  published_at     TIMESTAMPTZ,
  scheduled_at     TIMESTAMPTZ,

  -- SEO
  meta_title       TEXT,
  meta_description TEXT,
  keywords         TEXT,
  canonical_url    TEXT,
  og_title         TEXT,
  og_description   TEXT,
  og_image         TEXT,
  no_index         BOOLEAN     NOT NULL DEFAULT FALSE,
  no_follow        BOOLEAN     NOT NULL DEFAULT FALSE,

  -- content meta
  reading_time     INTEGER,            -- minutes

  -- relations
  author_id        UUID        NOT NULL REFERENCES users (id)       ON DELETE RESTRICT,
  category_id      UUID                REFERENCES categories (id)   ON DELETE SET NULL,

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_posts_slug        ON posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_status      ON posts (status);
CREATE INDEX IF NOT EXISTS idx_posts_published   ON posts (published_at DESC) WHERE status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_posts_author      ON posts (author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category    ON posts (category_id);
-- full-text search across title + excerpt
CREATE INDEX IF NOT EXISTS idx_posts_fts ON posts
  USING GIN (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'')));


-- ----------------------------------------------------------------
-- 6. POST_TAGS  (many-to-many junction)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES tags  (id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags (tag_id);


-- ----------------------------------------------------------------
-- 7. DEMO_REQUESTS  (book-demo form submissions)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS demo_requests (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- contact info
  first_name    TEXT        NOT NULL,
  last_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT,
  company       TEXT        NOT NULL,
  job_title     TEXT,
  country       TEXT,
  company_size  TEXT,
    -- allowed values: 1-50 | 51-200 | 201-500 | 501-2000 | 2000+
  message       TEXT,

  -- pipeline
  status        TEXT        NOT NULL DEFAULT 'NEW',
    -- allowed values: NEW | CONTACTED | QUALIFIED | SCHEDULED | CLOSED
  source        TEXT        NOT NULL DEFAULT 'website',
    -- website | referral | linkedin | event | other

  -- internal notes (optional admin annotation)
  notes         TEXT,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_demo_requests_updated_at
  BEFORE UPDATE ON demo_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_demo_requests_status     ON demo_requests (status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created    ON demo_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email      ON demo_requests (email);
-- trgm index for fast fuzzy search on name / email / company
CREATE INDEX IF NOT EXISTS idx_demo_requests_search ON demo_requests
  USING GIN ((first_name || ' ' || last_name || ' ' || email || ' ' || company) gin_trgm_ops);


-- ----------------------------------------------------------------
-- 8. MEDIA  (Cloudinary / any CDN assets)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  url        TEXT        NOT NULL,
  public_id  TEXT        NOT NULL,     -- Cloudinary public_id or S3 key
  format     TEXT,
  width      INTEGER,
  height     INTEGER,
  size       INTEGER,                  -- bytes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_created ON media (created_at DESC);


-- ----------------------------------------------------------------
-- 9. SETTINGS  (key-value store for admin site settings)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS settings (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT        NOT NULL UNIQUE,
  value      TEXT        NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ----------------------------------------------------------------
-- 10. PAGE_VIEWS  (lightweight analytics — optional)
--     Each row = one page view. Aggregate in queries / views.
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_views (
  id         BIGSERIAL   PRIMARY KEY,
  path       TEXT        NOT NULL,
  referrer   TEXT,
  country    TEXT,        -- from Vercel / CF geo header
  user_agent TEXT,
  viewed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_path    ON page_views (path);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed  ON page_views (viewed_at DESC);


-- ================================================================
-- 11. STATS VIEW  (powers /api/admin/stats)
-- ================================================================
CREATE OR REPLACE VIEW admin_stats AS
SELECT
  (SELECT COUNT(*)                            FROM demo_requests)              AS total_demo_requests,
  (SELECT COUNT(*) FROM demo_requests         WHERE status = 'NEW')            AS new_demo_requests,
  (SELECT COUNT(*)                            FROM posts)                      AS total_posts,
  (SELECT COUNT(*) FROM posts                 WHERE status = 'PUBLISHED')      AS published_posts,
  (SELECT COUNT(*)                            FROM media)                      AS total_media,
  (SELECT COUNT(*)                            FROM users)                      AS total_users;


-- ================================================================
-- 12. ROW-LEVEL SECURITY (RLS)
-- ================================================================
-- The Next.js API routes use the SERVICE ROLE key (bypasses RLS).
-- The ANON key is blocked from reading sensitive tables.
-- Blog posts are publicly readable via anon when PUBLISHED.

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags           ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags      ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE media          ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views     ENABLE ROW LEVEL SECURITY;

-- ── Public read: published posts, categories, tags ──────────────
CREATE POLICY "public_read_published_posts"
  ON posts FOR SELECT
  USING (status = 'PUBLISHED');

CREATE POLICY "public_read_categories"
  ON categories FOR SELECT
  USING (TRUE);

CREATE POLICY "public_read_tags"
  ON tags FOR SELECT
  USING (TRUE);

CREATE POLICY "public_read_post_tags"
  ON post_tags FOR SELECT
  USING (TRUE);

-- ── No anon access to sensitive tables ──────────────────────────
-- (service role key used by API bypasses RLS automatically)
-- demo_requests, users, media, settings, page_views: no anon policy = blocked


-- ================================================================
-- 13. SEED DATA
-- ================================================================

-- ── Admin user (password: admin123! — change immediately) ───────
-- bcrypt hash of "admin123!" with 12 rounds:
INSERT INTO users (id, name, email, password, role)
VALUES (
  gen_random_uuid(),
  'Admin User',
  'admin@incentnow.com',
  '$2b$12$jgBfHtGpUVlmaCCbgW4G0uDa.y.WU/0soxT/GZTJcbJLPLSLgz4ti',
  'ADMIN'
)
ON CONFLICT (email) DO NOTHING;


-- ── Categories ──────────────────────────────────────────────────
INSERT INTO categories (name, slug, description) VALUES
  ('Product Updates',     'product-updates',   'Latest IncentIQ product news and feature releases'),
  ('ICM Best Practices',  'icm-best-practices','Expert guidance on incentive compensation management'),
  ('ServiceNow',          'servicenow',        'Tips and insights for the Now Platform'),
  ('Industry Insights',   'industry-insights', 'Trends shaping sales compensation and RevOps'),
  ('Case Studies',        'case-studies',      'Real-world results from IncentIQ customers'),
  ('Incentive Ops',       'incentive-ops',     'Day-to-day operations of incentive programs'),
  ('Plan Design',         'plan-design',       'Building comp plans that motivate and retain'),
  ('AI & Analytics',      'ai-analytics',      'How AI is reshaping compensation intelligence'),
  ('Platform',            'platform',          'Technical deep-dives into the IncentIQ platform'),
  ('Analytics',           'analytics',         'Data and reporting for revenue teams'),
  ('Buying Guide',        'buying-guide',      'How to evaluate and select ICM software'),
  ('How-To',              'how-to',            'Step-by-step guides for comp operations')
ON CONFLICT (slug) DO NOTHING;


-- ── Tags ────────────────────────────────────────────────────────
INSERT INTO tags (name, slug) VALUES
  ('Automation',  'automation'),
  ('Compliance',  'compliance'),
  ('Sales Ops',   'sales-ops'),
  ('RevOps',      'revops'),
  ('Finance',     'finance'),
  ('Analytics',   'analytics')
ON CONFLICT (slug) DO NOTHING;


-- ── Default settings ────────────────────────────────────────────
INSERT INTO settings (key, value) VALUES
  ('site_name',        'IncentIQ'),
  ('site_url',         'https://www.incentnow.ai'),
  ('site_description', 'AI-First Incentive Compensation Management on ServiceNow'),
  ('support_email',    'support@incentnow.com'),
  ('linkedin_url',     ''),
  ('twitter_url',      ''),
  ('footer_text',      '© 2026 IncentIQ. All rights reserved.')
ON CONFLICT (key) DO NOTHING;


-- ── Blog posts ──────────────────────────────────────────────────
-- We need the admin user ID and category IDs — use a DO block so
-- we can resolve them dynamically without hard-coding UUIDs.

DO $$
DECLARE
  v_author_id   UUID;
  v_cat_id      UUID;
BEGIN
  SELECT id INTO v_author_id FROM users WHERE email = 'admin@incentnow.com';

  -- Post 1
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'incentive-ops';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'Why spreadsheets break at enterprise scale',
    'why-spreadsheets-break-at-scale',
    'Spreadsheets feel free until the first disputed payout. Here''s where they quietly fail as headcount, plans, and rules multiply.',
    '<h2>The hidden cost of "free"</h2><p>Every incentive program starts simple: a few reps, one plan, a single spreadsheet. It works — until it doesn''t. The moment a second business unit, a mid-cycle quota change, or a disputed payout enters the picture, that spreadsheet becomes the most expensive tool in the company.</p><p>The cost isn''t the license. It''s the hours Sales Ops spend reconciling formulas, the trust reps lose when a number looks wrong, and the audit risk Finance inherits when no one can explain how a payout was calculated.</p><h2>Three failure points</h2><p>First, version sprawl. When plans live in files, every change spawns a copy. Within a quarter, no one is sure which version is authoritative.</p><p>Second, no audit trail. A spreadsheet can tell you the current value of a cell, but not who changed it, when, or why. That''s fatal for compensation, where every dollar must be explainable.</p><p>Third, no real-time visibility. By the time numbers are consolidated, the quarter is already over — and the chance to coach a rep toward quota is gone.</p><h2>What good looks like</h2><p>A modern incentive system treats compensation as governed data, not as a file. Plans are versioned, every calculation is traceable, and results update in real time so Sales, Finance, and Leadership work from one source of truth.</p><p>That''s the shift IncentIQ makes — moving incentives onto the Now Platform, where governance and scale come standard.</p>',
    'PUBLISHED', '2026-05-28 00:00:00+00', 6, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 2
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'plan-design';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'Designing incentive plans reps actually trust',
    'designing-incentive-plans-reps-trust',
    'The best comp plan is the one a rep can explain back to you. A field guide to clarity, fairness, and motivation.',
    '<h2>Trust is the real KPI</h2><p>A plan can be mathematically perfect and still fail. If reps don''t understand how they''re paid, the plan stops driving behavior and starts driving doubt. Trust — not complexity — is what turns a comp plan into a motivator.</p><p>The test is simple: can a rep explain their own plan back to you in two sentences? If not, the plan is working against you.</p><h2>Simplicity beats cleverness</h2><p>Every accelerator, cap, and exception you add is a place where trust can leak. Start with the simplest structure that aligns reps with the outcomes you care about, then add nuance only where it clearly changes behavior.</p><p>When you do add tiers or SPIFs, make them legible. A rep should be able to see, at any moment, exactly what the next dollar of effort earns them.</p><h2>Show the math</h2><p>Transparency is the cheapest trust you can buy. Itemized statements that trace every payout back to the deal, rule, and rate behind it eliminate the black box — and most disputes with it.</p><p>Pair that with an assistant reps can ask "how do I hit top tier?" and the plan starts coaching itself.</p>',
    'PUBLISHED', '2026-05-19 00:00:00+00', 7, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 3
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'ai-analytics';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'What AI changes about compensation forecasting',
    'ai-changes-comp-forecasting',
    'Forecasting attainment used to be a spreadsheet guess. AI turns it into a continuously updated, explainable projection.',
    '<h2>From snapshot to signal</h2><p>Traditional forecasting is a snapshot: someone pulls numbers at month-end and extrapolates. By the time the forecast exists, it''s already stale.</p><p>AI changes the cadence. Attainment and payout exposure update continuously as deals move, so leadership sees where the quarter is heading while there''s still time to act.</p><h2>Explainability matters</h2><p>A forecast no one trusts is just noise. The value of embedded AI isn''t only accuracy — it''s that every projection can be traced to the data and assumptions behind it.</p><p>That governance-first approach is what makes AI safe for compensation, where being wrong has real financial consequences.</p>',
    'PUBLISHED', '2026-05-11 00:00:00+00', 5, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 4
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'platform';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'Why ServiceNow is the right foundation for ICM',
    'servicenow-as-the-comp-platform',
    'Incentive compensation is a governance problem as much as a math problem. That''s exactly what the Now Platform is built for.',
    '<h2>Comp is a workflow problem</h2><p>Calculating a payout is the easy part. The hard part is everything around it: approvals, disputes, audit trails, access controls, and integration with the rest of the enterprise.</p><p>Those are workflow and governance problems — precisely the domain the Now Platform was built to solve.</p><h2>Inherited, not bolted on</h2><p>Building natively on ServiceNow means incentives inherit enterprise security, governance, and scale by default. There''s no separate integration layer to maintain, and no data silo to reconcile.</p><p>The result is that compensation earns the same trust as the rest of the enterprise stack — because it runs on the same foundation.</p>',
    'PUBLISHED', '2026-04-30 00:00:00+00', 6, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 5
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'incentive-ops';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'A practical playbook for cutting payout disputes',
    'cutting-payout-disputes',
    'Disputes are a symptom, not the disease. Fix the upstream causes and watch the queue shrink.',
    '<h2>Why disputes happen</h2><p>Most payout disputes trace back to two causes: a rep can''t see how a number was derived, or the data behind it was wrong. Both are preventable.</p><p>Chasing disputes after the fact is expensive. Removing their causes is far cheaper.</p><h2>The upstream fixes</h2><p>Itemized, explainable statements kill the "I don''t understand this number" dispute. Real-time visibility catches data issues before they reach a statement.</p><p>For the disputes that remain, a governed workflow — structured intake, clear ownership, and SLAs — turns a chaotic inbox into a tracked, auditable process.</p>',
    'PUBLISHED', '2026-04-22 00:00:00+00', 5, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 6
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'analytics';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'Real-time visibility is the new baseline for revenue teams',
    'real-time-visibility-revenue-teams',
    'When Sales, Finance, and Leadership share one live view, alignment stops being a meeting and starts being a default.',
    '<h2>The cost of lag</h2><p>When every team works from its own export, alignment is a negotiation over whose numbers are right. That lag costs deals, trust, and time.</p><p>Real-time, shared data removes the negotiation. There''s one number, and everyone is looking at it.</p><h2>Drill-downs build confidence</h2><p>Visibility isn''t just a dashboard — it''s the ability to move from company to team to individual rep in a click, and to trust what you find at every level.</p><p>That confidence is what lets leadership forecast early and coach precisely.</p>',
    'PUBLISHED', '2026-04-14 00:00:00+00', 4, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 7
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'plan-design';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'Quota setting without the guesswork',
    'quota-setting-without-guesswork',
    'Good quotas balance ambition and attainability. Here''s how to set them with data instead of gut feel.',
    '<h2>The attainability problem</h2><p>If only one in four reps hits quota, the quota isn''t motivating — it''s demoralizing. But set it too low and you leave growth on the table. The art is calibration.</p><p>Calibration needs data: historical attainment, territory potential, and ramp curves, all in one place.</p><h2>Distribute with governance</h2><p>Setting the number is half the job. Cascading it down the org — by role, territory, and reporting line — with full version history is the other half.</p><p>When quota changes are governed and auditable, mid-cycle adjustments stop being chaos and start being routine.</p>',
    'PUBLISHED', '2026-04-03 00:00:00+00', 6, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 8
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'buying-guide';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'The ICM buyer''s checklist',
    'the-icm-buyers-checklist',
    'Evaluating incentive compensation platforms? These are the questions that separate a tool from a system.',
    '<h2>Beyond the demo</h2><p>Every ICM platform demos well on a clean plan. The real question is how it behaves under enterprise conditions: multiple business units, mid-cycle changes, and an auditor asking how a number was derived.</p><p>Build your evaluation around governance, not features.</p><h2>Questions that matter</h2><p>Can every payout be traced to its source? Is there a complete audit trail on plan and quota changes? How does the platform handle disputes, and does that workflow leave a record?</p><p>Finally: does it live inside your enterprise platform, or beside it? Where compensation data lives determines how much trust it can earn.</p>',
    'PUBLISHED', '2026-03-25 00:00:00+00', 8, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

  -- Post 9
  SELECT id INTO v_cat_id FROM categories WHERE slug = 'how-to';
  INSERT INTO posts (title, slug, excerpt, content, status, published_at, reading_time, author_id, category_id)
  VALUES (
    'Migrating off spreadsheets in 30 days',
    'migrating-off-spreadsheets-in-30-days',
    'A pragmatic, low-risk migration plan that gets you to a governed system in a single cycle.',
    '<h2>Start with one plan</h2><p>You don''t have to migrate everything at once. Pick one representative plan, model it in the new system, and run it in parallel for a cycle. Parallel runs build confidence and surface edge cases safely.</p><p>Once the numbers match, you''ve proven the model — and the rest follows the same pattern.</p><h2>A week-by-week shape</h2><p>Week one: model the org and the pilot plan. Week two: load data and validate calculations. Week three: parallel run and reconcile. Week four: cut over and onboard reps to self-serve statements.</p><p>Thirty days in, you''ve replaced a fragile file with a governed system — and the team trusts it because they watched it prove itself.</p>',
    'PUBLISHED', '2026-03-17 00:00:00+00', 7, v_author_id, v_cat_id
  ) ON CONFLICT (slug) DO NOTHING;

END $$;


-- ================================================================
-- 14. SAMPLE DEMO REQUEST (for testing the admin dashboard)
-- ================================================================
INSERT INTO demo_requests (first_name, last_name, email, phone, company, job_title, country, company_size, message, status, source)
VALUES
  ('Sarah',  'Mitchell', 'sarah.mitchell@acmecorp.com', '+1-415-555-0101', 'Acme Corp',    'VP Sales Ops',     'United States', '501-2000', 'We are evaluating ICM platforms for Q3. Would love to see the ServiceNow integration.', 'NEW',       'website'),
  ('James',  'Okafor',   'j.okafor@globaltech.io',     NULL,              'GlobalTech',   'Head of RevOps',   'United Kingdom','201-500',  NULL,                                                                                    'CONTACTED', 'linkedin'),
  ('Priya',  'Sharma',   'priya@innovatesales.com',     '+91-9988776655',  'Innovate Sales','Sales Director',  'India',         '51-200',   'Interested in the AI forecasting module.',                                             'QUALIFIED', 'website'),
  ('Carlos', 'Diaz',     'carlos.diaz@revenuepro.mx',  NULL,              'RevenuePro',   'CFO',              'Mexico',        '201-500',  NULL,                                                                                    'SCHEDULED', 'event'),
  ('Emma',   'Chen',     'emma.chen@scaleup.sg',       '+65-9123-4567',   'ScaleUp SG',   'Ops Manager',      'Singapore',     '51-200',   'Looking for a demo focused on quota management.',                                      'NEW',       'website')
ON CONFLICT DO NOTHING;


-- ================================================================
-- DONE
-- ================================================================
-- Tables:   users, categories, tags, posts, post_tags,
--           demo_requests, media, settings, page_views
-- Views:    admin_stats
-- Triggers: auto updated_at on users, posts, demo_requests, settings
-- RLS:      enabled on all tables; anon can read published posts,
--           categories, tags; service role key bypasses all policies
-- Seed:     1 admin user, 12 categories, 6 tags, 7 settings,
--           9 blog posts, 5 sample demo requests
-- ================================================================
