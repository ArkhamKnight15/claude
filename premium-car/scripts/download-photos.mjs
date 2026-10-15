/**
 * Baixa as fotos do catálogo (src/data/photos.ts) do Unsplash e gera versões WebP otimizadas
 * em src/assets/photos. Depois de executado, o site passa a servir as imagens localmente.
 *
 * Uso: npm run photos            (baixa apenas as que faltam)
 *      npm run photos -- --force (baixa todas novamente)
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/assets/photos')
const manifestPath = join(outDir, 'manifest.json')
const WIDTHS = [640, 1080, 1600, 2400]
const force = process.argv.includes('--force')

/** Lê os pares chave → id do catálogo sem precisar compilar TypeScript. */
async function readCatalog() {
  const source = await readFile(join(root, 'src/data/photos.ts'), 'utf8')
  const entries = [...source.matchAll(/^\s+(\w+):\s*\{\s*id:\s*'([^']+)'/gm)]
  return entries.map(([, key, id]) => ({ key, id }))
}

const exists = (path) => access(path).then(() => true, () => false)

async function download(id) {
  const response = await fetch(`https://unsplash.com/photos/${id}/download?force=true&w=2400`, { redirect: 'follow' })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return Buffer.from(await response.arrayBuffer())
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const manifest = (await exists(manifestPath)) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}
  const catalog = await readCatalog()
  let failures = 0

  for (const { key, id } of catalog) {
    if (!force && manifest[key]?.id === id && (await exists(join(outDir, `${key}-640.webp`)))) {
      console.log(`✓ ${key} (já baixada)`)
      continue
    }
    try {
      const original = await download(id)
      const image = sharp(original).rotate()
      const { width, height } = await image.metadata()
      for (const target of WIDTHS.filter((w) => w <= width)) {
        await image
          .clone()
          .resize({ width: target })
          .webp({ quality: target >= 1600 ? 74 : 78, effort: 5 })
          .toFile(join(outDir, `${key}-${target}.webp`))
      }
      manifest[key] = { id, width, height }
      console.log(`↓ ${key} (${id}) ${width}×${height}`)
    } catch (error) {
      failures += 1
      console.error(`✗ ${key} (${id}): ${error.message}`)
    }
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  if (failures) {
    console.error(`\n${failures} foto(s) não baixada(s); o site continuará usando a versão remota delas.`)
    process.exitCode = 1
  }
}

await main()
