import { computed } from 'vue'

export function useApiSearch(apis, searchText) {
  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s,.;:!?¿¡\-_/\\]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const filteredApis = computed(() => {
    if (!searchText.value.trim()) return apis.value

    const query = normalize(searchText.value)
    const queryWords = query.split(' ')

    const nameMatches = apis.value.filter(api => {
      const name = normalize(api.API)
      return queryWords.every(qw => name.includes(qw))
    })

    const nameIDs = new Set(nameMatches.map(api => api.ID))
    const descMatches = apis.value.filter(api => {
      if (nameIDs.has(api.ID)) return false
      const desc = normalize(api.Description)
      return queryWords.every(qw => desc.includes(qw))
    })

    return [...nameMatches, ...descMatches]
  })

  return { filteredApis }
}