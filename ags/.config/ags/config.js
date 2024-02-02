import App from 'resource:///com/github/Aylur/ags/app.js'
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js'

// Building SCSS files

const scss = `${App.configDir}/scss/main.scss`
const css = `/tmp/ags/css/main.css`
try {
    await execAsync(`sass ${scss} ${css}`)
    console.log("Built Sass")
} catch (error) {
    console.log(error || "")
}

// Building Typescript files
const entry = `${App.configDir}/ts/main.ts`
const outdir = '/tmp/ags/js'

try {
    await execAsync([
        'bun', 'build', entry,
        '--outdir', outdir,
        '--external', 'resource://*',
        '--external', 'gi://*',
    ])
    console.log("Built TS")
} catch (error) {
    console.error(error || "")
}


const main = await import(`file://${outdir}/main.js`)
main.default.style = css

export default main.default
