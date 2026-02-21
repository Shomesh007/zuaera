---
description: Free SEO + AEO research workflow for ZUAERA perfumes – competitor analysis, keyword research, LLM optimization
---

# ZUAERA Free SEO + AEO Research Workflow

## Tools Used (ALL FREE)
- search_web — SERP research and competitor discovery
- read_url_content — Crawl competitor websites
- view_file — Audit current codebase
- write_to_file — Generate the SEO report

---

## Phase 1 — Brand Audit (Current State)

1. Read `index.html` and check existing meta tags, JSON-LD schema, structured data, robots.txt, sitemap.xml
2. Note all SEO elements present and identify placeholders or errors in schema

## Phase 2 — Competitor Discovery

// turbo
3. Run parallel searches:
   - `search_web("best perfumes in Chennai [CURRENT_YEAR]")`
   - `search_web("perfume brands Chennai luxury fragrance shop online")`
   - `search_web("Indian perfume brand Chennai competitor [CURRENT_YEAR]")`
4. Extract: competitor names, domains, key selling propositions

## Phase 3 — Competitor Deep Analysis

// turbo
5. Run parallel searches for each competitor found:
   - `search_web("[competitor] SEO strategy keywords ranking")`
   - `read_url_content([competitor URL])` — Read their homepage
6. Extract: title tags, meta descriptions, page structure, content categories, unique tactics

## Phase 4 — Keyword Research

// turbo
7. Run searches for keyword data:
   - High-intent: "buy perfume online Chennai"
   - Informational: "best perfume for men India [CURRENT_YEAR]"
   - Long-tail: "perfume under 1000 India"
   - Local: "perfume shop Chennai" who ranks
   - Conversational (AEO): "what is a good perfume in Chennai" style queries
8. Classify into Tier 1 (primary), Tier 2 (long-tail), Tier 3 (AEO), Tier 4 (branded)

## Phase 5 — AEO / LLM Research

// turbo
9. Search for:
   - `search_web("LLM SEO AEO answer engine optimization ChatGPT Perplexity [CURRENT_YEAR]")`
   - `search_web("llms.txt file AI crawler standard [CURRENT_YEAR]")`
10. Plan llms.txt, robots.txt LLM crawler entries, FAQ schema, entity building strategy

## Phase 6 — Report Generation

11. Write `SEO_STRATEGY_REPORT.md` using `write_to_file` with:
    - Brand audit table
    - Competitor comparison table
    - Keyword tiers with intent labels
    - SERP ranking analysis
    - On-page fixes (Week 1 critical)
    - AEO strategy (llms.txt, robots.txt, structured data)
    - Blog content plan
    - Local SEO checklist
    - Off-page / link building plan
    - Priority action timeline (Week 1, Month 1, Month 2–3, Month 3–6)
    - Expected outcome metrics table

## Phase 7 — Implement Quick Wins

12. Create `/public/llms.txt` with brand + product information in markdown format
13. Update `/public/robots.txt` to allow all LLM crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.)
14. Update `index.html`:
    - Fix JSON-LD placeholder data
    - Add FAQPage schema
    - Add aggregateRating to products
    - Update title tag and meta description
    - Add image alt texts to all images
