# PWA エディタ

PWA(Progressive Web Apps)の動作に必要な Web App Manifest・Service Worker をブラウザ上で編集できるツールです。

## 使い方

master ブランチに push したものがそのまま[本番サイト](https://pwa.app.e-chan.cf/)にデプロイされます。
開発環境で実行される際は `npm run dev` もしくは `yarn dev` コマンドをルートディレクトリで実行してください。

## 機能

- Web App Manifest の構築
- Service Worker の構築

※ Service Worker とその登録スクリプト・Web App Manifest の読み込み機能が 1 ファイルにまとまっているため、HTML へ`script`タグを追記するだけで動作します。

# PWA Editor

The tool which can edit Web App Manifest and Service Worker for PWA(Progressive Web Apps) on your browser.

## How to use

The production page is deployed on [here](https://pwa.app.e-chan.cf/).
It's built from the master branch.

When you want to use this on your computer, run the command `npm run dev` or `yarn dev` in the root directory.

## Features

You can

- Build Web App Manifest
- Build Service Worker

\*You can enable Service Worker only adding a `script` on your service because scripts and manifest loader are combined as one file.
