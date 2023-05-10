# TA_PROJECT
Repository for a TA Project

VSCode REST Client extension is needed for the rest testing

**IMPORTANT**
Run ``npm run pip`` to install python requirements
Install openssl``winget install -e --id ShiningLight.OpenSSL`` on windows
Generate keys 
```
openssl ecparam -genkey -name secp521r1 -noout -out .keys/signing_key.priv.pem
openssl ec -in .keys/signing_key.priv.pem -pubout -out .keys/signing_key.pub.pem
```