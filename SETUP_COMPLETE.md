# SDR Reports - Sanity Studio Setup Complete! 🎉

Your Sanity Studio is now configured and running at **http://localhost:3333**

## What's Been Set Up

### Project Configuration
- **Project ID**: `vs74rvxu`
- **Dataset**: `production`
- **Studio Title**: SDR Ventures Reports

### Content Types

#### 📄 Reports (Main Content)
Each report includes:
- Title & Slug (auto-generated from title)
- Featured Image with alt text
- Excerpt/Description (max 300 characters)
- Category (dropdown with 8 industry verticals)
- Tags (flexible tagging)
- Authors (references to People)
- Publication Date
- **Flexible Content Sections** (add in any order)

#### 👤 People
Staff members with:
- Name, Role/Title, Bio
- Image with alt text
- Email & LinkedIn URL
- Slug (auto-generated from name)

### Content Section Blocks

Build flexible reports with these section types:

1. **Text Section** - Rich text editor with headings (H2-H4), lists, links, formatting
2. **Chart Section** - Data visualizations (bar, line, pie, area, scatter) with JSON data or image upload
3. **Callout Section** - Info boxes, warnings, notes, success/error messages
4. **CTA Section** - Call-to-action with heading, description, button (3 style variants)
5. **Image Section** - Images with captions and 4 layout options (full, wide, normal, small)
6. **Contact Card Section** - Display people/authors in grid or list layout
7. **Key Takeaways Section** - Quick facts/bullet points
8. **Table of Contents Section** - Auto-generated or manual TOC
9. **References Section** - Citations with optional URLs

### Report Categories

1. Agribusiness & Food Value Chain
2. Distribution & Logistics
3. Industrial & Infrastructure Services
4. Manufacturing
5. Pet Industry
6. Professional Services
7. Software & IT Services
8. Wellness & Health Services

## Next Steps

### 1. Access Your Studio
Open http://localhost:3333 in your browser and log in with your Sanity account.

### 2. Create Your First Content

**Start with People:**
1. Click "Person" in the sidebar
2. Create team members who will be report authors
3. Add their images, roles, and bios

**Then Create a Report:**
1. Click "Report" in the sidebar
2. Fill in title, excerpt, category
3. Select authors from the people you created
4. Add flexible content sections in any order
5. Publish when ready!

### 3. Deploy Your Studio

When you're ready to deploy to production:

```bash
cd studio-sdr-ventures-reports
npm run deploy
```

This will host your Studio on Sanity's CDN at a custom URL.

### 4. Connect to Your Astro Site

Install the Sanity client in your Astro project:

```bash
npm install @sanity/client @sanity/image-url
```

Create a Sanity client in your Astro project:

```javascript
// src/lib/sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'vs74rvxu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
```

Query your content:

```javascript
// Example: Get all reports
const reports = await client.fetch(`
  *[_type == "report"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    featuredImage,
    "authors": authors[]->{ name, role, image }
  }
`)
```

## Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run deploy   # Deploy Studio to Sanity
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Astro Guide](https://www.sanity.io/guides/sanity-astro-blog)

---

Ready to create amazing reports! 🚀
