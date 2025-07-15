# 🕒 Jira Logs Viewer

[![Netlify Status](https://api.netlify.com/api/v1/badges/c50c0ff2-e543-4c0a-b587-8fad85cc3f18/deploy-status)](https://app.netlify.com/projects/jiralogsviewer/deploys)

Jira Logs Viewer is a lightweight and secure tool that helps you visualize the time you've logged in Jira over a specific date range. It's perfect for individuals or teams looking to monitor and optimize their daily worklogs during a sprint or release.

> 🔒 **Security First**: We do **NOT** store your Jira credentials or any of your worklog data. All communication happens securely and directly between your browser and the Jira API.

---

## 🚀 Features

- **🔐 Secure Jira Authentication**  
  Uses basic or token-based authentication securely in-browser without storing credentials.

- **📅 Custom Date Range Selection**  
  Pick any date range to review logs — helpful for sprints, weekly reports, or monthly reviews.

- **📊 Daily Worklog Graph**  
  Each day shows a colored bar:
  - ✅ **Green**: 8 hours or more logged
  - ❌ **Red**: Less than 8 hours

- **📈 Goal-Oriented Release Planning**  
  Use visual feedback to ensure all days hit the 8-hour target — great for end-of-release retrospectives or compliance tracking.

---

## 🧰 Tech Stack

- **Frontend**: Next.js
- **Deployment**: [Netlify](https://www.netlify.com/)
- **API**: Jira REST API

---

## 📦 Installation & Development

> You only need this if you're running it locally. Most users can just visit the [hosted version](jiralogsviewer.netlify.app).

### 1. Clone the repo

```bash
git clone https://github.com/your-username/jira-logs-viewer.git
cd jira-logs-viewer
