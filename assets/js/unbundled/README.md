# Unbundled page scripts

The readable JSX sources live in `src/`. The sibling `.js` files are
precompiled browser-ready copies so the HTML pages also work when opened
directly from the filesystem.

- `shared/`: tokens and primitives reused by multiple pages
- `create/`: content creation flow
- `detail/`: platform and producer content detail flows
- `performance/`: performance list/detail dashboard
