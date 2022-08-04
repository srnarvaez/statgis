# Plume

The `plume`module let the users the possibility to characterize the river sediment plume of a river based on the difference in reflectance related to the sediment in water.


## Plume Characterization

```python
statgis.plume.plume_characterization(
    Image, sample_region, blue, green, red, nir
)
```

Extract river plume from an image based on the colors in a sample region.

### Parameters

Image : ee.Image <br>
    Image to be classified.

sample_region : ee.Geometry <br>
    Polygon that enclosess a region of the Image that the user indetifies as river plume.

blue : str, optional <br>
    Key of ee.Image blue band (by default SR_B2).

green : str, optional <br>
    Key of ee.Image green band (by default SR_B3).

red : str, optional <br>
    Key of ee.Image red band (by default SR_B4).

nir : str, optional <br>
    Key of ee.Image nir band (by default SR_B5).

### Returns

plume : ee.Image <br>
    Plume characterized in the three color bands of Image.

### Example

```python
from statgis.plume import plume_characterization

plume = plume_characterization(
    Image, sample_region, blue, green, red, nir
)
```