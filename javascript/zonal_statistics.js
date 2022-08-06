/**
 * Function to calculate a statistic in the specified region for a Image.
 * @function zonal_statistics_image
 * @param {ee.Image} Image - Image of interest.
 * @param {ee.Geometry} geom - Region of interest.
 * @param {float} scale - Pixel size for the sample to perform the zonal statistics.
 * @param {list} bands - List with the bands of interest or, if you only want one band, the name of the band. By default the process takes into consideration all bands.
 * @param {ee.Reducer} reducer - Reducer to apply to all image. By default, image are reduced to its, mean, standard deviation, maximum, minimum, and count.
 * @param {int} tileScale - Scale of the mosaic to allow EarthEngine to split the task to more cores.
 * @return {ee.Feature} data - DataFrame with all the stats for all spcified bands.
 */

/**
 * Function to calculate a statistic in the specified region for al Image in a Image Collection.
 * @function zonal_statistics_collection
 * @param {ee.ImageCollection} ImageCollection - Image Collection with the image to analyse.
 * @param {ee.Geometry} geom - Region of interest.
 * @param {float} scale - Pixel size for the sample to perform the zonal statistics.
 * @param {list} bands - List with the bands of interest or, if you only want one band, the name of the band. By default the process takes into consideration all bands.
 * @param {ee.Reducer} reducer - Reducer to apply to all image. By default, image are reduced to its, mean, standard deviation, maximum, minimum, and count.
 * @param {int} tileScale - Scale of the mosaic to allow EarthEngine to split the task to more cores.
 * @return {ee.FeatureCollection} data - DataFrame with all the stats for all spcified bands.
 */

var zonal_statistics_image = function(Image, geom, scale, bands, reducer, tileScale) {
    if (bands !== "all") {
        Image = Image.select(bands);
    }

    if (reducer == "all") {
        reducer = ee.Reducer.mean().combine({
            reducer2: ee.Reducer.stdDev().combine({
                reducer2: ee.Reducer.max().combine({
                    reducer2: ee.Reducer.min().combine({
                        reducer2: ee.Reducer.count(),
                        sharedInputs: true
                    }),
                    sharedInputs:true
                }),
                sharedInputs:true
            }),
            sharedInputs: true
        });
    }

    var stats = Image.reduceRegion({
        reducer: reducer, geometry: geom, scale: scale, tileScale: tileScale
    });
    stats = stats.set("system:time_start", Image.get("system:time_start"));

    var data = ee.Feature(geom, stats);

    return data;
};

var zonal_statistics_collection = function(ImageCollection, geom, scale, bands, reducer, tileScale) {
    if (bands !== "all") {
        ImageCollection = ImageCollection.map(function(Image) {
            Image = Image.select(bands);
            return Image;
        });
    }
    
    if (reducer == "all") {
        reducer = ee.Reducer.mean().combine({
            reducer2: ee.Reducer.stdDev().combine({
                reducer2: ee.Reducer.max().combine({
                    reducer2: ee.Reducer.min().combine({
                        reducer2: ee.Reducer.count(),
                        sharedInputs: true
                    }),
                    sharedInputs:true
                }),
                sharedInputs:true
            }),
            sharedInputs: true
        });
    }
    
    function reduce_image(Image) {
        var stats = Image.reduceRegion({
            reducer: reducer, geometry: geom, scale: scale, tileScale: tileScale
        });

        stats = ee.Feature(geom, stats);
        stats = stats.set("system:time_start", Image.get("system:time_start"));
        
        return stats;
    }

    var data = ee.FeatureCollection(ImageCollection.map(reduce_image));

    return data;
};

exports.zonal_statistics_image = zonal_statistics_image;
exports.zonal_statistics_collection = zonal_statistics_collection;