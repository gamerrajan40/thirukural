$(function () {
    //Initializing the default kural
    inititalize();

    //Left navigation
    $("#leftImg").click(function () {
        navigateKural(true);
    });

    //Right navigation
    $("#rightImg").click(function () {
        navigateKural(false);
    });

    $("#kuralIdBtn").click(function () {
        performSearch();
    });

});

function inititalize() {
    chrome.storage.sync.get(['kuralId'], function (kural) {
        var kID = parseInt(kural.kuralId);
        if (kID === undefined || kID === null || kID === NaN || isNaN(kID)) {
            chrome.storage.sync.set({
                'kuralId': 1
            }, function () {
                setKural(1);
            });
        } else {
            setKural(kID);
        }
    });
}

function navigateKural(isLeft) {
    chrome.storage.sync.get(['kuralId'], function (kural) {
        var kID = parseInt(kural.kuralId);
        kID = isLeft ? kID - 1 : kID + 1;
        if (kID < 0) {
            kID = 1330;
        }
        if (kID > 1330) {
            kID = 0;
        }

        chrome.storage.sync.set({
            'kuralId': kID
        }, function (kural) {
            setKural(kID)
        });
    });
}

function performSearch(){
    var kID = parseInt($("#kuralId").val())
    chrome.storage.sync.set({
        'kuralId': kID
    }, function (kural) {
        setKural(kID);
    });
   

}

function setKural(index) {
    index = index - 1;
    $('#knumber').text(kural[index].no);
    $('#adhigaramtitle').text(kural[index].ca);
    $('#kuralline1').text(kural[index].l1);
    $('#kuralline2').text(kural[index].l2);
    $('#descritption1').text(kural[index].mv);
    $('#descritption2').text(kural[index].mk);
    $('#descritption3').text(kural[index].sp);
    $('#engtranslation').text(kural[index].tr);
    $('#engexplanation').text(kural[index].ex);
}