# Zonal Statistics

The `zonal_statistics` module let the user the possibility to reduce an image or an image collection to an statistics in the region of interest.

## Zonal Statistics for One Image

```python
statgis.zonal_statistics.zonal_statistics_image(
    Image, geom, scale, bands="all", reducer="all", tileScale=16
)
```

Function to calculate a statistic in the specified region for one image.

### Parameters

Image : ee.Image <br>
    Image of interest.

geom : ee.Geometry <br>
    Region of interest to reduce the image.

scale : float <br>
    Pixel size for the sample to perform the zonal statistics.

bands : iterable <br>
    List, tuple with the bands of interest or, if you only want one band, the name of the band. By default the process takes into consideration all bands. Also works with the bands indexes.

reducer : ee.Reducer <br>
    Reducer to apply to all image. By default, image are reduced to its, mean, standard deviation, maximum, minimum, and count.

tileScale : int <br>
    Scale of the mosaic to allow EarthEngine to split the task to more cores.

### Return

data : pandas.DataFrame <br>
    DataFrame with all the stats for all spcified bands.

### Notes

In the JS version this function returns a ee.Feature with all the statistics calculated in the properties.

### Example

```python
from statgis.zonal_statistics import zonal_statistics_image

means = zonal_statistics_image(
    Image, geom, scale, bands="all", reducer=ee.Reducer.mean()
)
```

## Zonal Statistics for an Image Collection

```python
statgis.zonal_statistics.zonal_statistics_collection(
    ImageCollection,
    geom, 
    scale, 
    bands="all", 
    reducer="all", 
    tileScale=16
)
```

Function to calculate a statistic in the specified region for all Image in a Image Collection.

### Parameters

ImageCollection : ee.ImageCollection <br>
    Image Collection with the image to analyze.

geom : ee.Geometry <br>
    Region of interest to reduce the images.

scale : float <br>
    Pixel size for the sample to perform the zonal statistics.

bands : iterable <br>
    List, tuple with the bands of interest or, if you only want one band, the name of the band. By default the process takes into consideration all bands.

reducer : ee.Reducer <br>
    Reducer to apply to all image. By default, Images are reduced to its, mean, standard deviation, maximum, minimum, and count.

tileScale : int <br>
    Scale of the mosaic to allow EarthEngine to split the task to more cores.

### Return

data : pandas.DataFrame <br>
    DataFrame with all the stats for all spcified bands.

### Notes

In the JS version, this function returns an feature collection where each feature corresponds to an image (in the image collection) and have its statistics in the properties.

### Example

```python
from statgis.zonal_statistics import zonal_statistics_collection

means = zonal_statistics_collection(
    ImageCollection, 
    geom, 
    scale, 
    bands="all", 
    reducer=ee.Reduer.mean()
)
```