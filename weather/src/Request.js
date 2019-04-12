
'use strict';

export function get(caller, path) {
    return new Promise(function () {
        return caller.$http.get(path)
            .then(
                response => {
                    // return response.body
                },
                () => {
                    // return null
                })
    });
}

export function analysisWeather(data) {
    let d = data.cwbopendata.dataset.location
    let a = []
    for (let i of d) {
        let m = {}
        m["locationName"] = i.locationName
        //
        m["elementKeys"] = i.weatherElement.map($0 => $0.elementName)
        //
        m["weatherElement"] = {}
        for (let e of i.weatherElement) {
            m.weatherElement[e.elementName] = e.time
        }

        a.push(m)
    }
    console.log(a)
}