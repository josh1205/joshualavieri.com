export const languages = {
  en: 'English',
  af: 'Afrikaans',
} as const

export type Lang = keyof typeof languages
export const defaultLang: Lang = 'en'

/**
 * Every translatable string, keyed by a dotted id.
 *
 * `en` is the source of truth: any key missing from another language falls
 * back to the English value rather than rendering the raw key.
 */
export const ui = {
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'sidebar.bioLead': "I'm ",
    'sidebar.bioName': 'Josh',
    'sidebar.bioRest':
      ', an infrastructure/platform engineer looking to solve the next challenge big or small. Welcome to my digital workshop.',
    'sidebar.resume': 'Resume',
    'sidebar.source': 'Source',
    'sidebar.switchLang': 'Translate to Afrikaans',
    'sidebar.theme': 'Theme',
    'footer.builtWith': 'Built with Astro. Hosted on Cloudflare.',
    'footer.designCredit': 'Design inspired by',
    'home.greeting': "Hey, I'm Joshua!",
    'home.tagline': 'Infrastructure/platform engineer, software enthusiast, ',
    'home.afrikaner': 'part time afrikaner',
    'home.afrikanerTip': 'Person from South Africa',
    'home.timelineHeading': 'A brief timeline',
    'home.projects': 'Projects',
    'home.allProjects': 'All Projects',
    'home.projectsIntro':
      "Projects I've built and things I'm still tinkering with.",
    'projects.title': 'Projects',
    'projects.description': "Things I've built.",
    'projects.disclaimer': "Compilation of projects I have worked on or am currently working on. If a projects source is hidden and you would like to take a peak, feel free to message me on linkedin or email!",
    'projects.intro':
      'Each of these runs on its own subdomain as an independent deployment.',
    'projects.article': 'Article',
    'projects.demo': 'Demo',
    'projects.source': 'Source',
  },
  af: {
    'nav.projects': 'Projekte',
    'nav.about': 'Oor my',
    'sidebar.bioLead': 'Ek is ',
    'sidebar.bioName': 'Josh',
    'sidebar.bioRest':
      ", 'n infrastruktuur-/platformingenieur wat op soek is na 'n oplossing vir die volgende uitdaging, groot of klein. Welkom by my digitale werkswinkel.",
    'sidebar.resume': 'CV',
    'sidebar.source': 'Bron',
    'sidebar.switchLang': 'Translate to English',
    'sidebar.theme': 'Tema',
    'footer.builtWith': 'Gebou met Astro. Aangebied op Cloudflare.',
    'footer.designCredit': 'Ontwerp geïnspireer deur',
    'home.greeting': 'Haai, ek is Joshua!',
    'home.tagline': 'Infrastruktuur-/platformingenieur, software enthusiast, ',
    'home.afrikaner': 'deeltydse Afrikaner',
    'home.afrikanerTip': 'Persoon van Suid-Afrika',
    'home.timelineHeading': "'n Kort tydlyn",
    'home.projects': 'Projekte',
    'home.allProjects': 'Alle projekte',
    'home.projectsIntro':
      'Projekte wat ek gebou het en dinge waarmee ek met peuter.',
    'projects.title': 'Projekte',
    'projects.description': 'Dinge wat ek gebou het.',
    'projects.disclaimer': "My samestelling van projekte wat ek gewerk het of werk op is. As 'n projek se bron versteek is en jy wil kyk, kan jy vir my 'n boodskap op linkedin stuur of email stuur!",
    'projects.intro':
      "Elkeen hiervan loop op sy eie subdomein as 'n onafhanklike ontplooiing.",
    'projects.article': 'Artikel',
    'projects.demo': 'Demo',
    'projects.source': 'Bron',
  },
} as const

/** Homepage timeline, per language. `html` carries inline links. */
export const timeline = {
  en: [
    {
      range: '2017',
      html: "A C++ Fahrenheit to Celsius converter, my first program. Took me three hours. I thought I was a genius.",
    },
    {
      range: '2018–2022',
      html: "<a href=\"/me/\">Neuroscience to CS</a>: half a neuroscience degree in, one Intro to Software Engineering course changed the plan. Switched majors and took every engineering elective I could get.",
    },
    {
      range: '2021–2025',
      html: "<a href=\"/resume/#atos-software-engineer\">Software engineer</a>: interned, then owned the frontend of a <a href=\"https://www.mitel.com/products/virtual-care-collaboration-service\">WebRTC medical platform</a>. A love of Jenkins, now won over by GitHub Actions, and no idea how Kubernetes worked pointed me at DevOps.",
    },
    {
      range: '2025–now',
      html: "<a href=\"/resume/#crunchyroll-core-infrastructure\">DevOps, Core Infrastructure</a>: building infrastructure components, CI/CD workflows, untangling complex systems across services and helping people succeed. If that does not sound fun, <a href=\"{{linkedIn}}\">let's talk</a> hopefully I can change your mind.",
    },
  ],
  af: [
    {
      range: '2017',
      html: "'n C++ Fahrenheit na Celsius omskakelaar, my eerste program. Dit het my drie uur geneem. Ek het gedink ek is 'n genie.",
    },
    {
      range: '2018–2022',
      html: "<a href=\"/me/\">Neurowetenskap na CS</a>: halfpad deur my neurowetenskap graad, een Intro to Software Engineering klas het die plan verander. Ek het my hoofvak verander en elke engineering klas geneen wat ek kon.",
    },
    {
      range: '2021–2025',
      html: "<a href=\"/resume/#atos-software-engineer\">Sagteware-ingenieur</a>: ek het internskap gedoen, toe die voorkant van 'n <a href=\"https://www.mitel.com/products/virtual-care-collaboration-service\">WebRTC mediese platform</a> besit. 'n Liefde vir Jenkins, nou het oor by GitHub Actions gewin, en geen idee hoe Kubernetes werk nie, het my na DevOps gestuur.",
    },
    {
      range: '2025–nou',
      html: "<a href=\"/resume/#crunchyroll-core-infrastructure\">DevOps, kern-infrastruktuur</a>: bou infrastruktuurkomponente en CI/CD-werkvloeie, en mense help om suksesvol te wees. As dit nie pret klink nie, <a href=\"{{linkedIn}}\">kom ons praat</a> hopelik ek kan jou gedagte verandering.",
    },
  ],
} as const
