<h2>FastAPI</h2>

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
│   │   │   ├── //router-files
│   ├── crud/
│   │   ├── __init__.py
│   │   ├── //crud-files
│   ├── db/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── //model-files
│   │   ├── session.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── //schema-files
│   ├── services/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── //services-files
```

各々のディレクトリの役割は以下の通り
- api/: APIエンドポイント関連（Router等）のディレクトリ
  - deps.py: 依存関係の解決に使用されるファイル
  - routers/: 各エンドポイントのディレクトリ
- crud/: データベース操作の基本機能をまとめたディレクトリ
- db/: データベース関連のディレクトリ
  - models/: データベースのモデル
  - session.py: データベースセッションの管理
- schemas/: スキーマ関連のディレクトリ
- services/: セキュリティ関連やcrud操作に関係のない関数を記述するディレクトリ
  - config.py: 設定ファイル
  - security.py: セキュリティ関連のユーティリティ