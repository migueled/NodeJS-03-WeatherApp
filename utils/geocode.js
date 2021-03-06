const request = require( 'request' );
//---KEYS
const key = require( '../clave' );

const geoCode = ( address , callback ) => {
    const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent( address ) }.json?access_token=${ key.keyMapBox() }&limit=5`;

    request({ url : urlMapBox , json : true } , ( error , { body } ) => {
        if( error ) {
            callback( 'Unable to connect to weather service' ,undefined );
        } else if( body.message ) {
            callback( 'Not Found location' , undefined );
        } else {
            callback( undefined , {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location : body.features[0].place_name
            } );
        }
    });
};

module.exports = geoCode;