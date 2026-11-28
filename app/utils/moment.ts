import type { MemosAttachment, MemosMemo } from '~/types/moment'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

const trailingSlashPattern = /\/+$/
const imageFilePattern = /\.(?:avif|gif|jpe?g|png|webp)$/i
const inlineImagePattern = /!\[[^\]]*\]\(/
const memosRelativeUrlPattern = /(\]\(|<(?:img|a)[^>]*(?:src|href)=["'])(\/(?:file|memos|u|s|explore)\/)/g

export function trimMomentInstance(instance: string) {
	return instance.replace(trailingSlashPattern, '')
}

export function getMomentUid(memo: Pick<MemosMemo, 'name'>) {
	return memo.name.split('/').pop() || memo.name
}

export function getMomentAttachmentUrl(instance: string, attachment: MemosAttachment, thumbnail = false) {
	if (attachment.externalLink)
		return attachment.externalLink

	const url = `${trimMomentInstance(instance)}/file/${attachment.name}/${encodeURIComponent(attachment.filename)}`
	return thumbnail ? `${url}?thumbnail=true` : url
}

export function isImageAttachment(attachment: MemosAttachment) {
	return attachment.type.startsWith('image/') || imageFilePattern.test(attachment.filename)
}

export function hasInlineImage(memo: Pick<MemosMemo, 'content' | 'property'>) {
	return memo.property?.hasInlineImage ?? inlineImagePattern.test(memo.content)
}

export function renderMomentMarkdown(content: string, instance: string) {
	const base = trimMomentInstance(instance)
	const normalized = content.replace(memosRelativeUrlPattern, `$1${base}$2`)
	const html = marked.parse(normalized, { gfm: true, breaks: true }) as string

	if (!import.meta.client)
		return html

	return DOMPurify.sanitize(html, { ADD_ATTR: ['target', 'rel'] })
}
