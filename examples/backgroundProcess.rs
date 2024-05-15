$ mkdir -p .bgps
$ cat - > .bgps/server.mjs

import { createServer } from 'node:http';

createServer ( ( request, response ) => response .end ( "Hello World!" ) )
.listen ( 1313 );

$ node .bgps/server.mjs & echo $! > .bgps/server.ps

$ echo koko wawa
