export default () => {
  function GoToEnglishVersion() {
    return (
      <a
        class="go-to-english-version"
        title="Go to English version"
        aria-label="Go to English version"
        href="#english-version"
      >
        <img
          height="20"
          width="20"
          src="/static/us.png"
          alt="Flag of the United States of America"
        />
        go to en-US version
      </a>
    );
  }

  GoToEnglishVersion.css = `
    .go-to-english-version {
      display: flex;
      align-items: center;

      margin-top: 1rem;

      img {
        margin: 0 .5rem 0 0;
      }
    }
  `;

  return GoToEnglishVersion;
};
