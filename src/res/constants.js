const DEV = false;
  var FILE_SERVER = "";
  if (DEV) {
    FILE_SERVER ="http://192.168.43.232/insurancehub/assets/";
  }
  else {
    FILE_SERVER ="https://insurancehub.ng/portal/assets/"; 
  }
const constants = {
    FILE_SERVER: FILE_SERVER,
    appGreen: '#79BB33',
    secondaryGreen: '#3E9545',

}
export default constants;