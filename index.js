#!/usr/bin/env nodejs
const express = require('express')
const app = express()
const port = 3000
const Vault = require('hashi-vault-js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


app.get('/', async (req, res) => {
    var roleId = process.env.ROLE_ID
    var secretId = process.env.SECRET_ID
    var vaultURL = process.env.VAULT_ADDR
    const approle = new Vault({
        https: false,
        baseUrl: `${vaultURL}/v1`,
        rootPath: 'auth/api_node',
        timeout: 5000,
        proxy: false,
        namespace: 'admin'
    });
    const kv = new Vault({
        https: false,
        baseUrl: `${vaultURL}/v1`,
        rootPath: 'internal',
        timeout: 5000,
        proxy: false,
        namespace: 'admin'
    });
    const token = await approle.loginWithAppRole(roleId, secretId);
    const secrets = await kv.readKVSecret(token.client_token, "api");
    res.send({ secrets })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})