#!/usr/bin/env node

import Scenarist from '@faddys/scenarist';
import command from '@faddys/command';
import { parse } from 'node:path';

const $$ = Symbol .for;

try {

await Scenarist ( new class Roll {

constructor () {

const argv = process .argv .slice ( 2 );

if ( ! argv .length || argv .length > 1 )
throw [

! argv .length ? 'The <filename> is missing' : 'Too many arguments',
'usage: roll <filename>'

];

this .filename = argv .pop ();

}

async $_producer ( $ ) {

const roll = this;
const script = await command ( 'cat', roll .filename )
.then ( async $ => ( {

output: await $ ( $$ ( 'output' ) ),
error: await $ ( $$ ( 'error' ) )

} ) );

if ( script .error .length )
throw error;

roll .script = script .output;

await $ ( $$ ( 'processor' ) );

await roll .finalize ();

}

index = 0

async $_processor ( $ ) {

const roll = this;

if ( ! roll .script .length )
return;

roll .index++;
roll .line = roll .script .shift ();

await $ ( ... roll .line .trim () .split ( /\s+/ ) );

await $ ( $$ ( 'processor' ) );

}

async $$ ( $, ... line ) {

const roll = this;

if ( roll .command )
await roll .finalize ();

if ( ! line .length )
throw [

`#file ${ roll .filename }`,
`#line ${ roll .index }`,
"#error #syntax The command line can't be empty.",
'#usage $ <commandline>',
'#example $ echo Hello World'

];

roll .command = await command ( ... line );

}

async $_director ( $, ... line ) {

const roll = this;

if ( ! roll .command )
throw [

"#error #syntax This line doesn't belong to a command input."

];

await roll .command ( roll .line );

}

async finalize () {

const roll = this;

await roll .command ( $$ ( 'end' ) );

const output = await roll .command ( $$ ( 'output' ) );

if ( output .length )
console .log ( output .join ( '\n' ) );

const error = await roll .command ( $$ ( 'error' ) );

if ( error .length )
console .error ( error .join ( '\n' ) );

}

} );

} catch ( reasons ) {

if ( reasons ?.forEach )
reasons .forEach ( reason => console .error ( reason ) );

else
console .error ( reasons );

const { dir } = parse ( new URL ( import .meta .url ) .pathname );
const json = await command ( `cat ${ dir }/package.json` )
.then ( async $ => await $ ( $$ ( 'output' ) ) );
const metadata = JSON .parse ( json .join ( '\n' ) );

console .error ( `
${ metadata .name } v${ metadata .version }` );

}
