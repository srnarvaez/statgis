# Time Series Analysis

The `time_series_analysis` module let to the user tools to extract the needed information for analysis the spatio-temporal relationship of the variables.

## Extract the Dates From a Images

```python
statgis.time_series_analysis.extract_dates(
    ImageCollection
)
```

Generate a `pandas.series` with the dates of all image in a image collection.

### Parameters

ImageCollection : ee.ImageCollection <br>
    Collection to extract dates.

### Returns

dates : pandas.DatetimeIndex <br>
    `pandas.series` with the image dates from the ImageCollection.

### Notes

This Function doesn't exist in the JS version.

### Example

```python
from statgis.time_series_analysis import extract_dates

dates = extract_dates(ImageCollection)
```

### Linear Trend and Stational Variation in an Image Collection

```python
statgis.time_series_analysis.trend(
    ImageCollection, band
)
```

Function to calculate the linear trend and stational variation to an Image colleciton.

### Parameters

ImageCollection : ee.imageCollection <br>
    Image collection to perform the linear trend and detrend.

band : str <br>
    Name of the band of interest to perform the calculate.

### Returns

ImageCollection : ee.ImageCollection <br>
    Image collection with the Raw data, Time, Trend and Statinally bands.

### Notes

The function restores the mean to the stational variation.

### Example

```python
from statgis.time_series_analysis import trend

detrended = trend(ImageCollection)
```

### Reduce an Image Collection by Year

```python
statgis.time_series_analysis.reduce_by_year(
    ImageCollection, reducer, bands, start, end
)
```

This function calculate the specified reducer to an image collection grouping the images by its years.

### Parameters

ImageCollection : ee.ImageCollection <br>
    ImageCollection to perform the process.

reducer : ee.Reducer <br>
    ee.Reducer to apply.

bands : list, tuple or str <br>
    Iterable object with the band names or indexes to apply the reducer, or, the name or the index of the band. 

start : int <br>
    First year.

end : int <br>
    Last year.

### Returns

yearly : ee.ImageCollection <br>
    ImageCollection reduced by year.

### Example

```python
from statgis.time_series_analysis import reduce_by_year

annual_mean = reduce_by_year(
    ImageCollection,
    ee.Reducer.mean(),
    bands, 
    start=2011, 
    end=2021
)
```

### Reduce an Image Collection by Month

```python
statgis.time_series_analysis.reduce_by_months(
    ImageCollection, reducer, bands
)
```

Function to calculate a reducer to the images in an images collection grouped by month.

### Parameters

ImageCollection : ee.ImageCollection <br>
    ImageCollection to perform the process.

reducer : ee.Reducer <br>
    ee.Reducer to apply.

bands : list, tuple or str <br>
    Iterable object with the band names or indexes to apply the reducer, or, the name or the index of the band. 

### Returns

monthly : ee.ImageCollection <br>
    ImageCollection reduced by month.

### Example

```python
from statgis.time_series_analysis import reduce_by_month

annual_mean = reduce_by_month(
    ImageCollection, ee.Reducer.mean(), bands
)
```

### Calculate the Anomalies

```python
statgis.time_series_analysis.calc_anomalies(
    ImageColection, monthly_mean
)
```

Calculate the anomalies of a ImageCollection subtracting the monthly mean values.

### Parameters

ImageCollection : ee.ImageCollection <br>
    ImageCollection trended by the `trend()` function to calc the anomalies.

monthly_mean : ee.ImageCollection <br>
    ImageCollection with the monthly means of ImageCollection calculated by the `reduce_by_month()` function.

### Returns

data : ee.ImageCollection <br>
    ImageCollection with stational means added and anomalies calcualted.

### Example

```python
from statgis.time_series_analysis import trend, reduce_by_month, calc_anomalies

detrended = trend(ImageCollection, band)
monthly_mean = reduce_by_month(detrended, ee.Reducer.mean(), band)

anomalies = calc_anomalies(detrended, monthly_mean)
```

## Time Series Processing

```python
statgis.time_series_analysis.time_series_processing(
    ImageCollection, band
)
```

This function take an ee.ImageCollection and calculate the linear trend, the stational varaition, the stational mean and anomalies for the selected band.

To calculate the linear trend the function use `ee.Reducer.linearFit()`, next, calculate the stational variation subtracting the linear_fitted values to the original series and restoring its mean, the monthly means are calculeted by selecting all the image in the specific month and reduce it by its mean, finally, subtracting the monthly means to the stational variation anomalies are obtained.

This function work as a "wrapper" function of `trend()`, `reduce_by_month()` and `calc_anomalies()`.

### Parameters

ImageCollection : ee.ImageCollection <br>
    ImageCollection to analyse.

band : str <br>
    Name of the band of interest.

### Returns

data : ee.ImageCollection <br>
    ImageCollection with the raw data, the linear trend, the stational variation, stational mean and the anomalies.

monthly_mean : ee.ImageCollection <br>
    ImageCollection with the monthly means calculated.

### Notes

In the JS version, this function returns a list with `data` and `monthly_mean`.

### Example

```python
from statgis.time_series_analysis import time_series_processing

data, monthly_mean  = time_series_processing(
    ImageCollection, band
)
```