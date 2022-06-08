const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

export default { //TODO this is a placeholder for a user-id to be determined from OAuth cookies
  g_user_id: string = '3'
}
