//TODO: Try to find a more updated cbor package in the future
import * as hasher from 'multiformats/hashes/hasher'
import * as cbor from 'cbor-sync'
import { protocolName, protocolVersion, fieldProtocolName, fieldProtocolVersion, fieldData, fieldHash, fieldTimestamp } from '../common'

const mhsha1 = hasher.from({
    name: 'sha1',
    code: 0x11, // 0x11 => sha1 in multihash
  
    encode: async function (input) {
        return new Uint8Array(await crypto.subtle.digest('SHA-1',input))
    }
})


/**
 * Encodes a string into cbor data buffer
 * 
 * @param {string} data - the input to incode
 * @param {string} timestamp - time
 * @return {string} - Encoded buffer converted to base64 string
 * 
 * @example
 * //Give input string and timestamp to function
 * encodestring = "Hello World"
 * timestamp = 1
 * var encoded = encode(encodedstring, timestamp)
 * console.log(encoded)
 * 
 * //Expected Output
 * //'pWExZGRvY2lhMgFiMTZrSGVsbG8gV29ybGRiNjMBYjY0VhEUCk1VqNd45QIvq3AZd8XYQLvEhtA='
 * 
 */
async function encode(data, timestamp)
{
    var hash = await mhsha1.digest(new TextEncoder().encode(data))

    var structdata = {
        [fieldProtocolName]: protocolName,
        [fieldProtocolVersion]: parseInt(protocolVersion),
        [fieldData]: data,
        [fieldHash]: Buffer.from(hash.bytes),
        [fieldTimestamp]: parseInt(timestamp)
    }

    var cbordata = cbor.encode(structdata)
    
    return Buffer.from(cbordata).toString('base64')

}

export {
    encode
}