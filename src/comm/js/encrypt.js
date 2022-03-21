import {
  JSEncrypt
} from 'jsencrypt'
let encryptor = new JSEncrypt() // 新建JSEncrypt对象

// 系统加密  params  json
export function encryptMsg (paramsStr) {
  // var paramsStr = JSON.stringify(params)
  var paramsStrList = [] // 分段加密后存放的数组
  // 设置公钥
  encryptor.setPublicKey(
    `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDACwPDxYycdCiNeblZa9LjvDzb
        iZU1vc9gKRcG/pGjZ/DJkI4HmoUE2r/o6SfB5az3s+H5JDzmOMVQ63hD7LZQGR4k
        3iYWnCg3UpQZkZEtFtXBXsQHjKVJqCiEtK+gtxz4WnriDjf+e/CxJ7OD03e7sy5N
        Y/akVmYNtghKZzz6jwIDAQAB
        -----END PUBLIC KEY-----`
  )
  var lens = Math.ceil(paramsStr.length / 20) // 字符串分段个数
  for (var i = 0; i < lens; i++) {
    let repassword = encryptor.encrypt(paramsStr.substring(i * 20, ((i + 1) * 20))) // 分段进行加密
    let code = encodeURI(repassword)
    paramsStrList.push(code)
  };
  let securityMessage = JSON.stringify(paramsStrList)
  return securityMessage
}

// 系统解密  字符串
export function decrypt (str) {
  encryptor.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
  MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALUPuqBiS+1YbK/R
  cm+cVkpQwl9SXNBTGvxhi8kWBIL9AFlouREZsF+WfG0Ii796kTiOXxaVEa0zLjFM
  uAn/jobRZckEhE9zJAOeSyAvU8qQGFYIKjuHR9RxHCzrecVEDWDUbALlGJxZdp7a
  0/hojzVZfnbfoWgm4khcrYQa76WVAgMBAAECgYEAmc0wpMia4pR4TqlF4hUVH6+W
  TM5z1OqjQ7vAuCGh13r+bvSMMEB4F9qG+z+FJjQBY99cWpxqFYwiMvKOar/Q2ro4
  ge+EdcisU0k5WXXubUpol743H/KJpnd8kCWFk9pNiLuOl7qiJlTkB5KivvX2JxDt
  mvRO02oFfLXgAX+y00ECQQDl/iiVb6fLJhrf9FDbzvk3qRB7eruApkGr0DYS+TDy
  q72GSnkHEfj5EuB23NaeChyCJJtH09euSaIHw/chnKlpAkEAyYkabsZ+CyUPquJo
  p1UD2hFStPI+DDvniz19YTxzUcU/Fs38kTsoew82IhEm/k2rvaRkKRJLknHvm4h/
  PnwJTQJBALebKgz6YSrFlcjaAz8nQT+VIUpiVZPDpkOiabjF5LSmNBwkEfB6AZfd
  4QIjFNZ/3fhrfuddkB5cPBUU9ZKIvZkCQQCR3cPd7ZiI5HgkjN6GTkgNa4BbKwGx
  xSHfa8/1stUcmBEDpm9phlHUT7w0iAmbAgiNqBA+kdlU01ZDUlYWmZv5AkAhtORz
  WYq16KyHfM+7kgxniufX7dBcIWh4MOStl1q5OALrfsenzrf8Yzl5ss9JmmXZFuq2
  Am0fy9Sv6VjG7WrE
  -----END RSA PRIVATE KEY-----`)
  let newSelfDecrypt = encryptor.decrypt(str)
  // console.log(str)
  // console.log(newSelfDecrypt)
  return newSelfDecrypt
}

// 自用加密  字符串
export function selfencrypt (str) {
  // 设置公钥
  encryptor.setPublicKey(
    `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVew2GZZfQ7xdWfoRdxeTpltoe
    XG71gpMfRv+0taq0VjTAdKs/fi2LwBO6OQC2AKgJwoIjii2w2gCc0zYI5xSww9XI
    MG7VV5YHlqPjMNE1h95O1WvFGGj1oKaTFMoKQyZ3+jQB/piY9Hplix9i7tUPs8zG
    cBK3bbQeBDgHqUcTdQIDAQAB
    -----END PUBLIC KEY-----`
  )
  let newEncryptMsg = encryptor.encrypt(str)
  return newEncryptMsg
}

// 自用解密  字符串
export function selfdecrypt (str) {
  encryptor.setPrivateKey(`-----BEGIN PRIVATE KEY-----
  MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANV7DYZll9DvF1Z+
  hF3F5OmW2h5cbvWCkx9G/7S1qrRWNMB0qz9+LYvAE7o5ALYAqAnCgiOKLbDaAJzT
  NgjnFLDD1cgwbtVXlgeWo+Mw0TWH3k7Va8UYaPWgppMUygpDJnf6NAH+mJj0emWL
  H2Lu1Q+zzMZwErdttB4EOAepRxN1AgMBAAECgYAOQSEuECqK8OwGAnykJkqark/y
  Jwnhqs5YEE2Sq26yi+8JysCEhNBVvIWUsamyfWi6/hnidZ+HZ4cS8adyALwI0lC2
  NWSi4Vt/5yfD+iB9EF8Eo4EgP93t7pK6VIoLz9BRTpmKKIspNFBTcn58nS0Pt5Ru
  LxLdaAsczPkubivlAQJBAO7QqyppbNcbG14Zm5pXgBIfY1CgfDmOTMflmzUALc0u
  QPVaNZOTNcmErlXp6G+lpAAXdNjeQrniHvcYj+/4ye0CQQDk16+e5KG3VPC+4K2A
  r5O2j1uxYrMM00zallOlf+U+gM63dolfAnohgpmO9AJ5AM0+dryPL/tRgibTrRMj
  4B6pAkAHte0Q3X6KI3Hqw+DmRtT3wNOwEr5wDUwlWCB+wZa4/TlTsqnwLdyauRH3
  7Cl5EVwONLOtHOACqG5fhAeBtAKxAkEAnsFGk4t26PFjRnglxYWIivivGsMnBbm8
  slPhWYn9ZjwDrGDucdwNEBxDHVoIMRuuRywmKYuW5PfOqcCC67t6aQJAaZIeu8lC
  o4wlM+ZNoufqQepsVrbPJ1SBjbGVlrUW/6My5veVvwAlprX7N6mTZTGShonxHIIW
  2ZpPpF1SdT7Chw==
  -----END PRIVATE KEY-----`)
  let newSelfDecrypt = encryptor.decrypt(str)
  return newSelfDecrypt
}
