function gsrun3Helper(labelInfo) {

    // guidance: fix this
      let startGroupId = labelInfo[0].groupId;
      let startGroupId2 = labelInfo[0].groupId2;
      let sheetPosition = 1;

      let values = []
      values[0] = [`${startGroupId2}`];

      for (let i = 0; i <= labelInfo.length + 15; i++) {
        values.push([]);
      }

      for (let i = 0; i < values.length; i++) {
        values[i].push('');
        values[i].push('');
        values[i].push('');

      }



    values[5] = [];
    values[5][0] = `${startGroupId}`;




  values[6] = [];
  values[6][0] = `${labelInfo[0].buy}`;





  values[7] = [];
  values[7][0] = `${labelInfo[0].sell}`;



  values[8] = [];
  values[8][0] = `limit: ${labelInfo[0].limit}`;



  values[9] = [];
  values[9][0] = `reason: ${labelInfo[0].reason}`;


  values[10] = [];
  values[10][0] = `rating: ${labelInfo[0].rating}`;




  values[12] = [];
  values[12][0] = `order filters`;



  values[13] = [];
  values[13][0] = `${labelInfo[0].orderFilterName}`;
  values[13][1] = ``;



  values[13][2] = `${labelInfo[0].symbol}     ${labelInfo[0].number}`;


  // gsapi.spreadsheets.values.update(rowOptions)

  let row = 15;

      for (let i = 1; i < labelInfo.length; i++) {

      // let finalRowOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${startGroupId2}!A1`,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: values}
      // };
      //
      // gsapi.spreadsheets.values.update(finalRowOptions)



        if (startGroupId2 != labelInfo[i].groupId2) {
          startGroupId2 = labelInfo[i].groupId2;
          startGroupId = labelInfo[i].groupId;
          row = 15;



        values = [];

        values[0] = [`${startGroupId2}`];

        for (let i = 0; i <= labelInfo.length + 15; i++) {
          values.push([]);
        }

        for (let i = 0; i < values.length; i++) {
          values[i].push('');
          values[i].push('');
          values[i].push('');

        }




        values[5] = [];
        values[5][0] = `${startGroupId}`;



      values[6] = [];
      values[6][0] = `${labelInfo[i].buy}`;



      values[7] = [];
      values[7][0] = `${labelInfo[i].sell}`;



      values[8] = [];
      values[8][0] = `${labelInfo[i].limit}`;




      values[9] = [];
      values[9][0] = `${labelInfo[i].reason}`;




      values[10] = [];
      values[10][0] = `${labelInfo[i].rating}`;



      values[12] = [];
      values[12][0] = `order filters`;




      values[13] = [];
      values[13][0] = `${labelInfo[i].orderFilterName}`;




      values[13][2] = `${labelInfo[i].symbol}     ${labelInfo[i].number}`;


      // gsapi.spreadsheets.values.update(rowOptions)

        }

        else if (startGroupId2 == labelInfo[i].groupId2  && startGroupId != labelInfo[i].groupId) {
          row++;
          startGroupId = labelInfo[i].groupId;



          values[row - 1] = [];
          values[row - 1][0] = `${startGroupId}`;



          row++;



        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].buy}`;



        row++




        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].sell}`;



        row++;




        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].limit}`;



        row++;


        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].reason}`;



        row++;



        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].rating}`;




        row+= 2;



        values[row - 1] = [];
        values[row - 1][0] = `order filters`;



        row++;



          values[row - 1] = [];
          values[row - 1][0] = `${labelInfo[i].orderFilterName}`;
          values[row - 1][1] = ``;





          values[row - 1][2] = `${labelInfo[i].symbol}     ${labelInfo[i].number}`;



          row++;

        }

        else if (startGroupId2 == labelInfo[i].groupId2 && startGroupId ==
          labelInfo[i].groupId) {


          values[row - 1] = [];
          values[row - 1][0] = `${labelInfo[i].orderFilterName}`;
          values[row - 1][1] = ``;




          values[row - 1][2] = `${labelInfo[i].symbol}     ${labelInfo[i].number}`;

          // console.log('values needed', values);



          row++;
        }



      }

      // values.splice(0, 5);
      finalRowOptions = {
      spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      range: `sheet${startGroupId2}!A6`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: values}
    };


    gsapi.spreadsheets.values.update(finalRowOptions)

}
