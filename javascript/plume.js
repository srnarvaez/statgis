/**
 * Extract river plume from ee.Image based on the colors.
 * @function plume_characterization
 * @param {ee.Image} Image - Image to be classified.
 * @param {ee.Geometry} sample_region - Polygon that enclosess a region of the Image that the user indetifies as river plume.
 * @param {string} blue - Key of blue band.
 * @param {string} green - Key of green band.
 * @param {string} red - Key of red band.
 * @param {string} nir - key of NIR band.
 * @return {ee.Image} plume - Plume characterized in the three color bands of Image.
 */

 function plume_characterization(Image, sample_region, blue, green, red, nir) {
    Image = Image.addBands(
        Image.expression(
            "(GREEN - NIR)/(GREEN + NIR)",
            {
                "GREEN": Image.select(green),
                "NIR": Image.select(nir)
            }
        ).rename("NDWI"),
        null,
        true
    );

    var mask = Image.select("NDWI").gt(0);
    Image = Image.updateMask(mask);

    var reducer = ee.Reducer.min().combine({reducer2: ee.Reducer.max(), sharedInputs:true});

    var limits = Image.select([blue, green, red]).reduceRegion({
      reducer: reducer, geometry: sample_region, scale: 30
    });

    Image = Image.addBands(
        Image.expression(
            "(BLUE > MINI && BLUE < MAXI) ? 1 : 0",
            {
                "BLUE": Image.select(blue),
                "MAXI": limits.getNumber(blue + "_max"),
                "MINI": limits.getNumber(blue + "_min")
            }
        ).rename("plume_blue"),
        null,
        true
    );

    Image = Image.addBands(
        Image.expression(
            "(GREEN > MINI && GREEN < MAXI) ? 1 : 0",
            {
                "GREEN": Image.select(green),
                "MAXI": limits.getNumber(green + "_max"),
                "MINI": limits.getNumber(green + "_min")
            }
        ).rename("plume_green"),
        null,
        true
    );

    Image = Image.addBands(
        Image.expression(
            "(RED > MINI && RED < MAXI) ? 1 : 0",
            {
                "RED": Image.select(red),
                "MAXI": limits.getNumber(red + "_max"),
                "MINI": limits.getNumber(red + "_min")
            }
        ).rename("plume_red"),
        null,
        true
    );

    Image = Image.addBands(
        Image.expression(
            "(b('plume_blue') + b('plume_green') + b('plume_red'))/3"
        ).rename("plume"),
        null,
        true
    );

    var plume_mask = Image.select("plume").gt(0.5);

    var pixel_count = plume_mask.select(0).connectedPixelCount(100, false);
    var count_mask = pixel_count.select(0).gt(50);

    Image = Image.updateMask(plume_mask).updateMask(count_mask);

    return Image;  
}