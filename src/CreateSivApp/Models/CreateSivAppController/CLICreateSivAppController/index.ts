import * as Listr from 'listr'
import * as path from 'path'
import { CreateSivAppContext } from '../../..'
import { IDownloadedTemplateCacher } from '../../../Cachers/DownloadedTemplate'
import { BasicDownloadedTemplateCacher } from '../../../Cachers/DownloadedTemplate/BasicDownloadedTemplateCacher'
import { ICreateSivAppController } from '../../../Controller'
import { ITemplateDownloader } from '../../../Downloaders'
import { WWWTemplateDownloader } from '../../../Downloaders/WWWTemplateDownloader'
import { BasicCacheExtractor } from '../../../Extractors/Cache/BasicCacheExtracter'
import { BasicCacheLoader } from '../../../Loaders/Cache/BasicCacheLoader'
import { XcodeAppOpener } from '../../../Opener/App/XcodeAppOpener'
import { ArgumentAppNameProvider } from '../../../Providers/AppName/ArgumentAppNameProvider'
import { ProcessPlatformProvider } from '../../../Providers/Platform/ProcessPlatformProvider'
import { CLISelectVersionProvider } from '../../../Providers/SelectVersion/CLISelectVersionProvider'
import { CWDTargetDirectoryProvider } from '../../../Providers/TargetDirectory/CWDTargetDirectoryProvider'
import { CheckCache } from '../../../Utilities/Cache'
import { IsFileExists } from '../../../Utilities/FileSystem'
import { App } from '../../App'
import { Cache } from '../../Cache'
import { DownloadedTemplate } from '../../DownloadedTemplate'

interface TaskContext {
  cacheNotExists?: boolean
  donwloader?: ITemplateDownloader
  downloadedTemplate?: DownloadedTemplate
  cacher?: IDownloadedTemplateCacher
  cache?: Cache
}

export class CLICreateSivAppController implements ICreateSivAppController {
  async create(context: CreateSivAppContext) {
    const platform = new ProcessPlatformProvider().get()
    const appName = new ArgumentAppNameProvider().get(context)
    const selectVersion = await new CLISelectVersionProvider().get(context)
    const targetDirectory = await new CWDTargetDirectoryProvider().get()

    if (platform !== 'macOS') {
      context.command.error(`Platform ${platform} is not supported.`)
    }

    if (await IsFileExists(path.resolve(targetDirectory, appName))) {
      context.command.error(
        `Application ${appName} is already exists in ${targetDirectory}.`
      )
    }

    const tasks = new Listr<TaskContext>([
      {
        title: `Checking v${selectVersion} template`,
        async task(taskContext: TaskContext) {
          taskContext.cacheNotExists = !(await CheckCache(
            context.cacheDirectoryPath,
            selectVersion
          ))
        }
      },
      {
        enabled: (taskContext: TaskContext) => !!taskContext.cacheNotExists,
        title: 'Getting template',
        async task(taskContext: TaskContext) {
          const donwloader = new WWWTemplateDownloader(selectVersion, platform)

          try {
            taskContext.downloadedTemplate = await donwloader.download()
            // tslint:disable-next-line: no-unused
          } catch (error) {
            if (error.code === 'ENOTFOUND')
              context.command.error(
                'This device is not connected to the network.'
              )
            context.command.error('Error')
          }
        }
      },
      {
        enabled: (taskContext: TaskContext) => !!taskContext.cacheNotExists,
        title: 'Caching template',
        async task(taskContext: TaskContext, task) {
          if (!taskContext.downloadedTemplate) return
          const cacher = new BasicDownloadedTemplateCacher()
          cacher.on('progress', progress => {
            task.title = `Caching template ${progress.percentage.toFixed(1)}%`
          })
          taskContext.cache = await cacher.cache(
            context,
            taskContext.downloadedTemplate
          )
        }
      },
      {
        title: 'Loading cache',
        async task(taskContext: TaskContext) {
          const cacheLoader = new BasicCacheLoader(selectVersion)
          taskContext.cache = await cacheLoader.load(context)
        }
      },
      {
        title: 'Extracting template',
        async task(taskContext: TaskContext) {
          if (!taskContext.cache) return
          const extractor = new BasicCacheExtractor(targetDirectory, appName)
          await extractor.extract(context, taskContext.cache)
        }
      }
    ])

    await tasks.run()

    if (context.flags.open) {
      context.command.log('Opening application in editor')
      const app = new App(appName, path.resolve(targetDirectory, appName))
      if (platform === 'macOS') await new XcodeAppOpener().open(app)
    }

    context.command.log(`Success. Created ${appName} at ${targetDirectory}`)
  }
}
