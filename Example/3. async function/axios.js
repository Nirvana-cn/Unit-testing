const axios=require('axios');
const adapter=require('axios/lib/adapters/http')

function request() {
    return axios.get('http://127.0.0.1:3000',{adapter}).then(res=>res.data)
}

module.exports=request