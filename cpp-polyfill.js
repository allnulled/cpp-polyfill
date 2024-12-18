const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');

function isCCompilerInstalled() {
  try {
    execSync('gcc --version', { stdio: 'ignore' });
    return true;  // Si no lanza error, GCC está instalado
  } catch (error) {
    return false;  // Si lanza error, GCC no está instalado
  }
}

function installCCompiler() {
  const platform = os.platform();

  if (platform === 'linux') {
    console.log('GCC no encontrado. Intentando instalar GCC en Linux...');
    try {
      execSync('sudo apt update && sudo apt install -y gcc', { stdio: 'inherit' });
      console.log('GCC instalado correctamente.');
    } catch (error) {
      console.error('Error al intentar instalar GCC:', error);
      process.exit(1); // Termina el proceso si la instalación falla
    }
  } else if (platform === 'win32') {
    console.log('GCC no encontrado. Por favor, descarga e instala MinGW o Cygwin para Windows.');
    process.exit(1);  // Termina el proceso, ya que la instalación en Windows no es tan simple
  } else {
    console.log('No se puede verificar la instalación de GCC en este sistema operativo.');
    process.exit(1);
  }
}

function compileC(code) {
  const cFile = 'program.c';
  const execFile = 'program';

  // Verificar si GCC está instalado
  if (!isCCompilerInstalled()) {
    installCCompiler(); // Si no está instalado, lo intentamos instalar
  }

  // Escribir el código C en un archivo
  fs.writeFileSync(cFile, code);

  try {
    // Compilar el código C
    const compileCmd = os.platform() === 'win32'
      ? `gcc ${cFile} -o ${execFile}.exe` // Para Windows
      : `gcc ${cFile} -o ${execFile}`; // Para Linux

    execSync(compileCmd);

    // Ejecutar el archivo binario resultante
    const execCmd = os.platform() === 'win32'
      ? `.${execFile}.exe` // Para Windows
      : `./${execFile}`; // Para Linux

    const output = execSync(execCmd);
    console.log(output.toString());
  } catch (error) {
    console.error('Error durante la compilación o ejecución:', error);
  }
}

function isCppCompilerInstalled() {
  try {
    execSync('g++ --version', { stdio: 'ignore' });
    return true;  // Si no lanza error, G++ está instalado
  } catch (error) {
    return false;  // Si lanza error, G++ no está instalado
  }
}

function installCppCompiler() {
  const platform = os.platform();

  if (platform === 'linux') {
    console.log('G++ no encontrado. Intentando instalar G++ en Linux...');
    try {
      execSync('sudo apt update && sudo apt install -y g++', { stdio: 'inherit' });
      console.log('G++ instalado correctamente.');
    } catch (error) {
      console.error('Error al intentar instalar G++:', error);
      process.exit(1); // Termina el proceso si la instalación falla
    }
  } else if (platform === 'win32') {
    console.log('G++ no encontrado. Por favor, descarga e instala MinGW o Cygwin para Windows.');
    process.exit(1);  // Termina el proceso, ya que la instalación en Windows no es tan simple
  } else {
    console.log('No se puede verificar la instalación de G++ en este sistema operativo.');
    process.exit(1);
  }
}

function compileCpp(code) {
  const cppFile = 'program.cpp';
  const execFile = 'program';

  // Verificar si G++ está instalado
  if (!isCppCompilerInstalled()) {
    installCppCompiler(); // Si no está instalado, lo intentamos instalar
  }

  // Escribir el código C++ en un archivo
  fs.writeFileSync(cppFile, code);

  try {
    // Compilar el código C++
    const compileCmd = os.platform() === 'win32'
      ? `g++ ${cppFile} -o ${execFile}.exe` // Para Windows
      : `g++ ${cppFile} -o ${execFile}`; // Para Linux

    execSync(compileCmd);

    // Ejecutar el archivo binario resultante
    const execCmd = os.platform() === 'win32'
      ? `.${execFile}.exe` // Para Windows
      : `./${execFile}`; // Para Linux

    const output = execSync(execCmd);
    console.log(output.toString());
  } catch (error) {
    console.error('Error durante la compilación o ejecución:', error);
  }
}

module.exports = { c: compileC, cpp: compileCpp };
