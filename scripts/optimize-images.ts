import type { Dirent } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const dirs = ['public/assets', 'public/fimg']
const exts = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const concurrency = 4

let before = 0
let after = 0
let changed = 0

async function walk(dir: string): Promise<string[]> {
	const entries: Dirent[] = await readdir(dir, { withFileTypes: true })
	const files: string[] = []
	for (const entry of entries) {
		const path = join(dir, entry.name)
		if (entry.isDirectory())
			files.push(...await walk(path))
		else if (exts.has(extname(entry.name).toLowerCase()))
			files.push(path)
	}
	return files
}

async function optimize(file: string) {
	const input = await readFile(file)
	const ext = extname(file).toLowerCase()
	const image = sharp(input, { failOn: 'none' })
	const output = ext === '.png'
		? await image.png({ compressionLevel: 9 }).toBuffer()
		: ext === '.webp'
			? await image.webp({ quality: 82 }).toBuffer()
			: await image.jpeg({ quality: 82, mozjpeg: true }).toBuffer()

	if (output.length >= input.length)
		return

	await writeFile(file, output)
	before += input.length
	after += output.length
	changed++
}

const files = (await Promise.all(dirs.map(walk))).flat()
let cursor = 0

async function worker() {
	while (cursor < files.length)
		await optimize(files[cursor++])
}

await Promise.all(Array.from({ length: concurrency }, worker))

console.log(`optimized ${changed}/${files.length} images, ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`)
