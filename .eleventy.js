const pluginRss = require("@11ty/eleventy-plugin-rss");
const util = require("util");

module.exports = function (eleventyConfig) {
  // RSS
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy("build/libs");
  eleventyConfig.addPassthroughCopy("build/style.css");
  eleventyConfig.addPassthroughCopy("build/drawing-parallel-lines-on-a-map");
  eleventyConfig.addPassthroughCopy("build/canvas-lines");
  eleventyConfig.addPassthroughCopy("build/interactive-slides-website");
  eleventyConfig.addPassthroughCopy(
    "build/working-with-nyc-mta-realtime-subway-data"
  );
  eleventyConfig.addPassthroughCopy("build/crossword");
  eleventyConfig.addPassthroughCopy("build/ait");
  eleventyConfig.addPassthroughCopy("build/hash-state-example");
  eleventyConfig.addPassthroughCopy("build/imessage-url-state-example");

  // Collections:
  eleventyConfig.addCollection("allTopLevel", async function (collectionApi) {
    const all = collectionApi.getAll();
    const allTopLevel = all.filter((i) => {
      const slashes = i.url.split("").filter((j) => j === "/");
      if (slashes.length === 2) {
        return true;
      }
      return false;
    });
    const namePromises = await allTopLevel.map(async (i) => {
      const _inputContent = i.template.inputContent;
      const inputContent = await _inputContent;
      const titleIndex = inputContent?.indexOf("<title>") + 7;
      const titleEndIndex = inputContent?.indexOf("</title>");
      i.name = inputContent.substring(titleIndex, titleEndIndex);
      i.readableDate = !!i.data.date
        ? new Date(i.data.date ?? 0).toDateString()
        : "";
      i.all = util.inspect(i);

      return i;
    });
    await Promise.all(namePromises);
    allTopLevel.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return allTopLevel;
  });

  return {
    dir: {
      input: "build",
      output: "dist",
    },
    templateFormats: [
      "html",
      "md",
      // "css",
      "hbs",
      "njk",
      // 'gif',
      // 'jpg',
      // 'jpeg',
      // 'png',
      // 'mp3',
      // 'mp4',
      // 'pdf'
    ],
  };
};

// const test = {
//   template: {
//     _config: {
//       userConfig: [UserConfig],
//       overrides: {},
//       projectConfigPaths: ["Array"],
//       customRootConfig: null,
//       rootConfig: ["Object"],
//       hasConfigMerged: true,
//       logger: [ConsoleLogger],
//       _usesGraph: [GlobalDependencyMap],
//       config: ["Object"],
//       verbose: true,
//     },
//     _configOptions: {
//       pathPrefix: "/",
//       markdownTemplateEngine: "liquid",
//       htmlTemplateEngine: "liquid",
//       htmlOutputSuffix: "-o",
//       dataFileSuffixes: ["Array"],
//       dataFileDirBaseNameOverride: false,
//       keys: ["Object"],
//       dir: ["Object"],
//       handlebarsHelpers: ["Object"],
//       nunjucksFilters: ["Object"],
//       templateFormats: ["Array"],
//       transforms: {},
//       linters: {},
//       globalData: {},
//       layoutAliases: {},
//       layoutResolution: true,
//       passthroughCopies: ["Object"],
//       liquidOptions: ["Object"],
//       liquidTags: {},
//       liquidFilters: ["Object"],
//       liquidShortcodes: {},
//       liquidPairedShortcodes: {},
//       nunjucksEnvironmentOptions: {},
//       nunjucksPrecompiledTemplates: {},
//       nunjucksAsyncFilters: ["Object"],
//       nunjucksTags: {},
//       nunjucksGlobals: {},
//       nunjucksAsyncShortcodes: {},
//       nunjucksShortcodes: {},
//       nunjucksAsyncPairedShortcodes: {},
//       nunjucksPairedShortcodes: {},
//       handlebarsShortcodes: {},
//       handlebarsPairedShortcodes: {},
//       javascriptFunctions: ["Object"],
//       pugOptions: {},
//       ejsOptions: {},
//       markdownHighlighter: null,
//       libraryOverrides: {},
//       dynamicPermalinks: true,
//       useGitIgnore: true,
//       ignores: [Set],
//       watchIgnores: [Set],
//       dataDeepMerge: true,
//       watchJavaScriptDependencies: true,
//       additionalWatchTargets: [],
//       serverOptions: {},
//       chokidarConfig: {},
//       watchThrottleWaitTime: 0,
//       frontMatterParsingOptions: undefined,
//       dataExtensions: {},
//       extensionMap: {},
//       quietMode: false,
//       events: [AsyncEventEmitter],
//       benchmarkManager: [BenchmarkManager],
//       plugins: ["Array"],
//       useTemplateCache: true,
//       precompiledCollections: {},
//       dataFilterSelectors: {},
//       libraryAmendments: {},
//       serverPassthroughCopyBehavior: "copy",
//       urlTransforms: [],
//       uses: [GlobalDependencyMap],
//       inputDir: "build",
//     },
//     inputPath: "./build/imessage-url-state-example/index.html",
//     inputDir: "build",
//     parsed: {
//       root: "",
//       dir: "./build/imessage-url-state-example",
//       base: "index.html",
//       ext: ".html",
//       name: "index",
//     },
//     extraOutputSubdirectory: "",
//     outputDir: "dist",
//     _extensionMap: {
//       eleventyConfig: [],
//       _config: [],
//       formatKeys: [],
//       unfilteredFormatKeys: [],
//       _extensionToKeyMap: ["Object"],
//       validTemplateLanguageKeys: ["Array"],
//       passthroughCopyKeys: [],
//       _spiderJsDepsCache: ["Object"],
//       _engineManager: [TemplateEngineManager],
//     },
//     linters: [],
//     transforms: [],
//     templateData: {
//       eleventyConfig: ["TemplateConfig"],
//       config: ["Object"],
//       benchmarks: ["Object"],
//       inputDirNeedsCheck: false,
//       inputDir: "build",
//       dataDir: "build/_data",
//       rawImports: ["Object"],
//       globalData: [Promise],
//       templateDirectoryData: ["Object"],
//       _fsExistsCache: [FSExistsCache],
//       initialGlobalData: [TemplateDataInitialGlobalData],
//       _extensionMap: [EleventyExtensionMap],
//       _env: ["Object"],
//       fileSystemSearch: [FileSystemSearch],
//       configApiGlobalData: [Promise],
//       pathCache: [],
//     },
//     isVerbose: true,
//     isDryRun: false,
//     writeCount: 0,
//     fileSlug: {
//       inputPath: "imessage-url-state-example/index.html",
//       cleanInputPath: "imessage-url-state-example/index.html",
//       dirs: ["Array"],
//       parsed: ["Object"],
//       filenameNoExt: "index",
//     },
//     fileSlugStr: "imessage-url-state-example",
//     filePathStem: "/imessage-url-state-example/index",
//     outputFormat: "fs",
//     behavior: {
//       render: true,
//       write: true,
//       outputFormat: "fs",
//       config: ["Object"],
//     },
//     serverlessUrls: null,
//     _logger: { _isVerbose: true, outputStream: [Readable] },
//     _templateRender: {
//       eleventyConfig: ["TemplateConfig"],
//       _config: ["TemplateConfig"],
//       engineNameOrPath: "./build/imessage-url-state-example/index.html",
//       inputDir: "build",
//       includesDir: "build/_includes",
//       parseMarkdownWith: "liquid",
//       parseHtmlWith: "liquid",
//       _extensionMap: [EleventyExtensionMap],
//       _engineName: "html",
//       _engine: [Html],
//       useMarkdown: true,
//     },
//     _frontMatter: {
//       content:
//         "\n" +
//         "<!DOCTYPE html>\n" +
//         '<html lang="en">\n' +
//         " <head>\n" +
//         " <title>iMessage Safe URL Stored Color Palette Example</title>\n" +
//         "\n" +
//         ' <meta charset="utf-8" />\n' +
//         ' <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n' +
//         ' <meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
//         "\n" +
//         " <meta\n" +
//         ' name="description"\n' +
//         ' content="iMessage Safe URL Stored Color Palette Example"\n' +
//         " />\n" +
//         " <link\n" +
//         ' rel="icon"\n' +
//         ' href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧮</text></svg>"\n' +
//         " />\n" +
//         "\n" +
//         " <!-- Social -->\n" +
//         " <meta\n" +
//         ' property="og:title"\n' +
//         ' content="iMessage Safe URL Stored Color Palette Example"\n' +
//         " />\n" +
//         " <meta\n" +
//         ' property="og:description"\n' +
//         ' content="An app that stores 3 colors in the URL"\n' +
//         " />\n" +
//         " <meta\n" +
//         ' property="og:image"\n' +
//         ' content="https://doodles.patrickweaver.net/imessage-url-state-example/preview.png"\n' +
//         " />\n" +
//         "\n" +
//         " <!-- Twitter -->\n" +
//         ' <meta name="twitter:card" content="summary" />\n' +
//         ' <meta name="twitter:site" content="@patrickweave_r" />\n' +
//         ' <meta name="twitter:creator" content="@patrickweave_r" />\n' +
//         ' <meta name="twitter:title" content="iMessage Compatible URL State App" />\n' +
//         " <meta\n" +
//         ' name="twitter:description"\n' +
//         ' content="An app that stores 3 colors in the URL"\n' +
//         " />\n" +
//         " <meta\n" +
//         ' name="twitter:image"\n' +
//         ' content="https://doodles.patrickweaver.net/imessage-url-state-example/preview.png"\n' +
//         " />\n" +
//         ' <meta name="twitter:image:alt" content="An screenshot of the app" />\n' +
//         ' <link rel="stylesheet" href="style.css" />\n' +
//         " </head>\n" +
//         " <body>\n" +
//         ' <div id="app">\n' +
//         " <header>\n" +
//         " <h1>iMessage Safe URL Stored Color Palette Example</h1>\n" +
//         " </header>\n" +
//         ' <div id="loading">\n' +
//         " <h1>Loading!</h1>\n" +
//         " <h2>Loading!</h2>\n" +
//         " <h3>Loading!</h3>\n" +
//         " </div>\n" +
//         " </div>\n" +
//         " <noscript>\n" +
//         " <h1>JavaScript Required</h1>\n" +
//         " <p>Enable JavaScript to use this App</p>\n" +
//         ' <p><a href="/">Back to Index</a></p>\n' +
//         " </noscript>\n" +
//         " </body>\n" +
//         ' <script src="/libs/react@18.2.0.production.min.js"></script>\n' +
//         ' <script src="/libs/react-dom@18.2.0.production.min.js"></script>\n' +
//         ' <script src="/libs/babel@7.23.9.min.js"></script>\n' +
//         "\n" +
//         ' <script type="text/babel" src="client.js"></script>\n' +
//         "</html>\n",
//       data: ["Object"],
//       isEmpty: false,
//       excerpt: "",
//     },
//     _stats: { a: ["Stats"] },
//     _usePermalinkRoot: undefined,
//     inputContent: {
//       title: "iMessage Safe URL Stored Color Palette Example\n",
//       d:
//         "Feb 5, 2024 🎈🎈🎈🎈🎈\n" +
//         "---\n" +
//         "\n" +
//         "<!DOCTYPE html>\n" +
//         '<html lang="en">\n' +
//         " <head>\n" +
//         " <title>iMessage Safe URL Stored Color Palette Example</title>\n" +
//         "\n" +
//         ' <meta charset="utf-8" />\n' +
//         ' <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n' +
//         ' <meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
//         "\n" +
//         " <meta\n" +
//         ' name="description"\n' +
//         ' content="iMessage Safe URL Stored Color Palette Example"\n' +
//         " />\n" +
//         " <link\n" +
//         ' rel="icon"\n' +
//         ' href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧮</text></svg>"\n' +
//         " />\n" +
//         "\n" +
//         " <!-- Social -->\n" +
//         " <meta\n" +
//         ' property="og:title"\n' +
//         ' content="iMessage Safe URL Stored Color Palette Example"\n' +
//         " />\n" +
//         " <meta\n" +
//         ' property="og:description"\n' +
//         ' content="An app that stores 3 colors in the URL"\n' +
//         " />\n" +
//         " <meta\n" +
//         ' property="og:image"\n' +
//         ' content="https://doodles.patrickweaver.net/imessage-url-state-example/preview.png"\n' +
//         " />\n" +
//         "\n" +
//         " <!-- Twitter -->\n" +
//         ' <meta name="twitter:card" content="summary" />\n' +
//         ' <meta name="twitter:site" content="@patrickweave_r" />\n' +
//         ' <meta name="twitter:creator" content="@patrickweave_r" />\n' +
//         ' <meta name="twitter:title" content="iMessage Compatible URL State App" />\n' +
//         " <meta\n" +
//         ' name="twitter:description"\n' +
//         ' content="An app that stores 3 colors in the URL"\n' +
//         " />\n" +
//         " <meta\n" +
//         ' name="twitter:image"\n' +
//         ' content="https://doodles.patrickweaver.net/imessage-url-state-example/preview.png"\n' +
//         " />\n" +
//         ' <meta name="twitter:image:alt" content="An screenshot of the app" />\n' +
//         ' <link rel="stylesheet" href="style.css" />\n' +
//         " </head>\n" +
//         " <body>\n" +
//         ' <div id="app">\n' +
//         " <header>\n" +
//         " <h1>iMessage Safe URL Stored Color Palette Example</h1>\n" +
//         " </header>\n" +
//         ' <div id="loading">\n' +
//         " <h1>Loading!</h1>\n" +
//         " <h2>Loading!</h2>\n" +
//         " <h3>Loading!</h3>\n" +
//         " </div>\n" +
//         " </div>\n" +
//         " <noscript>\n" +
//         " <h1>JavaScript Required</h1>\n" +
//         " <p>Enable JavaScript to use this App</p>\n" +
//         ' <p><a href="/">Back to Index</a></p>\n' +
//         " </noscript>\n" +
//         " </body>\n" +
//         ' <script src="/libs/react@18.2.0.production.min.js"></script>\n' +
//         ' <script src="/libs/react-dom@18.2.0.production.min.js"></script>\n' +
//         ' <script src="/libs/babel@7.23.9.min.js"></script>\n' +
//         "\n" +
//         ' <script type="text/babel" src="client.js"></script>\n' +
//         "</html>\n",
//     },
//     readingPromise: { a: ["Object"] },
//     _frontMatterDataCache: { a: ["Object"] },
//     _dataCache: {
//       eleventy: ["Object"],
//       pkg: ["Object"],
//       title: "iMessage Safe URL Stored Color Palette Example",
//       d: "Feb 5, 2024 🎈🎈🎈🎈🎈",
//       page: ["Object"],
//       collections: ["Object"],
//     },
//   },
//   data: {
//     eleventy: {
//       version: "2.0.1",
//       generator: "Eleventy v2.0.1",
//       env: ["Object"],
//     },
//     pkg: {
//       name: "doodles",
//       version: "1.0.0",
//       description: "A personal website made with eleventy",
//       main: "server.js",
//       scripts: ["Object"],
//       dependencies: ["Object"],
//       engines: ["Object"],
//       repository: ["Object"],
//       license: "MIT",
//     },
//     title: "iMessage Safe URL Stored Color Palette Example",
//     d: "Feb 5, 2024 🎈🎈🎈🎈🎈",
//     page: {
//       date: "2024-02-05T19:01:21.500Z",
//       inputPath: "./build/imessage-url-state-example/index.html",
//       fileSlug: "imessage-url-state-example",
//       filePathStem: "/imessage-url-state-example/index",
//       outputFileExtension: "html",
//       templateSyntax: "liquid",
//       url: "/imessage-url-state-example/",
//       outputPath: "dist/imessage-url-state-example/index.html",
//     },
//     collections: { all: ["Array"] },
//   },
//   page: {
//     date: "2024-02-05T19:01:21.500Z",
//     inputPath: "./build/imessage-url-state-example/index.html",
//     fileSlug: "imessage-url-state-example",
//     filePathStem: "/imessage-url-state-example/index",
//     outputFileExtension: "html",
//     templateSyntax: "liquid",
//     url: "/imessage-url-state-example/",
//     outputPath: "dist/imessage-url-state-example/index.html",
//   },
//   inputPath: "./build/imessage-url-state-example/index.html",
//   fileSlug: "imessage-url-state-example",
//   filePathStem: "/imessage-url-state-example/index",
//   date: "2024-02-05T19:01:21.500Z",
//   outputPath: "dist/imessage-url-state-example/index.html",
//   url: "/imessage-url-state-example/",
//   templateContent: [Getter / Setter],
//   content: [Getter],
//   name: "iMessage Safe URL Stored Color Palette Example",
//   readableDate: "Mon Feb 05 2024",
// };
