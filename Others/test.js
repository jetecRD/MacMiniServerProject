/// <reference path="node_modules/@types/jquery/index.d.ts" />
//  import $ from 'jquery';
$(document).ready(function () {
    test1(10, "AAAA", function () {
        $("#type_select").val();
    });
});
function test1(num, str, action) {
    console.log(num);
    console.log(str);
    action();
}
//# sourceMappingURL=test.js.map