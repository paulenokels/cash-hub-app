
const DEV = true;
  var FILE_SERVER = "https://api.cash-hub.com.ng/";
 let baseURL = 'https://api.cash-hub.com.ng/api';

  if (DEV) {
    FILE_SERVER ="http://192.168.43.232:8000/";
    baseURL = 'http://192.168.43.232:8000/api';

  }
 
const constants = {
    FILE_SERVER: FILE_SERVER,
    appGreen: '#79BB33',
    paymentKeys : {
      paystackTestSecretKey: 'sk_test_4d3f2a1b359b03db0804f134960c24c5cbd55547',
      paystackTestPublicKey: 'pk_test_a6885571cce91d1f14a45ef556f53cec4af6e433',
      paystackLiveSecretKey: 'sk_live_484e6a86a35f7bebea50032c27e647792966add5',
      paystackLivePublicKey: 'pk_live_9bc0f086701f8b8ac421c052d891b31442a969d2'
    },
    secondaryGreen: '#3E9545',
    BASE_URL: baseURL,
    DEV: DEV

}
export default constants;