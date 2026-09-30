import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'projects');
const out = path.join(process.cwd(), 'data', 'projects.generated.json');
fs.mkdirSync(root, { recursive: true });

const projects = fs.readdirSync(root, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => {
    const dir = path.join(root, e.name);
    const meta = path.join(dir, 'project.json');
    if (!fs.existsSync(meta)) return null;
    try {
      const data = JSON.parse(fs.readFileSync(meta, 'utf8'));
      return { slug: e.name, ...data };
    } catch { return null; }
  })
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

fs.writeFileSync(out, JSON.stringify(projects, null, 2));
console.log(`Generated ${projects.length} project(s).`);
