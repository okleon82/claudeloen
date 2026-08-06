/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site (no API routes / server actions) — works on Vercel
  // as-is, and this `output: "export"` mode also makes `next build`
  // produce a plain `out/` folder you can deploy to GitHub Pages.
  output: "export",
};

export default nextConfig;
