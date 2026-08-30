import { getCollection, type CollectionEntry } from 'astro:content'

/**
 * Published posts, newest first.
 * Drafts stay visible while running `astro dev` and drop out of `astro build`,
 * so you can preview work in progress without it shipping.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft === false : true
  )

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

/** Every tag in use, with how many posts carry it, alphabetised. */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts()
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag))
}
