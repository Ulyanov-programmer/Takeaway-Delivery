import fs from 'fs-extra'
import path from 'path'
import replace from 'replace-in-file'
import { log } from 'console'
import enquirer from 'enquirer'
import chalk from 'chalk'

class ImportModuleObject {
  moduleName
  htmlConnectSlug
  pathsToDelete

  constructor({ moduleName, htmlConnectSlug, pathsToDelete }) {
    this.moduleName = moduleName
    this.htmlConnectSlug = htmlConnectSlug
    this.pathsToDelete = pathsToDelete
  }
}
class ModuleObject {
  moduleName
  scriptFilesPaths
  styleFilesPath
  htmlFilesPaths
  htmlConnectStrings

  constructor({ moduleName, scriptFilesPaths, styleFilesPath, htmlFilesPaths, htmlConnectStrings }) {
    this.moduleName = moduleName
    this.scriptFilesPaths = scriptFilesPaths
    this.styleFilesPath = styleFilesPath
    this.htmlFilesPaths = htmlFilesPaths
    this.htmlConnectStrings = htmlConnectStrings
  }
}

const pathToProject = path.resolve('./'),
  distFolderName = `${pathToProject}/dist`,
  snippetsFolderName = `${pathToProject}/snippets`,
  readmeFolder = `${pathToProject}/readmeFiles`,
  src = `${pathToProject}/src`,
  scriptModules = `${src}/scripts/modules/`,
  scriptGeneral = `${src}/scripts/`,
  stylesModules = `${src}/styles/modules/`,
  componentsFolder = `${src}/components/`,
  phpFolder = `${src}/php/`,
  libsFolder = `${src}/libs/`,
  environmentFilePath = `${src}/styles/_environment.pcss`,
  generalStyleFilePath = `${src}/styles/general/general.pcss`,
  layoutFilePath = `${componentsFolder}/layout.html`,

  fontsGitkeep = `${src}/fonts/.gitkeep`,
  mainStyleFile = `${src}/styles/index.pcss`,
  modulesStyleFolder = `${src}/styles/modules`,
  mainHtmlFile = `${src}/index.html`,
  gulpFile = `${pathToProject}/gulpfile.js`,
  readmeFilePath = `${pathToProject}/README.md`,

  srcDemoFoldersAndFIles = [
    `${src}/docs`, `${src}/img/demo`,
  ],
  phpMailerFiles = [
    `${phpFolder}Exception.php`, `${phpFolder}mail.php`, `${phpFolder}PHPMailer.php`, `${phpFolder}SMTP.php`,
  ],
  // The extension of typescript source files.
  srcExt = '.src.ts'



log(chalk.green(`Salute!
In the process, you will have to use some keys, such as: 
${chalk.greenBright('↑')} (focus up),
${chalk.greenBright('↓')} (focus down),
${chalk.greenBright('← →')} (choosing between elements on the same line),
${chalk.greenBright('space')} (to select an option),
${chalk.greenBright('⭾')} (tab, to move to a next element, for example, in templates)
`))

await enquirer.toggle({
  message: chalk.italic('Any questions?'),
  enabled: chalk.magenta('Nope, i totally understand!'),
  disabled: chalk.magenta('Nope, i understand!'),
})

deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDist()
deleteGitKeep()

await setImportModules()
await setModules()
await setPhp()

deleteUnusedFolders()

log(chalk.greenBright(`
The configuration of files and folders is complete.
`))
log(chalk.magentaBright(`Now, i suggest you change the values of the main variables.
`))

await setGeneralVariables()

log(chalk.greenBright(`
=====================================================
          The setup is completely complete! 
          I wish You a successful job. 
                       🎆🎆🎆             
=====================================================
`
))



async function setImportModules() {
  await setImportModule(
    new ImportModuleObject({
      moduleName: `Just-validate`,
      htmlConnectSlug: `justValidate`,
      pathsToDelete: [
        `${src}/scripts/justValidate.js`,
        `${libsFolder}just-validate.production.min.js`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Slider Swiper`,
      htmlConnectSlug: `swiper`,
      pathsToDelete: [
        `${src}/scripts/sliders.ts`,
        `${libsFolder}swiper/`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Typed`,
      htmlConnectSlug: `typed`,
      pathsToDelete: [
        `${src}/scripts/typed.js`,
        `${libsFolder}typed.min.js`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Input Mask`,
      htmlConnectSlug: '',
      pathsToDelete: [
        `${libsFolder}inputmask.min.js`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Air Date Picker`,
      htmlConnectSlug: '',
      pathsToDelete: [
        `${libsFolder}air-datepicker/`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Photo Swipe`,
      htmlConnectSlug: `photoSwipe`,
      pathsToDelete: [
        `${src}/scripts/photoSwipe.ts`,
        `${libsFolder}photoswipe/`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `noUiSlider`,
      htmlConnectSlug: `noUiSlider`,
      pathsToDelete: [
        `${src}/scripts/nouislider.ts`,
        `${libsFolder}nouislider/`,
      ],
    })
  )
}
async function setModules() {
  await includeModuleByQuestion(
    new ModuleObject({
      moduleName: 'Burger-menu',
      scriptFilesPaths: [
        `${scriptModules}burgerMenu${srcExt}`,
        `${scriptGeneral}burgerMenu.ts`,
      ],
      styleFilesPath: `${stylesModules}burgerMenu.styl`,
      htmlFilesPaths: [
        `${componentsFolder}burgerMenu.html`,
      ],
      htmlConnectStrings: [
        {
          path: `${componentsFolder}/header.html`,
          strings: `<x-burgerMenu></x-burgerMenu>`,
        },
        {
          strings: "burgerMenu='false'",
        },
      ],
    }),
    new ModuleObject({
      moduleName: 'Sidebar',
      scriptFilesPaths: [
        `${scriptModules}sidebar${srcExt}`,
        `${scriptGeneral}sidebar.ts`,
      ],
      styleFilesPath: `${stylesModules}sidebar.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "sidebar='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Modal-Window',
      scriptFilesPaths: [
        `${scriptModules}modalWindow${srcExt}`,
        `${scriptGeneral}modalWindow.ts`,
      ],
      styleFilesPath: `${stylesModules}modalWindows.styl`,
      htmlFilesPaths: [
        `${componentsFolder}modals.html`,
      ],
      htmlConnectStrings: [
        {
          strings: `<x-modals></x-modals>`,
        },
        {
          strings: "modalWindow='false'"
        },
      ],
    }),
    new ModuleObject({
      moduleName: 'Spoilers',
      scriptFilesPaths: [
        `${scriptModules}spoiler${srcExt}`,
        `${scriptGeneral}spoiler.ts`,
      ],
      styleFilesPath: `${stylesModules}spoiler.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "spoiler='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Submenu',
      scriptFilesPaths: [
        `${scriptModules}submenu${srcExt}`,
        `${scriptGeneral}submenu.ts`,
      ],
      styleFilesPath: `${stylesModules}submenu.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "submenu='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Tabs',
      scriptFilesPaths: [
        `${scriptModules}tab${srcExt}`,
        `${scriptGeneral}tab.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "tabs='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Element-modal',
      scriptFilesPaths: [
        `${scriptModules}elementModal${srcExt}`,
        `${scriptGeneral}elementModal.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "elementModal='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Parallax',
      scriptFilesPaths: [
        `${scriptModules}parallax${srcExt}`,
        `${scriptGeneral}parallax.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "parallax='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'ScrollToElement',
      scriptFilesPaths: [
        `${scriptModules}scrollToElement${srcExt}`,
        `${scriptGeneral}scrollToElement.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "scrollToElement='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Animations by scroll',
      scriptFilesPaths: [
        `${scriptModules}animateByScroll${srcExt}`,
        `${scriptGeneral}animateByScroll.ts`,
        `${scriptGeneral}scroll-timeline.js`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "animateByScroll='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Horizontal scroll',
      scriptFilesPaths: [
        `${scriptGeneral}horizontalScroll.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "horizontalScroll='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Swipe module (required to switch a sidebar by swipe)',
      scriptFilesPaths: [
        `${scriptModules}swipe${srcExt}`,
        `${scriptGeneral}swipe.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "swipe='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Form styles',
      scriptFilesPaths: [],
      styleFilesPath: `${stylesModules}form.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "formStyles='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Step By Step block',
      scriptFilesPaths: [
        `${scriptModules}stepByStepBlock${srcExt}`,
        `${scriptGeneral}stepByStepBlock.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "stepByStep='false'" }
      ],
    }),
  )
}
async function setPhp() {
  let phpAnswer = await enquirer.toggle({
    message: `Include ${chalk.blueBright('PHP scripts')}?`,
    enabled: chalk.green('Yes!'),
    disabled: chalk.red('Not'),
  })

  if (phpAnswer == false) {
    await fs.remove(phpFolder)
    return
  }


  let phpMailerAnswer = await enquirer.toggle({
    message: `Include ${chalk.blueBright('PHP - mailer')}?`,
    enabled: chalk.green('Yes!'),
    disabled: chalk.red('Not'),
  })

  if (phpMailerAnswer == false) {
    for (let phpMailerFile of phpMailerFiles) {
      await fs.remove(phpMailerFile)
    }
  }
}
async function setGeneralVariables() {
  await setVariable({
    snippetName: 'htmlLayout',
    message: chalk.magentaBright('Fill out the fields in the html-layout.'),
    variableFilePath: layoutFilePath,
    fields: [
      { name: 'mainLangOfPages', initial: 'en' },
      { name: 'IndexPageTitle', initial: 'Unnamed page', },
      { name: 'preloadedFontFIlename', initial: 'none', },
    ],
    template:
      `// Set the main language of pages below.
    lang: '\${mainLangOfPages}',
    // Set the title of the index page below.
    title: props.title || '\${IndexPageTitle}',
    // Set a name for a preloaded font. Must be a file name without extension.
    preloadedFontName: '\${preloadedFontFIlename}',`
  })

  await setVariable({
    snippetName: 'stylesheetVariables',
    message: chalk.magentaBright('Fill out the general stylesheet variables.'),
    variableFilePath: generalStyleFilePath,
    fields: [
      { name: 'mainFontName', initial: 'arial', },
      { name: 'mainTextColor', initial: 'black', },
      { name: 'backgroundColor', initial: 'white', },
    ],
    template:
      `--main-font-family: \${mainFontName};
  --text-c: \${mainTextColor};
  --bg: \${backgroundColor};`
  })

  await setVariable({
    snippetName: 'stylesheetSassLikeVariables',
    message: chalk.magentaBright('Fill out the general... Sass-like stylesheet variables.'),
    variableFilePath: environmentFilePath,
    fields: [
      { name: 'widthOfYourDesignLayout', initial: '1440px', },
      { name: 'minimalWidthOfYourDesign', initial: '320px', },
      { name: 'mainSize', initial: '16px', },
      { name: 'minSize', initial: '12px', },
    ],
    template:
      `$layoutWidth: \${widthOfYourDesignLayout};
$minLayoutWidth: \${minimalWidthOfYourDesign};
$mainFontSize: \${mainSize};
$minFontSize: \${minSize};`
  })

  await setVariable({
    snippetName: 'mediaContentWidthVariables',
    message: chalk.magentaBright('Fill out the content width variables.'),
    variableFilePath: generalStyleFilePath,
    fields: [
      { name: 'bigWidth', initial: '70vw', },
      { name: 'defaultWidth', initial: '80vw', },
      { name: 'tabletsWidth', initial: '90vw', },
      { name: 'mobileWidth', initial: '95vw', },
    ],
    template:
      `/* ? The width of the site content with the width of the viewport is more than the width of a design. */
  --bigViewportContentWidth: \${bigWidth};
    /* The width of the site content with the width of the viewport equal to the width of a design. */
  --defaultViewportContentWidth: \${defaultWidth};
    /* The width of the site content with the width of the viewport equal to tablets. */
  --tabletsViewportContentWidth: \${tabletsWidth};
    /* The width of the site content with the width of the viewport equal to smartphones. */
  --mobileViewportContentWidth: \${mobileWidth};`
  })
}

function deleteDemoContent() {
  for (let pathToDemo of srcDemoFoldersAndFIles) {
    deleteFolder(pathToDemo)
  }

  log(chalk.gray.italic('✅ The demo content have been deleted.'))
}
function cleanReadmeFilesAndFolders() {
  deleteFolder(readmeFolder, 'The readme folder have been deleted.')
  deleteFolder(readmeFilePath)
  fs.createFileSync('README.md')

  log(chalk.gray.italic('✅ The readme file are clean.'))
}
function deleteDist() {
  deleteFolder(distFolderName, 'Dist have been deleted.')
}
function deleteSnippets() {
  deleteFolder(snippetsFolderName, 'Snippets have been deleted.')
}
function deleteGitKeep() {
  deleteFolder(fontsGitkeep, 'Gitkeep have been deleted.')
}
function deleteUnusedFolders() {
  if (isFolderEmpty(modulesStyleFolder)) {
    deleteFolder(modulesStyleFolder)
  }
  if (isFolderEmpty(phpFolder)) {
    deleteFolder(phpFolder)
  }
  if (isFolderEmpty(libsFolder)) {
    deleteFolder(libsFolder)
  }

  log(chalk.gray.italic('✅ Unused folders have been deleted.'))
}

async function setImportModule(...importModuleObjects) {
  let answers = await enquirer.multiselect({
    name: 'value',
    message: chalk.magentaBright('Do you want to import the plugin...'),
    limit: 5,
    choices: importModuleObjects.map(function (module) {
      return {
        name: module.moduleName, value: module.moduleName,
      }
    }),

    footer: () => chalk.gray.italic('use ↑ and ↓ to switch, you can "scroll" this list')
  })


  for (let module of importModuleObjects) {
    let confirmedModuleName = answers.find(answer => answer == module.moduleName)

    if (confirmedModuleName) {
      if (module.htmlConnectSlug == false) continue

      replace.sync({
        files: mainHtmlFile,
        from: `${module.htmlConnectSlug}='false'`,
        to: `${module.htmlConnectSlug}='true'`,
      })
    }
    else {
      if (module.htmlConnectSlug == false) continue

      replace.sync({
        files: mainHtmlFile,
        from: `${module.htmlConnectSlug}='false'`,
        to: '',
      })

      for (let pathToDelete of module.pathsToDelete) {
        fs.removeSync(pathToDelete)
      }
    }
  }
}

async function includeModuleByQuestion(...moduleObjects) {
  let answers = await enquirer.multiselect({
    name: 'value',
    message: chalk.magentaBright('Do you want to include the module...'),
    limit: 5,
    choices: moduleObjects.map(function (module) {
      return {
        name: module.moduleName, value: module.moduleName,
      }
    }),

    footer: () => chalk.gray.italic('use ↑ and ↓ to switch, you can "scroll" this list')
  })


  for (let module of moduleObjects) {
    let confirmedModuleName = answers.find(answer => answer == module.moduleName)

    if (confirmedModuleName) {
      replaceHtmlConnectionString(module.htmlConnectStrings, 'false', 'true')
    }
    else {
      if (module.scriptFilesPaths.length > 0) {
        for (let scriptPath of module.scriptFilesPaths) {
          fs.removeSync(scriptPath)
        }
      }

      if (module.styleFilesPath) {
        fs.removeSync(module.styleFilesPath)
      }

      if (module.htmlFilesPaths != undefined && module.htmlFilesPaths.length > 0) {
        for (let htmlPath of module.htmlFilesPaths) {
          fs.removeSync(htmlPath)
        }
      }

      replaceHtmlConnectionString(module.htmlConnectStrings)
    }
  }
}

function replaceHtmlConnectionString(htmlConnectStrings, replacedValue, replacedNewValue) {
  if (htmlConnectStrings == undefined)
    return

  for (let htmlConnectStringData of htmlConnectStrings) {
    if (htmlConnectStringData.path == undefined)
      htmlConnectStringData.path = mainHtmlFile


    let newHtmlConnectString

    if (replacedValue == undefined || replacedNewValue == undefined) {
      newHtmlConnectString = ''
    } else {
      newHtmlConnectString = htmlConnectStringData.strings.replace(replacedValue, replacedNewValue)
    }

    replace.sync({
      files: htmlConnectStringData.path,
      from: htmlConnectStringData.strings, to: newHtmlConnectString,
    })
  }
}

function deleteFolder(folderPath, messageOnSuccessful) {
  try {
    fs.removeSync(folderPath)

    if (messageOnSuccessful)
      log(chalk.gray.italic('✅ ' + messageOnSuccessful))

  } catch (error) {
    log(chalk.red('❌ ' + error))
  }
}
function isFolderEmpty(path) {
  try {
    return fs.readdirSync(path).length == 0
  } catch (error) {
    return false
  }
}

async function setVariable({ fields, message, template, snippetName, variableFilePath }) {
  let result = await enquirer.snippet({
    name: snippetName,
    message: message + '\n',
    required: true,
    fields: fields,
    template: template,

    footer: () => chalk.gray.italic("use tab to move, when you're done, press enter")
  })

  let formattedTemplate = replaceEnquirerTemplateValues(template, fields, result.values, true)
  let newTemplate = replaceEnquirerTemplateValues(template, fields, result.values)

  let templateStrings = formattedTemplate.split('\n')
  let newTemplateStrings = newTemplate.split('\n')

  for (let i = 0; i < templateStrings.length; i++) {
    await replace({
      files: variableFilePath,
      from: templateStrings[i],
      to: newTemplateStrings[i],
    })
  }
}

function replaceEnquirerTemplateValues(template, fields, values, replaceNamesToDefaults) {
  let newTemplate = template

  if (replaceNamesToDefaults) {
    for (let field of fields) {
      newTemplate = newTemplate.replaceAll(
        '${' + field.name + '}',
        field.initial ?? ''
      )
    }
  } else {
    for (let field of fields) {
      newTemplate = newTemplate.replaceAll(
        '${' + field.name + '}',
        values[field.name] ?? field.initial
      )
    }
  }

  return newTemplate
}