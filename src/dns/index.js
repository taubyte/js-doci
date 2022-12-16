import * as dohjs from 'dohjs'
import {decode} from '../decode'

var resolver = new dohjs.DohResolver('https://dns.google/dns-query')
var defaultTimeout = 1000

/**
 * Gets the txt records of the given DNS
 * 
 * @param {string} fqdn - domain name to get txt records.
 * @returns {object} - object(s) containting the data and timestamp of the query request.
 * 
 */
async function lookup(fqdn)
{
    var response = await resolver.query(fqdn, 'TXT', 'GET', null, defaultTimeout)
    var values = []

    for (var ans of response.answers) {
      var value = await decode(ans.data.toString())
      values.push(value)
    }
  
    return values
}

export{
  lookup
}