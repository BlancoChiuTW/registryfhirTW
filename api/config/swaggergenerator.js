module.exports['swagger-generator'] = {
  disabled: false,
  swaggerJsonPath: './assets/swagger.json',
  swagger: {
      openapi: '3.0.0',
      info: {
          title: 'TW Open IG Registry API Documentation',
          description: '這是 TW Open IG Registry 的 API 文件，若有任何問題請聯絡 Lorex。',
          contact: {name: '', url: '', email: ''},
          license: {name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html'},
          version: '1.0.0'
      },
      servers: [
          { url: 'http://localhost:1337/' }
      ],
      externalDocs: { url: ''},
  },
  defaults: {
      responses: {
          '200': { description: 'The requested resource' },
          '400': { description: '資料檢核失敗' },
          '404': { description: '找不到資源' },
          '500': { description: '我掛了，請聯絡 Lorex' }
      }
  },
  // excludeDeprecatedPutBlueprintRoutes: true,
};