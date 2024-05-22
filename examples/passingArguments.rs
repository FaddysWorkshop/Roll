?# cat - > .pa.mjs

+==
Object .entries ( process .env )
.filter ( ( [ name, value ] ) => name .startsWith ( 'FR_' ) )
.forEach ( ( [ name, value ] ) => console .log ( name, name .slice ( 3 ), value ) );
-==

?# node .pa.mjs ; rm .pa.mjs
