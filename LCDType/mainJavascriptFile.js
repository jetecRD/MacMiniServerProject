var typeList = Array();
var jsonData = Array();

$(document).ready(function () {
    let tablePlace = $("#tablePlace");
    getTypeData();
    $("#deleteType").click(function () {
        let selectedValue = $("#type_select").val();
        if (window.confirm("Do you want to delete " + selectedValue + "?")) {
            let value = $("#type_select").val();
            $.post('deleteObject.php',
                {
                    'object': 'type',
                    'type': value
                }, function (data, status, response) {
                    if (status == 'success') {
                        if (response.status == 200) {
                            jsonData = JSON.parse(data);
                            setSelectList($("#type_select"), jsonData, true);
                            setTable(jsonData, true)
                        }
                    }
                });
        }

    });

    $("#insertType").keypress(function (event) {
        if (event.which == 13) {
            newType();
        }
    });

    $("#insertType").keyup(function () {
        let pattern = "^(JTC-)(140|240|340)[ADC]{1}[2]?[R]?[M]?[ILBVW]?$";

        if ($("#insertType").val().trim().match(pattern)) {
            //match success

            $("#insertType").css("box-shadow", "0px 0px 0px 2.5px #6db9fd");
            // $("#addType_button").isEnabled(1);
            $('#newType').removeAttr('disabled');


        } else {
            //match failed

            $("#insertType").css("box-shadow", "0px 0px 0px 2.5px red");
            // $("#addType_button").isEnabled(0);
            $('#newType').attr('disabled', true);
        }

    });
    $("#insertType").focusout(function () {

        $("#insertType").css("box-shadow", "none");
    });

    $("#insertType").focus(function () {
        $("#insertType").css("box-shadow", "0px 0px 0px 2.5px #6db9fd");
    });

    $("#renameText").keyup(function () {
        let pattern = "^(JTC-)(140|240|340)[ADC]{1}[2]?[R]?[M]?[ILBVW]?$";

        if ($("#renameText").val().trim().match(pattern)) {
            //match success

            $("#renameText").css("box-shadow", "0px 0px 0px 2.5px #6db9fd");
            // $("#addType_button").isEnabled(1);
            $('#renameSend').removeAttr('disabled');


        } else {
            //match failed

            $("#renameText").css("box-shadow", "0px 0px 0px 2.5px red");
            // $("#addType_button").isEnabled(0);
            $('#renameSend').attr('disabled', true);
        }

    });
    $("#renameText").focusout(function () {

        $("#renameText").css("box-shadow", "none");
    });

    $("#renameText").focus(function () {
        $("#renameText").css("box-shadow", "0px 0px 0px 2.5px #6db9fd");
    });

    $("#type_select").change(function () {
        $("#renameText").val($("#type_select").val());
        let section = $("#type_select")[0].selectedIndex;
        $("#renameSend").attr("onclick", "renameSend(" + section + ")");
    });

    $("#funcName").keypress(function (event) {
        if (event.which == 13) {
            newService()

        }
    });
    $("#funcCode").keypress(function (event) {
        if (event.which == 13) {
            $("#dataTypeSelect").focus()
        }
    });
    $("#dataTypeSelect").keypress(function (event) {

        if (event.which == 13) {
            $("#funcName").focus()
        }
    });
    $("#dataTypeSelect").change(function () {

        $("#funcName").focus()
    })


});


function getTypeData(emptyFirst = true) {
    let typeSelect = $("#type_select");
    $.get("getTypeData.php", function (data) {
        jsonData = JSON.parse(data);
        setSelectList(typeSelect, jsonData, emptyFirst);
        setTable(jsonData, emptyFirst);
    });
}


function setSelectList(select, data, emptyFirst = false) {
    if (emptyFirst) {
        select.empty();
        typeList = [];
    }
    for (i = 0; i < data.length; i++) {
        typeList.push(data[i].type);
        select.append("<option value=" + data[i].type + "> " + data[i].type + " </option>")
    }
}


function setTable(dataArray, emptyFirst = false) {
    let tablePlace = $("#tablePlace");
    if (emptyFirst) {
        tablePlace.empty();
    }
    for (i = 0; i < dataArray.length; i++) {
        if (i != 0) {
            tablePlace.append("</br>")
        }
        tablePlace.append("<table class='typeList' id=" + dataArray[i].type + "_table" +
            " border='2px solid black'style='border-collapse: collapse; text-align: center' width='50%'></table>");
        let table = $("#" + dataArray[i].type + "_table" + "");
        table.append("<th colspan= " + (dataArray[i].services.length > 0 ? 4 : 3) + ">" + dataArray[i].type + "</th>");
        table.append("<tr id=" + dataArray[i].type + "_title" + "></tr>");
        let title_list = $("#" + dataArray[i].type + "_title" + "");
        title_list.append("<td>Command</td>");
        title_list.append("<td>Value Type</td>");
        title_list.append("<td>Display Name</td>");
        if (dataArray[i].services.length > 0) {
            title_list.append("<td></td>");
        }

        for (ii = 0; ii < dataArray[i].services.length; ii++) {
            table.append("<tr id=" + dataArray[i].type + "_value" + ii + "></tr>");
            let value_list = $("#" + dataArray[i].type + "_value" + ii + "");
            value_list.append("<td>" + dataArray[i].services[ii].cmd + "</td>");
            value_list.append("<td>" + dataArray[i].services[ii].value_type + "</td>");
            value_list.append("<td>" + dataArray[i].services[ii].name + "</td>");
            if (dataArray[i].services.length > 0) {
                value_list.append("<td>" +
                    "<input type='button' value='刪除' id='deleteButton_" + i + "_" + ii + "' onclick='deleteButtonAction(this)'>&nbsp;" +
                    "<input type='button' value='編輯' id='editButton_" + i + "_" + ii + "' onclick='editButtonAction(this)'>&nbsp;" +
                    "<input type='button' value='⬆' id='upButton_" + i + "_" + ii + "' onclick='cellUpButton(this)'>&nbsp;" +
                    "<input type='button' value='⬇' id='downButton_" + i + "_" + ii + "' onclick='cellDownButton(this)'>&nbsp;" +
                    "</td> ");
            }
        }
    }
}

// new object
function newType() {
    let pattern = "^(JTC-)(140|240|340)[ADC]{1}[2]?[R]?[M]?[ILBVW]?$";
    let text = $("#insertType").val();
    if (text.trim() != "") {

        if (text.trim().match(pattern)) {
            var ind = typeList.indexOf(text.trim());
            if (ind != -1) {
                alert("型號已經存在");

            } else {
                $.post("setNewType.php", {
                    "type": text
                }, function (data, status, response) {
                    if (response.status == 200) {
                        let typeSelect = $("#type_select");
                        jsonData = JSON.parse(data);
                        setSelectList(typeSelect, jsonData, true);
                        setTable(jsonData, true);
                        $("#type_select").val($("#insertType").val().trim()).change();
                        // $("#funcCode").focus();


                    }
                })

            }
        } else {
            alert("型號格式錯誤");
        }
    } else {
        alert("資料不能為空")
    }

};

function newService() {
    let url = "newService.php";
    let type = $("#type_select").val();
    let code = $("#funcCode").val();
    let valueType = $("#dataTypeSelect").val();
    let name = $("#funcName").val();
    let postData =
        {
            "type": type,
            "valueType": valueType,
            "cmd": code,
            "name": name
        }
    if (!isEmpty(code.trim()) & !isEmpty(name)) {
        $.post(url, postData, function (data, status, response) {
            if (status == "success") {
                if (response.status == 200) {
                    $("#funcCode").val("");
                    $("#funcCode").focus();
                    $("#funcName").val("");
                    $("#dataTypeSelect").val("value");
                    jsonData = JSON.parse(data);
                    setTable(jsonData, true);
                }
            }
        })
    } else {

    }
}

//edit object
function editSendAction() {
    let code = $("#editCode").val();
    let dataType = $("#editSelect").val();
    let name = $("#editName").val();
    let editSendButton = $("#editSendButton");
    let section = editSendButton.attr("section");
    let row = editSendButton.attr("row");
    if (jsonData[section]['services'][row]['cmd'] != code
        || jsonData[section]['services'][row]['value_type'] != dataType
        || jsonData[section]['services'][row]['name'] != name) {
        let postData =
            {
                "section": section,
                "row": row,
                "cmd": code,
                "value_type": dataType,
                "name": name
            };
        $.post("editService.php", postData, function (data, success, response) {
            if (success == "success" && response.status == 200) {
                jsonData = JSON.parse(data);
                setTable(jsonData, true);
                editCancelAction();
            }
        })

    }

}

function editCancelAction() {
    $("#editView").animate({top: "-33%"}, 800);
    setTimeout(function () {

        $("#editCode").val("");
        $("#editSelect").val('value');
        $("#editName").val("");
    });
}

function startRename() {
    let section = $("#type_select")[0].selectedIndex;
    $("#renameView").removeAttr("hidden");
    $("#typeRename").val("取消");
    $("#typeRename").attr("onclick", "cancelRename()");
    $("#renameSend").attr("onclick", "renameSend(" + section + ")");
    $("#renameText").val($("#type_select").val());
}

function cancelRename() {
    $("#renameView").attr("hidden", "hidden");
    $("#typeRename").val("重新命名");
    $("#typeRename").attr("onclick", "startRename()");
    $("#renameSend").removeAttr("onclick");
    $("#renameText").val("");
}

function renameSend(section) {
    let pattern = "^(JTC-)(140|240|340)[ADC]{1}[2]?[R]?[M]?[ILBVW]?$";
    let type = $("#renameText").val();
    if (type.trim() != jsonData[section]['type']) {

        var ind = typeList.indexOf(type.trim());
        if (ind != -1) {
            alert("型號已經存在");
            return
        }
        let postData =
            {
                "section": section,
                "type": type
            };
        $.post("editType.php", postData, function (data, success, response) {
            if (success == "success" && response.status == 200) {
                jsonData = JSON.parse(data);
                setSelectList($("#type_select"), jsonData, true);
                setTable(jsonData, true);
                cancelRename()
            }
        })
    } else {
        cancelRename()
    }
}

function copyTypeData() {
    let section = $("#type_select")[0].selectedIndex;
    $("#pasteTypeData").attr("onclick", "pasteTypeData(" + section + ")");
    $("#pasteTypeData").removeAttr("disabled");
}

function pasteTypeData(section) {
    let targetSection = $("#type_select")[0].selectedIndex;
    if (section != targetSection) {
        if (window.confirm("Do you want to paste data from " + jsonData[section]['type'] + " to " + jsonData[targetSection]['type'] + " ?")) {
            let postData =
                {
                    "section": section,
                    "targetSection": targetSection
                };
            $.post("copyTypeData.php", postData, function (data, success, response) {
                if (success == "success" && response.status == 200) {
                    jsonData = JSON.parse(data);
                    setTable(jsonData, true)
                }
            })

        }
    }
}


// button in cell

function deleteButtonAction(sender) {
    let url = "deleteObject.php";
    let id = sender.id;
    let split = id.split("_");
    let section = split[1];
    let row = split[2];
    if (window.confirm("delete" + " " + jsonData[section].services[row].cmd + " ?")) {
        let type = jsonData[section]['type'];
        let cmd = jsonData[section]['services'][row]['cmd'];
        let postData =
            {
                "object": "cmd",
                "type": type,
                "cmd": cmd
            };
        $.post(url, postData, function (data, status, response) {
            if (status == "success") {
                if (response.status == 200) {
                    jsonData = JSON.parse(data);
                    setTable(jsonData, true);
                }
            }
        });

    }
};

function editButtonAction(sender) {
    let editView = $("#editView");
    editView.animate({top: "50%"}, 800);
    let id = sender.id;
    let split = id.split("_");
    let section = split[1];
    let row = split[2];

    $("#editCode").val(jsonData[section]['services'][row]['cmd']);
    $("#editSelect").val(jsonData[section]['services'][row]['value_type']);
    $("#editName").val(jsonData[section]['services'][row]['name']);

    let editSend = $("#editSendButton");
    editSend.attr("section", section);
    editSend.attr("row", row);

}


function uploadToCloud() {
    $.get('uploadToCloud.php', function (data, success, status) {
        if (success == 'success') {
            if (status.status == 200) {
                alert("upload success");
            } else {
                alert("upload failed");

            }
        } else {
            alert("connect failed");
        }
    })
}

function cellUpButton(sender, a) {
    let id = sender.id;
    let split = id.split("_");
    let section = split[1];
    let row = split[2];
    let postData =
        {
            "section": section,
            "row": row,
            "status": 'up'
        };

    if (row > 0) {

        $.post('changePosition.php', postData, function (data, success, response) {
            if (success == 'success' && response.status == 200) {
                jsonData = JSON.parse(data);
                setTable(jsonData, true)
            }
        })
    }

}

function cellDownButton(sender) {
    let id = sender.id;
    let split = id.split("_");
    let section = split[1];
    let row = split[2];
    let postData =
        {
            "section": section,
            "row": row,
            "status": 'down'
        };

    if (row < jsonData[section]['services'].length - 1) {
        $.post('changePosition.php', postData, function (data, success, response) {
            if (success == 'success' && response.status == 200) {
                jsonData = JSON.parse(data);
                setTable(jsonData, true)
            }
        })
    }
}


function isEmpty(object) {
    return $.isEmptyObject(object.trim())
}