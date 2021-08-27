import $ from "jquery";

/**
 * @description 獲取Google 雲端資料
 * @returns {Promise<string>}
 */
export async function getGoogleSheetDataPublicJS() {
    let cbData = ''
    let parameter = {
        url: 'https://docs.google.com/spreadsheets/d/1pHB6t2SOqGyMf1S4rcmawDbGJ3MLliUAcRgGjPdIX44/edit#gid=0',
        name: '商品銷售狀況',
        startRow: 1,
        startColumn: 1
    };
    await $.get('https://script.google.com/macros/s/AKfycbytQm3cq7KYye607UbMzQzscAZFe0bvOvTEDlmu2JK8f1nh9anpIxcWaiFNPMLuniQbcw/exec', parameter, function (data) {
        if (!data) {
            console.log('無資料');
        } else {
            cbData = data
            console.log(data)
        }
    });
    return cbData
}