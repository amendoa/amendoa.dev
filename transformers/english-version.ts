import { QuartzTransformerPlugin } from "../quartz/quartz/plugins/types";

export const EnglishVersion: QuartzTransformerPlugin = () => {
  return {
    name: "EnglishVersion",
    textTransform(_, src) {
      return src.replace(
        /<!-- english-version -->/,
        '<p id="english-version" style="display: flex; align-items: center; font-style: italic;"><img style="margin: 0 .5rem 0 0;" height="20" width="20" src="/static/us.png" alt="Flag of the United States of America" />en-US version</p>',
      );
    },
  };
};
