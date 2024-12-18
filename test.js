const {c, cpp} = require(__dirname + "/cpp-polyfill.js");

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