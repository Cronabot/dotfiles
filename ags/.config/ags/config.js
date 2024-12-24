import App from 'resource:///com/github/Aylur/ags/app.js'
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js'

const outdir = "/tmp/ags"

// Building scss files
const scssdir = `${App.configDir}/scss`;

const updateStyles = async () => {
    try {
        await execAsync(`sass ${scssdir}/main.scss ${outdir}/css/main.css`)
        App.resetCss()
        App.applyCss(`${outdir}/css/main.css`)
    } catch (error) {
        console.log(error || "")
    }
}

await updateStyles()

Utils.monitorFile(scssdir, async () => {
    updateStyles()
})

// Building Typescript files
const entry = `${App.configDir}/ts/main.ts`

try {
    await execAsync([
        'bun', 'build', entry,
        '--outdir', `${outdir}/js`,
        '--external', 'resource://*',
        '--external', 'gi://*',
    ])
    await import(`file://${outdir}/js/main.js`)
    console.log("Built TS")
} catch (error) {
    console.error(error || "")
}

