# Sanity Starter Kit

A modern, performant website built with Next.js 14, ShadcnUI, Tailwind CSS, and Sanity CMS.

## Features

- ⚡ Next.js 14 for server-side rendering and static site generation
- 🎨 ShadcnUI components for a consistent design system
- 🌊 Tailwind CSS for utility-first styling
- 📝 Sanity CMS for content management
- 🎭 Light/Dark mode support
- 📱 Responsive design
- 🔍 SEO optimized
- 🚀 Fast page loads with static generation

## Getting Started

### Prerequisites

- bun
- Git

### Installation

1. Use this template:

2. Install dependencies:
```bash
bun i
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

1. Update the `.env` file in the `nextjs` with your Sanity credentials
2. Update the `.env` file in the `studio` app with your Sanity credentials

### Development

Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

```bash
bun run build
bun run start
```

## Project Structure

```
web/
├── apps/
│   ├── nextjs/        # Next.js frontend application
│   └── studio/        # Sanity Studio
```

## Content Management

The site uses Sanity CMS for content management. To access the Sanity Studio:

1. Navigate to the studio directory:
```bash
cd apps/studio
```

2. Start the studio:
```bash
bun dev
```

Open [http://localhost:3333](http://localhost:3333) to access Sanity Studio.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- koyu - [https://web.koyu.space](https://web.koyu.space)
