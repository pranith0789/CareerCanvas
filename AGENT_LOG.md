# AGENT_LOG.md

This document summarizes how AI tools supported the development process.  
Each entry reflects a specific task, the prompt style used, and what was learned.

---

## 2025-12-06 — Project Scaffolding Help
**Tool Used:** ChatGPT  
**Purpose:** Generate initial repo structure, sample-data script, and CI pipeline.

**Prompts Used:**  
- “Create a repo scaffold for a Next.js + Supabase project.”  
- “Write a Python script that generates sample CSV data.”  

**Output Used:**  
Portions of the sample-data generator and CI YAML were adopted with manual edits.

**Learnings:**  
AI excels at quickly assembling boilerplate, but final structure should always be tailored manually based on architecture decisions.

---

## 2025-12-06 — Debugging Vercel & Supabase Integration
**Tool Used:** ChatGPT  
**Purpose:** Investigate issues with environment variables and `.ts` files not compiling inside the templates folder.

**Prompts Used:**  
- “Explain why TypeScript inside one folder is not compiling on Vercel.”  
- “Review my deployment and identify what is failing.”  

**Output Used:**  
Helpful insights regarding file naming (`.tsx` requirement), missing RLS policies, and Supabase env variable handling.

**Learnings:**  
Deployment bugs often come from inconsistent file extensions or missing RLS permissions, not app logic.

---

## 2025-12-06 — Demo Video Script
**Tool Used:** ChatGPT  
**Purpose:** Produce a clear outline for a 4–5 minute walkthrough video.

**Prompts Used:**  
- “Create a concise video script showing how to use my app.”

**Output Used:**  
High-level sequence for recording the video; narration was customized.

**Learnings:**  
Having a script avoids rambling and produces a more polished demo in fewer takes.

---

## General Reflections
AI tools accelerated non-critical tasks such as drafting documentation outlines, suggesting fixes, and generating sample data. All production logic, UI decisions, and architecture choices were made manually to maintain control over the final product.
