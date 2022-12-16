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
 * Checks the signature to make sure its valid
 * 
 * @param {string} datahash - string of data that will be converted to a buffer
 * @param {Buffer} originalhash - original buffer to compare the datahash with
 *  
 * @returns - continues if the both paramaters match, if they dont it throws an error
 * 
 */
function check_hash(datahash, originalhash) 
{
    var buffhash = Buffer.from(datahash)

    if (Buffer.compare(buffhash, originalhash) != 0)
    {
        throw new Error("Invalid signature")
    }
}

/**
 * Decodes an encoded cbor string and writes the data into a structure/object.
 * 
 * @param {string} b64 - cbor encoded string thats in base64.
 * @returns {string|int} - String of data decoded, and timestamp.
 * 
 * @example
 * //Give a cbor encoded string to decode
 * var datastring = "pWExZGRvY2lhMgFiMTZrSGVsbG8gV29ybGRiNjMBYjY0VhEUCk1VqNd45QIvq3AZd8XYQLvEhtA="
 * var decoded = await decode(datastring)
 * consolog.log(decoded)
 * 
 * //Expected Output
 * //Object{data: 'Hello World', timestamp: 1}
 */
async function decode(b64)
{
    const data = Buffer.from(b64, 'base64')

    var decodedcbor = cbor.decode(data)

    if (decodedcbor[fieldProtocolName] != protocolName)
    {
        throw new Error("Protocol names do not match")
    }

    if (decodedcbor[fieldProtocolVersion] != protocolVersion)
    {
        throw new Error("Protocol Versions do not match")
    }

    var datas = decodedcbor[fieldData]
    var hash = await mhsha1.digest(new TextEncoder().encode(datas))
    
    check_hash(hash.bytes, decodedcbor[fieldHash])    
    
    return {
        "data":datas,
        "timestamp": decodedcbor[fieldTimestamp]
    }
}

export {
    decode
}