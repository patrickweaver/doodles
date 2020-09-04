const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  
  // RSS
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });
  
  
  return {
    dir: {
      input: "build",
      output: "dist"
    },
    templateFormats: [
      'md',
      'css',
      'js',
      'hbs',
      'njk',
      'gif',
      'jpg',
      'jpeg',
      'png',
      'mp3',
      'mp4',
      'pdf'
    ]
  }
};