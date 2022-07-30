# Statgis Toolbox

`statgis` is a Python package developed and maintained by StatGIS.org used to perform several spatial data science analysis.This package counts with function operate with Google Earth Engine.

## Dependencies

This package depends of [earthengine-api](https://developers.google.com/earth-engine/tutorials/community/intro-to-python-api) and [geopandas](https://geopandas.org/en/stable/getting_started.html).

```bash
$ conda install geopandas
$ conda install -c conda-forge earthengine-api
```

Also you should install [geemap](https://geemap.org/get-started/) to plot an interact ee objects

```bash
$ conda install geemap localtileserver -c conda-forge
$ conda install jupyter_contrib_nbextensions -c conda-forge
```

To use `earthengine-api` you have to sing up to [Google Earth Engine](https://earthengine.google.com/new_signup/) and authneticate with the comand `Authenticate()`.

```Python
import ee

ee.Authenticate()
```

## Installation

To install `statgis` you only have to run the `pip install` comand:

```bash
$ pip install statgis
```

The current version of statgis is 0.1.6.

## Contribution

To contribute you have to read and understand the [code of conduct](CONDUCT.md) and the [contributing guideline](CONTRIBUTING.md).

## License

This software is protected by a GNU GPL-3 License that let you use and copy the software but, you can't develop your own version. The complete description is in the [license file](LICENSE.txt).

## Credits

All the attribution of the development and maintance of this package is for StatGIS.org and its developers team.