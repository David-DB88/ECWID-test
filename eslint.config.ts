import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import prettierConfig from 'eslint-config-prettier'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**', '**/.output/**'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.strict,
  prettierConfig,
  {

    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // I know you can't do that, but this is a test project, so I disabled the warning and added DOMPurify to check for disallowed tags. 
      "vue/no-v-html": "off",
    }
  }
)
