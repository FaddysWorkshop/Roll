import command from '@faddys/command';

export default class Page {

constructor ( ... line ) {

if ( ! line .length )
throw SyntaxError ( 'Command line cannot be empty' );

this .line = line;

}

options = {

stdio: [ 'ignore', 'inherit', 'inherit' ]

}

async $_producer ( $, { stamp, pilot } ) {

const page = this;
const { scenario: roll } = await pilot ( stamp );

await pilot ( Symbol .for ( 'run' ) );

roll .$_director = $;

page .roll = roll;

}

input = []

$_director ( $, ... line ) {

this .input .push ( line .join ( ' ' ) );

}

async $_run ( $ ) {

const page = this;
const input = page .input .join ( '\n' ) .trim ();

if ( input ?.length )
page .options .stdio [ 0 ] = 'pipe';

page .command = await command ( page .options, ... page .line );

page .command ( Symbol .for ( 'end' ), input || undefined );

await page .command ( Symbol .for ( 'exit' ) );

}

$$ ( $, ... line ) {

return $ ( ... line, ... this .roll .argv );

}

};
