
module.exports = function (_msg, multilineDelim){
  multilineDelim = multilineDelim || '\n';
  return sanitize(_msg);

  function sanitize(vMsg){
    if(!vMsg) return void 0;
    if(typeof vMsg == 'string'){
      return {
        error: vMsg,
        type: 'custom',
        data:{}
      }
    }

    // validatejs format: https://validatejs.org
    if(vMsg instanceof Array){
      if(typeof vMsg[0] == 'string'){
        return sanitize(vMsg.join(multilineDelim));
      }
      // detailed format
      var ret = {data:{}, nested:{}};
      for(var p in vMsg){
        var tmp = vMsg[p];
        var def = {data:{value: tmp.value}, type:tmp.validator, error:tmp.error};

        ret.nested[tmp.attribute] = def;
        if(def.error) error = true; // parent error also true
      }
      ret.error = error;
      return ret;
    }

    if(!vMsg.error && !vMsg.nested) return void 0;

    var ret = { 
      error: vMsg.error, 
      data:vMsg.data || {} 
    };
    var error = vMsg.error;

    if(vMsg.nested){
      ret.nested = (vMsg.nested instanceof Array) ? [] : {};
      for(var p in vMsg.nested){
        var tmp = sanitize(vMsg.nested[p]);
        if(tmp.error) error = true;
        ret.nested[p] = tmp;
      }
    }
    // error is marked if any nested validation has error too.
    // This way receiver of validation status does not have to do recursive checks
    ret.error = error;
    return ret;
  }

}
