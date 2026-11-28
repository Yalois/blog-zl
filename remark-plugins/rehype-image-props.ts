import type { Element, Root } from 'hast'
import { existsSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import process from 'node:process'
import { imageSize } from 'image-size'
import { visit } from 'unist-util-visit'

interface Options {
	publicDir?: string
}

const externalRe = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i
const leadingSlashRe = /^\//

export default function rehypeImageProps(options: Options = {}) {
	const publicDir = options.publicDir || resolve(process.cwd(), 'public')

	return (tree: Root) => {
		visit(tree, 'element', (node: Element, index, parent) => {
			if (node.tagName !== 'img')
				return

			const props = node.properties ??= {}
			const src = typeof props.src === 'string' ? props.src : ''
			if (!src)
				return

			if (!props.loading)
				props.loading = 'lazy'
			if (!props.decoding)
				props.decoding = 'async'

			if (externalRe.test(src) || src.startsWith('data:'))
				return

			const name = basename(src)
			const inAssets = resolve(publicDir, 'assets', name)
			const inPublic = resolve(publicDir, src.replace(leadingSlashRe, ''))
			const file = existsSync(inAssets) ? inAssets : existsSync(inPublic) ? inPublic : null

			// 找不到源文件时移除，避免线上 404
			if (!file) {
				if (parent && typeof index === 'number') {
					parent.children.splice(index, 1)
					return index
				}
				return
			}

			props.src = file === inAssets ? `/assets/${name}` : `/${src.replace(leadingSlashRe, '')}`

			if (!props.width || !props.height) {
				try {
					const { width, height } = imageSize(readFileSync(file))
					if (width && height) {
						props.width ??= width
						props.height ??= height
					}
				}
				catch {
					// 无法读取尺寸时忽略
				}
			}
		})
	}
}
