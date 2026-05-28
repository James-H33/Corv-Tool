import { decodeTrim } from '../decode-trim.function';

describe('decodeTrim', () => {
  describe('Decode 1963 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['BLK', 'Black Vinyl'],
      ['490C', 'Red Vinyl'],
      ['490L', 'Red Vinyl'],
      ['490D', 'Red Vinyl'],
      ['490A', 'Blue Vinyl'],
      ['490XK', 'Saddle Vinyl'],
      ['898A', 'Saddle Leather'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`${trim} - ${expected}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1963')).toBe(expected);
      });
    });
  });

  describe('Decode 1964 Trim Codes', () => {
//     const regExp64: [RegExp, string][] = [
//   [/^(490(AA|AB|AC|AD|AE|AF|AG|AH))$/, 'Red Vinyl'],

//   [/^(490(BA|BB|BC|BD|BE|BF|BG|BH))$/, 'Blue Vinyl'],

//   [/^(490(CA|CB|CC|CD|CE|CF|CG|CH))$/, 'Saddle Vinyl'],

//   [/^(490(DA|DB|DC|DD|DE|DF|DG|DH))$/, 'Silver Vinyl'],

//   [/^(491(AA|AB|AC|AD|AE|AF|AG|AH))$/, 'Silver Vinyl, Black Dash'],

//   [/^(491(BA|BB|BC|BD|BE|BF|BG|BH))$/, 'Silver Vinyl, Blue Dash'],

//   [/^(491(CA|CB))$/, 'White Vinyl, Black Dash'],

//   [/^(491(DA|DB|DC|DD|DE|DF|DG|DH))$/, 'White Vinyl, Red Dash'],

//   [/^(491(GA|GB|GC|GD|GE|GF|GG|GH))$/, 'White Vinyl, Blue Dash'],

//   [/^(491(HA|HB|HC|HD|HE|HF|HG|HH))$/, 'White Vinyl, Saddle Dash'],

//   [/^(898(AA|AB))$/, 'Black Leather'],

//   [/^(898(CA|CB|CC|CD|DA|DB|DC|DD))$/, 'Saddle Leather'],

//   [/^(898(EA|EB|EC|ED|FA|FB|FC|FD))$/, 'Red Leather'],

//   [/^(898(JA|JB|JC|JD|KA|KB|KC|KD))$/, 'Blue Leather'],

//   [/^(899(AA|AB|AC|AD|AE|AF|AG|AH))$/, 'Silver Leather, Black Dash'],

//   [/^(899(BA|BB|BC|BD|BE|BF|BG|BH))$/, 'Silver Leather, Blue Dash'],

//   [/^(899(CA|CB))$/, 'White Leather, Black Dash'],

//   [/^(899(GA|GB|GC|GD|GE|GF|GG|GH))$/, 'White Leather, Blue Dash'],

//   [/^(899(HA|HB|HC|HD|HE|HF|HG|HH))$/, 'White Leather, Saddle Dash'],

//   [/^(899(DA|DB|DC|DD|DE|DF|DG|DH))$/, 'White Leather, Red Dash'],

//   [
//     /^(490(GA|GB|GC|GD|GG|GH|GJ|GK|GL|GM|GN|GP|GQ|GR|GS|GT|HA|HB|HC|HD|HG|HH|HJ|HK|HL|HM|HN|HP|HQ|HR|HS|HT))$/,
//     'Red Vinyl',
//   ],

//   [
//     /^(490(JA|JB|JC|JD|JG|JH|JJ|JK|JL|JM|JN|JP|JQ|JR|JS|JT|KA|KB|KC|KD|KG|KH|KJ|KK|KL|KM|KN|KP|KQ|KR|KS|KT))$/,
//     'Blue Vinyl',
//   ],

//   [
//     /^(490(LA|LB|LC|LD|LG|LH|LJ|LK|LL|LM|LN|LP|LQ|LR|LS|LT|MA|MB|MC|MD|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|MS|MT))$/,
//     'Saddle Vinyl',
//   ],

//   // Two Tone Vinyl ********** ********** ********** ********** **********
//   [
//     /^(491(MA|MB|MC|MD|ME|MF|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|NA|NB|NC|ND|NE|NF|NG|NH|NJ|NK|NL|NM|NN|NP|NQ|NR))$/,
//     'Silver Vinyl, Blue Dash',
//   ],

//   [
//     /^(491(PA|PB|PC|PD|PE|PF|PG|PH|PJ|PK|PL|PM|PN|PP|PQ|PR|QA|QB|QC|QD|QE|QF|QG|QH|QJ|QK|QL|QM|QN|QP|QQ|QR))$/,
//     'White Vinyl, Red Dash',
//   ],

//   [
//     /^(491(RA|RB|RC|RD|RE|RF|RG|RH|RJ|RK|RL|RM|RN|RP|RQ|RR|SA|SB|SC|SD|SE|SF|SG|SH|SJ|SK|SL|SM|SN|SP|SQ|SR))$/,
//     'White Vinyl, Blue Dash',
//   ],

//   [
//     /^(491(TA|TB|TC|TD|TE|TF|TG|TH|TJ|TK|TL|TM|TN|TP|TQ|TR|UA|UB|UC|UD|UE|UF|UG|UH|UJ|UK|UL|UM|UN|UP|UQ|UR))$/,
//     'White Vinyl, Saddle Dash',
//   ],

//   // Leather ********** ********** ********** ********** **********
//   [
//     /^(898(GA|GB|GC|GD|GG|GH|GJ|GK|GL|GM|GN|GP|GQ|GR|GS|GT|HA|HB|HC|HD|HG|HH|HJ|HK|HL|HM|HN|HP|HQ|HR|HS|HT))$/,
//     'Saddle Leather',
//   ],

//   [
//     /^(898(LA|LB|LC|LD|LG|LH|LJ|LK|LL|LM|LN|LP|LQ|LR|LS|LT|MA|MB|MC|MD|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|MS|MT))$/,
//     'Red Leather',
//   ],

//   [
//     /^(898(NA|NB|NC|ND|NG|NH|NJ|NK|NL|NM|NN|NP|NQ|NR|NS|NT|PA|PB|PC|PD|PG|PH|PJ|PK|PL|PM|PN|PP|PQ|PR|PS|PT))$/,
//     'Blue Leather',
//   ],

//   // Two Tone Leather ********** ********** ********** ********** **********
//   [
//     /^(899(MA|MB|MC|MD|ME|MF|MG|MH|MJ|MK|ML|MM|MN|MP|MQ|MR|NA|NB|NC|ND|NE|NF|NG|NH|NJ|NK|NL|NM|NN|NP|NQ|NR))$/,
//     'Silver Leather, Blue Dash',
//   ],

//   [
//     /^(899(RA|RB|RC|RD|RE|RF|RG|RH|RJ|RK|RL|RM|RN|RP|RQ|RR|SA|SB|SC|SD|SE|SF|SG|SH|SJ|SK|SL|SM|SN|SP|SQ|SR))$/,
//     'White Leather, Blue Dash',
//   ],

//   [
//     /^(899(TA|TB|TC|TD|TE|TF|TG|TH|TJ|TK|TL|TM|TN|TP|TQ|TR|UA|UB|UC|UD|UE|UF|UG|UH|UJ|UK|UL|UM|UN|UP|UQ|UR))$/,
//     'White Leather, Saddle Dash',
//   ],

//   [
//     /^(899(PA|PB|PC|PD|PE|PF|PG|PH|PJ|PK|PL|PM|PN|PP|PQ|PR|QA|QB|QC|QD|QE|QF|QG|QH|QJ|QK|QL|QM|QN|QP|QQ|QR))$/,
//     'White Leather, Red Dash',
//   ],
// ];
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['BLK', 'Black Vinyl'],
      ['490AA', 'Red Vinyl'],
      ['490AB', 'Red Vinyl'],
      ['490AC', 'Red Vinyl'],
      ['490AD', 'Red Vinyl'],
      ['490AE', 'Red Vinyl'],
      ['490AF', 'Red Vinyl'],
      ['490AG', 'Red Vinyl'],
      ['490AH', 'Red Vinyl'],
      ['490BA', 'Blue Vinyl'],
      ['490BB', 'Blue Vinyl'],
      ['490BC', 'Blue Vinyl'],
      ['490BD', 'Blue Vinyl'],
      ['490BE', 'Blue Vinyl'],
      ['490BF', 'Blue Vinyl'],
      ['490BG', 'Blue Vinyl'],
      ['490BH', 'Blue Vinyl'],
      ['490CA', 'Saddle Vinyl'],
      ['490CB', 'Saddle Vinyl'],
      ['490CC', 'Saddle Vinyl'],
      ['490CD', 'Saddle Vinyl'],
      ['490CE', 'Saddle Vinyl'],
      ['490CF', 'Saddle Vinyl'],
      ['490CG', 'Saddle Vinyl'],
      ['490CH', 'Saddle Vinyl'],
      ['490DA', 'Silver Vinyl'],
      ['490DB', 'Silver Vinyl'],
      ['490DC', 'Silver Vinyl'],
      ['490DD', 'Silver Vinyl'],
      ['490DE', 'Silver Vinyl'],
      ['490DF', 'Silver Vinyl'],
      ['490DG', 'Silver Vinyl'],
      ['490DH', 'Silver Vinyl'],
      ['491AA', 'Silver Vinyl, Black Dash'],
      ['491AB', 'Silver Vinyl, Black Dash'],
      ['491AC', 'Silver Vinyl, Black Dash'],
      ['491AD', 'Silver Vinyl, Black Dash'],
      ['491AE', 'Silver Vinyl, Black Dash'],
      ['491AF', 'Silver Vinyl, Black Dash'],
      ['491AG', 'Silver Vinyl, Black Dash'],
      ['491AH', 'Silver Vinyl, Black Dash'],
      ['491BA', 'Silver Vinyl, Blue Dash'],
      ['491BB', 'Silver Vinyl, Blue Dash'],
      ['491BC', 'Silver Vinyl, Blue Dash'],
      ['491BD', 'Silver Vinyl, Blue Dash'],
      ['491BE', 'Silver Vinyl, Blue Dash'],
      ['491BF', 'Silver Vinyl, Blue Dash'],
      ['491BG', 'Silver Vinyl, Blue Dash'],
      ['491BH', 'Silver Vinyl, Blue Dash'],
      ['491CA', 'White Vinyl, Black Dash'],
      ['491CB', 'White Vinyl, Black Dash'],
      ['491DA', 'White Vinyl, Red Dash'],
      ['491DB', 'White Vinyl, Red Dash'],
      ['491GA', 'White Vinyl, Blue Dash'],
      ['491GB', 'White Vinyl, Blue Dash'],
      ['491HA', 'White Vinyl, Saddle Dash'],
      ['491HB', 'White Vinyl, Saddle Dash'],
      ['898AA', 'Black Leather'],
      ['898AB', 'Black Leather'],
      ['898CA', 'Saddle Leather'],
      ['898CB', 'Saddle Leather'],
      ['898CC', 'Saddle Leather'],
      ['898CD', 'Saddle Leather'],
      ['898DA', 'Red Leather'],
      ['898DB', 'Red Leather'],
      ['898DC', 'Red Leather'],
      ['898DD', 'Red Leather'],
      ['898EA', 'Blue Leather'],
      ['898EB', 'Blue Leather'],
      ['898EC', 'Blue Leather'],
      ['898ED', 'Blue Leather'],
      ['899AA', 'Silver Leather, Black Dash'],
      ['899AB', 'Silver Leather, Black Dash'],
      ['899AC', 'Silver Leather, Black Dash'],
      ['899AD', 'Silver Leather, Black Dash'],
      ['899AE', 'Silver Leather, Black Dash'],
      ['899AF', 'Silver Leather, Black Dash'],
      ['899AG', 'Silver Leather, Black Dash'],
      ['899AH', 'Silver Leather, Black Dash'],
      ['899BA', 'Silver Leather, Blue Dash'],
      ['899BB', 'Silver Leather, Blue Dash'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`${trim} - ${expected}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1964')).toBe(expected);
      });
    });
  });

  describe('Decode 1965 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['402', 'Black Leather'],
      ['407', 'Red Vinyl'],
      ['408', 'Red Leather'],
      ['414', 'Blue Vinyl'],
      ['415', 'Blue Leather'],
      ['420', 'Saddle Vinyl'],
      ['421', 'Saddle Leather'],
      ['426', 'Silver/Black Vinyl'],
      ['427', 'Silver/Black Leather'],
      ['430', 'Green Vinyl'],
      ['431', 'Green Leather'],
      ['435', 'Maroon Vinyl'],
      ['436', 'Maroon Leather'],
      ['437', 'White/Black Vinyl'],
      ['438', 'White/Black Leather'],
      ['443', 'White/Red Vinyl'],
      ['444', 'White/Red Leather'],
      ['450', 'White/Blue Vinyl'],
      ['451', 'White/Blue Leather'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`should return ${expected} for trim code ${trim}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1965')).toBe(expected);
      });
    });
  });

  describe('Decode 1966 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['402', 'Black Leather'],
      ['407', 'Red Vinyl'],
      ['408', 'Red Leather'],
      ['414', 'Bright Blue Vinyl'],
      ['415', 'Bright Blue Leather'],
      ['418', 'Dark Blue Vinyl'],
      ['419', 'Dark Blue Leather'],
      ['420', 'Saddle Vinyl'],
      ['421', 'Saddle Leather'],
      ['426', 'Silver Vinyl'],
      ['427', 'Silver Leather'],
      ['430', 'Green Vinyl'],
      ['437', 'White Vinyl'],
      ['438', 'White Leather'],
      ['450', 'White/Blue Vinyl'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`should return ${expected} for trim code ${trim}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1966')).toBe(expected);
      });
    });
  });

  describe('Decode 1967 Trim Codes', () => {
    const cases: [string, string][] = [
      ['STD', 'Black Vinyl'],
      ['402', 'Black Leather'],
      ['407', 'Red Vinyl'],
      ['408', 'Red Leather'],
      ['414', 'Bright Blue Vinyl'],
      ['415', 'Bright Blue Leather'],
      ['418', 'Teal Blue Vinyl'],
      ['419', 'Teal Blue Leather'],
      ['420', 'Saddle Vinyl'],
      ['421', 'Saddle Leather'],
      ['430', 'Green Vinyl'],
      ['450', 'White/Blue Vinyl'],
      ['455', 'White/Black Vinyl'],
    ];

    cases.forEach(([trim, expected]) => {
      it(`should return ${expected} for trim code ${trim}`, () => {
        const tagData = {
          body: '--',
          trim,
          style: '--',
          paint: '--',
          dateCode: '--',
        };

        expect(decodeTrim(tagData, '1967')).toBe(expected);
      });
    });
  });
});
