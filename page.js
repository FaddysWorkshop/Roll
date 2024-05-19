import command from '@faddys/command';
import $_command from './command.js';

export default class Page {

constructor ( ... line ) {

if ( ! line .length )
throw SyntaxError ( 'Command line cannot be empty' );

this .line = line;
this .wait = true;

}

options = {

stdio: [ 'ignore', 'inherit', 'inherit' ]

}

$_command = $_command

async $_producer ( $, { stamp, pilot } ) {

const page = this;
const { scenario: roll } = await pilot ( stamp );

await pilot ( Symbol .for ( 'run' ) );

roll .$_director = $;

page .roll = roll;

await $ ( Symbol .for ( 'command' ), ... page .line );

}

input = []

$_director ( $, ... line ) {

const page = this;

if ( page .open )
page .input .push ( page .roll .line );

}

async $_run ( $ ) {

const page = this;

if ( page .input .length )
page .options .stdio [ 0 ] = 'pipe';

page .command = await command ( page .options, ... page .line );

page .command ( Symbol .for ( 'end' ), page .input .join ( '\n' ) || undefined );

if ( page .wait )

await page .command ( Symbol .for ( 'exit' ) );

}

async [ '$++=' ] ( $, ... line ) {

this .input .push ( line .join ( ' ' ) );

}

[ '$+==' ] () { this .open = true }

[ '$-==' ] () { this .open = false }

[ '$=-' ] = {

async $_producer ( $, production ) {

production .setting = await production .player ( production .stamp );

},

async $1 ( $, ... line ) {

this .options .stdio [ 1 ] = 'ignore';

if ( line .length )
return await $ ( '=-', ... line );

},

async $2 ( $, ... line ) {

this .options .stdio [ 2 ] = 'ignore';

if ( line .length )
return await $ ( '=-', ... line );

}

}

$$ ( $, ... line ) {

return $ ( ... line, ... this .roll .argv );

}

};
