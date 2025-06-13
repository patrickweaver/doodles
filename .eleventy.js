const pluginRss = require("@11ty/eleventy-plugin-rss");
const handlebarsPlugin = require("@11ty/eleventy-plugin-handlebars");
const util = require("util");

module.exports = function (eleventyConfig) {
  // RSS
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(handlebarsPlugin);

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
