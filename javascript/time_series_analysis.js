/**
 * Add linear trend and stationally to an ImageCollection.
 * @function trend
 * @param {ee.ImageCollection} ImageCollection - ImageCollection to perform the linear trend and detrend.
 * @param {string} band - Name of the band to perform the calc.
 * return {ee.ImageCollection} ImageCollection - ImageCollection with the Raw data, Time, Trend and Statinally bands.
 */

/**
 * Function for calculate the reducer by year.
 * @function reduce_by_year
 * @param {ee.ImageCollection} ImageCollection - ImageCollection to perform the process.
 * @param {ee.Reducer} reducer - ee.reducer to apply.
 * @param {list} bands - List with the band names to apply the reducer.
 * @param {int} start - First year.
 * @param {int} end - Last year.
 * @return {ee.ImageCollection} yearly - ImageCollection reduced by year.
 */

/**
 * Calc monthly statistics from an image based in the reducer required.
 * @function reduce_by_month
 * @param {ee.ImageCollection} ImageCollection - ImageCollection to perform the process.
 * @param {ee.Reducer} reducer - ee.reducer to apply.
 * @param {list} bands - List with the band names to apply the reducer.
 * @return {ee.ImageCollection} yearly - ImageCollection reduced by month.
 */

/**
 * Calc the anomalies of a ImageCollection subtracting the monthly mean values.
 * @function calc_anomalies
 * @param {ee.ImageCollection} ImageCollection - ImageCollection trended by the trend function to calculate the anomalies.
 * @param {ee.ImageCollection} monthly_mean - ImageCollection with the monthly means of ImageCollection calculated by the `reduce_by_month` function.
 * @return {ee.ImageCollection} data - ImageCollection with stational means added and anomalies calcualted.
 */

/**
 * Basic Time Series Processing. This function take an ee.ImageCollection and calculate the linear trend, the stational varaition, the stational mean and anomalies for the selected band. To calc the linear trend the function use `ee.Reducer.linearFit()`, next, calc the stational variation subtracting the linear_fitted values to the original series and restoring its mean, the monthly means are calcuvared by selecting all the image in the specific month and reduce it by its mean, finally, subtracting the monthly means to the stational variation. This function is a "wrapper" function of `trend()`, `reduce_by_month()` and `calc_anomalies()`.
 * @function time_series_procesing
 * @param {ee.ImageCollection} ImageCollection - ImageCollection with the band to analyse.
 * @param {string} band - Name of the band to perform the analyse.
 * @return {ee.ImageCollection} data - ImageCollection with the raw data, the linear trend, the stational variation, stational mean and the anomalies.
 * @return {ee.ImageCollection} monthly_mean - ImageCollection with the twelves monthly means calculated.
 */

 function trend(ImageCollection, band) {
    function time_func(Image) {
        var time = Image.metadata("system:time_start")
                        .divide(1000 * 60 * 60 * 24 * 365)
                        .rename("time");
        Image = Image.addBands(time);
        return Image;
    }

    function pred_func(Image) {
        var pred = Image.select("time")
                    .multiply(fitted.select("scale"))
                    .add(fitted.select("offset"))
                    .rename("predicted");
        Image = Image.addBands(pred.toFloat());
        return Image;
    }

    function stat_func(Image) {
        var stat = Image.expression(
            "band - pred + mean",
            {
                "band": Image.select(band),
                "pred": Image.select("predicted"),
                "mean": mean,
            }
        ).rename("stational");
        Image = Image.addBands(stat);
        return Image;
    }

    var mean = ImageCollection.select(band).reduce(ee.Reducer.mean());

    ImageCollection = ImageCollection.map(time_func);
    ImageCollection = ImageCollection.select(["time", band]);

    var fitted = ImageCollection.reduce(ee.Reducer.linearFit());

    ImageCollection = ImageCollection.map(pred_func).map(stat_func);

    return ImageCollection;
}

function reduce_by_year(ImageCollection, reducer, bands, start, end) {
    var years = ee.List.sequence(start, end);

    function filter_calc(year) {
        var data = ImageCollection.filter(ee.Filter.calendarRange(year, year, "year"))
        data = data.select(bands).reduce(reducer).set("year", year)
        return data;
    }

    yearly = ee.ImageCollection.fromImages(years.map(filter_calc));

    return yearly;
}

function reduce_by_month(ImageCollection, reducer, bands) {
    var months = ee.List.sequence(1, 12);

    function filter_calc(month) {
        var data = ImageCollection.filter(ee.Filter.calendarRange(month, month, "month"));
        data = data.select(bands).reduce(reducer).set("month", month);
        return data;
    }

    var monthly = ee.ImageCollection.fromImages(months.map(filter_calc));

    return monthly;
}

function calc_anomalies(ImageCollection, monthly_mean) {
    function calc_anomaly(Image) {
        var anomaly = Image.expression(
            "b('stational') - b('stational_mean')"
        ).rename("anomaly");
    Image = Image.addBands(anomaly);
    return Image;
    }

    var m01 = ImageCollection.filter(ee.Filter.calendarRange(1, 1, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 1)).first());
        return Image;
    });
    var m02 = ImageCollection.filter(ee.Filter.calendarRange(2, 2, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 2)).first());
        return Image;
    });
    var m03 = ImageCollection.filter(ee.Filter.calendarRange(3, 3, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 3)).first());
        return Image;
    });
    var m04 = ImageCollection.filter(ee.Filter.calendarRange(4, 4, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 4)).first());
        return Image;
    });
    var m05 = ImageCollection.filter(ee.Filter.calendarRange(5, 5, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 5)).first());
        return Image;
    });
    var m06 = ImageCollection.filter(ee.Filter.calendarRange(6, 6, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 6)).first());
        return Image;
    });
    var m07 = ImageCollection.filter(ee.Filter.calendarRange(7, 7, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 7)).first());
        return Image;
    });
    var m08 = ImageCollection.filter(ee.Filter.calendarRange(8, 8, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 8)).first());
        return Image;
    });
    var m09 = ImageCollection.filter(ee.Filter.calendarRange(9, 9, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 9)).first());
        return Image;
    });
    var m10 = ImageCollection.filter(ee.Filter.calendarRange(10, 10, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 10)).first());
        return Image;
    });
    var m11 = ImageCollection.filter(ee.Filter.calendarRange(11, 11, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 11)).first());
        return Image;
    });
    var m12 = ImageCollection.filter(ee.Filter.calendarRange(12, 12, "month")).map(function(Image) {
        Image = Image.addBands(monthly_mean.filter(ee.Filter.eq("month", 12)).first());
        return Image;
    });

    var data = m01.merge(m02)
                  .merge(m03)
                  .merge(m04)
                  .merge(m05)
                  .merge(m06)
                  .merge(m07)
                  .merge(m08)
                  .merge(m09)
                  .merge(m10)
                  .merge(m11)
                  .merge(m12);
    
    data = data.sort("system:time_start");
    data = data.map(calc_anomaly);

    return data;
}

function time_series_processing(ImageCollection, band) {
    var trended = trend(ImageCollection, band);
    var monthly_mean = reduce_by_month(trended, ee.Reducer.mean(), "stational");
    var data = calc_anomalies(trended, monthly_mean);

    return [data, monthly_mean];
}