import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQuery = (params: URLSearchParams) => {
    const newQueryString = params.toString()
    router.push(`${pathname}?${newQueryString}`, { scroll: false })
  }

  const addQueryParam = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set(key, value)
    updateQuery(current)
  }

  const removeQueryParam = (key: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete(key)
    updateQuery(current)
  }

  return {
    searchParams,
    addQueryParam,
    removeQueryParam,
  }
}
