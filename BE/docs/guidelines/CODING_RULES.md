# 코딩 규칙

## Lint 설정

**pyproject.toml**

```toml
[tool.black]
line-length = 88
target-version = ['py38']
include = '.pyi?$'
extend-exclude = '''
^/foo.py
'''

[tool.isort]
profile = "black"
multilineoutput = 3
includetrailingcomma = true
force_grid_wrap = 0
use_parentheses = true
ensure_newline_before_comments = true
line_length = 88
```

**.flake8**
```text
[flake8]
max-line-length = 88
extend-ignore = E203, W503, F401
exclude = .git,__pycache,build,dist
per-file-ignores = __init.py:F401
```

**.pre-commit-config.yaml**
```text
repos:
  - repo: https://github.com/psf/black
    rev: 23.11.0
    hooks:
      - id: black
        language_version: python3.8

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        name: isort (python)

  - repo: https://github.com/pycqa/flake8
    rev: 6.1.0
    hooks:
      - id: flake8
        additional_dependencies: [flake8-docstrings]
```