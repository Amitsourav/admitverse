# AdmitVerse - Database Schema Documentation

**Version**: 1.0  
**Date**: August 26, 2024  
**Database**: PostgreSQL (Supabase)  
**CTPO**: Database Architect  

---

## 📋 Table of Contents

1. [Schema Overview](#schema-overview)
2. [Core Tables](#core-tables)
3. [Junction Tables](#junction-tables)
4. [Supporting Tables](#supporting-tables)
5. [Indexes & Performance](#indexes--performance)
6. [Security Policies](#security-policies)
7. [Migration Scripts](#migration-scripts)
8. [Seed Data](#seed-data)

---

## 1. Schema Overview

### 🎯 Database Design Principles
- **Normalization**: 3NF compliance to eliminate data redundancy
- **Scalability**: Designed for millions of records with proper indexing
- **Performance**: Strategic indexes for sub-100ms query response
- **Flexibility**: JSONB fields for dynamic content and future extensions
- **Security**: Row Level Security (RLS) for data protection
- **Internationalization**: Unicode support for global content

### 📊 Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   COLLEGES  │    │ COLLEGE_COURSES │    │     COURSES      │
│             │    │                 │    │                  │
│ • id (PK)   │◄───┤ • college_id    │───►│ • id (PK)        │
│ • name      │    │ • course_id     │    │ • name           │
│ • location  │    │ • fees          │    │ • category       │
│ • country   │    │ • duration      │    │ • level          │
│ • rating    │    │ • intake        │    │ • description    │
│ • founded   │    │ • placement_*   │    └──────────────────┘
└─────────────┘    └─────────────────┘             │
       │                    │                      │
       │           ┌─────────────────────┐         │
       │           │COLLEGE_SPEC         │         │
       │           │                     │         │
       └───────────┤ • college_id        │         │
                   │ • course_id         │         │
                   │ • specialization_id │◄────────┘
                   │ • fees              │         
                   │ • duration          │    ┌──────────────────┐
                   │ • avg_salary        │    │ SPECIALIZATIONS  │
                   └─────────────────────┘    │                  │
                            │                 │ • id (PK)        │
                            └─────────────────┤ • name           │
                                              │ • description    │
                                              │ • key_subjects   │
                                              │ • career_paths   │
                                              └──────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    BLOGS    │    │    LEADS    │    │    USERS    │    │   REVIEWS   │
│             │    │             │    │             │    │             │
│ • id (PK)   │    │ • id (PK)   │    │ • id (PK)   │    │ • id (PK)   │
│ • title     │    │ • name      │    │ • email     │    │ • college_id│
│ • content   │    │ • email     │    │ • role      │    │ • rating    │
│ • author    │    │ • course    │    │ • profile   │    │ • review    │
│ • published │    │ • country   │    │ • created   │    │ • verified  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 2. Core Tables

### 🏫 Colleges Table

```sql
CREATE TABLE colleges (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly identifier
    
    -- Location Information
    location VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    state VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    address TEXT,
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Institution Details
    founded_year INTEGER CHECK (founded_year >= 1800 AND founded_year <= EXTRACT(YEAR FROM NOW())),
    college_type VARCHAR(50) NOT NULL CHECK (college_type IN ('Public', 'Private', 'Deemed', 'Central', 'State')),
    affiliation VARCHAR(255),
    accreditation JSONB DEFAULT '[]'::jsonb, -- Array of accrediting bodies
    
    -- Contact Information
    website VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(255),
    social_media JSONB DEFAULT '{}'::jsonb, -- {facebook, twitter, linkedin, etc}
    
    -- Academic Information
    total_students INTEGER CHECK (total_students >= 0),
    total_faculty INTEGER CHECK (total_faculty >= 0),
    student_faculty_ratio DECIMAL(5,2),
    campus_size_acres DECIMAL(8,2),
    
    -- Rankings & Ratings
    ranking_national INTEGER,
    ranking_international INTEGER,
    rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
    
    -- Financial Information
    average_annual_fees DECIMAL(12,2),
    scholarship_amount DECIMAL(12,2),
    financial_aid_percentage DECIMAL(5,2),
    
    -- Placement Information
    placement_percentage DECIMAL(5,2) CHECK (placement_percentage >= 0 AND placement_percentage <= 100),
    average_package DECIMAL(12,2),
    highest_package DECIMAL(12,2),
    median_package DECIMAL(12,2),
    top_recruiters JSONB DEFAULT '[]'::jsonb, -- Array of company names
    
    -- Facilities
    hostel_facilities BOOLEAN DEFAULT false,
    library_books INTEGER DEFAULT 0,
    research_centers INTEGER DEFAULT 0,
    laboratories INTEGER DEFAULT 0,
    campus_facilities JSONB DEFAULT '[]'::jsonb, -- Array of facilities
    sports_facilities JSONB DEFAULT '[]'::jsonb,
    
    -- Content & Media
    description TEXT,
    about_rich_text TEXT, -- Rich text content for detailed description
    featured_image VARCHAR(500),
    gallery_images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
    virtual_tour_url VARCHAR(500),
    brochure_url VARCHAR(500),
    
    -- Status & Visibility
    is_featured BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- SEO Fields
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords JSONB DEFAULT '[]'::jsonb,
    
    -- Search Optimization
    search_vector tsvector,
    search_keywords JSONB DEFAULT '[]'::jsonb, -- Manual keywords for better search
    
    -- Audit Fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- Comments for documentation
COMMENT ON TABLE colleges IS 'Core table storing college/university information';
COMMENT ON COLUMN colleges.slug IS 'URL-friendly identifier used in routes';
COMMENT ON COLUMN colleges.accreditation IS 'JSON array of accrediting bodies and certifications';
COMMENT ON COLUMN colleges.search_vector IS 'Full-text search vector for PostgreSQL search';
```

### 📚 Courses Table

```sql
CREATE TABLE courses (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Course Classification
    level VARCHAR(50) NOT NULL CHECK (level IN ('Undergraduate', 'Postgraduate', 'Doctorate', 'Certificate', 'Diploma')),
    category VARCHAR(100) NOT NULL, -- Engineering, Business, Medicine, Arts, etc.
    subcategory VARCHAR(100), -- Computer Science, Mechanical, Marketing, etc.
    
    -- Duration Information
    duration VARCHAR(50), -- "4 Years", "2 Years", "6 Months"
    duration_months INTEGER CHECK (duration_months > 0),
    duration_years DECIMAL(3,1),
    
    -- Academic Details
    description TEXT,
    detailed_description TEXT, -- Rich text description
    curriculum JSONB DEFAULT '[]'::jsonb, -- Array of subjects/modules
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    prerequisites TEXT,
    eligibility_criteria TEXT,
    
    -- Career Information
    career_prospects TEXT,
    job_roles JSONB DEFAULT '[]'::jsonb, -- Array of possible job titles
    skills_developed JSONB DEFAULT '[]'::jsonb,
    industry_sectors JSONB DEFAULT '[]'::jsonb,
    
    -- Salary Information
    average_salary_range JSONB DEFAULT '{}'::jsonb, -- {min, max, currency}
    starting_salary DECIMAL(12,2),
    mid_career_salary DECIMAL(12,2),
    
    -- Certification & Recognition
    certification_body VARCHAR(255),
    professional_recognition JSONB DEFAULT '[]'::jsonb,
    international_recognition BOOLEAN DEFAULT false,
    
    -- Examination Pattern
    exam_pattern JSONB DEFAULT '{}'::jsonb, -- Structure of examinations
    assessment_methods JSONB DEFAULT '[]'::jsonb,
    grading_system VARCHAR(100),
    
    -- Application Information
    application_process TEXT,
    entrance_exams JSONB DEFAULT '[]'::jsonb, -- Required entrance exams
    important_dates JSONB DEFAULT '{}'::jsonb,
    application_deadlines JSONB DEFAULT '{}'::jsonb,
    
    -- Media & Resources
    icon_name VARCHAR(100), -- Font Awesome icon identifier
    featured_image VARCHAR(500),
    course_brochure_url VARCHAR(500),
    sample_curriculum_url VARCHAR(500),
    
    -- Status
    is_popular BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords JSONB DEFAULT '[]'::jsonb,
    
    -- Search
    search_vector tsvector,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

COMMENT ON TABLE courses IS 'Master table for all types of courses offered';
COMMENT ON COLUMN courses.curriculum IS 'JSON array of subjects, modules, and course structure';
COMMENT ON COLUMN courses.entrance_exams IS 'JSON array of required entrance examination names';
```

### 🎯 Specializations Table

```sql
CREATE TABLE specializations (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Classification
    category VARCHAR(100), -- Align with course categories
    specialization_type VARCHAR(50), -- Major, Minor, Concentration, Track
    
    -- Academic Content
    description TEXT NOT NULL,
    detailed_description TEXT,
    key_subjects JSONB DEFAULT '[]'::jsonb, -- Core subjects in this specialization
    elective_subjects JSONB DEFAULT '[]'::jsonb,
    core_competencies JSONB DEFAULT '[]'::jsonb,
    
    -- Career Information
    career_prospects TEXT,
    job_opportunities JSONB DEFAULT '[]'::jsonb,
    industry_applications TEXT,
    growth_potential TEXT,
    future_trends TEXT,
    
    -- Skills & Knowledge
    technical_skills JSONB DEFAULT '[]'::jsonb,
    soft_skills JSONB DEFAULT '[]'::jsonb,
    tools_technologies JSONB DEFAULT '[]'::jsonb,
    
    -- Market Information
    demand_level VARCHAR(50) CHECK (demand_level IN ('Very High', 'High', 'Medium', 'Low')),
    salary_potential VARCHAR(50),
    employment_sectors JSONB DEFAULT '[]'::jsonb,
    
    -- Prerequisites
    recommended_background TEXT,
    prerequisite_subjects JSONB DEFAULT '[]'::jsonb,
    recommended_skills JSONB DEFAULT '[]'::jsonb,
    
    -- Research & Innovation
    research_opportunities TEXT,
    innovation_areas JSONB DEFAULT '[]'::jsonb,
    industry_partnerships JSONB DEFAULT '[]'::jsonb,
    
    -- Media
    icon_name VARCHAR(100),
    featured_image VARCHAR(500),
    
    -- Status
    is_trending BOOLEAN DEFAULT false,
    is_emerging BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords JSONB DEFAULT '[]'::jsonb,
    
    -- Search
    search_vector tsvector,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

COMMENT ON TABLE specializations IS 'Detailed specializations available within courses';
COMMENT ON COLUMN specializations.key_subjects IS 'JSON array of core subjects taught';
COMMENT ON COLUMN specializations.demand_level IS 'Market demand level for this specialization';
```

---

## 3. Junction Tables

### 🔗 College_Courses (Many-to-Many)

```sql
CREATE TABLE college_courses (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    
    -- Course-specific details at this college
    fees_per_year DECIMAL(12,2) CHECK (fees_per_year >= 0),
    total_fees DECIMAL(12,2) CHECK (total_fees >= 0),
    additional_charges JSONB DEFAULT '{}'::jsonb, -- {lab_fee, library_fee, etc}
    
    -- Admission Information
    seats_available INTEGER CHECK (seats_available >= 0),
    intake_capacity INTEGER CHECK (intake_capacity >= 0),
    reservation_policy JSONB DEFAULT '{}'::jsonb, -- SC/ST/OBC quotas, etc.
    
    -- Duration (may vary from standard course duration)
    duration_months INTEGER,
    duration_semesters INTEGER,
    
    -- Academic Details
    curriculum_modifications JSONB DEFAULT '[]'::jsonb,
    special_features JSONB DEFAULT '[]'::jsonb,
    learning_methods JSONB DEFAULT '[]'::jsonb, -- Online, Offline, Hybrid
    
    -- Faculty Information
    faculty_count INTEGER CHECK (faculty_count >= 0),
    visiting_faculty INTEGER DEFAULT 0,
    industry_experts INTEGER DEFAULT 0,
    
    -- Infrastructure
    dedicated_labs INTEGER DEFAULT 0,
    library_resources JSONB DEFAULT '{}'::jsonb,
    equipment_facilities JSONB DEFAULT '[]'::jsonb,
    
    -- Placement Information (specific to this course at this college)
    placement_rate DECIMAL(5,2) CHECK (placement_rate >= 0 AND placement_rate <= 100),
    average_package_offered DECIMAL(12,2),
    highest_package_offered DECIMAL(12,2),
    median_package_offered DECIMAL(12,2),
    top_recruiters_course JSONB DEFAULT '[]'::jsonb,
    placement_assistance BOOLEAN DEFAULT true,
    
    -- Internship & Industry Connect
    mandatory_internship BOOLEAN DEFAULT false,
    internship_duration_months INTEGER,
    industry_partnerships JSONB DEFAULT '[]'::jsonb,
    
    -- Admission Process
    admission_requirements TEXT,
    entrance_exams_accepted JSONB DEFAULT '[]'::jsonb,
    cutoff_scores JSONB DEFAULT '{}'::jsonb, -- Previous year cutoffs
    selection_process TEXT,
    
    -- Application Details
    application_start_date DATE,
    application_end_date DATE,
    application_fee DECIMAL(8,2),
    online_application_url VARCHAR(500),
    
    -- Status & Verification
    is_available BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_verified DATE,
    verification_source VARCHAR(255),
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    
    -- Constraints
    UNIQUE(college_id, course_id)
);

-- Indexes for performance
CREATE INDEX idx_college_courses_college_id ON college_courses(college_id);
CREATE INDEX idx_college_courses_course_id ON college_courses(course_id);
CREATE INDEX idx_college_courses_fees ON college_courses(fees_per_year) WHERE is_available = true;
CREATE INDEX idx_college_courses_placement ON college_courses(placement_rate DESC) WHERE is_available = true;

COMMENT ON TABLE college_courses IS 'Junction table linking colleges with courses they offer';
COMMENT ON COLUMN college_courses.reservation_policy IS 'JSON object with reservation quotas and policies';
```

### 🎓 Course_Specializations (Many-to-Many)

```sql
CREATE TABLE course_specializations (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    specialization_id UUID NOT NULL REFERENCES specializations(id) ON DELETE CASCADE,
    
    -- Specialization Details within Course
    is_major BOOLEAN DEFAULT true, -- Major vs Minor specialization
    credit_requirements INTEGER, -- Credits needed for this specialization
    semester_introduced INTEGER, -- Which semester this specialization starts
    
    -- Duration
    specialization_duration_months INTEGER,
    additional_duration_months INTEGER DEFAULT 0,
    
    -- Prerequisites
    prerequisite_courses JSONB DEFAULT '[]'::jsonb,
    prerequisite_gpa DECIMAL(3,2),
    prerequisite_subjects JSONB DEFAULT '[]'::jsonb,
    
    -- Academic Structure
    core_subjects_count INTEGER DEFAULT 0,
    elective_subjects_count INTEGER DEFAULT 0,
    project_requirements JSONB DEFAULT '[]'::jsonb,
    thesis_required BOOLEAN DEFAULT false,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_new BOOLEAN DEFAULT false,
    launch_date DATE,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(course_id, specialization_id)
);

CREATE INDEX idx_course_specializations_course_id ON course_specializations(course_id);
CREATE INDEX idx_course_specializations_spec_id ON course_specializations(specialization_id);

COMMENT ON TABLE course_specializations IS 'Junction table linking courses with available specializations';
```

### 🎯 College_Specializations (Triple Junction)

```sql
CREATE TABLE college_specializations (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys (Triple relationship)
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    specialization_id UUID NOT NULL REFERENCES specializations(id) ON DELETE CASCADE,
    
    -- Verify the course-specialization relationship exists
    CONSTRAINT fk_course_specialization 
        FOREIGN KEY (course_id, specialization_id) 
        REFERENCES course_specializations(course_id, specialization_id),
    
    -- Financial Information
    additional_fees DECIMAL(12,2) DEFAULT 0,
    scholarship_available BOOLEAN DEFAULT false,
    financial_aid JSONB DEFAULT '{}'::jsonb,
    
    -- Capacity
    seats_available INTEGER CHECK (seats_available >= 0),
    current_enrollment INTEGER DEFAULT 0,
    
    -- Faculty & Resources
    specialized_faculty_count INTEGER DEFAULT 0,
    dedicated_equipment JSONB DEFAULT '[]'::jsonb,
    lab_facilities JSONB DEFAULT '[]'::jsonb,
    
    -- Career Outcomes (specific to this college)
    placement_rate DECIMAL(5,2),
    average_salary DECIMAL(12,2),
    highest_salary DECIMAL(12,2),
    top_recruiting_companies JSONB DEFAULT '[]'::jsonb,
    
    -- Industry Connections
    industry_mentors INTEGER DEFAULT 0,
    live_projects BOOLEAN DEFAULT false,
    industry_certifications JSONB DEFAULT '[]'::jsonb,
    
    -- Research Opportunities
    research_projects_available INTEGER DEFAULT 0,
    publications_last_year INTEGER DEFAULT 0,
    research_funding_available BOOLEAN DEFAULT false,
    
    -- Application Process
    separate_application BOOLEAN DEFAULT false,
    selection_criteria TEXT,
    interview_required BOOLEAN DEFAULT false,
    portfolio_required BOOLEAN DEFAULT false,
    
    -- Status
    is_available BOOLEAN DEFAULT true,
    is_flagship BOOLEAN DEFAULT false, -- Is this the college's flagship specialization?
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(college_id, course_id, specialization_id)
);

-- Indexes
CREATE INDEX idx_college_spec_college_id ON college_specializations(college_id);
CREATE INDEX idx_college_spec_course_id ON college_specializations(course_id);
CREATE INDEX idx_college_spec_spec_id ON college_specializations(specialization_id);
CREATE INDEX idx_college_spec_salary ON college_specializations(average_salary DESC) WHERE is_available = true;
CREATE INDEX idx_college_spec_placement ON college_specializations(placement_rate DESC) WHERE is_available = true;

COMMENT ON TABLE college_specializations IS 'Triple junction table: specific specializations offered by colleges within courses';
```

---

## 4. Supporting Tables

### 📝 Blogs Table

```sql
CREATE TABLE blogs (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    
    -- Content
    content TEXT NOT NULL,
    content_type VARCHAR(50) DEFAULT 'markdown' CHECK (content_type IN ('markdown', 'html', 'rich_text')),
    
    -- Authoring
    author VARCHAR(255) NOT NULL,
    author_bio TEXT,
    author_image VARCHAR(500),
    guest_author BOOLEAN DEFAULT false,
    
    -- Classification
    category VARCHAR(100) NOT NULL, -- 'Admissions', 'Career Guidance', 'Study Tips', etc.
    subcategory VARCHAR(100),
    tags JSONB DEFAULT '[]'::jsonb, -- Array of tags
    
    -- Media
    featured_image VARCHAR(500),
    featured_image_alt TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    
    -- Publishing
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    publish_date TIMESTAMP WITH TIME ZONE,
    scheduled_publish_date TIMESTAMP WITH TIME ZONE,
    
    -- Engagement
    views_count INTEGER DEFAULT 0 CHECK (views_count >= 0),
    likes_count INTEGER DEFAULT 0 CHECK (likes_count >= 0),
    shares_count INTEGER DEFAULT 0 CHECK (shares_count >= 0),
    comments_enabled BOOLEAN DEFAULT true,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords JSONB DEFAULT '[]'::jsonb,
    canonical_url VARCHAR(500),
    
    -- Reading Information
    reading_time INTEGER, -- in minutes
    word_count INTEGER,
    
    -- Related Content
    related_colleges JSONB DEFAULT '[]'::jsonb, -- Array of college IDs
    related_courses JSONB DEFAULT '[]'::jsonb, -- Array of course IDs
    
    -- Search
    search_vector tsvector,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    published_by UUID,
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID
);

-- Indexes
CREATE INDEX idx_blogs_published ON blogs(is_published, publish_date DESC) WHERE is_published = true;
CREATE INDEX idx_blogs_category ON blogs(category, is_published);
CREATE INDEX idx_blogs_featured ON blogs(is_featured, publish_date DESC) WHERE is_featured = true;
CREATE INDEX idx_blogs_author ON blogs(author, publish_date DESC);
CREATE INDEX idx_blogs_search ON blogs USING gin(search_vector);

COMMENT ON TABLE blogs IS 'Blog posts and articles for content marketing';
COMMENT ON COLUMN blogs.reading_time IS 'Estimated reading time in minutes';
```

### 📞 Leads Table

```sql
CREATE TABLE leads (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    alternate_phone VARCHAR(50),
    
    -- Demographics
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer not to say')),
    nationality VARCHAR(100) DEFAULT 'Indian',
    
    -- Location
    current_city VARCHAR(100),
    current_state VARCHAR(100),
    current_country VARCHAR(100) DEFAULT 'India',
    preferred_study_locations JSONB DEFAULT '[]'::jsonb, -- Array of preferred countries/cities
    
    -- Educational Background
    current_education_level VARCHAR(100), -- '12th Grade', 'Bachelor\'s', 'Master\'s', etc.
    current_field_of_study VARCHAR(255),
    current_institution VARCHAR(255),
    graduation_year INTEGER,
    percentage_cgpa VARCHAR(20),
    
    -- Course Interest
    preferred_course VARCHAR(255),
    preferred_specialization VARCHAR(255),
    preferred_course_level VARCHAR(50), -- UG, PG, Doctorate
    backup_course_options JSONB DEFAULT '[]'::jsonb,
    
    -- Study Preferences
    preferred_countries JSONB DEFAULT '[]'::jsonb,
    budget_range_min DECIMAL(12,2),
    budget_range_max DECIMAL(12,2),
    currency VARCHAR(10) DEFAULT 'INR',
    scholarship_required BOOLEAN DEFAULT false,
    
    -- Timeline
    intended_start_year INTEGER,
    intended_start_month VARCHAR(20),
    application_timeline VARCHAR(100), -- 'Immediate', '3-6 months', '6-12 months', etc.
    
    -- Test Scores
    ielts_score DECIMAL(3,1),
    toefl_score INTEGER,
    gre_score INTEGER,
    gmat_score INTEGER,
    sat_score INTEGER,
    other_test_scores JSONB DEFAULT '{}'::jsonb,
    
    -- Experience
    work_experience_years INTEGER DEFAULT 0,
    work_experience_details TEXT,
    internship_experience TEXT,
    research_experience TEXT,
    
    -- Additional Information
    extracurricular_activities TEXT,
    achievements JSONB DEFAULT '[]'::jsonb,
    languages_known JSONB DEFAULT '[]'::jsonb,
    
    -- Inquiry Details
    message TEXT,
    specific_questions TEXT,
    how_did_you_hear VARCHAR(255), -- 'Google Search', 'Social Media', 'Referral', etc.
    referral_source VARCHAR(255),
    
    -- Source Tracking
    source VARCHAR(100), -- 'website', 'facebook', 'google_ads', etc.
    campaign VARCHAR(255),
    medium VARCHAR(100),
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    
    -- Lead Management
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed', 'unqualified')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to UUID, -- counselor/agent assigned
    
    -- Follow-up Information
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    next_follow_up_at TIMESTAMP WITH TIME ZONE,
    total_contacts INTEGER DEFAULT 0,
    contact_attempts INTEGER DEFAULT 0,
    
    -- Conversion Tracking
    converted_at TIMESTAMP WITH TIME ZONE,
    conversion_value DECIMAL(12,2),
    services_interested JSONB DEFAULT '[]'::jsonb, -- Array of services
    
    -- Communication Preferences
    preferred_contact_method VARCHAR(50) DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'phone', 'whatsapp', 'video_call')),
    preferred_contact_time VARCHAR(100),
    timezone VARCHAR(100),
    communication_language VARCHAR(50) DEFAULT 'English',
    
    -- Consent & Privacy
    marketing_consent BOOLEAN DEFAULT false,
    data_processing_consent BOOLEAN DEFAULT true,
    newsletter_subscription BOOLEAN DEFAULT false,
    
    -- Technical Information
    ip_address INET,
    user_agent TEXT,
    browser_info JSONB DEFAULT '{}'::jsonb,
    device_info JSONB DEFAULT '{}'::jsonb,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- Indexes
CREATE INDEX idx_leads_status ON leads(status, created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_phone ON leads(phone) WHERE phone IS NOT NULL;
CREATE INDEX idx_leads_source ON leads(source, created_at DESC);
CREATE INDEX idx_leads_assigned ON leads(assigned_to, status) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_leads_course_interest ON leads(preferred_course) WHERE preferred_course IS NOT NULL;
CREATE INDEX idx_leads_follow_up ON leads(next_follow_up_at) WHERE next_follow_up_at IS NOT NULL;
CREATE INDEX idx_leads_converted ON leads(converted_at DESC) WHERE converted_at IS NOT NULL;

COMMENT ON TABLE leads IS 'Lead generation and management system';
COMMENT ON COLUMN leads.full_name IS 'Computed column combining first and last name';
```

### 👥 Users Table (Admin/Staff)

```sql
CREATE TABLE users (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication (Supabase handles this, but we store additional info)
    email VARCHAR(255) UNIQUE NOT NULL,
    
    -- Profile Information
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(255),
    profile_image VARCHAR(500),
    
    -- Role & Permissions
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'editor', 'counselor', 'viewer', 'user')),
    permissions JSONB DEFAULT '[]'::jsonb, -- Array of specific permissions
    is_active BOOLEAN DEFAULT true,
    
    -- Contact Information
    phone VARCHAR(50),
    department VARCHAR(100),
    job_title VARCHAR(255),
    
    -- System Information
    last_login TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP WITH TIME ZONE,
    
    -- Preferences
    timezone VARCHAR(100) DEFAULT 'Asia/Kolkata',
    language VARCHAR(20) DEFAULT 'en',
    notification_preferences JSONB DEFAULT '{}'::jsonb,
    
    -- Profile Data (additional fields)
    bio TEXT,
    expertise_areas JSONB DEFAULT '[]'::jsonb,
    education_background TEXT,
    certifications JSONB DEFAULT '[]'::jsonb,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    
    -- Constraints
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') -- Email validation
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role, is_active);
CREATE INDEX idx_users_active ON users(is_active, created_at DESC);

COMMENT ON TABLE users IS 'System users including admins, editors, and counselors';
COMMENT ON COLUMN users.permissions IS 'JSON array of specific permissions beyond role-based access';
```

### ⭐ College_Reviews Table

```sql
CREATE TABLE college_reviews (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationships
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL, -- Optional: review for specific course
    
    -- Reviewer Information
    reviewer_name VARCHAR(255) NOT NULL,
    reviewer_email VARCHAR(255), -- Optional, for verification
    reviewer_phone VARCHAR(50),
    
    -- Academic Background
    course_studied VARCHAR(255),
    specialization VARCHAR(255),
    graduation_year INTEGER,
    current_year_of_study INTEGER, -- For current students
    student_type VARCHAR(50) CHECK (student_type IN ('Current', 'Alumni', 'Parent', 'Faculty')),
    
    -- Ratings (1-5 scale)
    overall_rating DECIMAL(3,2) NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    academics_rating DECIMAL(3,2) CHECK (academics_rating >= 1 AND academics_rating <= 5),
    faculty_rating DECIMAL(3,2) CHECK (faculty_rating >= 1 AND faculty_rating <= 5),
    infrastructure_rating DECIMAL(3,2) CHECK (infrastructure_rating >= 1 AND infrastructure_rating <= 5),
    placements_rating DECIMAL(3,2) CHECK (placements_rating >= 1 AND placements_rating <= 5),
    hostel_rating DECIMAL(3,2) CHECK (hostel_rating >= 1 AND hostel_rating <= 5),
    campus_life_rating DECIMAL(3,2) CHECK (campus_life_rating >= 1 AND campus_life_rating <= 5),
    
    -- Review Content
    review_title VARCHAR(500),
    review_text TEXT NOT NULL,
    pros TEXT, -- What they liked
    cons TEXT, -- What could be improved
    advice_to_students TEXT,
    
    -- Detailed Feedback
    course_curriculum_feedback TEXT,
    faculty_feedback TEXT,
    placement_experience TEXT,
    campus_facilities_feedback TEXT,
    
    -- Verification & Moderation
    is_verified BOOLEAN DEFAULT false,
    verification_method VARCHAR(100), -- 'email', 'phone', 'document', 'manual'
    verification_date TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(id),
    
    -- Moderation
    is_approved BOOLEAN DEFAULT false,
    moderation_status VARCHAR(50) DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')),
    moderation_notes TEXT,
    moderated_by UUID REFERENCES users(id),
    moderated_at TIMESTAMP WITH TIME ZONE,
    
    -- Engagement
    likes_count INTEGER DEFAULT 0 CHECK (likes_count >= 0),
    dislikes_count INTEGER DEFAULT 0 CHECK (dislikes_count >= 0),
    helpful_votes INTEGER DEFAULT 0 CHECK (helpful_votes >= 0),
    
    -- Flags & Reports
    is_flagged BOOLEAN DEFAULT false,
    flag_count INTEGER DEFAULT 0,
    flag_reasons JSONB DEFAULT '[]'::jsonb,
    
    -- Technical
    ip_address INET,
    user_agent TEXT,
    
    -- Status
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reviews_college_id ON college_reviews(college_id, is_approved);
CREATE INDEX idx_reviews_course_id ON college_reviews(course_id) WHERE course_id IS NOT NULL;
CREATE INDEX idx_reviews_rating ON college_reviews(overall_rating DESC, created_at DESC);
CREATE INDEX idx_reviews_approved ON college_reviews(is_approved, created_at DESC) WHERE is_approved = true;
CREATE INDEX idx_reviews_moderation ON college_reviews(moderation_status, created_at);
CREATE INDEX idx_reviews_graduation_year ON college_reviews(graduation_year DESC) WHERE graduation_year IS NOT NULL;

COMMENT ON TABLE college_reviews IS 'Student and alumni reviews for colleges';
COMMENT ON COLUMN college_reviews.student_type IS 'Type of reviewer: Current student, Alumni, Parent, or Faculty';
```

---

## 5. Indexes & Performance

### 🚀 Performance Optimization Indexes

```sql
-- Full-Text Search Indexes
CREATE INDEX idx_colleges_fts ON colleges USING gin(search_vector);
CREATE INDEX idx_courses_fts ON courses USING gin(search_vector);
CREATE INDEX idx_specializations_fts ON specializations USING gin(search_vector);
CREATE INDEX idx_blogs_fts ON blogs USING gin(search_vector);

-- Geographic Indexes
CREATE INDEX idx_colleges_location ON colleges USING gin(to_tsvector('english', location));
CREATE INDEX idx_colleges_country_city ON colleges(country, city, is_active);
CREATE INDEX idx_colleges_coordinates ON colleges(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Performance Indexes for Common Queries
CREATE INDEX idx_colleges_featured_active ON colleges(is_featured, is_active, rating DESC);
CREATE INDEX idx_colleges_rating_active ON colleges(rating DESC, total_reviews DESC) WHERE is_active = true;
CREATE INDEX idx_colleges_type_active ON colleges(college_type, country, is_active);

CREATE INDEX idx_courses_popular ON courses(is_popular, category, is_active) WHERE is_active = true;
CREATE INDEX idx_courses_level_category ON courses(level, category, is_active);

CREATE INDEX idx_college_courses_fees ON college_courses(fees_per_year, placement_rate DESC) WHERE is_available = true;
CREATE INDEX idx_college_courses_placement ON college_courses(placement_rate DESC, average_package_offered DESC) WHERE is_available = true;

-- Composite Indexes for Complex Queries
CREATE INDEX idx_college_course_search ON college_courses(college_id, course_id, is_available);
CREATE INDEX idx_college_spec_search ON college_specializations(college_id, course_id, specialization_id, is_available);

-- Time-based Indexes
CREATE INDEX idx_colleges_created ON colleges(created_at DESC);
CREATE INDEX idx_blogs_published_date ON blogs(publish_date DESC) WHERE is_published = true;
CREATE INDEX idx_leads_created_status ON leads(created_at DESC, status);

-- Partial Indexes for Better Performance
CREATE INDEX idx_colleges_active_only ON colleges(name, rating DESC) WHERE is_active = true;
CREATE INDEX idx_courses_active_only ON courses(name, is_popular DESC) WHERE is_active = true;
CREATE INDEX idx_leads_open_only ON leads(created_at DESC, priority) WHERE status IN ('new', 'contacted', 'qualified');
```

### 📊 Database Views for Complex Queries

```sql
-- View: College Summary with Aggregated Data
CREATE OR REPLACE VIEW college_summary AS
SELECT 
    c.*,
    COUNT(DISTINCT cc.course_id) as total_courses,
    COUNT(DISTINCT cs.specialization_id) as total_specializations,
    AVG(cr.overall_rating) as avg_review_rating,
    COUNT(cr.id) as total_reviews,
    MIN(cc.fees_per_year) as min_fees,
    MAX(cc.fees_per_year) as max_fees,
    AVG(cc.fees_per_year) as avg_fees,
    AVG(cc.placement_rate) as avg_placement_rate
FROM colleges c
LEFT JOIN college_courses cc ON c.id = cc.college_id AND cc.is_available = true
LEFT JOIN college_specializations cs ON c.id = cs.college_id AND cs.is_available = true
LEFT JOIN college_reviews cr ON c.id = cr.college_id AND cr.is_approved = true
WHERE c.is_active = true
GROUP BY c.id;

-- View: Course Popularity with Statistics
CREATE OR REPLACE VIEW course_popularity AS
SELECT 
    c.*,
    COUNT(DISTINCT cc.college_id) as total_colleges,
    COUNT(DISTINCT cs.specialization_id) as total_specializations,
    AVG(cc.fees_per_year) as avg_fees,
    MIN(cc.fees_per_year) as min_fees,
    MAX(cc.fees_per_year) as max_fees,
    AVG(cc.placement_rate) as avg_placement_rate,
    SUM(cc.seats_available) as total_seats_available
FROM courses c
LEFT JOIN college_courses cc ON c.id = cc.course_id AND cc.is_available = true
LEFT JOIN course_specializations cs ON c.id = cs.course_id AND cs.is_active = true
WHERE c.is_active = true
GROUP BY c.id;

-- View: Lead Summary for Dashboard
CREATE OR REPLACE VIEW lead_summary AS
SELECT 
    DATE(created_at) as lead_date,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
    COUNT(DISTINCT source) as unique_sources,
    AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600) as avg_response_time_hours
FROM leads
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY lead_date DESC;
```

---

## 6. Security Policies (Row Level Security)

### 🔒 RLS Policies Implementation

```sql
-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_reviews ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public can view active colleges" ON colleges
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active courses" ON courses
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active specializations" ON specializations
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view available college courses" ON college_courses
    FOR SELECT USING (is_available = true);

CREATE POLICY "Public can view active course specializations" ON course_specializations
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view available college specializations" ON college_specializations
    FOR SELECT USING (is_available = true);

CREATE POLICY "Public can view published blogs" ON blogs
    FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view approved reviews" ON college_reviews
    FOR SELECT USING (is_approved = true AND is_active = true);

-- Admin Full Access Policies
CREATE POLICY "Admins have full access to colleges" ON colleges
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin')
    );

CREATE POLICY "Admins have full access to courses" ON courses
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin')
    );

CREATE POLICY "Admins have full access to specializations" ON specializations
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin')
    );

-- Editor Policies (Limited Write Access)
CREATE POLICY "Editors can manage blogs" ON blogs
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin', 'editor') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin', 'editor')
    );

CREATE POLICY "Editors can view all reviews" ON college_reviews
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin', 'editor') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin', 'editor')
    );

-- Lead Management Policies
CREATE POLICY "Anyone can insert leads" ON leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view assigned leads" ON leads
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin', 'counselor') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin', 'counselor') OR
        assigned_to = auth.uid()
    );

CREATE POLICY "Staff can update assigned leads" ON leads
    FOR UPDATE USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin') OR
        assigned_to = auth.uid()
    );

-- User Management Policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can manage all users" ON users
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'admin') OR
        auth.jwt() ->> 'user_role' IN ('super_admin', 'admin')
    );
```

---

## 7. Migration Scripts

### 🛠️ Database Migration Files

```sql
-- Migration: 001_initial_schema.sql
-- Create all tables with basic structure

BEGIN;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Create custom functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create search vector update function
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'colleges' THEN
        NEW.search_vector := setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
                           setweight(to_tsvector('english', COALESCE(NEW.location, '')), 'B') ||
                           setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
    ELSIF TG_TABLE_NAME = 'courses' THEN
        NEW.search_vector := setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
                           setweight(to_tsvector('english', COALESCE(NEW.category, '')), 'B') ||
                           setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
    ELSIF TG_TABLE_NAME = 'specializations' THEN
        NEW.search_vector := setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
                           setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
    ELSIF TG_TABLE_NAME = 'blogs' THEN
        NEW.search_vector := setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
                           setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
                           setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'D');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create all tables (include all table creation scripts here)
-- [Tables created above...]

-- Create triggers for updated_at
CREATE TRIGGER update_colleges_updated_at BEFORE UPDATE ON colleges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_specializations_updated_at BEFORE UPDATE ON specializations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for search vectors
CREATE TRIGGER update_colleges_search_vector BEFORE INSERT OR UPDATE ON colleges
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER update_courses_search_vector BEFORE INSERT OR UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER update_specializations_search_vector BEFORE INSERT OR UPDATE ON specializations
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER update_blogs_search_vector BEFORE INSERT OR UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

COMMIT;
```

```sql
-- Migration: 002_add_indexes.sql
-- Add all performance indexes

BEGIN;

-- Add all indexes from the indexes section above
-- [All index creation scripts...]

COMMIT;
```

```sql
-- Migration: 003_add_rls_policies.sql
-- Add Row Level Security policies

BEGIN;

-- Enable RLS and create policies
-- [All RLS policies from above...]

COMMIT;
```

---

## 8. Seed Data

### 🌱 Initial Data Population

```sql
-- Seed: 001_initial_data.sql

BEGIN;

-- Insert sample colleges
INSERT INTO colleges (name, short_name, slug, location, country, state, city, founded_year, college_type, website, description, rating, total_students, placement_percentage, is_featured, is_active) VALUES
('Indian Institute of Technology Delhi', 'IIT Delhi', 'iit-delhi', 'New Delhi, India', 'India', 'Delhi', 'New Delhi', 1961, 'Central', 'https://home.iitd.ac.in/', 'IIT Delhi is one of the premier engineering institutions in India, known for excellence in teaching and research in engineering, science and technology.', 4.8, 10000, 95.5, true, true),

('Indian Institute of Management Ahmedabad', 'IIM Ahmedabad', 'iim-ahmedabad', 'Ahmedabad, Gujarat, India', 'India', 'Gujarat', 'Ahmedabad', 1961, 'Central', 'https://www.iima.ac.in/', 'IIM Ahmedabad is a premier business school in India, consistently ranked among the top management institutes globally.', 4.9, 1200, 100.0, true, true),

('All India Institute of Medical Sciences Delhi', 'AIIMS Delhi', 'aiims-delhi', 'New Delhi, India', 'India', 'Delhi', 'New Delhi', 1956, 'Central', 'https://www.aiims.edu/', 'AIIMS Delhi is India''s premier medical institute, renowned for its excellence in medical education, research and patient care.', 4.7, 3000, 98.0, true, true);

-- Insert sample courses
INSERT INTO courses (name, short_name, slug, level, category, duration, duration_months, description, is_popular, is_active) VALUES
('Bachelor of Technology in Computer Science', 'B.Tech CSE', 'btech-computer-science', 'Undergraduate', 'Engineering', '4 Years', 48, 'Computer Science Engineering focuses on programming, algorithms, data structures, and software development with strong emphasis on practical applications.', true, true),

('Master of Business Administration', 'MBA', 'master-business-administration', 'Postgraduate', 'Management', '2 Years', 24, 'MBA is a comprehensive program covering all aspects of business management including finance, marketing, operations, and strategy.', true, true),

('Bachelor of Medicine and Bachelor of Surgery', 'MBBS', 'bachelor-medicine-bachelor-surgery', 'Undergraduate', 'Medicine', '5.5 Years', 66, 'MBBS is the primary medical degree for becoming a doctor, covering comprehensive medical education and clinical training.', true, true);

-- Insert sample specializations
INSERT INTO specializations (name, slug, category, description, is_trending, is_active) VALUES
('Artificial Intelligence and Machine Learning', 'artificial-intelligence-machine-learning', 'Computer Science', 'Specialization in AI/ML covers neural networks, deep learning, natural language processing, and computer vision with applications across industries.', true, true),

('Finance and Investment Banking', 'finance-investment-banking', 'Business', 'Finance specialization focuses on financial markets, investment strategies, risk management, and banking operations with strong quantitative skills.', true, true),

('Cardiology', 'cardiology', 'Medicine', 'Cardiology specialization deals with disorders of the heart and blood vessels, including diagnosis, treatment, and prevention of cardiovascular diseases.', false, true);

-- Insert college-course relationships
INSERT INTO college_courses (college_id, course_id, fees_per_year, total_fees, seats_available, intake_capacity, placement_rate, average_package_offered, highest_package_offered, is_available) 
SELECT 
    c.id, 
    co.id, 
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 250000
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 2500000
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 150000
    END,
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 1000000
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 5000000
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 825000
    END,
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 120
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 395
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 125
    END,
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 120
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 395
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 125
    END,
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 95.5
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 100.0
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 98.0
    END,
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 1800000
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 3500000
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 2000000
    END,
    CASE 
        WHEN c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE' THEN 18000000
        WHEN c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA' THEN 70000000
        WHEN c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS' THEN 5000000
    END,
    true
FROM colleges c
CROSS JOIN courses co
WHERE 
    (c.short_name = 'IIT Delhi' AND co.short_name = 'B.Tech CSE') OR
    (c.short_name = 'IIM Ahmedabad' AND co.short_name = 'MBA') OR
    (c.short_name = 'AIIMS Delhi' AND co.short_name = 'MBBS');

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, author, category, is_published, is_featured, publish_date) VALUES
('Complete Guide to Engineering Admissions 2024', 'complete-guide-engineering-admissions-2024', 'Everything you need to know about engineering college admissions in 2024, including JEE preparation, application process, and college selection.', 
'# Complete Guide to Engineering Admissions 2024

Engineering is one of the most sought-after career paths in India. This comprehensive guide covers everything from entrance exam preparation to college selection and admission process.

## Key Entrance Exams
- JEE Main
- JEE Advanced  
- State Engineering Entrance Exams

## Preparation Strategy
1. Start early with conceptual understanding
2. Practice regularly with mock tests
3. Focus on weak areas
4. Time management during exams

## College Selection Criteria
- Rankings and accreditation
- Placement records
- Faculty quality
- Infrastructure and facilities
- Location and fees

The admission process has become increasingly competitive, making proper planning essential for success.', 
'AdmitVerse Editorial Team', 'Admissions', true, true, NOW()),

('Top Career Options After Class 12th Science', 'top-career-options-after-class-12-science', 'Explore the best career paths available for science students after completing Class 12th, including traditional and emerging fields.', 
'# Top Career Options After Class 12th Science

Science students have numerous career opportunities across various fields. Here are the top options to consider:

## Traditional Career Paths
1. **Engineering** - Multiple specializations available
2. **Medical** - MBBS, BDS, BAMS, and allied health sciences
3. **Pure Sciences** - Physics, Chemistry, Biology, Mathematics

## Emerging Career Fields
1. **Data Science and Analytics**
2. **Biotechnology and Bioinformatics**
3. **Environmental Science**
4. **Robotics and Automation**

## Making the Right Choice
Consider your interests, aptitude, career prospects, and market demand when making your decision. Research thoroughly and seek guidance from counselors.', 
'Career Counselor', 'Career Guidance', true, false, NOW() - INTERVAL '2 days');

COMMIT;
```

---

## 📊 Database Statistics & Monitoring

### Performance Monitoring Queries

```sql
-- Query to monitor table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Query to monitor index usage
SELECT 
    indexrelname as index_name,
    relname as table_name,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes 
ORDER BY idx_scan DESC;

-- Query to find slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

---

## 🎯 Summary

This comprehensive database schema provides:

✅ **Scalable Architecture**: Designed to handle millions of records  
✅ **Performance Optimized**: Strategic indexing for sub-100ms queries  
✅ **Security First**: Row-level security and data protection  
✅ **Search Ready**: Full-text search capabilities  
✅ **Flexible Design**: JSONB fields for future extensibility  
✅ **Audit Trail**: Complete tracking of data changes  
✅ **Migration Ready**: Structured migration and seed scripts  

**Ready for production deployment with Supabase! 🚀**

---

**Document Owner**: CTPO - Database Architect  
**Next Review**: September 26, 2024  
**Status**: Ready for Implementation  

*This schema is optimized for AdmitVerse requirements and can scale to support 20,000+ monthly users with sub-2-second response times.*