import type { MemosListResponse, MemosMemo } from '~/types/moment'

interface UseMomentsOptions {
	pageSize?: number
	auto?: boolean
	key?: string
}

export function useMoments(options: UseMomentsOptions = {}) {
	const appConfig = useAppConfig()
	const config = appConfig.moments
	const key = options.key ?? 'moments'

	const list = useState<MemosMemo[]>(`${key}-list`, () => [])
	const nextPageToken = useState<string | undefined>(`${key}-next-page-token`, () => undefined)
	const pending = useState<boolean>(`${key}-pending`, () => false)
	const initialized = useState<boolean>(`${key}-initialized`, () => false)
	const lastFetched = useState<number>(`${key}-last-fetched`, () => 0)
	const error = useState<string | undefined>(`${key}-error`, () => undefined)

	const pageSize = options.pageSize ?? config.pageSize

	const endpoint = computed(() => `${trimMomentInstance(config.instance)}${config.apiPath}`)

	const filter = computed(() => [
		'visibility == "PUBLIC"',
		'parent == null',
		config.username ? `creator == "users/${config.username}"` : '',
	].filter(Boolean).join(' && '))

	async function fetchPage(pageToken?: string) {
		const params = new URLSearchParams({
			pageSize: String(pageSize),
			orderBy: 'pinned desc, create_time desc',
			filter: filter.value,
		})

		if (pageToken)
			params.set('pageToken', pageToken)

		return await $fetch<MemosListResponse>(`${endpoint.value}?${params.toString()}`)
	}

	async function loadMore(reset = false) {
		if (pending.value)
			return

		pending.value = true
		error.value = undefined

		try {
			const res = await fetchPage(reset ? undefined : nextPageToken.value)
			list.value = reset ? res.memos : [...list.value, ...res.memos]
			nextPageToken.value = res.nextPageToken
			initialized.value = true
			lastFetched.value = Date.now()
		}
		catch (e) {
			error.value = e instanceof Error ? e.message : String(e)
		}
		finally {
			pending.value = false
		}
	}

	async function refresh() {
		nextPageToken.value = undefined
		await loadMore(true)
	}

	if (options.auto !== false) {
		onMounted(() => {
			if (!initialized.value || Date.now() - lastFetched.value > 60_000)
				refresh()
		})
	}

	const hasMore = computed(() => !!nextPageToken.value)

	return {
		list,
		pending,
		error,
		hasMore,
		initialized,
		refresh,
		loadMore: () => loadMore(),
	}
}
