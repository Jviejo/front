## Diseñando una Blockchain desde 0

### Caso de uso a resolver

- Creacion de un banco con las siguientes operaciones
  - Deposito, Retiro, Transferencia
- Los movimiento son privados
- El login lo haremos con wallet creados con ethers.
- El sistema creara wallet una o varias.
- Las operaciones iran firmadas por la wallet de usuario

### Teoria

#### Arquitectura de la solucion

- Webserver
- Api nodejs Express
- Chaincode
- Red de fabric

### Practica

- Crear la red con un canal 
- Hacer el chaincode
- Hacer el Api con nodejs express
- Hacer el front con nextjs

### Creacion de la red

```bash
 ./network.sh up createChannel  -c mychannel
 ./network.sh deployCCAAS  \
   -ccn basicts \
   -ccp ../asset-transfer-basic/chaincode-typescript
./network.sh deployCCAAS --ccn basic ../    asset-transfer-basic/chaincode-external/asset-transfer-basic-external.tgz
```

Obtenemos el id del chaincode
_basicts_1.0:a50a2c3b1ca76873fdca1fc29fe250df77f398e478de7c182f11d5803ea05d0b_

### Parar la red

```bash
 ./network.sh down
```

### Build de Chaincode

Para construir el chaincode

```js
const { Contract } = require("fabric-contract-api");
// extendemos de ls clase Contract de fabric
class BankChaincode extends Contract {
  // aqui metemos las funciones del contrato
}
```

Ejemplo de funcion. Esta funcion es invocada por el peer

```js
   // el primer parametro es el context ctx
   async deposit(ctx, accountId, amount, timestamp) {
        // formamos una key
        const key = `${accountId}_${timestamp}`;

        // formamos un value
        const value = {
            // formamos el json del value
        };
        // save in blockchain
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(value)));
        return JSON.stringify(value);
    }
```

### Build API con un framework Web

#### Conexion y obtencion del contrato

```js
import fs from "node:fs";
import crypto from "node:crypto";

const BASE = ".. dir base organizacion";
// certificado del usuario
const CERT_USER = fs
  .readFileSync(
    `${BASE}/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem`
  )
  .toString();
// clave privada del usuario
const KEY_USER = fs
  .readFileSync(`${BASE}/users/User1@org1.example.com/msp/keystore/priv_sk`)
  .toString();
const CHANNEL = "mychannel";
const CHAINCODE = "basicts";
const MSPID = "Org1MSP";
// peer address
const peerEndpoint = "localhost:7051";
// nombre del peer
const peerHostAlias = "peer0.org1.example.com";
// tls cert
const tlsCertPath = fs
  .readFileSync(`${BASE}/peers/peer0.org1.example.com/tls/ca.crt`)
  .toString();
```

#### Usamos GRPC para conectarnos al peer

```js
async function newGrpcConnection() {
  // usamos el override ya que peerEndpoint tiene una direccion localhost
  // que el docker de la maquina.
  const tlsCredentials = grpc.credentials.createSsl(Buffer.from(tlsCertPath));
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    "grpc.ssl_target_name_override": peerHostAlias,
  });
}
```

Para conectarnos a fabric necesitamos

- una conexion grpc con el peer
- una identidad
- un signer basado en el private key del user

Con la funcion connect obtenemos una geteway.
La gateway nos permite obtener el canal y el chaincode

```js
export async function connectFabric() {
  // connection to the peer
  const client = await newGrpcConnection();

  // creation of identity
  const identity = {
    mspId: MSPID,
    credentials: Buffer.from(CERT_USER),
  };

  // const signer
  const privateKey = crypto.createPrivateKey(Buffer.from(KEY_USER));
  const signer = signers.newPrivateKeySigner(privateKey);

  // // connection to the gateway
  try {
    const gateway = await connect({ client, identity, signer });
    const network = gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CHAINCODE);
    return contract;
  } catch (error) {
    throw error;
  }
}
```

#### servidor web

Construimos el fichero del servidor web express

```js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectFabric } from "./hlf.js";

const app = express();
const port = 5551;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


const contract = await connectFabric();
```

#### Ejemplo de un post

Este ejemplo permite ejecutar una funcion del contrato

```js
app.post("/deposit", async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    // estos parametros nos vienen en el body
    const { accountId, amount } = req.body;
    // invocamos al contrato
    await contract.submitTransaction(
      "deposit",
      accountId,
      amount.toString(),
      timestamp
    );
    res.status(200).json({ message: "Deposit successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
});
```

#### Ejemplo de una request
```
POST http://localhost:5551/deposit
Content-Type: application/json

{
    "accountId": "123456",
    "amount": 100.00
}
```
Respuesta
```h
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 32
ETag: W/"20-u2WY1QtQB0gqcc93I+TrTcVOYhs"
Date: Sun, 01 Sep 2024 13:19:27 GMT
Connection: close

{
  "message": "Deposit successful"
}
```

#### Ejemplo de un get

```js
app.get("/account/:accountId/records", async (req, res) => {
  try {
    const { accountId } = req.params;
    const resultBytes = await contract.evaluateTransaction(
      "getBalance",
      accountId
    );
    const resultJson = Buffer.from(resultBytes).toString("utf8");
    const records = JSON.parse(resultJson);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```
#### Ejemplo de llamada a get
```
GET http://localhost:5551/account/123456/movements
```

### Respuesta del Get
```h
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 57
ETag: W/"39-zDnSb6ts1i9PkWy7kthjccGRCQ0"
Date: Sun, 01 Sep 2024 13:24:37 GMT
Connection: close

[
  {
    "type": "deposit",
    "amount": "100.00",
    "balance": "100.00"
  }
]
```