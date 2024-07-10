
const styleTable = "style='border:none; border-collapse:collapse;color:#000000'";
const styleTd = "style='background-color:#ffffff; padding:5px; border:1px solid silver; border-collapse:collapse;'";
const styleTh = "style='white-space:normal; background-color:#eeeeee; padding:5px; width:70px; border:1px solid silver; border-collapse:collapse; vertical-align:top'";

export function yaml2html(yamlObj: Object) {

    let body: string = "";

    body += "<table " + styleTable + ">";
    body = convert(yamlObj, body);
    body += "</table>";

    return body;
}

export function convert(item: any, body: string) {

    if (item instanceof Array) {

        let itemVal: any = item[0];

        // If the value is an object
        if (itemVal instanceof Object) {
            body = createlistTable(item, body);

        } else {
            // If the value is a string element
            for (let idx in item) {
                body += "<li>" + item[idx] + "</li>";
            }
        }

    } else {
        for (let itemKey in item) {
            let itemVal = item[itemKey];

            // If the value is an object
            if (itemVal instanceof Object) {
                body += "<tr><th " + styleTh + ">" + itemKey + "</th>";
                body += "<td " + styleTd + "><table " + styleTable + ">";
                body = convert(itemVal, body);
                body += "</table></td></tr>";

            } else {
                // If the value is a string element
                body += "<tr><th " + styleTh + ">" + itemKey + "</th>";
                body += "<td " + styleTd + ">" + itemVal + "</td></tr>";
            }
        }
    }
    return body;
}

// For a List of Hash, create a table
export function createlistTable(item: any, body: string) {

    // Create a list of unique keys
    var childKeyList: string[] = new Array();
    for (let idx in item) {

        let itemVal: any = item[idx];
        let child: any = itemVal;

        for (let childKey in child) {
            if (childKeyList.indexOf(childKey) == -1) {
                childKeyList.push(childKey);
            }
        }
    }

    body += "<table " + styleTable + "><tr>";

    // Table Header
    for (let idx in childKeyList) {
        body += "<th " + styleTh + ">" + childKeyList[idx] + "</th>";
    }

    body += "</tr>";

    // Table Data Section
    for (let idx in item) {

        let childHash: any = item[idx];
        body += "<tr>";

        for (let idx in childKeyList) {

            let childVal = childHash[childKeyList[idx]];

            // Recursive call if child hierarchy is an object
            if (childVal instanceof Object) {
                body += "<td " + styleTd + ">";
                body += "<table " + styleTable + ">";
                body = convert(childVal, body);
                body += "</table></td>";
            } else {

                body += "<td " + styleTd + ">" + childVal + "</td>";
            }
        }
        body += "</tr>";

    }

    return body;
}