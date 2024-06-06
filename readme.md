# Tutorial de Aplicação de Manifesto Ágil

Este tutorial orienta você sobre como aplicar um Manifesto Ágil e configurar um Service Worker em seu projeto.


https://github.com/marco0antonio0/como-aplicar-manifestoAgil-e-serviceWorker/assets/72234855/2ca6c7d9-2d9a-4f7d-be84-d1706f586ad5


## Estrutura de pastas

```bash
/seu_projeto
  ├── imagens
  │   ├── favicon.ico
  │   ├── small_icon.png
  │   ├── medium_icon.png
  │   ├── large_icon.png
  │   └── xlarge_icon.png
  ├── index.html
  ├── manifest.json
  ├── service-worker.js
  └── README.md

```

## Passo a Passo

### 1. Criação do Arquivo `index.html`

Primeiro, criaremos o arquivo `index.html` com as configurações iniciais.

#### Conteúdo do `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" href="./imagens/favicon.ico" type="image/x-icon">
    <title>Meu site</title>
</head>
<body>
    <h1>Titulo do meu site</h1>
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function (registration) {
                    console.log('Service Worker registrado com sucesso:', registration);
                })
                .catch(function (error) {
                    console.log('Falha ao registrar o Service Worker:', error);
                });
        }
    </script>
</body>
</html>
```

### 2. Criação do Arquivo manifest.json

Em seguida, criaremos o arquivo manifest.json, que contém as informações do manifesto ágil.

**Conteúdo do manifest.json**

```json
{
  "title": "Tutorial",
  "description": "Este é um tutorial para criar um manifesto ágil com diferentes tamanhos de ícones.",
  "version": "1.0.0",
  "author": {
    "name": "Seu Nome",
    "email": "seu.email@exemplo.com",
    "url": "https://seuwebsite.com"
  },
  "icons": {
    "small": {
      "src": "./imagens/small_icon.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    "medium": {
      "src": "./imagens/medium_icon.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    "large": {
      "src": "./imagens/large_icon.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    "xlarge": {
      "src": "./imagens/xlarge_icon.png",
      "sizes": "144x144",
      "type": "image/png"
    }
  },
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "display": "standalone",
  "start_url": "/index.html",
  "scope": "/",
  "lang": "pt-BR"
}

```

### 3. Criação do Arquivo service-worker.js

O próximo passo é criar o arquivo service-worker.js, responsável por cachear os arquivos para acesso offline.

**Conteúdo do service-worker.js**

```Javascript
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/imagens/small_icon.png',
                '/imagens/medium_icon.png',
                '/imagens/large_icon.png',
                '/imagens/xlarge_icon.png',
                '/imagens/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

```
