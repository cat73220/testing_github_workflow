# PRテンプレート（必見！）

本コメントを含めて、読み終わった後にすべて削除して、 _issue_ の本文を記載してください。

## 目次

* [Pull Request](#pull-request)
* [コミットメッセージ](#コミットメッセージ)
  * [タイトル](#タイトル)
  * [本文](#本文)
  * [フッター](#フッター)
* [Squashのタイミンング](#Squashのタイミンング)
* [該当Issueのクローズ](#該当Issueのクローズ)

⚠️ PRの際にコミット数を必ず「1」にし、必ず[署名]する。
（[レビュー最中はsquashしない](#Squashのタイミンング)）

📝 Gitの[コミットメッセージの書き方]に従って、コミットメッセージを書く。

## Pull Request

1. ブランチを最新にしてからPRする
2. [Conventional Commits] に従ってタイトルにタイプを付ける
3. タイトルを50字以内におさめる（タイプは文字数に含めない）
4. タイトルの文頭を大文字にする（「iPhone」等は例外）
5. タイトルの文末にピリオドを付けない
6. タイトルは命令形で記述する
7. タイトルに目的と、可能な限り理由を記述する
8. Description に _issue_ の本文をそのまま使う

## コミットメッセージ

### タイトル

1. [Conventional Commits] に従ってタイプを付ける
2. 50字以内におさめる（タイプは文字数に含めない）
3. 文頭を大文字にする（「iPhone」等は例外）
4. 文末にピリオドを付けない
5. 命令形で記述する
6. 目的と、可能な限り理由を記述する
7. 極力重複しないようにする

### 本文

1. タイトルの後に1行空けて本文を書く
2. 1行あたり72字以内におさめる
3. どのようにではなく何をとなぜを説明する

### フッター

フッターに[issueが自動的にクローズ]されるためのキーワードを記載する

## Squashのタイミンング

以下のタイミングで `squash` する

* コミットが複数ある場合はPRの前に
* 依頼があった時に（レビューの最中は `squash` しない）

## 該当Issueのクローズ

作成中のPRがissueをクローズする場合，PRの前にコミットメッセージの（タイトルではなく）
本文に以下のどれかを記述すればその[issueが自動的にクローズ]されます。例）

* `Closes #<issue番号>`
* `Fixes #<issue番号>`
* `Resolves #<issue番号>`

💡 _“Fixes”_ はバグフィックスの時に使うと良い

[署名]: https://help.github.com/ja/github/authenticating-to-github/signing-commits
[コミットメッセージの書き方]: https://postd.cc/how-to-write-a-git-commit-message/
[Conventional Commits]: https://www.conventionalcommits.org/ja/v1.0.0/
[issueが自動的にクローズ]: https://help.github.com/articles/closing-issues-via-commit-messages/
