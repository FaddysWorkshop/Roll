?# rm -rf .bgps ; mkdir -p .bgps

?# cat - > .bgps/server.mjs

+==
import { createServer } from 'node:http';

createServer ( ( request, response ) => response .end ( "Hello World! In Solidarity with The People of Palestine till Their Whole Land Is FREE!\n" ) )
.listen ( 1313, () => console .log ( 'listening' ) );
-==

?# cat - > .bgps/listening.mjs

+==
import Scenarist from '@faddys/scenarist';
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';

const input = createReadStream ( '.bgps/server.out', { encoding: 'utf8' } );

await Scenarist ( new class {

$_producer ( $ ) {

createInterface ( { input } )
.on ( 'line', line => $ ( ... line .trim () .split ( /\s+/ ) ) );

}

$listening () {

process .exit ();

}

} );
-==

?# : mkfifo .bgps/server.out ; node .bgps/server.mjs > .bgps/server.out

?# node .bgps/listening.mjs

?# curl http://localhost:1313

?# rm -rf .bgps
