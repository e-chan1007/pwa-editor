<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="box">
          <h1>Web App Manifestの設定</h1>
          <form-group label="ファイル名" :required="true">
            <input v-model.trim="manifestFileName" type="text" required />
          </form-group>
          <form-group label="アプリ名" :required="true">
            <input v-model.trim="manifest.name" type="text" required />
          </form-group>
          <form-group label="アプリ名(短縮)">
            <input v-model.trim="manifest.shortName" type="text" />
          </form-group>
          <form-group label="アプリ概要">
            <input v-model.trim="manifest.description" type="text" />
          </form-group>
          <form-group label="起動時に開くURL" required>
            <input v-model.trim="manifest.startUrl" type="text" required />
          </form-group>
          <form-group label="テーマ色">
            <input v-model.trim="manifest.themeColor" type="color" />
          </form-group>
          <form-group label="背景色">
            <input v-model.trim="manifest.backgroundColor" type="text" />
          </form-group>
          <collapsable-list :required="true">
            <template slot="header">アイコン画像 ({{ manifest.icons.length }})</template>

            <template slot="header-right">
              <button @click="addIcon"><i class="fas fa-plus"></i>&nbsp;追加</button>
            </template>

            <template v-for="(icon, index) in manifest.icons" slot="content">
              <collapsable-list-item :key="index">
                <template slot="header">
                  {{ icon.src }}
                  <span v-if="icon.sizes !== ''">({{ icon.sizes }})</span>
                </template>
                <template slot="header-right">
                  <button class="is-danger" @click="deleteIcon(index)"><i class="fas fa-trash"></i>&nbsp;削除</button>
                </template>
                <template slot="content">
                  <form-group label="ファイル名" :required="true">
                    <input v-model.trim="manifest.icons[index].src" type="text" required placeholder="/path/to/icon.png" />
                  </form-group>
                  <form-group label="画像サイズ" :required="true">
                    <input v-model.trim="manifest.icons[index].sizes" type="text" required placeholder="192x192" />
                  </form-group>
                </template>
              </collapsable-list-item>
            </template>
          </collapsable-list>
        </div>
        <div class="box">
          <h1>Service Workerの設定</h1>
          <form-group label="ファイル名" :required="true">
            <input v-model.trim="swFileName" type="text" required />
          </form-group>
          <form-group label="キャッシュ名" :required="true">
            <input v-model.trim="cacheName" type="text" required />
          </form-group>

          <collapsable-list>
            <template slot="header">初回ロード時にキャッシュするURL ({{ urlsToCache.length }})</template>

            <template slot="header-right">
              <button @click="addUrlToCache"><i class="fas fa-plus"></i>&nbsp;追加</button>
            </template>

            <template v-for="(url, index) in urlsToCache" slot="content">
              <collapsable-list-item :key="index" :only-header="true">
                <template slot="header">
                  <input v-model="urlsToCache[index]" type="text" placeholder="https://www.example.com, /正規表現/g" />
                </template>
                <template slot="header-right">
                  <button class="is-danger" @click="deleteUrlToCache(index)"><i class="fas fa-trash"></i>&nbsp;削除</button>
                </template>
              </collapsable-list-item>
            </template>
          </collapsable-list>

          <collapsable-list>
            <template slot="header">キャッシュしないURL ({{ urlsIgnoredToCache.length }})</template>

            <template slot="header-right">
              <button @click="addUrlIgnoredToCache"><i class="fas fa-plus"></i>&nbsp;追加</button>
            </template>

            <template v-for="(url, index) in urlsIgnoredToCache" slot="content">
              <collapsable-list-item :key="index" :only-header="true">
                <template slot="header">
                  <input v-model="urlsIgnoredToCache[index]" type="text" placeholder="https://www.example.com, /正規表現/g" />
                </template>
                <template slot="header-right">
                  <button class="is-danger" @click="deleteUrlIgnoredToCache(index)"><i class="fas fa-trash"></i>&nbsp;削除</button>
                </template>
              </collapsable-list-item>
            </template>
          </collapsable-list>
        </div>
      </div>
      <prism lang="javascript" :value="swJS" :name="swFileName">
        <template slot="header">
          Service Worker 登録・処理ファイル
        </template>
      </prism>
      <prism lang="json" :value="manifestJson" :name="manifestFileName">
        <template slot="header">
          Web App Manifest
        </template>
      </prism>
      <div class="button-group">
        <a class="button" @click="downloadFiles"> <i class="fas fa-download"></i>&nbsp; まとめて保存(zip形式)</a>
      </div>
    </div>

    <modal :condition="showsDownloadedModal" @close="showsDownloadedModal = false">
      <h1><i class="fas fa-download"></i>&nbsp;ダウンロードしました</h1>
      <p>ダウンロードされたファイル({{ swFileName }}, {{ manifestFileName }})を配置し、以下のタグをHTMLに挿入してください。</p>
      <div style="margin: 16px 0;">
        <prism lang="html" :value="exampleHtml" :collapse="false">挿入するタグ</prism>
      </div>
    </modal>
  </div>
</template>

<script>
import "~/assets/js/prism.min.js";
import JSZip from "jszip";
import { ServiceWorkerSource } from "~/assets/js/sw.ts";
import { ImageResource, WebAppManifest } from "~/assets/js/manifest.ts";

export default {
  data() {
    return {
      swFileName: "/sw.js",
      manifestFileName: "/manifest.json",
      manifest: new WebAppManifest(),
      sw: new ServiceWorkerSource(),
      cacheName: "",
      urlsToCache: [],
      urlsIgnoredToCache: [],
      showsDownloadedModal: false
    };
  },
  computed: {
    swJS() {
      return ServiceWorkerSource.build(this.swFileName, this.manifestFileName, this.cacheName, this.urlsToCache, this.urlsIgnoredToCache);
    },
    manifestJson() {
      const object = JSON.parse(JSON.stringify(this.manifest, null, "  "));
      Object.keys(object).forEach((key) => {
        if (key === "name") return;
        if (key === "icons") {
          object.icons.forEach((_iconObj, iconId) => {
            Object.keys(object.icons[iconId]).forEach((iconKey) => {
              if (iconKey === "src" || iconKey === "sizes") return;
              if (object.icons[iconId][iconKey] === "") delete object.icons[iconId][iconKey];
            });
          });
          return;
        }
        const snakedKey = key.replace(/[A-Z]/g, function(s) {
          return "_" + s.charAt(0).toLowerCase();
        });
        if (object[key] !== "") object[snakedKey] = object[key];
        else delete object[key];
        if (key !== snakedKey) delete object[key];
      });
      return JSON.stringify(object, null, "  ");
    },
    exampleHtml() {
      return `<head>
  <!-- headタグ内に挿入 -->
  <script src="${this.swFileName}"><\/script>
<\/head>`;
    }
  },
  methods: {
    minify(str) {
      return str
        .replace(/^ {2,}/gm, "")
        .replace(/\n/g, "")
        .replace(/ ?(!?=+|&&|\|\||\(|\)|\{|\}) ?/g, "$1");
    },
    addIcon() {
      this.manifest.icons.push(new ImageResource());
    },
    deleteIcon(index) {
      this.manifest.icons.splice(index, 1);
    },
    addUrlToCache() {
      this.urlsToCache.push("");
    },
    deleteUrlToCache(index) {
      this.urlsToCache.splice(index, 1);
    },
    addUrlIgnoredToCache() {
      this.urlsIgnoredToCache.push("");
    },
    deleteUrlIgnoredToCache(index) {
      this.urlsIgnoredToCache.splice(index, 1);
    },
    downloadFiles() {
      const zip = new JSZip();
      zip.file(this.swFileName.replace(/^\//, ""), this.minify(this.swJS));
      zip.file(this.manifestFileName.replace(/^\//, ""), this.minify(this.manifestJson));
      zip.generateAsync({ type: "blob" }).then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const aToDownload = document.createElement("a");
        aToDownload.href = url;
        aToDownload.download = `${this.manifest.name !== "" ? this.manifest.name : "pwa"}.zip`;
        aToDownload.click();
        this.showsDownloadedModal = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
