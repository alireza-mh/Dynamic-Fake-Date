var faker = require("faker");
/* TODO make object value not string make it understand something else */
var inputJSON = {
    id: "uuid",
    name: "faker.name.findName",
    comments: "number"
};
function generateFakeFromJSON(input) {
    var outputObject = {};
    for (var _i = 0, _a = Object.entries(input); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        outputObject[key.toString()] = fakeTypeGenerator(value);
    }
    return outputObject;
}
/**
 * @function fakeTypeGenerator
 * @description generate fake info according to provided typw
 * @param type {string} what type to fake
 */
function fakeTypeGenerator(type) {
    var isFakeApi = type.includes("faker");
    if (isFakeApi) {
        var fakerMethods = type.split(".");
        /* make sure fake is on first entery */
        if (fakerMethods[0] === "faker") {
            fakerMethods.shift(); /* remove faker */
            var FMLength_1 = fakerMethods.length;
            return fakerMethods.reduce(function (augFunc, currenItem, index) {
                /* run faker api dynamicly and call argument in last element */
                if (index === FMLength_1 - 1) {
                    return augFunc[handleLastMethod(currenItem)](handleCurlyBraces(currenItem));
                }
                return augFunc[currenItem];
            }, faker);
        }
    }
}
/**
 * @function handleLastMethod
 * @description extract last method string (get srt before paranteces)
 * @param methodStr {string} last method string
 */
function handleLastMethod(methodStr) {
    var hasParanteses = methodStr.includes("(");
    if (hasParanteses) {
        var methodName = methodStr.split("(")[0];
        return methodName;
    }
    return methodStr;
}
/**
 * @function handleCurlyBraces
 * @description find out which kind of argument has been pass to the function(last string)
 * @param methodStr
 */
function handleCurlyBraces(methodStr) {
    var hasCurly = methodStr.includes("(");
    if (hasCurly) {
        var argument = methodStr.split("(")[1].split(")")[0];
        if (argument) {
            var isObject = argument.includes("{");
            if (isObject) {
                try {
                    return JSON.parse(argument.replace(/\'/g, '"'));
                }
                catch (e) {
                    console.log(e);
                    throw Error("not well formated argument");
                }
            }
            /* TODO support multiple argument */
            if (Number(argument)) {
                return Number(argument);
            }
        }
    }
    return "";
}
