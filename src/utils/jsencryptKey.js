import Vue from 'vue';
import JsEncrypt from 'jsencrypt'

function RSAEncrypt(obj) {
  let encrypt = new JsEncrypt();
  encrypt.setPublicKey(
    `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuxMsJlqLFfIq7kQ5PrY/dw/rK
    qmIZgi/jmEHIbT9Pk41VxDOLJHq5rkKWBSA4YS9eexVmlfujm8hu6WprcYGOP59O
    dIqUroON/dfHwZmWtq/rtHyEuWnp+UxQYy32pCP+B1teUaM+8wCBk7s1PvNJ3BOv
    8r2EqgNoptqALLLO8QIDAQAB
    -----END PUBLIC KEY-----`
  );
  return encrypt.encrypt(obj);
}

export {
  RSAEncrypt
};

