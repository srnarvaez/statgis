# Landsat Functions

The `landsat_functions` module allow the user to do quickly basic operation for Landsat Images and Landsat Image Collections.

## Scale Images

```python
statgis.landsat_functions.landsat_scaler(
    Image
)
```

Function for scale Surface Reflectance Image from raw values to Reflectance values. The user also can scale all images in an image collection mapping this function.

### Parameters

Image : ee.Image <br>
    Image from Landsat Collection.


### Returns

Image : ee.Image <br>
    Image scaled.

### Example

```python
from statgis.landsat_function import landsat_scaler

# Scale an Image
Image = landsat_scaler(Image)

# Scale an Image Collection
ImageCollection = ImageCollection.map(landsat_scaler)
```

## Mask Clouds From Images

```python
statgis.landsat_functions.landsat_cloud_mask(
    Image, all=True
)
```

This function mask clouds, cloud shadows, cirrus and snow from a Landsat Image based on the information in the QA_PIXEL band. This function can be mapped for image collections and work with SR collections and TOA collections.

### Parameters

Image : ee.Image <br>
    Image from Landsat Collection.

all : bool <br>
    If `True`, all mentioned abvove values will be masked, is `False`, the function only mask the cloud values.

### Returns

Image : ee.Image <br>
    Image Masked.

### Notes

In the java script version, the function was edited to delete the `all` parameter and mask all the values.

```python
from statgis.landsat_function import landsat_cloud_mask

# Mask an Image
Image = landsat_cloud_mask(Image)

# Mask an Image Collection
ImageCollection = ImageCollection.map(landsat_cloud_mask)
```