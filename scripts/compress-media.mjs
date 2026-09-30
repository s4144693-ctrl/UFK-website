import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC = new URL('../public', import.meta.url).pathname

async function compressImages() {
  const files = await readdir(PUBLIC)
  const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f))

  let totalBefore = 0
  let totalAfter = 0

  for (const file of images) {
    const input = join(PUBLIC, file)
    const ext = extname(file)
    const name = basename(file, ext)
    const output = join(PUBLIC, `${name}.webp`)

    const before = (await stat(input)).size

    try {
      await sharp(input)
        .webp({ quality: 82, effort: 4 })
        .toFile(output)

      const after = (await stat(output)).size
      const saved = (((before - after) / before) * 100).toFixed(1)

      totalBefore += before
      totalAfter += after

      console.log(`✓ ${file} → ${name}.webp  (${(before/1024/1024).toFixed(1)}MB → ${(after/1024/1024).toFixed(1)}MB, -${saved}%)`)

      // Remove the original after successful conversion
      await unlink(input)
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`)
    }
  }

  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB`)
}

compressImages()
