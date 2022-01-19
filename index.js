#!/usr/bin/env nodejs
const express = require('express')
const app = express()
const port = 3000
const Vault = require('hashi-vault-js');


app.get('/', async (req, res) => {
    var roleId = process.env.ROLE_ID
    var secretId = process.env.SECRET_ID
    var vaultURL = process.env.VAULT_ADDR
    const vault = new Vault({
        https: false,
        baseUrl: `${vaultURL}/v1`,
        rootPath: 'auth/approle',
        timeout: 5000,
        proxy: false,
        namespace: 'admin'
    });
    const token = await vault.loginWithAppRole(roleId, secretId);

    res.send({ "hello": token.client_token})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})