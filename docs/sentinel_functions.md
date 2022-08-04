# Sentinel Functions

The `sentinel_functions` module let the users the tools for scale and mask clouds from sentinel iamges easily.

## Scale Image

```python
statgis.sentinel_functions.sentinel_scaler(
    Image
)
```

This function scale the bands of an image from raw values to surface reflectance values. This funcrion can be mapped to scale all images in an image collection.

### Parameters

Image : ee.Image <br>
    Image to be scaled.

### Returns

Image : ee.Image <br>
    Scaled image.

### Example

```python
from statgis.sentinel_functions import sentinel_scaler

# Scale an Image
Image = sentinel_scaler(Image)

# Scale an Image Collection
ImageCollection = ImageCollection.map(sentinel_scaler)
```

## Mask clouds with QA60

```python
statgis.sentinel_functions.sentinel_cloud_mask(
    Image
)
```

This function mask clouds using thre data from QA60 band. This function can be mapped to an image collection.

### Parameters

Image : ee.Image <br>
    Image to be masked.

### Returns

Image : ee.Image <br>
    Masked image.

### Example

```python
from statgis.sentinel_functions import sentinel_cloud_mask

# Mask an Image
Image = sentinel_cloud_mask(Image)

# Mask an Image Collection
ImageCollection = ImageCollection.map(sentinel_cloud_mask)
```

## Mask clouds with Cloud Probability

```python
statgis.sentinel_functions.sentinel_probability_mask(
    Image, probability=20
)
```

Mask the clouds using the information from MSK_CLDPRB band.

### Parameters

Image : ee.Image <br>
    Image to be masked.

probability : float <br>
    Minimal probability of cloud for mask.

### Returns

Image : ee.Image <br>
    Masked image.

### Notes

This function does not exist in the JS Version.

### Example

```python
from statgis.sentinel_functions import sentinel_probability_mask

Image = sentinel_probability_mask(Image)
```