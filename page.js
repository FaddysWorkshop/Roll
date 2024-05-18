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

await page .command ( Symbol .for ( 'exit' ) );

}

[ '$#++' ] () { this .open = true }

[ '$++#' ] () { this .open = false }

$$ ( $, ... line ) {

return $ ( ... line, ... this .roll .argv );

}

};
