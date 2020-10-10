const get = (url)=>{
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('x-j_gid_cod_app','e2')
    return fetch(url,{credentials: 'same-origin', headers}).then(resp=>{
        if (resp.ok){
            const ct = resp.headers.get('content-type')
            if (ct && ct.indexOf('application/json')>=0){
                return resp.json()
            }
            console.warn(`${url} devolvió content-type: ${ct}`)
            return resp.text()
        }
        else{
            throw new Error(`Error haciendo get de ${url}, ${resp.status}`)
        }
    })
}
const post = (url, data)=>{
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json;charset=UTF-8')
    headers.append('x-j_gid_cod_app','e2')
    return fetch(url,{credentials: 'same-origin', method: 'post', body: JSON.stringify(data), headers}).then(resp=>{
        if (resp.ok){
            const ct = resp.headers.get('content-type')
            if (ct && ct.indexOf('application/json')>=0){
                return resp.json()
            }
            console.warn(`${url} devolvió content-type: ${ct}`)
            return resp.text()
        }
        else{
            throw new Error(`Error haciendo post de ${url}, ${resp.status}`)
        }
    })
}
const test = id =>{
    return post("/api/1.0/ftrsub/test", {identificador: id})
}

export {test}