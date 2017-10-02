import babel       from "rollup-plugin-babel"
import commonjs    from "rollup-plugin-commonjs"
import nodeResolve from "rollup-plugin-node-resolve"
import replace     from "rollup-plugin-replace"
import uglify      from "rollup-plugin-uglify"

export default {
  plugins: [
    process.env.NODE_ENV && replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        "node_modules/react-dom/index.js": [
          "render",
        ],
        "node_modules/react/index.js": [
          "Component",
          "createElement"
        ],
        "node_modules/kefir/dist/kefir.js": [
          "Observable",
          "Property",
          "Stream",
          "combine",
          "concat",
          "constant",
          "fromEvents",
          "interval",
          "later",
          "merge",
          "never"
        ]
      }
    }),
    babel(),
    process.env.NODE_ENV === "production" && uglify({
      compress: {
        passes: 3
      }
    })
  ].filter(x => x)
}
