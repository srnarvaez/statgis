# Sample 

The `sample` module, allow the users to sample images and images collection in a region of interest.

> This module does not have JS version.

## Sample an Image

```python
statgis.sample.sample_image(Image, band, geom, scale)
```

Sample all pixel values in the specified band from a Image.

### Parameters

Image : ee.Image <br>
    Image to be sampled.

band : str <br>
    Band of interest.

geom : ee.Geometry <br>
Region of interest to sample.

scale : float <br>
    Pixelsize of image to be sampled.

### Returns

data : np.array <br>
    Array with all the values sampled.

### Notes

This function does not have a JS version.

### Example

```python
from statgis.sample import sample_image

data = sample(Image, band, geom, scale)
```

## Sample All Image in an Image Collection

This function sample all images in an image collection applying the sample_image function to all images.

### Parameters

Image : ee.ImageCollection <br>
    Image collection with the images of interest.

band : str <br>
    Band of interest.
    
geom : ee.Geometry <br>
    Region of interest to sample.
    
scale : float <br>
    Pixelsize of image to be sampled.

### Returns

data : list <br>
    list of np.array with all the sampled values per image.

### Notes

- This function works with a for loop, so it takes time.
- This function does not have a JS version.

```python
from statgis.sample import sample_image_collection

data = smaple_image_collection(ImageCollection, band, geom, scale)
```