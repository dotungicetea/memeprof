## Code organization

```
.
├── README.md                    # README file
├── next.config.js               # Next JS configuration
├── public                       # Public folder
│   └── assets                   # Images used by the app
├── types                        # Shared TypeScript interfaces
├── api                          # Generated API interfaces from Swagger
├── components                   # Shared components globally
│   └── X
│       └── X.tsx
│       └── index.ts
│       └── X.stories.tsx
│       └── X.test.tsx
│── app                          # Next JS pages
├── context                      # Shared context state
├── constants                    # Shared constants
├── hooks                        # Shared hooks
│   └── tests
│── styles                       # global styles folder
│   └── vendor                   # Third-party CSS
│── utils                        # Utility folder
│   └── getters
│── cypress                      # Cypress configuration and tests
├── tsconfig.json                # TypeScript configuration
├── .spectral.js                 # IBM OpenAPI Ruleset for Orval used on validating the rules for Swagger
└── orval.config.js              # Orval api generator configuration
```

### Develop UI components

The project integrates [Storybook](https://storybook.js.org/) to streamline UI
development.

```bash
yarn storybook
```

The UI document then should be live at
[http://localhost:6006](http://localhost:6006).

## Read on:

- [Home](README.md)
- [Tech ecosystem](./TECH_ECOSYSTEM.md)
- [Code style](./docs/CODE_STYLE.md)
- [Version control](./VERSION_CONTROL.md)
- [Writting test](./WRITING_TEST.md)
- [Deployment](./DEPLOYMENT.md)
