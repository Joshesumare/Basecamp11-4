# Basecamp11

## Instalacion de dependencias 


- Para crear un proyecto con `Scarb`, tendremos que crear archivo llamado `.devcontainer.json` en el root, y le escribiremos el siguiente codigo:

  ```rust
  {
      "name": "dev",
      "image": "starknetfoundation/starknet-dev:2.9.1",
  }
  ```

  Posterior a eso y para ejecutar instancias en VSCode, ir al menu superior View -> Command Palette y ejecutar el siguiente codigo // Dev Containers: Rebuild and Reopen in Container //

  Desde ahora cada vez que modifiquemos algun archivo con instancias deberemos hacer lo mismo solo que modificaremos el comando por el siguinete // Dev Containers: Rebuild //

- Ahora para iniciar Scarb deberemos abrir el terminal y en el terminal escribir lo siguiente 
 `scarb init` al presionar enter se deplagara un menu en el cual deberemos seleccionar 
   > Starknet Foundry (default)
 


A continuacion se crearan los siguientes archivos y carpetas
```

  > src                     /* Carpeta
      >lib.cairo            /* archivo
  >test                     /* carpeta
      >test_contract.cairo  /* archivo
  >.gitignore               /* archivo
  >Scarb.lock               /* archivo
  >Scarb.toml               /* archivo
  >Snfoundry.toml           /* archivo
```


## Dependencias Openzeppelin.

 Ahora para instalar las dependencias de openzeppelin lo podemos hacer de dos formas

  - Forma 1: 
    En el archivo "Scarb.toml" agregar en el apartado [dependencies] lo siguiente. 
     ```rust
      > [Dependencies]
      openzeppelin_access = "0.20.0"
      starknet = "2.9.1" // Esto ya estaba configurado, pero debemos revisar que este de acuerdo a la version del archivo '.devcontainer.json' 
      ```

  - Forma 2:
    En la terminal digitamos:
    ```rust
          <scarb add openzeppelin_acces@0.20.0>
    ```
    Al presionar enter, el programa descargara los archivos necesarios y ademas añadira la linea de codigo señalada anteriormente al archivo "Scarb.toml"


## Modificacion archivo .devcointainer.json

Abriremos el archivo llamado `.devcontainer.json` en el root, y le añadiremos el siguiente codigo:

  ```rust
  { 
  //  "name": "dev",
  //  "image": "starknetfoundation/starknet-dev:2.9.1",
    "customizations": {
        "vscode": {
            "extensions": [
                "StarkWare.cairo1",
                "tamasfe.even-better-toml"
            ]
        }
    }
}
  ```


- **Nota:** Lo que se encuentra demarcado es lo que ya habiamos incorporado.
- **Nota:** cada vez que modifiquemos algun archivo con instancias deberemos reconstruir el contenedor // Dev Containers: Rebuild //.



### Creacion de archivos base

- crearemos dos archivos en la carpeta "src" 
  - Archivo llamado `counter.cairo`, con el siguiente codigo:
    ```rust
      #[starknet::contract]
        pub mod counter_contract {
        #[storage]
          struct Storage {}
          }
    ```
  - Archivo llamado the `lib.cairo`, con el siguiente codigo:

    ```rust
    pub mod counter;

    ```

> **Note:** Cada vez que editemos los archivos debemos digitar los siguientes comandos.

            scarb fmt   // Verifca el formato del los comandos ingresados
            scarb build // Verifica el codigo,

### Verificacion

Una vez completados los pasos anteriores, executaremos el tester de la suit para verficar que todos los requerimientos esten listos para comenzar a crear nuestro codigo.

```bash
scarb test
```

### Hints
 +++---- continuara -----+++
## Firmadores 

#Paso 1
En la terminal digitamos:
    ```rust
          starkli signer keystore new keystore.json
    ```
    Al presionar enter, el programa nos solicitara la creacion de un password, luego creara un archivo denominado "keystore.json"

#Paso 2
En la terminal digitamos:
    ```rust
          starkli account oz init account.json --keystore keystore.json
    ```
    Al presionar enter, el programa nos solicitara introducir el password creado en el paso anterior y creara un archivo llamado account.json"

#Paso 3
La terminal nos indicara la direccion de la cuenta creada que desplagara el contrato, la imprime en amarillo y comienza por 0x., a esa cuenta debemos enviar eth para gas.

#Paso 4
Copiamos el comando que nos indico la terminal debajo de la direccion a la cual enviamos el gas, por lo general el comado es el siguiente {starkli account deploy account.json} y añadimos lo siguiente --keystore keystore.json, entonces elcomandoajecutar seriaelsiguiente:

    ```rust
          starkli account deploy account.json --keystore keystore.json
    ```

#Paso 5
El terminal nos indicara una [ADVERTENCIA] y nos solicitara la confirmacion, la cual deberemos indicar al colocar el password de la cuenta creada anteriormente.

#Paso 6
Posterior a introducir el pasword, nos indicara el mensaje que avisa cuanto gas se necesita para desplegar el contrato y la cuanta a la cual se debe depositar el eth necesario, nosotros ya hemos enviado el gas, razon pormla cual daremos en siguiente, [el mensaje es el siguiente].

    ```rust
The estimated account deployment fee is 0.000005574034060363 ETH. However, to avoid failure, fund at least:
    0.000008361051090544 ETH
to the following address:
    0x010708da4a014a5c65f4182f5eb34b58b3bbbf6dabfdf0f43a2c30891b4f5e75
Press [ENTER] once you've funded the address.
```

> **Nota:** La terminal nos indicara cuando la transaccion sea confirmada y nos indicara el ID de la Transaccion. 

Paso 7 Compilar
Posteriormente debemos aplicar en la ventana de comandos [scarb Build] presionar [ENTER] e introducir el siguiente comando: 

```rust
starkli declare target/dev/basecamp11_Contadorr.contract_class.json --account account.json --keystore keystore.json
```
Desplegara la siguiente informacion de la compilacion.

    ```rust
Enter keystore password: 
Sierra compiler version not specified. Attempting to automatically decide version to use...
Network detected: sepolia. Using the default compiler version for this network: 2.9.1. Use the --compiler-version flag to choose a different version.
Declaring Cairo 1 class: 0x0748d189a79b38711b357472c6ebffadda3e294f99e79e5b0eb2b229988b1525
Compiling Sierra class to CASM with compiler version 2.9.1...
CASM class hash: 0x03db3e89e5c9a529cd8d3f20f9a7749ceaa4048f3970bc748a19512965717a35
Contract declaration transaction: 0x05a88a56fe675622fd29b772ad380f5ab5186aa37722ce805273c206d4cd36a9
Class hash declared:
0x0748d189a79b38711b357472c6ebffadda3e294f99e79e5b0eb2b229988b1525.
```

> **Nota:** La terminal nos indicara cuando la transaccion sea confirmada y nos indicara el Hash de Storage. 





# Desplegar 
Posteriormente debemos aplicar en la ventana de comandos [scarb Build] presionar [ENTER] e introducir el siguiente comando: 

```rust
starkli deploy 0x0748d189a79b38711b357472c6ebffadda3e294f99e79e5b0eb2b229988b1525 "hash de compilacion" 4 "valor inicial del counter" 0x074e65B87938f1f497947B89f293E142b79ECb8b7b93202C1040bECE91D621F3 "direccion del owner"--account account.json --keystore keystore.json "Comandos con informacion del implementador"

// es decir se llama asi´:
starkli deploy XXXXXX 4 0x074e65B87938f1f497947B89f293E142b79ECb8b7b93202C1040bECE91D621F3 --account account.json --keystore keystore.json

```
**Nota** Lo que esta "entrecomillas" es texto descriptivo

Desplegara la siguiente informacion de la compilacion.

    ```rust
Enter keystore password: 
Deploying class 0x0748d189a79b38711b357472c6ebffadda3e294f99e79e5b0eb2b229988b1525 "Class desplegado" with salt 0x064b5ae6562e89a0a341077444fb1aeac057a10ff7edb9bca502f8a4eb96a132...
The contract will be deployed at address 0x078879b20f1641703548ab0abf49fd765e3cdb8cc29b660553bd684841701417 
Contract deployment transaction: 0x02f63a994c1b3f029bdb012b4f02034bd902a8a969bdddf8e094cba091b8c0cc
Contract deployed:
0x078879b20f1641703548ab0abf49fd765e3cdb8cc29b660553bd684841701417.
```
**Nota** Lo que esta "entrecomillas" es texto descriptivo
