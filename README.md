# Portfolio Website

A modern, responsive portfolio website for showcasing design and development work.

## Features

- Responsive design that works on all devices
- Dark/Light theme switching
- Project filtering by category
- Contact form with validation
- Animated page transitions
- Modern, clean UI

## Structure

```
portfolio/
│
├── index.html            # Homepage with hero section and featured projects
├── about.html           # About section with skills and experience
├── projects.html        # Project showcase with filtering
├── contact.html         # Contact form and social links
│
├── css/
│   └── styles.css       # Global styles and theming
│
├── js/
│   ├── main.js          # Core functionality (theme, navigation)
│   └── contact-form.js  # Contact form handling
│
├── data/
│   └── projects.json    # Project data
│
└── assets/             # icons, and other media
    ├── icons/
```

## Setup

1. Clone this repository
2. Open the project in your preferred code editor
3. For local development, use a local server (e.g., Live Server VS Code extension)
4. Customize content in HTML files
5. Update project data in `data/projects.json`
6. Replace placeholder images in `assets/images/`

## Customization

### Theme Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --text-color: #1f2937;
    --bg-color: #ffffff;
    --card-bg: #f3f4f6;
    --border-color: #e5e7eb;
}
```

### Projects

Add your projects to `data/projects.json` following the structure:

```json
{
    "id": 1,
    "title": "Project Name",
    "description": "Project description",
    "thumbnail": "path/to/image.jpg",
    "tags": ["Web", "Design"],
    "tools": ["Tool1", "Tool2"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/username/project"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License – feel free to use this template for your own portfolio!
