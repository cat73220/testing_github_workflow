# Livemasq Website

[![lint][LintStatusBadge]][LintStatusBadgeActions]

## 目次

- [実行環境](#実行環境)
  - [必要なソフトウェア](#必要なソフトウェア)
- [実行方法](#実行方法)
- [Lint](#lint)

## 実行環境

### 必要なソフトウェア

[asdf]

## 実行方法

1. GitHubからリポジトリーをクローンする

        $ cd && git clone git@github.com:a-ibs/livemasq-website.git \
            && cd livemasq-website

2. [asdf]のプラグインを追加する

        $ asdf plugin-add direnv \
            ; asdf plugin-add nodejs \
            ; asdf plugin-add python \
            ; asdf plugin-add yarn

3. Node.jsリリースチームのPGPキーを追加する

        $ bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

4. asdf（仮想環境）にPythonやNode.jsのモジュールをインストールする

        $ asdf install

5. livemasq-websiteの開発環境構築に必要な依存パッケージをインストールする

        $ yarn \
            && pip install --requirement requirements.txt

6. mdファイルをhtmlファイルにトランスパイルし、localhostにサーバーを立ち上げる

        $ yarn start

上記実行後、 ブラウザーで <http://127.0.0.1:8000/> にアクセスする

## Build

        $ yarn build:stage

または

        $ yarn build:production

## Lint

1. 手動で試す

        $ pre-commit run --all-files

2. うまくいったら[Git フック]として設定してlintを自動化する

        $ pre-commit install

[LintStatusBadge]: https://github.com/a-ibs/livemasq-website/workflows/lint/badge.svg
[LintStatusBadgeActions]: https://github.com/a-ibs/livemasq-website/actions
[asdf]: https://github.com/asdf-vm/asdf
[pre-commit]: https://pre-commit.com/
[Git フック]: https://git-scm.com/book/ja/v2/Git-のカスタマイズ-Git-フック
