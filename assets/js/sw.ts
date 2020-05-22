import { baseScript } from "./swbase";
class ServiceWorkerSource {
  static build(
    swFileName: string,
    manifestFileName: string,
    cacheName: string,
    _urlsToCache: Array<string>,
    _urlsIgnoredToCache: Array<string>
  ) {
    const urlsToCache = _urlsToCache.map((replaced) => {
      if (replaced.match(/^\/.*?\/[igmsuy]*/)) return replaced.replace(/^\/(.*?)\/([igmsuy]*)/g, "__REGEXP/$1/$2__");
      return replaced;
    });
    const urlsIgnoredToCache = _urlsIgnoredToCache.map((replaced) => {
      if (replaced.match(/^\/.*?\/[igmsuy]*/)) return replaced.replace(/^\/(.*?)\/([igmsuy]*)/g, "__REGEXP/$1/$2__");
      return replaced;
    });
    const stringFunction = baseScript
      .replace(/\n( {2})/gi, "\n")
      .replace("__SW_FILENAME__", swFileName)
      .replace("__MANIFEST_FILENAME__", manifestFileName)
      .replace(
        '"__URLS_TO_CACHE__"',
        JSON.stringify(urlsToCache)
          .replace(/\[|\]/g, "")
          .replace(/"__REGEXP(.*?)__"/g, "$1")
      )
      .replace(
        '"__URLS_IGNORED_TO_CACHE__"',
        JSON.stringify(urlsIgnoredToCache)
          .replace(/\[|\]/g, "")
          .replace(/"__REGEXP(.*?)__"/g, "$1")
      )
      .replace("__CACHE_NAME__", cacheName);
    return stringFunction;
  }
}

export { ServiceWorkerSource };
