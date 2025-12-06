# Career Canvas

Career Canvas is a simple and fast career-site builder that allows recruiters to design and publish branded company pages using modular content sections. It includes a recruiter dashboard, an editor for adding and arranging sections, Supabase-based authentication, and a public-facing page for candidates.

---

## 🚀 Live Demo
https://career-canvas-mu.vercel.app/

---

## 🧠 What This Project Does
- Allows recruiters to authenticate and manage their company profiles  
- Provides an editing interface for adding Intro, About, Goals, Contact, and other content blocks  
- Supports image and video uploads via Supabase Storage  
- Publishes a fully responsive public career page for candidates  
- Uses RLS policies to ensure only owners can modify company data  
- Delivers smooth editing and viewing experiences on desktop and mobile  

---

## 🧰 Tech Stack
- **Next.js 14** (App Router architecture)  
- **TypeScript**  
- **Supabase** for Authentication, Postgres DB, and Storage  
- **Tailwind CSS + shadcn/ui**  
- **Vercel** for hosting and deployment  

---

## 📦 Project Structure
```
app/             → Next.js routes & layout
components/      → Reusable UI elements
sections/        → Modular section components (Intro, About, etc.)
templates/       → Page templates
lib/             → Supabase client logic & helpers
sample_data/     → Example CSV data
scripts/         → Sample-data generator
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository
```
git clone <your-repo-url>
cd career-canvas
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

These values come from your Supabase project settings.

### 4. (Optional) Generate Sample Data
```
python scripts/generate_sample_data.py
```

This populates `sample_data/` with a test dataset you may import into Supabase.

### 5. Run Locally
```
npm run dev
```

Visit the application at:  
http://localhost:3000

---

## 🧭 How to Use the Application

### Recruiters
1. Log in with Supabase Auth.  
2. Create a company profile with name, description, and branding.  
3. Add different content sections using the editor.  
4. Upload images or videos to enhance the page.  
5. Save your changes and preview the layout.  
6. Publish the page to make it publicly visible.  

### Candidates
1. Visit `/company/[id]`.  
2. Scroll through the company’s sections.  
3. Read about culture, goals, and open roles if provided.  
4. Follow external links to apply.  

---

## 🔧 Deployment Instructions (Vercel)

1. Push your repository to GitHub.  
2. Import the GitHub repo into Vercel.  
3. Add all required environment variables under:  
   **Vercel → Project Settings → Environment Variables**  
4. Deploy — Vercel automatically builds and hosts the application.  
5. Every commit to `main` triggers an automatic redeploy.

---

## 🧪 Tests

The project supports:
- **Unit tests** for components and helpers  
- **Integration tests** for API routes  
- **Manual functional tests** for publish flow and UI behavior  

Run tests with:
```
npm test
```

---

## 📈 Improvement Plan

### Planned upgrades:
- Add drag-and-drop ordering for sections  
- Expand template library with customizable color themes  
- Add live preview mode in the editor  
- Implement autosave and version history  
- Introduce analytics for recruiter dashboards  
- Enable multi-recruiter collaboration per company  

---

## 📄 License
MIT License

