
var neighborhood = {
  name:         'Seattle',
  number:       '10',
  top:          '3'
}
var credit = {
  crime:           '2',
  school:          '1',
  transportation:  '1',
  housePrice:      '2',
  hiking:          '1',
  swimming:        '1',
  travelling:      '1'
}
var criteria = {
  crime:           'crime',
  school:          'school',
  transportation:  'transportation',
  housePrice:      'housePrice',
  supportingAct:   'supportingAct'
}
//we can mapping income to house in this way
/*
income      average price
10-50       above 200
50-100      above 500
100-150     above 800
150+        above 1000+
*/

var incomeHousePriceMapping ={
  '10-30'         :'100',
  '30-60'         :'200',
  '60-90'         :'400',
  '90+'           :'500'
}
