const filename = process.env["TYPE"] ? `js/${process.env["TYPE"]}.js` : "js/app.js"
const type = process.env["TYPE"]
module.exports = {
  publicPath: process.env.NODE_ENV === 'flask' ? '/' : '/annona/tools',
  filenameHashing: false,
  configureWebpack: config => {
    config.output.filename = filename,
    optimization = {
      runtimeChunk: 'single',
    }

  },
  chainWebpack:
    config => {
      type ? config.optimization.delete('splitChunks') : ''
    }
}
