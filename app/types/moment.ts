export interface MemosAttachment {
	name: string
	filename: string
	type: string
	externalLink?: string
	size?: string
	createTime?: string
	mediaMetadata?: {
		width?: number
		height?: number
	}
}

export interface MemosMemo {
	name: string
	creator: string
	content: string
	visibility: 'PUBLIC' | 'PRIVATE' | 'PROTECTED' | 'SPACE' | string
	state?: string
	pinned?: boolean
	tags?: string[]
	attachments?: MemosAttachment[]
	location?: {
		placeholder?: string
		latitude?: number
		longitude?: number
	}
	createTime: string
	updateTime?: string
	displayTime?: string
	snippet?: string
	property?: {
		title?: string
		hasLink?: boolean
		hasCode?: boolean
		hasTaskList?: boolean
		hasIncompleteTasks?: boolean
		hasInlineImage?: boolean
	}
	commentCount?: number
	parent?: string
}

export interface MemosListResponse {
	memos: MemosMemo[]
	nextPageToken?: string
}
