import numpy as np
import pandas as pd
import geopandas as gpd

import ee
from statgis.landsat_functions import landsat_scaler, landsat_cloud_mask, landsat_ndvi_collection
from statgis.time_series_analysis import basic_tsp
from statgis.zonal_statistics import zonal_statistics_image, zonal_statistics_collection

ee.Initialize()

# %% Prepare the data
bqlla = [-74.7963, 10.9638]
roi = ee.Geometry.Rectangle([bqlla[0]-0.05, bqlla[1]-0.05, bqlla[0], bqlla[1]])
L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterBounds(roi)

L8 = L8.map(landsat_scaler).map(landsat_cloud_mask)
ndvi = landsat_ndvi_collection(L8, L8=True, add_bands=False)
ndvi, monthly_mean = basic_tsp(ndvi, 'NDVI')

ene = monthly_mean.first()

# %% Zonal statistics for an ee.Image
zsi = zonal_statistics_image(ene, 'stational_mean', roi, 30)

# %% Zonal statistics for an ee.ImageCollection
zsc = zonal_statistics_collection(ndvi, 'stational', roi, 30)
