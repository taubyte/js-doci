
import {decode, encode, lookup} from '../src'

describe('Given a Doci codec', async function () {
    it('should correctly encode a string', async function () {
        var expectedstring = 'pWExZGRvY2lhMgFiMTZrSGVsbG8gV29ybGRiNjMBYjY0VhEUCk1VqNd45QIvq3AZd8XYQLvEhtA='
        var teststring = "Hello World"
        var doci_coded = await encode(teststring, 1)
        expect(doci_coded).to.equal(expectedstring)
    })
    it('encoder output should always be a string', async function() {
        var doci_string = await encode(doci_string, Date.now())
        expect(doci_string).to.be.a.string
    })

    it('should correctly decode a well-formed doci string', async function () {
        var expected = '{"data":"Hello World","timestamp":1}'
        var teststring = "pWExZGRvY2lhMgFiMTZrSGVsbG8gV29ybGRiNjMBYjY0VhEUCk1VqNd45QIvq3AZd8XYQLvEhtA="
        var doci_decoded = await decode(teststring)  
        expect(JSON.stringify(doci_decoded)).to.equal(expected)
    })
    it('should correctly decode a well-formed doci string', async function(){
        var testdata = "pQFkZG9jaQIBEGRwaW5nGEBWERRXKYK7xPKe6Sri1lqe3CRT0skXDBg/AA=="
        var expectobject = '{"data":"ping","timestamp":0}'
        var returnobject = await decode(testdata)
        expect(JSON.stringify(returnobject)).to.equal(expectobject)
    })

    it('should be able to grab TXT records from DNS and decode them correctly', async function(){
        var testlookup = '__elders__.net.taubyte.com'
        var expectobj = '[{"data":"/ip4/139.178.89.23/tcp/4200/p2p/12D3KooWM3TM4KXHqvnJef72rPKhZ2kkPPupD44nakC29GLMkN5i","timestamp":1635806209},{"data":"/ip4/145.40.64.183/tcp/4200/p2p/12D3KooWQyS1ikgrHf7x7uUtajrQehaMLwN6Bo1cxSTHsoCY72Zt","timestamp":1635806295}]'
        var testDNS = await lookup(testlookup)
        expect(JSON.stringify(testDNS)).to.equal(expectobj)
    })
})
