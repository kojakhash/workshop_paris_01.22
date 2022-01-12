const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const vault = require("node-vault")({
        apiVersion: "v1",
        endpoint: "http://127.0.0.1:8200",
    });

    // const roleId = process.env.ROLE_ID;
    // const secretId = process.env.SECRET_ID;

    // const result = await vault.approleLogin({
    //     role_id: roleId,
    //     secret_id: secretId,
    // });

    // vault.token = result.auth.client_token;

    // vault.read('v1/kv/data/bc');

    // vault.write('kv/bc', { key: "privateKey", value: account.privateKey })
    //     .catch(console.error);

    // console.log(account);
    // res.send(account)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})