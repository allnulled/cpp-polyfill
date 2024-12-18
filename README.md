# cpp-polyfill

Execute C/C++ code from JavaScript in sync (using gcc and g++).

## Install

```sh
npm install -s @allnulled/cpp-polyfill
```

## Requirements

You need:

- `gcc`
- `g++`

## Usage

```js
const {c, cpp} = require("@allnulled/cpp-polyfill");

// Ejemplo de código C
c(`
#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}
`);

// Ejemplo de código C++
cpp(`
#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}
`);

console.log("Finished successfully!");
```