const names = [
  'a',
  'abc',
  'actionscript',
  'p',
  'p4',
  'pascal',
  'pearl',
  'perl',
  'prolog',
  'powershell',
  'prolog',
  'q',
  'r',
  'rust',
  'rust',
  'ruby',
  'ring',
  'red',
  'sql',
  'b',
  'c',
  'c plus plus',
  'c sharp',
  'c',
  'python',
  'php',
  'perl',
  'cobol',
  'lua',
  'objective-c',
  'swift',
  'go',
  'java',
  'javasript',
  'typescript',
  'ecmascript',
  'tex',
  'newlisp',
  'nix',
  'nial',
  'lisp',
  'scala',
  'signal',
  'script.net',
  'unity',
  'vim script',
  'wolfram',
  'z plus plus',
  'zebra',
  'janus',
  'joss',
  'julia',
  'jython',
  'j',
  'hollywood',
  'hope',
];

var inputs = {};

function emp(grp, name, val) {
  var val = val.toLowerCase().replace(/\s/g, '');
  var name = name.toLowerCase().replace(/\s/g, '');
  if (names.includes(val)) {
    inputs[grp] = [[name, val]];
  } else {
    throw 'Invalid Input';
  }
}

function nemp(grp, name, val) {
  var val = val.toLowerCase().replace(/\s/g, '');
  var name = name.toLowerCase().replace(/\s/g, '');
  //inputs[grp].push([name, val]);

  if (names.includes(val)) {
    // valid input
    if (inputs[grp] == (undefined || '')) {
      // new group
      emp(grp, name, val);
    } else {
      // duplicate entry check
      for (let i = 0; i < inputs[grp].length; i++) {
        if (inputs[grp][i][1] == val) {
          throw 'Duplicate Entry';
        }
      }
      // catch repeated entry
      if (inputs[grp][inputs[grp].length - 1][0] == name) {
        throw 'Input later';
      } else {
        // input validation
        if (val.charAt(0) == inputs[grp][inputs[grp].length - 1][1].slice(-1)) {
          inputs[grp].push([name, val]);
        } else {
          throw 'Invalid Input';
        }
      }
    }
  } else {
    throw 'Unknown Entry';
  }
}

function val(grp, name, val) {
  if (Object.keys(inputs).length == 0) {
    emp(grp, name, val);
  } else {
    nemp(grp, name, val);
  }
}

try {
  // val(1650819129706, 'fardin', 'php');
  // val(1650819129706, 'kamal', 'python');
  // val(1650819129706, 'khan', 'newlisp');
  // val(1650819129706, 'fardin', 'php');
  // console.log(inputs);
  // val(2, 'kamal', 'python');
  // val(2, 'swad', 'newlisp');
  // inputs[2] = [];
  // val(2, 'kamal', 'python');
  // val(2, 'swad', 'newlisp');
  // console.log(inputs);
} catch (e) {
  console.log(e);
}

// val(3, 'swad', 'c');
// val(3, 'swad', 'a');
// val(3, 'sun', 'c++');

// val(2, 'swad', 'newlisp');

module.exports = { inputs, val };
