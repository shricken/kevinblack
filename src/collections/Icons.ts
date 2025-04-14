import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Icons: CollectionConfig = {
  slug: 'icons',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'iconName',
  },
  fields: [
    {
      name: 'iconName',
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        'adobe-illustrator',
        'adobe-photoshop',
        'algolia',
        'bitbucket',
        'browserstack',
        'chatgpt',
        'confluence',
        'css3',
        'drupal',
        'figma',
        'gatsby',
        'git',
        'github',
        'html5',
        'javascript',
        'jetbrains',
        'jira',
        'nextjs',
        'react',
        'salesforce',
        'sass',
        'tailwindcss',
        'typescript',
        'vercel',
        'vscode',
        'webpack',
      ],
      required: false,
    },
  ],
}
