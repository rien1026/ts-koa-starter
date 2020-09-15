import * as shell from 'shelljs';

shell.rm('-rf', '.build/src/public');
shell.cp('-R', 'src/public', '.build/src');
