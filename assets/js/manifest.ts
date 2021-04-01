class ImageResource {
  src: string = "";
  sizes: string = "";
  type?: string = "";
  purpose?: string;
  platform?: string;
}

class ScreenshotResource {
  src: string = "";
  sizes: string = "";
  type?: string = "";
}

class WebAppManifest {
  public name: string = "";
  public shortName?: string;
  public description?: string;
  public display: "fullscreen" | "standalone" | "minimal-ui" | "browser" = "standalone";
  public icons: ImageResource[] = [];
  public screenshots: ScreenshotResource[] = [];
  public startUrl: string = "/";
  public themeColor?: string = "#ffffff";
  public backgroundColor?: string = "#ffffff";
}

export { ImageResource, ScreenshotResource, WebAppManifest };
