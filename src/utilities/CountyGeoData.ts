export type CountyGeoData = {
    "type": string,
    "properties": {
        "kind": string,
        "state": string
    },
    "features": [
        {
            "type": string,
            "properties": {
                "kind": string,
                "name": string,
                "state": string
            },
            "geometry": {
                "type": string,
                "coordinates": number[][]
            }
        }
    ]
}

