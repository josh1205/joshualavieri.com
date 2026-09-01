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
    description: 'Digital Workshop for Joshua Lavieri',
    demo: '/',
    source: 'https://github.com/josh1205/joshualavieri.com',
  },
  {
    name: 'joshualavieri-cloudflare-infra',
    year: '2026',
    description: 'Cloudflare config for joshualavieri.com in Pulumi',
    source: 'https://github.com/josh1205/joshualavieri-cloudflare-infra',
  },
  {
    name: 'Lawademy',
    year: '2024',
    description: 'Law school outline library',
    demo: 'https://lawademy.com',
  }
]
