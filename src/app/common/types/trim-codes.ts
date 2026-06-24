const regExp63: [RegExp, string][] = [
  [/^(STD|BLK)$/, 'Black Vinyl'],
  [/^(490(A|B|J|K|S|T|XE|XF|XG|XH))$/, 'Blue Vinyl'],
  [/^(490(C|D|L|M|Q|R|XA|XB|XC|XD))$/, 'Red Vinyl'],
  [/^(490(E|F|N|P|U|V|XJ|XK|XL|XM))$/, 'Saddle Vinyl'],
  [/^(898(A|B|E|F|G|H|Q|R|S|T))$/, 'Saddle Leather'],
];

// Some codes for 64 models might only have the first letter after the number
// TODO: Update to support single letter codes for 64 models if they are found
const regExp64: [RegExp, string][] = [
  [/^(490(AA|AB|AC|AD|AE|AF|AG|AH|GA|GB|GC|GD|GG|GH|GJ|GK|GL|GM|GN|GP|GQ|GR|GS|GT|HA|HB|HC|HD|HG|HH|HJ|HK|HL|HM|HN|HP|HQ|HR|HS|HT))$/, 'Red Vinyl'],

  [/^(490(BA|BB|BC|BD|BE|BF|BG|BH|JA|JB|JC|JD|JG|JH|JJ|JK|JL|JM|JN|JP|JQ|JR|JS|JT|KA|KB|KC|KD|KG|KH|KJ|KK|KL|KM|KN|KP|KQ|KR|KS|KT))$/, 'Blue Vinyl'],

  [/^(490(CA|CB|CC|CD|CE|CF|CG|CH|LA|LB|LC|LD|LG|LH|LJ|LK|LL|LM|LN|LP|LQ|LR|LS|LT|MA|MB|MC|MD|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|MS|MT))$/, 'Saddle Vinyl'],

  [/^(490(DA|DB|DC|DD|DE|DF|DG|DH))$/, 'Silver Vinyl'],

  [/^(491(AA|AB|AC|AD|AE|AF|AG|AH))$/, 'Silver Vinyl, Black Dash'],

  [/^(491(BA|BB|BC|BD|BE|BF|BG|BH))$/, 'Silver Vinyl, Blue Dash'],

  [/^(491(CA|CB))$/, 'White Vinyl, Black Dash'],

  [/^(491(DA|DB|DC|DD|DE|DF|DG|DH))$/, 'White Vinyl, Red Dash'],

  [/^(491(GA|GB|GC|GD|GE|GF|GG|GH))$/, 'White Vinyl, Blue Dash'],

  [/^(491(HA|HB|HC|HD|HE|HF|HG|HH))$/, 'White Vinyl, Saddle Dash'],

  [/^(898(AA|AB))$/, 'Black Leather'],

  [/^(898(CA|CB|CC|CD|DA|DB|DC|DD|GA|GB|GC|GD|GG|GH|GJ|GK|GL|GM|GN|GP|GQ|GR|GS|GT|HA|HB|HC|HD|HG|HH|HJ|HK|HL|HM|HN|HP|HQ|HR|HS|HT))$/, 'Saddle Leather'],

  [/^(898(EA|EB|EC|ED|FA|FB|FC|FD|LA|LB|LC|LD|LG|LH|LJ|LK|LL|LM|LN|LP|LQ|LR|LS|LT|MA|MB|MC|MD|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|MS|MT))$/, 'Red Leather'],

  [/^(898(JA|JB|JC|JD|KA|KB|KC|KD|NA|NB|NC|ND|NG|NH|NJ|NK|NL|NM|NN|NP|NQ|NR|NS|NT|PA|PB|PC|PD|PG|PH|PJ|PK|PL|PM|PN|PP|PQ|PR|PS|PT))$/, 'Blue Leather'],

  [/^(899(AA|AB|AC|AD|AE|AF|AG|AH))$/, 'Silver Leather, Black Dash'],

  [/^(899(BA|BB|BC|BD|BE|BF|BG|BH))$/, 'Silver Leather, Blue Dash'],

  [/^(899(CA|CB))$/, 'White Leather, Black Dash'],

  [/^(899(GA|GB|GC|GD|GE|GF|GG|GH))$/, 'White Leather, Blue Dash'],

  [/^(899(HA|HB|HC|HD|HE|HF|HG|HH))$/, 'White Leather, Saddle Dash'],

  [/^(899(DA|DB|DC|DD|DE|DF|DG|DH))$/, 'White Leather, Red Dash'],

  // Two Tone Vinyl ********** ********** ********** ********** **********
  [
    /^(491(MA|MB|MC|MD|ME|MF|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|NA|NB|NC|ND|NE|NF|NG|NH|NJ|NK|NL|NM|NN|NP|NQ|NR))$/,
    'Silver Vinyl, Blue Dash',
  ],

  [
    /^(491(PA|PB|PC|PD|PE|PF|PG|PH|PJ|PK|PL|PM|PN|PP|PQ|PR|QA|QB|QC|QD|QE|QF|QG|QH|QJ|QK|QL|QM|QN|QP|QQ|QR))$/,
    'White Vinyl, Red Dash',
  ],

  [
    /^(491(RA|RB|RC|RD|RE|RF|RG|RH|RJ|RK|RL|RM|RN|RP|RQ|RR|SA|SB|SC|SD|SE|SF|SG|SH|SJ|SK|SL|SM|SN|SP|SQ|SR))$/,
    'White Vinyl, Blue Dash',
  ],

  [
    /^(491(TA|TB|TC|TD|TE|TF|TG|TH|TJ|TK|TL|TM|TN|TP|TQ|TR|UA|UB|UC|UD|UE|UF|UG|UH|UJ|UK|UL|UM|UN|UP|UQ|UR))$/,
    'White Vinyl, Saddle Dash',
  ],

  // Two Tone Leather ********** ********** ********** ********** **********
  [
    /^(899(MA|MB|MC|MD|ME|MF|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|NA|NB|NC|ND|NE|NF|NG|NH|NJ|NK|NL|NM|NN|NP|NQ|NR))$/,
    'Silver Leather, Blue Dash',
  ],

  [
    /^(899(RA|RB|RC|RD|RE|RF|RG|RH|RJ|RK|RL|RM|RN|RP|RQ|RR|SA|SB|SC|SD|SE|SF|SG|SH|SJ|SK|SL|SM|SN|SP|SQ|SR))$/,
    'White Leather, Blue Dash',
  ],

  [
    /^(899(TA|TB|TC|TD|TE|TF|TG|TH|TJ|TK|TL|TM|TN|TP|TQ|TR|UA|UB|UC|UD|UE|UF|UG|UH|UJ|UK|UL|UM|UN|UP|UQ|UR))$/,
    'White Leather, Saddle Dash',
  ],

  [
    /^(899(PA|PB|PC|PD|PE|PF|PG|PH|PJ|PK|PL|PM|PN|PP|PQ|PR|QA|QB|QC|QD|QE|QF|QG|QH|QJ|QK|QL|QM|QN|QP|QQ|QR))$/,
    'White Leather, Red Dash',
  ],
];

const regExp65: [RegExp, string][] = [
  [/STD/, 'Black Vinyl'],
  [/402/, 'Black Leather'],
  [/407/, 'Red Vinyl'],
  [/408/, 'Red Leather'],
  [/414/, 'Blue Vinyl'],
  [/415/, 'Blue Leather'],
  [/420/, 'Saddle Vinyl'],
  [/421/, 'Saddle Leather'],
  [/426/, 'Silver/Black Vinyl'],
  [/427/, 'Silver/Black Leather'],
  [/430/, 'Green Vinyl'],
  [/431/, 'Green Leather'],
  [/435/, 'Maroon Vinyl'],
  [/436/, 'Maroon Leather'],
  [/437/, 'White/Black Vinyl'],
  [/438/, 'White/Black Leather'],
  [/443/, 'White/Red Vinyl'],
  [/444/, 'White/Red Leather'],
  [/450/, 'White/Blue Vinyl'],
  [/451/, 'White/Blue Leather'],
];

const regExp66: [RegExp, string][] = [
  [/STD/, 'Black Vinyl'],
  [/402/, 'Black Leather'],
  [/407/, 'Red Vinyl'],
  [/408/, 'Red Leather'],
  [/414/, 'Bright Blue Vinyl'],
  [/415/, 'Bright Blue Leather'],
  [/418/, 'Dark Blue Vinyl'],
  [/419/, 'Dark Blue Leather'],
  [/420/, 'Saddle Vinyl'],
  [/421/, 'Saddle Leather'],
  [/426/, 'Silver Vinyl'],
  [/427/, 'Silver Leather'],
  [/430/, 'Green Vinyl'],
  [/437/, 'White Vinyl'],
  [/438/, 'White Leather'],
  [/450/, 'White/Blue Vinyl'],
];

const regExp67: [RegExp, string][] = [
  [/STD/, 'Black Vinyl'],
  [/402/, 'Black Leather'],
  [/407/, 'Red Vinyl'],
  [/408/, 'Red Leather'],
  [/414/, 'Bright Blue Vinyl'],
  [/415/, 'Bright Blue Leather'],
  [/418/, 'Teal Blue Vinyl'],
  [/419/, 'Teal Blue Leather'],
  [/420/, 'Saddle Vinyl'],
  [/421/, 'Saddle Leather'],
  [/430/, 'Green Vinyl'],
  [/450/, 'White/Blue Vinyl'],
  [/455/, 'White/Black Vinyl'],
];


export { regExp63, regExp64, regExp65, regExp66, regExp67 };
