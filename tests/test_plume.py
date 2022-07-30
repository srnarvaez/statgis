from random import sample
import ee
from statgis.plume import plume_characterization

# Prepare data
sample_polygons = ee.FeatureCollection('users/plume/samples')
landsat_8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')

san_juan = sample_polygons.filter(ee.Filter.eq('name', 'San Juan')).first().geometry()
image = landsat_8.filterBounds(san_juan).sort('CLOUD_COVER').first()

# Extract the plume of the image
plume = plume_characterization(image, san_juan)