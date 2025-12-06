# Tech Spec — Career Canvas

## 1. Overview
Career Canvas is a lightweight career-site builder that enables recruiters to create customizable, branded careers pages without writing code. The editor uses a modular section-based approach, allowing companies to assemble pages by combining predefined layout components. The backend uses Supabase for authentication, Postgres storage, and asset hosting, while the frontend is built with Next.js 14 using the App Router. The platform is deployed on Vercel for global scalability.

---

## 2. Assumptions

### Functional Assumptions
- Recruiters must authenticate before creating or editing companies.
- Candidates should be able to view public company pages without authentication.
- Each company consists of multiple modular sections that define the career page.
- Only the recruiter who owns a company can modify its content.

### Technical Assumptions
- Supabase handles authentication, Postgres DB, and asset storage.
- RLS rules secure all tables.
- Next.js Server Components handle backend data fetching using the Supabase server client.
- Media uploads (images/videos) are stored in Supabase Storage.
- Vercel holds all runtime environment variables securely.

### Non-Functional Assumptions
- The UI should remain responsive with 20+ sections.
- Mobile visitors must have a smooth viewing experience.
- The platform should support moderate traffic without performance issues.

---

## 3. Architecture Overview

```text
Client (Recruiter / Candidate)
       │
       ▼
 Next.js 14 App Router
 (Server + Client Components)
       │
       ▼
 Supabase Server Client
 ┌─────────────────────────┐
 │ Authentication (JWT)    │
 │ Postgres Database       │
 │ Storage (Assets)        │
 └─────────────────────────┘
       │
       ▼
     Vercel Hosting
```

### Client Responsibilities
- Render the UI for both recruiters and candidates  
- Handle editing interactions  
- Upload assets to Supabase Storage  
- Preview and publish pages  

### Server Responsibilities
- Securely fetch data through server components  
- Enforce ownership rules  
- Validate authentication  
- Persist sections, companies, templates  

---

## 4. Database Schema

### users Table
| Column     | Type        | Description |
|------------|-------------|-------------|
| id         | uuid (PK)   | Supabase Auth ID |
| email      | text        | Recruiter email |
| role       | text        | recruiter \| admin |
| created_at | timestamptz | Timestamp |

RLS: Users may only access their own rows.

---

### companies Table
| Column      | Type        | Description |
|-------------|-------------|-------------|
| id          | uuid (PK)   | Company identifier |
| owner_id    | uuid (FK)   | Linked to users.id |
| name        | text        | Company name |
| slug        | text        | URL-friendly identifier |
| description | text        | Company summary |
| published   | boolean     | Visibility flag |
| created_at  | timestamptz | Creation timestamp |

RLS:
- Only owners may update companies.
- Public can read only when `published = true`.

---

### sections Table
| Column      | Type        | Description |
|-------------|-------------|-------------|
| id          | uuid (PK)   | Unique section ID |
| company_id  | uuid (FK)   | Parent company |
| type        | text        | Section type |
| content     | jsonb       | Structured content |
| order_index | integer     | Order for rendering |

RLS:
- Only owners may modify.
- Public can read if company is published.

---

## 5. API Endpoints

### GET `/api/company`
Returns all companies owned by the authenticated recruiter.

### POST `/api/company`
Creates a new company record.

### GET `/api/company/[id]`
Fetches company and its sections.

### POST `/api/company/[id]/sections`
Creates or updates a section.

### DELETE `/api/company/[id]/sections`
Deletes one or more sections.

All routes:
- Validate authentication
- Use Supabase server client
- Respect RLS policies

---

## 6. User Stories & Flows

### Recruiter Flow
1. Log in with Supabase Auth  
2. Create company profile  
3. Add/edit/remove modular sections  
4. Upload images/videos  
5. Preview and publish the page  
6. Share public careers page link  

### Candidate Flow
1. Visit `/company/[id]`  
2. View introduction, about, goals, and contact sections  
3. Follow external job-application links  

---

## 7. Deployment

### Environment Variables (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Build Command
```
npm run build
```

### Hosting
- Frontend: Vercel  
- Backend: Supabase (Auth, DB, Storage)

---

## 8. Test Plan

### Unit Tests
- Section components render correctly  
- Template logic works  
- Utility functions behave as expected  

### Integration Tests
- CRUD operations for companies and sections  
- Authentication flows  
- Publish/unpublish logic  

### Manual Tests
- Recruiter login/logout  
- Create → edit → delete → publish flow  
- Public page loads on mobile and desktop  
- Unauthorized access attempts are blocked  

---

## 9. Limitations
- No drag-and-drop section ordering  
- Limited number of templates  
- No autosave functionality  
- No analytics dashboard  
- No collaborative editing  

---

## 10. Future Enhancements
- Add drag-and-drop reorder UX  
- Introduce multiple templates/themes  
- Implement live preview mode  
- Add analytics for recruiter dashboards  
- Add team-based multi-user collaboration  
- Version history and autosave  
```

