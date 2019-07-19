

// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {


    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch( req )
                .then( res => {
                    return actualizaCacheDinamico( staticCache, req, res );
                });
    }



}



function manejoApiMensajes(dynamicCache,req){

    if (req.clone().method === 'POST') {
        //posteo de un nuevo mensaje   

        if(self.registration.sync){

           return req.clone().text()
            .then(body=>{
                //leer y obtener el objeto
                // console.log(body);
                const bodyObj = JSON.parse(body);
                return guardarMsj(bodyObj);
            });
        }else{
            return fetch(req);
        }

        //Guardar posteriormente en el index db;

    }else{

        return fetch(req).then(res=>{
    
            if (res.ok) {
                actualizaCacheDinamico(dynamicCache,req,res.clone())
                return res.clone();
            }else{
                return caches.match(req);
            }
    
    
        }).catch(err=>{
            return caches.match(req);
        });
    }


}

