class ImageResource {
  src: string = "";
  sizes: string = "";
  type?: string = "";
  purpose?: string;
  platform?: string;
}

class WebAppManifest {
  public name: string = "";
  public shortName?: string;
  public description?: string;
  public icons: Array<ImageResource> = [];
  public startUrl: string = "/";
  public themeColor?: string = "#ffffff";
  public backgroundColor?: string;
}

export { ImageResource, WebAppManifest };
