# Snake 3D

## Diagram

![Main](Main.jpg)

## Ukuran

Ukuran radius `Food` dan `SnakeBody` adalah 1. Ukuran map 50x50.

## Developer notes

Setiap pull, jalankan di folder `Frontend`:

```bash
npm install
```

Kalau butuh pakai Threejs, tambahkan ke file line pertama:

```js
import * as THREE from 'three';
```

Kalau butuh pakai class lain:

```javascript
import NamaClass from './path/ke/class'
```

Usahakan setiap class, method, attribute, dan variabel didokumentasikan dengan standar JSDoc (https://devdocs.io/jsdoc/)

**Sebelum dibuka di browser, build dulu** di folder `Frontend`:

```bash
npx webpack
```

