#!/usr/bin/env nodejs
const express = require('express')
const app = express()
const port = 3000
const Vault = require('hashi-vault-js');


app.get('/', (req, res) => {
    var roleId = process.env.ROLE_ID
    var secretId = process.env.SECRET_ID
    const vault = new Vault({
        https: false,
        baseUrl: 'https://workshop-admin.vault.b8344a1a-2808-4e20-a17b-9b38348b47df.aws.hashicorp.cloud:8200/v1',
        rootPath: 'secret',
        timeout: 5000,
        proxy: false
    });
    const token = await vault.loginWithAppRole(roleId, secretId).client_token;

    res.send({"hello": token+"354ojfe"})
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