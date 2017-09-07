(function () {
    var doc = document;
    var addCont = doc.getElementById('add'),
        newContact = doc.getElementById('newContact'),
        save = doc.getElementById('save'),
        saveCange = doc.getElementById('save_chan'),
        delCont= doc.getElementById('del'),
        findCont = doc.getElementById('find_inp');


    // ____________INPUT WINDOW______________
    var newSwitch = function () {
        newContact.classList.toggle('switch'); //переключить
    };

    var newSwitchOn = function () {
        newContact.classList.remove('switch'); //переключить
    };

    var newSwitchOff = function () {
        newContact.classList.add('switch'); //переключить
    };



    var saveNew = function () {
        save.classList.remove('switch'); //переключить
        saveCange.classList.add('switch'); //переключить
        delCont.classList.add('switch'); //переключить
    };

    var saveOld = function () {
        save.classList.add('switch'); //переключить
        saveCange.classList.remove('switch'); //переключить
        delCont.classList.remove('switch'); //переключить
    };


    // ________________ADD________________________
    var clearForms = function () {
        doc.getElementById("name").value = '';
        doc.getElementById("lastname").value = '';
        doc.getElementById("phone").value = '';
        doc.getElementById("mail").value = '';
        findCont.value = '';
    };
    addCont.addEventListener('click', clearForms);
    addCont.addEventListener('click', newSwitchOn);
    addCont.addEventListener('click', saveNew);





    //____________CONTACT LIST_______________
    //обернуть в функцию вызывать после сохранения

    var contList = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        // console.log(arrFromStorage);


        if(arrFromStorage !== null){
            // var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
            for (var i=0; i<arrFromStorage.length; i++){
                var elem = doc.createElement("div"),
                    ins = arrFromStorage[i],
                    namLast =  ins.name + ' ' +  ins.lastname,
                    content = document.createTextNode(namLast);
                // ins.id =  i; // ID-шник свойство
                elem.appendChild(content);
                elem.id = i; // ID-шник атрибут
                elem.className = 'single_contact';
                var conList = document.getElementById("contact_list");
                conList.appendChild(elem);
                // conList.replaceChild(elem);
            }
        }
    };

    contList();


    var contListDel = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        // console.log(arrFromStorage);


        if(arrFromStorage !== null){
            // var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
            for (var i=0; i<arrFromStorage.length; i++){

                var conList = document.getElementById("contact_list");
                var oldElem = doc.getElementById(i);
                if (oldElem !== null) {
                    conList.removeChild(oldElem);
                }
            }
        }
    };




    var contListRefr = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        console.log(arrFromStorage);


        if(arrFromStorage !== null){
            // var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
            for (var i=0; i<arrFromStorage.length; i++){
                var elem = doc.createElement("div"),
                    ins = arrFromStorage[i],
                    namLast =  ins.name + ' ' +  ins.lastname,
                    content = document.createTextNode(namLast),
                    oldElem = doc.getElementById(i);

                elem.appendChild(content);
                elem.id = i; // ID-шник атрибут
                elem.className = 'single_contact';
                var conList = document.getElementById("contact_list");
                conList.removeChild(oldElem);
                conList.appendChild(elem);
                // conList.replaceChild(elem);
            }
        }
    };


    var lastcontList =  function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        // console.log(arrFromStorage);
        // console.log(arrFromStorage.length-1);

        var elem = doc.createElement("div"),
            i = (arrFromStorage.length - 1),
            ins = arrFromStorage[i],
            namLast =  ins.name + ' ' +  ins.lastname,
            content = document.createTextNode(namLast);
        elem.appendChild(content);
        elem.id = i; // ID-шник атрибут
        elem.className = 'single_contact';
        var conList = document.getElementById("contact_list");
        conList.appendChild(elem);
    }

    addCont.addEventListener('click', contListDel);
    addCont.addEventListener('click', contList);




    // ____________SAVE_____________________

    var saveContact = function () {
        var name = doc.getElementById("name").value;
        var lastname = doc.getElementById("lastname").value;
        var phone = doc.getElementById("phone").value;
        var mail = doc.getElementById("mail").value;

        var tmparr = { name: name,
            lastname: lastname,
            phone: phone,
            mail: mail
        };

        var emtyCont = Boolean(tmparr.name || tmparr.lastname || tmparr.phone || tmparr.mail);

        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));



        if(emtyCont){
            if(arrContStor === null){
                var arrCont = [];
                arrCont.push(tmparr);
                localStorage.setItem('arrContIn', JSON.stringify(arrCont));
                lastcontList();
            }
            else {
                arrContStor.push(tmparr);
                localStorage.setItem('arrContIn', JSON.stringify(arrContStor))
                lastcontList();
            }
        };
    };

    save.addEventListener('click', saveContact );
    save.addEventListener('click', newSwitch );
    save.addEventListener('click', clearForms );



    // ____________CLOSE_____________________
    var close = doc.getElementById('close');
    close.addEventListener('click', clearForms);
    close.addEventListener('click', newSwitch);



    // ______________EXPAND________________________

    // Получим ID
    var contactListID = document.getElementById('contact_list');
    var expandCon = function (e) {
        var e = e || event;
        var target = e.target || e.srcElement;
        targetID = target.id;
        // console.log(targetID);
        newContact.classList.remove('switch');
        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));
        var oneCont = arrContStor[targetID];

        doc.getElementById("name").value = oneCont.name;
        doc.getElementById("lastname").value = oneCont.lastname;
        doc.getElementById("phone").value = oneCont.phone;
        doc.getElementById("mail").value = oneCont.mail;

    };

    contactListID .addEventListener('click', expandCon);
    contactListID .addEventListener('click', saveOld);



    // ______________SAVE CHANGE_________________________
    var saveContactChange = function () {
        var name = doc.getElementById("name").value;
        var lastname = doc.getElementById("lastname").value;
        var phone = doc.getElementById("phone").value;
        var mail = doc.getElementById("mail").value;

        var tmparr = { name: name,
            lastname: lastname,
            phone: phone,
            mail: mail
        };


        var emtyCont = Boolean(tmparr.name || tmparr.lastname || tmparr.phone || tmparr.mail);
        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));

        if(emtyCont){
            arrContStor[targetID] = tmparr;
            localStorage.setItem('arrContIn', JSON.stringify(arrContStor));

        }
        };

    saveCange.addEventListener('click', saveContactChange);
    saveCange.addEventListener('click', contListDel);
    saveCange.addEventListener('click', contList);
    saveCange.addEventListener('click', newSwitch);


    // ______________DELETE________________________

    var delOldCont = function () {
        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));

        arrContStor.splice(targetID,1);
        localStorage.setItem('arrContIn', JSON.stringify(arrContStor));
        window.location.reload();
    };

    delCont.addEventListener('click', delOldCont);


    // ______________FIND________________________
    var findContList = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));



        if(arrFromStorage !== null){
            for (var i=0; i<arrFromStorage.length; i++){
                var ins = arrFromStorage[i],
                    insNameReg = ins.name.toUpperCase(), //Убираем учет регистра
                    insLastReg = ins.lastname.toUpperCase(), //Убираем учет регистра
                    findReg = findCont.value.toUpperCase(),//Убираем учет регистра
                    findRegLen = findReg.length,//Считаем длинну в инпуте
                    insNameLen = insNameReg.substring(0, findRegLen) ,//Берем первые 'х' - букв из имени
                    insLastLen = insLastReg.substring(0, findRegLen);//Берем первые 'х' - букв из фамилии

                // Теперь сравним по букве имена и фамили со строкой поиска без учета регистра
                if (findCont.value === ''){
                    contListDel();
                    contList();
                }
                else if ((insNameLen === findReg ) || (insLastLen === findReg ) ) {
                    var elem = doc.createElement("div"),
                        namLast =  ins.name + ' ' +  ins.lastname,
                        content = document.createTextNode(namLast);
                    elem.appendChild(content);
                    elem.id = i; // ID-шник атрибут
                    elem.className = 'single_contact';
                    var conList = document.getElementById("contact_list");
                    conList.appendChild(elem);
                }
            }
        }
    };




    findCont.addEventListener('click', newSwitchOff);
    findCont.addEventListener('click', clearForms);
    findCont.addEventListener('input', contListDel);
    findCont.addEventListener('input', findContList);


})()