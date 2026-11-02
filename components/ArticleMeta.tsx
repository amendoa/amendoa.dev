import * as Component from "../quartz/quartz/components";
import { QuartzComponentProps } from "../quartz/quartz/components/types";

export default () => {
  const ContentMeta = Component.ContentMeta();

  function ArticleMeta(props: QuartzComponentProps) {
    if (props.fileData.frontmatter?.aiAssisted !== true || !props.fileData.text) {
      return <ContentMeta {...props} />;
    }

    return (
      <div class="article-meta">
        <ContentMeta {...props} />
        <span aria-hidden="true">·</span>
        <a href="/ai">
          <svg class="ai-sparkles" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M7.5 1.5c.25 0 .46.17.51.41l.56 2.53a3.1 3.1 0 0 0 2.35 2.35l2.53.56a.52.52 0 0 1 0 1.02l-2.53.56a3.1 3.1 0 0 0-2.35 2.35l-.56 2.53a.52.52 0 0 1-1.02 0l-.56-2.53a3.1 3.1 0 0 0-2.35-2.35l-2.53-.56a.52.52 0 0 1 0-1.02l2.53-.56a3.1 3.1 0 0 0 2.35-2.35l.56-2.53a.52.52 0 0 1 .51-.41ZM13.25 1a.35.35 0 0 1 .34.28l.18.81a1 1 0 0 0 .76.76l.81.18a.35.35 0 0 1 0 .68l-.81.18a1 1 0 0 0-.76.76l-.18.81a.35.35 0 0 1-.68 0l-.18-.81a1 1 0 0 0-.76-.76l-.81-.18a.35.35 0 0 1 0-.68l.81-.18a1 1 0 0 0 .76-.76l.18-.81a.35.35 0 0 1 .34-.28Z" />
          </svg>
          AI-assisted writing
        </a>
      </div>
    );
  }

  ArticleMeta.css = `${ContentMeta.css ?? ""}
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 0.4em;
      color: var(--darkgray);
      margin-bottom: 1rem;
    }
    .article-meta .content-meta { margin: 0; }
    .article-meta a { display: inline-flex; align-items: center; gap: 0.3em; }
    .article-meta .ai-sparkles { width: 1em; height: 1em; flex: none; }
    .article-meta a:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  `;
  ArticleMeta.beforeDOMLoaded = ContentMeta.beforeDOMLoaded;
  ArticleMeta.afterDOMLoaded = ContentMeta.afterDOMLoaded;

  return ArticleMeta;
};
