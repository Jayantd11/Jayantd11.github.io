import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' because this deploys to the user/organization page (jayantd11.github.io),
// which serves from the domain root. For a project repo, set base to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
