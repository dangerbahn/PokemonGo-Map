'use strict'

const router = require('koa-router')()
const request = require('request')
const sys = require('sys')
const exec = require('child_process').exec;
const Pokeio = require('pokemon-go-node-api')

router.get('/2', function *() {
  this.body = { api: pkg.name, version: pkg.version }
})
router.get('/pogo-map', function *() {
  const key = this.request.query.key
  if (typeof(key) === "undefined" || key !== "DVjuGRn2PiHZ6LkqMYGwMD" ) {
    console.log(key)
    return this.body = {}
  }
  else {

    // function puts(error, stdout, stderr) { console.log("something") }
    // exec("python ../example.py --debug -u dangerbahnh -p pkmn123456 --location \"44.9827756,-93.2837751\" -st 5 -H 0.0.0.0 -P 5001", puts);
    //

    var location = {
        type: 'name',
        name: process.env.PGO_LOCATION || '44.9827756,-93.2837751'
    };

    var username = process.env.PGO_USERNAME || 'dangerbahnhacks';
    var password = process.env.PGO_PASSWORD || 'pkmn123456';
    var provider = process.env.PGO_PROVIDER || 'ptc';

    Pokeio.init(username, password, location, provider, function(err) {
        if (err) throw err;

        console.log('[i] Current location: ' + Pokeio.playerInfo.locationName);
        console.log('[i] lat/long/alt: : ' + Pokeio.playerInfo.latitude + ' ' + Pokeio.playerInfo.longitude + ' ' + Pokeio.playerInfo.altitude);

        Pokeio.GetProfile(function(err, profile) {
            if (err) throw err;

            console.log('[i] Username: ' + profile.username);
            console.log('[i] Poke Storage: ' + profile.poke_storage);
            console.log('[i] Item Storage: ' + profile.item_storage);

            var poke = 0;
            if (profile.currency[0].amount) {
                poke = profile.currency[0].amount;
            }

            console.log('[i] Pokecoin: ' + poke);
            console.log('[i] Stardust: ' + profile.currency[1].amount);

        });
    });
  }
})

module.exports = router
