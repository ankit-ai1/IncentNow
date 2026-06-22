import type { MetadataRoute } from "next";

const BASE = "https://incentiq.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Core
    { url: `${BASE}`,               lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE}/platform`,      lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/capabilities`,  lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/product-tour`,  lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/book-demo`,     lastModified: now, changeFrequency: "monthly", priority: 0.9  },

    // Platform
    { url: `${BASE}/platform/unified-data-model`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/platform/ai-intelligence`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/platform/built-on-servicenow`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/platform/enterprise-governance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Capabilities
    { url: `${BASE}/capabilities/data-import`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/fiscal-calendar`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/organization`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/quota-setup`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/incentive-plans`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/calculations`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/statements`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/performance`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/dashboard`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/reports`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capabilities/ai-assistant`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Solutions
    { url: `${BASE}/teams`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/teams/sales`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/teams/finance`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/teams/revops`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/teams/leadership`,lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Why ServiceNow
    { url: `${BASE}/why-servicenow`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Resources
    { url: `${BASE}/resources`,      lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/blog`,           lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/pricing`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Legal
    { url: `${BASE}/privacy`,  lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`,    lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
