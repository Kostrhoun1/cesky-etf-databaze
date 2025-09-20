# 🚀 GitHub Projects Setup Guide
*Kompletní návod pro nastavení content strategy tracking*

---

## 📊 **PROJEKT OVERVIEW**

**Název:** `ETF Content Strategy 2025`  
**Repository:** `Kostrhoun1/cesky-etf-databaze`  
**Časový rámec:** 6 měsíců (říjen 2025 - březen 2026)  
**Cíl:** 100+ článků, +300% traffic

---

## 🏗️ **MANUÁLNÍ SETUP KROKY**

### **1. Vytvořit GitHub Project (Web Interface)**
1. Jděte na: https://github.com/Kostrhoun1/cesky-etf-databaze
2. Klikněte na **"Projects"** tab
3. **"New project"** → **"Team planning"** template
4. **Název:** `ETF Content Strategy 2025`
5. **Description:** `Implementace 100+ článků content strategie pro ETF průvodce.cz - systematické sledování progress od října 2025 do března 2026`

### **2. Vytvořit Custom Fields**
- **Priority:** Single select (🔥 High, ⚡ Medium, 💡 Low)
- **Content Type:** Single select (📝 Article, 🏗️ Technical, 📊 Analysis, 🎯 SEO)
- **Word Count:** Number
- **Search Volume:** Number  
- **Estimate Hours:** Number
- **Phase:** Single select (Phase 1, Phase 2, Phase 3, Phase 4)

### **3. Vytvořit Views**
- **📋 Kanban Board:** Status view (Backlog → In Progress → Review → Done)
- **📅 Timeline:** Gantt chart view pro milestones
- **📊 Priority Matrix:** Priority vs Effort matrix
- **🎯 Content Pipeline:** Content type breakdown

---

## 📝 **ISSUE TEMPLATES**

### **Template 1: Article Creation**
```markdown
---
name: 📝 Article Creation
about: Vytvoření nového článku
title: "[ARTICLE] Název článku"
labels: content, article
assignees: ''
---

## 📋 Article Details
**URL:** `/analyzy-a-clanky/kategorie/url-slug`
**Priority:** 🔥 High / ⚡ Medium / 💡 Low
**Search Volume:** XXX/month
**Word Count Target:** XXXX words
**Estimated Hours:** X hours

## 🎯 SEO Requirements
- [ ] Keyword research completed
- [ ] Title optimization (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] H1-H6 structure planned
- [ ] Internal linking strategy
- [ ] Schema markup planned

## 📝 Content Checklist
- [ ] Outline created
- [ ] Draft written
- [ ] Fact-checking completed
- [ ] SEO optimization
- [ ] Images/charts added
- [ ] Internal links added
- [ ] Review completed
- [ ] Published

## 🔗 Related Issues
Closes #XXX
Relates to #XXX

## 📊 Success Metrics
- Target ranking: Top 10 for "keyword"
- Expected monthly traffic: XXX visits
- Conversion goal: X newsletter signups
```

### **Template 2: Technical Implementation**
```markdown
---
name: 🔧 Technical Implementation
about: Technická implementace features
title: "[TECH] Feature name"
labels: technical, development
assignees: ''
---

## 🎯 Technical Requirements
**Epic:** Phase X - Epic Name
**Dependencies:** Issues #XXX, #XXX
**Estimate:** X hours

## ✅ Definition of Done
- [ ] Code implementation
- [ ] Testing completed
- [ ] Documentation updated
- [ ] Performance verified
- [ ] SEO compliance checked

## 🧪 Testing Checklist
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verified

## 📋 Implementation Notes
[Detailed technical notes]
```

---

## 🏷️ **LABELS SYSTEM**

### **Priority Labels**
- `priority/high` (🔥 červená)
- `priority/medium` (⚡ oranžová) 
- `priority/low` (💡 modrá)

### **Content Type Labels**
- `content/article` (📝 zelená)
- `content/technical` (🔧 fialová)
- `content/seo` (🎯 žlutá)
- `content/analysis` (📊 tyrkysová)

### **Phase Labels**
- `phase/1-preparation` (Phase 1)
- `phase/2-content` (Phase 2)
- `phase/3-optimization` (Phase 3)
- `phase/4-scaling` (Phase 4)

### **Status Labels**
- `status/blocked` (❌ červená)
- `status/in-review` (👀 oranžová)
- `status/ready` (✅ zelená)

---

## 📊 **MILESTONES**

### **Milestone 1: Technical Foundation**
**Deadline:** 6. říjen 2025
- URL restructuring completed
- Category pages launched
- Analytics setup finished
- First 2 articles published

### **Milestone 2: Content Foundation**
**Deadline:** 3. listopad 2025
- 10 foundation articles published
- SEO optimization implemented
- Weekly content schedule established
- Performance tracking active

### **Milestone 3: Content Scaling**
**Deadline:** 1. prosinec 2025
- 25 articles total published
- Automation tools implemented
- Newsletter integration launched
- Social media strategy active

### **Milestone 4: Full Strategy**
**Deadline:** 31. březen 2026
- 100+ articles published
- Full automation pipeline
- Industry recognition achieved
- Traffic goals exceeded

---

## 🎯 **PROJECT AUTOMATION**

### **GitHub Actions Workflows**

1. **Content Publishing Workflow**
```yaml
name: Content Publishing
on:
  push:
    paths: ['src/content/articles/**']
triggers:
  - Auto-close related issues
  - Update project status
  - Send notifications
```

2. **SEO Monitoring Workflow**
```yaml
name: SEO Monitoring
on:
  schedule:
    - cron: '0 9 * * 1' # Weekly Monday 9 AM
triggers:
  - Check rankings
  - Update performance metrics
  - Create performance reports
```

---

## 📈 **DASHBOARD SETUP**

### **Key Metrics Tracking**
- **Articles Published:** Counter per week/month
- **Traffic Growth:** Weekly/monthly percentage
- **Search Rankings:** Top 10 keywords tracked
- **Newsletter Signups:** Conversion metrics
- **Featured Snippets:** Count and growth

### **Automated Reports**
- **Weekly Progress:** Articles published, traffic growth
- **Monthly Review:** Comprehensive performance analysis
- **Quarterly Goals:** Milestone progress tracking

---

## 🚀 **IMMEDIATE NEXT STEPS**

1. ✅ **Manual Project Creation** (Web Interface)
2. 📝 **Create First 10 Issues** (Foundation articles)
3. 🏷️ **Setup Labels System**
4. 📊 **Configure Milestones**
5. 🎯 **Setup Automation Rules**

---

**📋 Po dokončení setup bude GitHub Projects poskytovat:**
- ✅ Kompletní tracking progress
- 📊 Visual dashboards a metrics
- 🎯 Automated workflow management
- 📈 Performance monitoring
- 👥 Team collaboration tools

**🚀 Ready to setup? Začneme s manuálním vytvořením projektu přes web interface!**