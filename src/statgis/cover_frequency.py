import ee


def water_frequency(
    ImageCollection, bands=["SR_B2", "SR_B3", "SR_B4", "SR_B5", "SR_B6"]
):
    """
    Aquí escribes el docstring.

    Parameters
    ----------
    ImageCollection : ee.ImageCollection
        Image collection to analyze.

    Bands : list
        Iterable with the bands BLUE, GREEN, RED, NIR, SWIR in that order.

    Return
    ------
    water_freq
    """

    def water_detection(image):
        mndwi = image.expression(
            f"(b('{bands[1]}') - b('{bands[4]}'))/(b('{bands[1]}') + b('{bands[4]}'))",
        ).rename("mNDWI")

        evi = image.expression(
            f"(b('{bands[3]}') - b('{bands[2]}'))/(b('{bands[3]}')+6*b('{bands[2]}')-7.5*b('{bands[0]}')+1)*2.5"
        ).rename("EVI")

        ndvi = image.expression(
            f"(b('{bands[3]}') - b('{bands[2]}'))/(b('{bands[3]}') + b('{bands[2]}'))"
        ).rename("NDVI")

        water = (
            evi.lt(0.1)
            .And(mndwi.gt(evi).Or(mndwi.gt(ndvi)))
            .rename("water")
            .rename("WATER")
        )

        return water

    ImageCollection = ImageCollection.map(water_detection)

    water_frequency = ImageCollection.mean()

    return water_frequency
