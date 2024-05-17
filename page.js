import command from '@faddys/command';

export default class Page {

constructor ( ... line ) {

if ( ! line .length )
throw SyntaxError ( 'Command line cannot be empty' );

this .line = line;

}

options = {

stdio: [ 'pipe', 'inherit', 'inherit' ]

}

async $_producer ( $, { stamp, pilot } ) {

const page = this;
const { scenario: roll } = await pilot ( stamp );

pilot ( Symbol .for ( 'end' ) );
await pilot ( Symbol .for ( 'exit' ) );

roll .$_director = $;

page .$_director = await command ( page .options, ... page .line );

}

[ '$...' ] ( $, ... line ) {

return $ ( ... line, ... this .roll .argv );

}

};
