const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // RSS
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy("build/style.css");
  eleventyConfig.addPassthroughCopy("build/drawing-parallel-lines-on-a-map");
  eleventyConfig.addPassthroughCopy("build/canvas-lines");
  eleventyConfig.addPassthroughCopy("build/interactive-slides-website");
  eleventyConfig.addPassthroughCopy(
    "build/working-with-nyc-mta-realtime-subway-data"
  );
  eleventyConfig.addPassthroughCopy("build/crossword");
  eleventyConfig.addPassthroughCopy("build/ait");

  // Collections:
  eleventyConfig.addCollection("allTopLevel", function (collectionApi) {
    const all = collectionApi.getAll();
    const allTopLevel = all.filter((i) => {
      const slashes = i.url.split("").filter((j) => j === "/");
      if (slashes.length === 2) {
        return true;
      }
      return false;
    });
    const allTopLevelWithName = allTopLevel.map((i) => {
      const inputContent = i.template.inputContent;
      const titleIndex = inputContent.indexOf("<title>") + 7;
      const titleEndIndex = inputContent.indexOf("</title>");

      i.data.name = inputContent.substring(titleIndex, titleEndIndex);
      return i;
    });
    console.log(allTopLevelWithName[0].data);
    return allTopLevelWithName;
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
