// Site-wide metadata. Anything used by only one component lives in that
// component instead — sidebar content is in src/components/Sidebar.astro.

export const SITE = {
  url: 'https://joshualavieri.com',
  author: 'Joshua Lavieri',
  title: 'Joshua Lavieri\'s Website',
  description: 'A place to share my projects opinions and genuine interests with the world',
  lang: 'en',
  links: {
    email: 'joshlavieri@gmail.com',
    github: 'https://github.com/josh1205',
    repo: 'https://github.com/josh1205/joshualavieri.com',
    linkedIn: 'https://www.linkedin.com/in/joshua-lavieri/'
  }
} as const

// Giscus comment settings. Fill these in from https://giscus.app
// after enabling Discussions on a public GitHub repo.
// Until `repo` is filled in, the comments block renders a setup hint
// instead of the widget.
export const GISCUS = {
  repo: '',            // e.g. 'joshualavieri/joshualavieri.com-comments'
  repoId: '',
  category: 'Announcements',
  categoryId: '',
} as const
