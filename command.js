export default {

async $_producer ( $, production ) {

production .setting = await production .player ( production .stamp );

},

$_director ( $, ... line ) {

this .line = line;

},

[ '$=0' ] ( $, ... line ) {

return $ ( Symbol .for ( 'command' ), Symbol .for ( 'stdio' ), 0, 'inherit', ... line );

},

[ '$-1' ] ( $, ... line ) {

return $ ( Symbol .for ( 'command' ), Symbol .for ( 'stdio' ), 1, 'ignore', ... line );

},

[ '$-2' ] ( $, ... line ) {

return $ ( Symbol .for ( 'command' ), Symbol .for ( 'stdio' ), 2, 'ignore', ... line );

},

$_stdio ( $, descriptor, pipe, ... line ) {

this .options .stdio [ descriptor ] = pipe;

return $ ( Symbol .for ( 'command' ), ... line );

},

$$ ( $, ... line ) {

return $ ( Symbol .for ( 'command' ), ... line, ... this .roll .argv );

},

[ '$:' ] ( $, ... line ) {

this .wait = false;

return $ ( Symbol .for ( 'command' ), ... line );

}

};
