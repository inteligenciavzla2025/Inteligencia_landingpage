# Flujo de trabajo Git — InteligencIA Landing

## Ramas principales

| Rama       | Propósito                          | Ambiente       |
|------------|------------------------------------|----------------|
| `main`     | Código en producción               | Producción     |
| `staging`  | Integración y pruebas finales      | Staging/QA     |
| `develop`  | Desarrollo activo                  | Local/Dev      |

## Flujo estándar

```
feature/* ──► develop ──► staging ──► main
```

### 1. Nueva funcionalidad o fix

```bash
# Partir siempre desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nombre-descriptivo
```

### 2. Terminar la feature

```bash
git add .
git commit -m "feat: descripción del cambio"
git checkout develop
git merge feature/nombre-descriptivo
git branch -d feature/nombre-descriptivo
```

### 3. Pasar a staging para pruebas

```bash
git checkout staging
git merge develop
# Probar aquí antes de subir a producción
```

### 4. Subir a producción

```bash
git checkout main
git merge staging
git tag v1.x.x   # etiquetar releases
```

## Convención de nombres de ramas

- `feature/nombre`   — nueva funcionalidad
- `fix/nombre`       — corrección de bug
- `hotfix/nombre`    — fix urgente directo a main
- `chore/nombre`     — cambios de configuración/docs

## Convención de commits (Conventional Commits)

```
feat:     nueva funcionalidad
fix:      corrección de bug
style:    cambios de estilos/UI
chore:    mantenimiento, configs
docs:     documentación
refactor: refactoring sin cambio funcional
```
