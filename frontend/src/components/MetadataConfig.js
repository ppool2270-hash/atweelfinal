import React, { useEffect } from "react";

const PAGE_METADATA = {
  home: {
    title: "Atweel Tea — 100% Organic B2B Bulk Exports | Kharsang Single Estate, Arunachal Pradesh",
    description: "Direct B2B exporter of 100% organic single-estate Orthodox, CTC, and Specialty teas from Kharsang, Arunachal Pradesh, India. FSSAI Export Licensed, Tea Board Registered, and NPOP Organic Certified.",
    keywords: "organic tea exporter, B2B bulk tea India, Arunachal Pradesh tea estate, Kharsang organic tea, FTGFOP1 bulk export, CTC tea manufacturer India, wholesale organic black tea, single estate tea exporter, Atweel Food and Beverages",
    canonical: "https://www.atweeltea.com/",
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "Atweel Food & Beverages Pvt Ltd",
      "alternateName": "Atweel Tea Exporters",
      "legalName": "Atweel Food & Beverages Private Limited",
      "url": "https://www.atweeltea.com",
      "logo": "https://www.atweeltea.com/logo.png",
      "description": "Premier single-estate organic tea cultivator, manufacturer, and international B2B bulk exporter from Kharsang, Changlang District, Arunachal Pradesh, India.",
      "identifier": "CIN: U15400AR2023PTC014285",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kharsang, Changlang District",
        "addressLocality": "Kharsang",
        "addressRegion": "Arunachal Pradesh",
        "postalCode": "792122",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "atweeltea@gmail.com",
        "contactType": "Export Procurement & Wholesale Sales Desk",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Hindi"]
      },
      "knowsAbout": [
        "100% Organic Orthodox Tea",
        "Kharsang Single-Estate Harvests",
        "CTC Tea Manufacturing",
        "FOB Kolkata Ocean Freight Exports",
        "ISPM-15 Vacuum Palletized Tea Shipping",
        "NPOP & USDA Organic Compliance"
      ]
    }
  },
  catalog: {
    title: "B2B Wholesale Organic Tea Catalog & Grades | Atweel Tea Export Desk",
    description: "Browse 100% organic single-estate FTGFOP1 Golden Tips, Silver Needle White Tea, BOP CTC, and Green Tea grades. Direct ocean container loading from Kolkata Port (INCCU1) with full MRL lab analysis.",
    keywords: "orthodox tea grades, FTGFOP1 price per kg, bulk CTC tea supplier, organic white tea export, wholesale tea catalog India, FOB Kolkata tea exporter, Kharsang tea grades, silver needle bulk tea",
    canonical: "https://www.atweeltea.com/catalog",
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Atweel Tea Single-Estate Organic B2B Wholesale Catalog",
      "description": "Primary export tea grades harvested at the 1,200 Bigha Kharsang estate in Arunachal Pradesh, India.",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Kharsang Golden Tips (FTGFOP1)",
          "description": "Whole leaf golden tips orthodox tea with rich malty aroma, amber liquor, and high polyphenol count. Grade AAA."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Arunachal Premium CTC (BOP)",
          "description": "High cupping strength CTC grade with deep golden liquor, ideal for premium commercial tea bags and milk tea blends."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Kharsang Silver Needle White Tea",
          "description": "Rare specialty reserve hand-picked organic buds, sun-dried with delicate floral nuances and silky finish."
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Kharsang Organic Green Tea (Whole Leaf)",
          "description": "Pan-fired organic green tea leaves rich in EGCG antioxidants with refreshing botanical profile."
        }
      ]
    }
  },
  compliance: {
    title: "Regulatory Compliance, MCA & Organic Certifications | Atweel Tea Exporters",
    description: "Verified corporate identity under Ministry of Corporate Affairs (CIN: U15400AR2023PTC014285), FSSAI Export License, Tea Board of India, NPOP & USDA Organic compliance docs and lab MRL reports.",
    keywords: "Atweel corporate registration MCA, FSSAI export license tea, Tea Board of India registration, NPOP organic tea certificate, MRL test report Indian tea, Changlang Arunachal Pradesh corporate entity",
    canonical: "https://www.atweeltea.com/compliance",
    ogType: "article",
    schema: {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      "name": "Atweel Tea Regulatory Compliance & Export Certification Verification",
      "serviceType": "B2B Export Legal & Regulatory Compliance",
      "provider": {
        "@type": "Organization",
        "name": "Atweel Food & Beverages Pvt Ltd",
        "legalName": "Atweel Food & Beverages Private Limited",
        "identifier": "CIN: U15400AR2023PTC014285"
      },
      "areaServed": "International Maritime & Air Freight Customs Authorities",
      "serviceOutput": [
        "Phytosanitary Certificate (Govt. of India)",
        "Tea Board of India Certificate of Origin",
        "FSSAI Export License",
        "NPOP Organic Certification",
        "Independent Laboratory MRL Test Analysis"
      ]
    }
  },
  rfq: {
    title: "Request Wholesale Quote & Custom Blending RFQ | Atweel Organic Tea Export",
    description: "Submit bulk procurement requirements, private label packaging specs, or custom master blend profiles directly to Atweel Tea's Arunachal Pradesh export desk for immediate FOB/CIF pricing.",
    keywords: "wholesale tea quote, private label tea exporter, custom tea blending India, bulk tea RFQ, tea contract manufacturing, FOB Kolkata quote tea",
    canonical: "https://www.atweeltea.com/rfq",
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Bulk Export Inquiry & Custom Blending RFQ Portal",
      "description": "Direct B2B wholesale inquiry portal for international tea importers, blenders, and private label brands.",
      "mainEntity": {
        "@type": "Service",
        "name": "Bulk Tea Export & Custom Blending Services",
        "provider": {
          "@type": "Organization",
          "name": "Atweel Food & Beverages Pvt Ltd"
        },
        "termsOfService": "FOB Kolkata Port / CIF Global Destination Ports"
      }
    }
  },
  calculator: {
    title: "B2B Ocean Freight & Bulk Tea Cost Calculator | Atweel Tea Logistics",
    description: "Calculate ocean container payload, ISPM-15 palletization requirements, FOB Kolkata freight costs, and volume landed prices for 20ft and 40ft High Cube containers.",
    keywords: "tea export container calculator, 20ft FCL tea capacity, FOB Kolkata shipping estimator, bulk tea payload calculator, ISPM 15 pallet calculation tea",
    canonical: "https://www.atweeltea.com/calculator",
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Atweel Tea B2B Wholesale Payload & Freight Estimator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All Web Browsers",
      "browserRequirements": "Requires JavaScript"
    }
  },
  tracker: {
    title: "Live Container Dispatch & Consignment Tracking | Atweel Tea Exporters",
    description: "Track ocean freight container dispatches from the 72,000 sq ft Kharsang factory through Kolkata Port (INCCU1) to international destination seaports in real time.",
    keywords: "tea container dispatch tracker, Kolkata port tea shipment, Bill of Lading tracking Atweel, Kharsang estate dispatch status",
    canonical: "https://www.atweeltea.com/tracker",
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Atweel Tea Export Consignment Tracking Service",
      "provider": {
        "@type": "Organization",
        "name": "Atweel Food & Beverages Pvt Ltd"
      }
    }
  },
  admin: {
    title: "Export Management CMS Portal | Atweel Food & Beverages Pvt Ltd",
    description: "Secure internal export desk CMS portal for managing bulk RFQs, batch lot certificates, catalog inventory, and customs documentation.",
    keywords: "Atweel export CMS portal, internal tea export management",
    canonical: "https://www.atweeltea.com/admin",
    ogType: "website"
  }
};

export default function MetadataConfig({ activeTab }) {
  const meta = PAGE_METADATA[activeTab] || PAGE_METADATA.home;

  useEffect(() => {
    // 1. Update Document Title
    document.title = meta.title;

    // 2. Helper function to create or update meta tags
    const updateMetaTag = (selector, nameAttr, nameValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Helper for link tags (e.g., canonical)
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Update standard meta
    updateMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    if (meta.keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
    }

    // Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.canonical || 'https://www.atweeltea.com/');
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Atweel Food & Beverages Pvt Ltd');

    // Twitter Card Tags
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    // Canonical link
    if (meta.canonical) {
      updateLinkTag('canonical', meta.canonical);
    }

    // 3. Inject Dynamic JSON-LD Structured Data Schema
    const schemaScriptId = "atweel-json-ld-schema";
    let schemaScript = document.getElementById(schemaScriptId);
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = schemaScriptId;
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    if (meta.schema) {
      schemaScript.text = JSON.stringify(meta.schema);
    } else {
      schemaScript.text = JSON.stringify(PAGE_METADATA.home.schema);
    }

  }, [activeTab, meta]);

  return null; // Side-effect only component
}
