

FastAPI以下のディレクトリ構造は以下のようになっている。

```
/
├── FastAPI/
│   ├── __init__.py
│   ├── run.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── {item}.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── security.py
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── {item}.py
│   │   ├── session.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── {item}.py
│   ├── crud/
│   │   ├── __init__.py
│   │   ├── {item}.py
```

各々のディレクトリの役割は以下の通り
- api/: APIエンドポイント関連（Router等）のディレクトリ
  - deps.py: 依存関係の解決に使用されるファイル
  - endpoints/: 各エンドポイントのディレクトリ
- core/: アプリケーションのコア設定やセキュリティ関連のディレクトリ
  - config.py: 設定ファイル
  - security.py: セキュリティ関連のユーティリティ
- db/: データベース関連のディレクトリ
  - base.py: データベースのベースクラス
  - models/: データベースのモデル
  - session.py: データベースセッションの管理
- schemas/: スキーマ関連のディレクトリ
- crud/: データベース操作の基本機能をまとめたディレクトリ