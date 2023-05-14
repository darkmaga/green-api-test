/// <reference types="vite/client" />

interface ImportMetaEnv {
  ID_INSTANCE: string
  API_TOKEN_INSTANCE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
