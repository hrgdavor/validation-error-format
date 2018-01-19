var formatter = module.exports;

describe('validation-error-format', () => {

  it('sanitize string', () => {
    var ret = formatter('error1');
    expect(ret.error).toEqual('error1')
    expect(ret.type).toEqual('custom')
    expect(ret.data).toEqual({})
  })

  it('sanitize nested', () => {
    var ret = formatter( {nested: {name: 'error1'}});
    expect(ret.error).toEqual(true)
    expect(ret.nested.name.error).toEqual('error1')
    expect(ret.nested.name.type).toEqual('custom')
    expect(ret.nested.name.data).toEqual({})
  })

  it('sanitize nested validatejs', () => {
    var ret = formatter( [{attribute: 'name', validator:'custom', error: 'error1'}]);
    console.log('ret',ret.nested.name);
    expect(ret.error).toEqual(true)
    expect(ret.nested.name.error).toEqual('error1')
    expect(ret.nested.name.type).toEqual('custom')
    expect(ret.nested.name.data).toEqual({value:void 0})
  })

  it('sanitize string validatejs', () => {
    var ret = formatter(['error1']);
    expect(ret.error).toEqual('error1')
    expect(ret.type).toEqual('custom')
    expect(ret.data).toEqual({})
  })

})

