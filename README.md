# Shashi Kant — Developer Portfolio

A responsive, dark technical portfolio built with React and Vite.

**Live site:** https://shashikant17092003.github.io/portfolio  
**Repository:** https://github.com/ShashiKant17092003/portfolio

## Tech stack

- React 18
- Vite
- JavaScript
- CSS (responsive layout, reusable design tokens and reduced-motion support)
- GitHub Pages deployment through GitHub Actions

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/ShashiKant17092003/portfolio.git
cd portfolio
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deployment

The site is configured for the repository path `/portfolio/`. GitHub Actions builds the Vite application and deploys the `dist` directory to GitHub Pages when changes are pushed to `main`.

To enable it, open **Settings → Pages** in the repository and choose **GitHub Actions** as the deployment source.

## Project content

The project cards currently describe small existing experiments and their improvement areas. They are not presented as production-grade systems. Replace or expand each entry as a project reaches a demonstrable milestone.

## Security notes

- Never place private API keys or personal access tokens in client-side code or variables prefixed with `VITE_`.
- Public GitHub profile data can be fetched from public endpoints without a personal access token.
- A credential previously committed to a public repository should be revoked or rotated; deleting it from the latest source does not erase it from Git history.

## Next engineering milestones

1. Rebuild the password generator using the Web Crypto API.
2. Add a documented backend API and persistent database to a full-stack project.
3. Add automated tests and CI checks.
4. Add real project screenshots, live demos and technical case studies after those artifacts exist.
