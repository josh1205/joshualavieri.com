export interface Project {
  name: string
  /** Shown top-left of the card. */
  year: string
  /** One line — the cards are uniform, so keep it short. */
  description: string
  /** Each link is optional; only the ones you set are rendered. */
  article?: string
  demo?: string
  source?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'joshualavieri.com',
    year: '2026',
    description: 'This site — bilingual, static, and open source.',
    demo: '/',
    source: 'https://github.com/josh1205/joshualavieri.com',
  },
  {
    name: 'Lawademy',
    year: '2024',
    description: 'Law school outline library',
    demo: 'https://lawademy.com',
  }
]
